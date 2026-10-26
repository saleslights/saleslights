import { json, limited, originAllowed, readBody, clean, validEmail } from '../../../lib/forms';
import { FORMS_DRY_RUN } from '../../../lib/env';
import { MERCURY_CONFIGURED, sendInvoice } from '../../../lib/mercury';
import { BOOK } from '../../../content/site';

export const dynamic = 'force-dynamic';

/* /book/ invoice requests. Raises a real $500 Mercury invoice in Saleslights
   Inc.'s name and emails it to the requester, who pays by ACH debit or bank
   transfer. Staging validates and never bills (FORMS_DRY_RUN). */

const AMOUNT = 500;

/* Keep the charged amount and the displayed price from drifting apart. BOOK.price
   is the single source of truth for the page copy, so assert against it here
   rather than trusting two separate literals to stay in sync. */
const DISPLAYED = Number(String(BOOK.price).replace(/[^0-9.]/g, ''));

function invoiceNumber() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SL-BOOK-${stamp}-${rand}`;
}

export async function POST(request) {
  if (!originAllowed(request)) return json(403, { error: 'Request origin not allowed.' });
  if (limited(request)) return json(429, { error: 'Too many requests. Please try again shortly.' });

  let body;
  try { body = await readBody(request); } catch { return json(400, { error: 'Invalid request.' }); }
  if (clean(body.website, 200)) return json(400, { error: 'Invalid request.' });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160);
  if (!name) return json(400, { error: 'Please enter your name.' });
  if (!validEmail(email)) return json(400, { error: 'Please enter a valid email address.' });

  if (DISPLAYED !== AMOUNT) {
    return json(503, { error: 'Booking is temporarily unavailable. Please email sales@saleslights.com.' });
  }

  if (FORMS_DRY_RUN) {
    return json(200, {
      ok: true,
      dryRun: true,
      message: 'Staging preview: validated, no invoice was created.',
    });
  }

  if (!MERCURY_CONFIGURED) {
    return json(503, { error: 'Booking is temporarily unavailable. Please email sales@saleslights.com.' });
  }

  try {
    const invoice = await sendInvoice({
      name: company || name,
      email,
      amount: AMOUNT,
      item: `${BOOK.name} - one-hour working session`,
      number: invoiceNumber(),
      dueDays: 14,
      memo: 'Pay by ACH debit or bank transfer to Saleslights Inc. Nick\u2019s calendar link follows payment.',
      note: `Requested from saleslights.com/book by ${name}${company ? ` (${company})` : ''}.`,
    });
    return json(200, {
      ok: true,
      message: `Invoice sent to ${email}. Open it to pay by bank transfer, and you will get Nick\u2019s calendar link once payment clears.`,
      url: invoice.url,
      number: invoice.number,
      dueDate: invoice.dueDate,
    });
  } catch (err) {
    // The Mercury error text can carry request detail; keep it in the server log only.
    console.error('[book] mercury invoice failed:', err.message);
    return json(502, { error: 'We could not create the invoice just now. Please email sales@saleslights.com and we will send it manually.' });
  }
}

export function GET() { return json(405, { error: 'Method not allowed.' }); }
