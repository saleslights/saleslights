import { request } from 'node:https';

/* Mercury Accounts Receivable client (server only).

   Saleslights bills through Mercury, not Stripe: the Mercury hosted invoice
   and PDF carry "Saleslights Inc." alone, while the Stripe account this
   company shares is VideoFunker-branded (card statements read
   "VF - Saleslights").

   TWO THINGS WILL BREAK THIS IF CHANGED:

   1. family: 4 is REQUIRED. Mercury API tokens are IP-allowlisted and only
      this host's IPv4 address is on the list. Node happily picks the AAAA
      record, and Mercury then answers 401 ipNotWhitelisted -- which reads
      exactly like a bad or revoked token. Do not switch this to global
      fetch() without pinning the address family.
   2. The token is server-only. It must never reach a client component,
      a NEXT_PUBLIC_ var, or a response body. */

const HOST = 'api.mercury.com';
const BASE = '/api/v1';
// Saleslights Inc. Mercury Checking ••1469 -- where invoice payments land.
const DEFAULT_ACCOUNT = '4e9c8d48-7426-11ee-9698-c3b73fc15fec';

export const MERCURY_CONFIGURED = Boolean(process.env.MERCURY_API_TOKEN);

function call(path, body) {
  const token = process.env.MERCURY_API_TOKEN;
  if (!token) return Promise.reject(new Error('MERCURY_API_TOKEN is not set'));
  const payload = body === undefined ? null : JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = request(
      {
        host: HOST,
        path: BASE + path,
        method: payload === null ? 'GET' : 'POST',
        family: 4,
        timeout: 20000,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          ...(payload === null
            ? {}
            : { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => { raw += c; });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            // Never surface Mercury's body to the caller: it can echo request
            // detail. Log the status, hand the user a generic failure.
            reject(new Error(`mercury ${res.statusCode} ${path}`));
            return;
          }
          try {
            resolve(raw.trim() ? JSON.parse(raw) : {});
          } catch {
            reject(new Error(`mercury unparseable response ${path}`));
          }
        });
      },
    );
    req.on('timeout', () => req.destroy(new Error('mercury timeout')));
    req.on('error', reject);
    if (payload !== null) req.write(payload);
    req.end();
  });
}

/* The customer list has no search endpoint, so matching is client side and
   every page must be read before concluding the customer is new -- creating a
   duplicate customer splits that payer's invoice history. */
async function findCustomer(email) {
  const wanted = email.toLowerCase();
  let query = '?limit=1000';
  for (let page = 0; page < 20; page += 1) {
    const data = await call('/ar/customers' + query);
    const hit = (data.customers || []).find(
      (c) => (c.email || '').toLowerCase() === wanted && !c.deletedAt,
    );
    if (hit) return hit;
    const next = data.page && data.page.nextPage;
    if (!next) return null;
    query = `?limit=1000&start_after=${encodeURIComponent(next)}`;
  }
  return null;
}

async function ensureCustomer(name, email) {
  const found = await findCustomer(email);
  if (found) return found;
  return call('/ar/customers', { name, email });
}

const iso = (d) => d.toISOString().slice(0, 10);

/* Raise and email one invoice. ACH debit + bank transfer only: cards would
   require a Stripe account connected to Mercury, and the only one available is
   the VideoFunker-branded account this migration exists to get away from. */
export async function sendInvoice({ name, email, amount, item, number, dueDays = 14, memo, note }) {
  const customer = await ensureCustomer(name, email);
  const today = new Date();
  const due = new Date(today.getTime() + dueDays * 86400000);
  const invoice = await call('/ar/invoices', {
    customerId: customer.id,
    destinationAccountId: process.env.MERCURY_DESTINATION_ACCOUNT_ID || DEFAULT_ACCOUNT,
    invoiceDate: iso(today),
    dueDate: iso(due),
    lineItems: [{ name: item, quantity: 1, unitPrice: amount }],
    ccEmails: [],
    creditCardEnabled: false,
    achDebitEnabled: true,
    useRealAccountNumber: false,
    invoiceNumber: number,
    sendEmailOption: 'SendNow',
    ...(memo ? { payerMemo: memo } : {}),
    ...(note ? { internalNote: note } : {}),
  });
  return {
    id: invoice.id,
    number: invoice.invoiceNumber,
    amount: invoice.amount,
    dueDate: invoice.dueDate,
    url: invoice.slug ? `https://app.mercury.com/invoice/${invoice.slug}` : null,
  };
}
