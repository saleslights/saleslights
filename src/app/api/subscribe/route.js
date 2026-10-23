import { json, limited, originAllowed, readBody, clean, validEmail, persist } from '../../../lib/forms';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!originAllowed(request)) return json(403, { error: 'Request origin not allowed.' });
  if (limited(request)) return json(429, { error: 'Too many requests. Please try again shortly.' });
  let body;
  try { body = await readBody(request); } catch { return json(400, { error: 'Invalid request.' }); }
  if (clean(body.website, 200)) return json(400, { error: 'Invalid request.' });
  const email = clean(body.email, 200).toLowerCase();
  if (!validEmail(email)) return json(400, { error: 'Please enter a valid email address.' });
  const result = await persist('subscribers', { email, source: clean(body.source, 80) || 'site' });
  if (result.unconfigured) return json(503, { error: 'Sign-up is temporarily unavailable. Please email sales@saleslights.com.' });
  return json(200, { ok: true, message: result.dryRun ? 'Staging preview: validated, not stored.' : 'You are on the list.' });
}

export function GET() { return json(405, { error: 'Method not allowed.' }); }
