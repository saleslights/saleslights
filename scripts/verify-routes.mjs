// Route gate. Usage: BASE_URL=http://127.0.0.1:3910 EXPECT_ENV=staging node scripts/verify-routes.mjs
// Checks every contract route: 200, exactly one H1 matching seo.js, title, meta description,
// canonical on saleslights.com, JSON-LD parses, every <img> has alt, and indexing policy per env.
import { PAGES } from '../src/content/seo.js';
import { POSTS } from '../src/content/posts.js';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3910').replace(/\/$/, '');
const ENV = process.env.EXPECT_ENV || 'staging';
const ORIGIN = 'https://saleslights.com';
const failures = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

/* Copy contract: exact owner wording that must appear, and claims the truth canon does not support. */
const MUST = {
  '/gtm-engine/': ['Saleslights - GTM Engine & Sales Professional', '$5,999–$13,999'],
  '/training/': ['Sales Training'],
  '/ai-training/': ['AI Training', 'Security', 'Finance'],
  '/software-development/': ['Nick Krause', 'forward-deployed engineer', 'full-stack', '$5,999–$13,999', '$18,999', '$29,999', 'per month', 'scope'],
  '/book/': ['$500'],
  '/revenue-infrastructure/': ['$7.5K–$20K', '$50K–$100K+'],
};
const MUST_NOT = ['Annual managed infrastructure available', '~$8K', 'led sales engineering', 'guaranteed meetings', '$250'];
/* Owner rule: the session price appears on /book/ only; every other booking CTA is unpriced. */
const SESSION_PRICE = '$500';
const SESSION_PRICE_ROUTE = '/book/';
const sessionPriceSeenOn = [];

const routes = [...Object.keys(PAGES).map((p) => [p, PAGES[p]]), ...POSTS.map((p) => [`/lab/${p.slug}/`, { h1: p.title, description: p.dek }])];
for (const [route, spec] of routes) {
  const res = await fetch(BASE + route, { redirect: 'manual' });
  const html = await res.text();
  if (res.status !== 200) { fail(route, `status ${res.status}`); continue; }
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  if (h1s.length !== 1) fail(route, `expected 1 h1, got ${h1s.length}`);
  else if (h1s[0].replace(/\.$/, '') !== spec.h1.replace(/\.$/, '')) fail(route, `h1 "${h1s[0]}" != "${spec.h1}"`);
  const title = text((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  if (!title) fail(route, 'missing title');
  if (spec.title && !title.startsWith(spec.title.split(' | ')[0])) fail(route, `title "${title}"`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) fail(route, 'missing description');
  else if (spec.description && desc.replace(/&amp;/g, '&') !== spec.description) fail(route, 'description differs from contract');
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const want = route === '/' ? `${ORIGIN}` : `${ORIGIN}${route}`;
  if (!canon || canon.replace(/\/$/, '') !== want.replace(/\/$/, '')) fail(route, `canonical ${canon}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { fail(route, 'invalid JSON-LD'); } }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]+"/.test(m[0])) fail(route, 'img without alt');
  const robotsMeta = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const xr = res.headers.get('x-robots-tag') || '';
  if (ENV === 'staging') { if (!/noindex/.test(robotsMeta) || !/noindex/.test(xr)) fail(route, 'staging must be noindex (meta + header)'); }
  else if (/noindex/.test(robotsMeta + xr)) fail(route, 'production page is noindex');
  if (/\\u[0-9a-fA-F]{4}|\uFFFD/.test(text(html))) fail(route, 'escaped/mojibake text in visible copy');
  const visible = text(html);
  for (const t of MUST[route] || []) if (!visible.includes(t)) fail(route, `missing required copy "${t}"`);
  for (const t of MUST_NOT) if (visible.includes(t)) fail(route, `unsupported claim "${t}"`);
  if (visible.includes(SESSION_PRICE)) sessionPriceSeenOn.push(route);
}
if (sessionPriceSeenOn.join() !== SESSION_PRICE_ROUTE) {
  fail(SESSION_PRICE_ROUTE, `session price ${SESSION_PRICE} must appear on ${SESSION_PRICE_ROUTE} only, saw: ${sessionPriceSeenOn.join(', ') || 'nowhere'}`);
}
const robots = await (await fetch(BASE + '/robots.txt')).text();
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = (sitemap.match(/<loc>/g) || []).length;
if (ENV === 'staging') { if (/Sitemap:/i.test(robots)) fail('/robots.txt', 'staging must not advertise sitemap'); if (urls) fail('/sitemap.xml', 'staging sitemap must be empty'); if (/Disallow: \/\s*$/m.test(robots)) fail('/robots.txt', 'staging must stay crawlable so noindex is seen'); }
else { if (!/Sitemap: https:\/\/saleslights\.com\/sitemap\.xml/.test(robots)) fail('/robots.txt', 'missing sitemap'); if (urls !== routes.length) fail('/sitemap.xml', `expected ${routes.length} urls, got ${urls}`); }
const nf = await fetch(BASE + '/definitely-missing/'); if (nf.status !== 404) fail('/definitely-missing/', `status ${nf.status}`);
const foreign = await fetch(BASE + '/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example' }, body: '{}' });
if (foreign.status !== 403) fail('/api/contact/', `foreign origin ${foreign.status}`);
const hp = await fetch(BASE + '/api/subscribe/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'a@b.co', website: 'spam' }) });
if (hp.status !== 400) fail('/api/subscribe/', `honeypot ${hp.status}`);
const bad = await fetch(BASE + '/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'x', email: 'nope' }) });
if (bad.status !== 400) fail('/api/contact/', `malformed ${bad.status}`);

console.log(`${routes.length} routes checked against ${BASE} (${ENV})`);
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('PASS');
