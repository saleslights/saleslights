import { json, limited, originAllowed, readBody, clean, validEmail, persist } from '../../../lib/forms';

export const dynamic = 'force-dynamic';

const TOPICS = new Set(['gtm-engine', 'revenue-infrastructure', 'training', 'lead-data', 'speaking', 'other']);
const SIZES = new Set(['', '1–10', '11–50', '51–200', '201–1,000', '1,000+']);

export async function POST(request) {
  if (!originAllowed(request)) return json(403, { error: 'Request origin not allowed.' });
  if (limited(request)) return json(429, { error: 'Too many requests. Please try again shortly.' });
  let body;
  try { body = await readBody(request); } catch { return json(400, { error: 'Invalid request.' }); }
  if (clean(body.website, 200)) return json(400, { error: 'Invalid request.' });
  const record = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160),
    size: clean(body.size, 20),
    topic: clean(body.topic, 40),
    message: clean(body.message, 4000),
  };
  if (!record.name) return json(400, { error: 'Please enter your name.' });
  if (!validEmail(record.email)) return json(400, { error: 'Please enter a valid email address.' });
  if (!TOPICS.has(record.topic)) return json(400, { error: 'Please choose what you are interested in.' });
  if (!SIZES.has(record.size)) return json(400, { error: 'Please choose a company size.' });
  if (record.message.length < 10) return json(400, { error: 'Please tell us a little more.' });
  const result = await persist('contact', record);
  if (result.unconfigured) return json(503, { error: 'The form is temporarily unavailable. Please email sales@saleslights.com.' });
  return json(200, { ok: true, message: result.dryRun ? 'Staging preview: validated, not sent.' : 'Thank you. We will be in touch.' });
}

export function GET() { return json(405, { error: 'Method not allowed.' }); }
