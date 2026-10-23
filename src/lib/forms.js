import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { FORMS_DRY_RUN, SITE_URL, CANONICAL_ORIGIN } from './env';

/* Shared form pipeline: origin check -> rate limit -> honeypot -> validation ->
   store (JSONL, mode 600 dir) -> optional SMTP notice. Staging validates but
   never stores or sends. Production without FORMS_DATA_DIR answers 503. */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 8;
const hits = new Map();
const EMAIL = /^[^\s@<>()]{1,64}@[^\s@<>()]{1,190}\.[A-Za-z]{2,24}$/;

export function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

function clientKey(request) {
  const fwd = request.headers.get('x-forwarded-for') || '';
  const ip = fwd.split(',').map((s) => s.trim()).filter(Boolean).pop() || 'local';
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

export function limited(request) {
  const key = clientKey(request);
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

export function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // non-browser or no-JS form posts from same origin often omit it
  const allowed = new Set([CANONICAL_ORIGIN, 'https://www.saleslights.com', SITE_URL, ...(process.env.FORMS_EXTRA_ORIGINS || '').split(',').filter(Boolean)]);
  return allowed.has(origin.replace(/\/$/, ''));
}

export async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form);
}

export const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
export const validEmail = (e) => EMAIL.test(e);

export async function persist(kind, record) {
  if (FORMS_DRY_RUN) return { stored: false, dryRun: true };
  const dir = process.env.FORMS_DATA_DIR;
  if (!dir) return { stored: false, unconfigured: true };
  await mkdir(dir, { recursive: true, mode: 0o700 });
  await appendFile(path.join(dir, `${kind}.jsonl`), JSON.stringify({ ...record, at: new Date().toISOString() }) + '\n', { mode: 0o600 });
  await notify(kind, record).catch(() => {});
  return { stored: true };
}

async function notify(kind, record) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT = '587', NOTIFY_TO, NOTIFY_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) return;
  const nodemailer = (await import('nodemailer')).default;
  const t = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: SMTP_PORT === '465', auth: { user: SMTP_USER, pass: SMTP_PASS } });
  await t.sendMail({
    from: NOTIFY_FROM || SMTP_USER, to: NOTIFY_TO, replyTo: record.email,
    subject: kind === 'contact' ? `Saleslights inquiry: ${record.topic} — ${record.company || record.name}` : `New Saleslights subscriber`,
    text: Object.entries(record).map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
}
