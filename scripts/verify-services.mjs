// New-service regression gate. Run against staging or an isolated local build.
import assert from 'node:assert/strict';
const base = (process.env.BASE_URL || 'http://127.0.0.1:3914').replace(/\/$/, '');
const slice = process.env.TEST_SLICE || 'all';
const text = s => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ').trim();
const html = async path => { const r = await fetch(base + path); assert.equal(r.status, 200, path); return r.text(); };
if (['all', 'navigation'].includes(slice)) {
  const home = await html('/');
  const header = (home.match(/<header[\s\S]*?<\/header>/) || [''])[0];
  for (const [href, label] of [['/training/', 'Sales Training'], ['/ai-training/', 'AI Training'], ['/software-development/', 'Software Development'], ['/venture-partnerships/', 'Venture Partnerships']]) {
    assert(header.includes(`href="${href}"`), `Header missing ${href}`);
    assert(text(header).includes(label), `Header missing label ${label}`);
  }
  assert(!/>Training<\//.test(header), 'Old ambiguous Training label remains');
  console.log('PASS service navigation');
}
if (['all', 'homepage'].includes(slice)) {
  const home = await html('/');
  assert(text(home).includes('Build real businesses. Operate with AI.'), 'Missing canonical hero');
  assert(text(home).includes('SALESLIGHTS · AI-NATIVE VENTURE OPERATOR'), 'Missing positioning eyebrow');
  assert(text(home).includes('AI executes defined work. People own the decisions.'), 'Missing human boundary');
  assert(home.includes('href="/gtm-engine/"') && text(home).includes('GTM Engine'), 'Missing existing commercial offer path');
  assert(home.includes('href="/venture-partnerships/"') && text(home).includes('Venture partnerships'), 'Missing venture path');
  console.log('PASS both homepage service sections');
}
if (['all', 'training'].includes(slice)) {
  const venture = await html('/venture-partnerships/');
  for (const phrase of ['negotiated equity partnerships', 'separate company data and permissions', 'Businesses in our operating work', 'InfernoBlue']) assert(text(venture).includes(phrase), `Venture page missing ${phrase}`);
  const page = await html('/training/');
  assert.equal(text((page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ''), 'Sales Training');
  console.log('PASS legacy /training/ route and Sales Training name');
}
if (['all', 'forms'].includes(slice)) {
  const health = await fetch(base + '/api/health/').then(r => r.json());
  assert.equal(health.env, 'staging', 'Positive form tests require staging dry-run');
  for (const topic of ['ai-training', 'software-development']) {
    const page = await html('/contact/?topic=' + topic);
    assert(new RegExp(`<option[^>]*value="${topic}"[^>]*selected`).test(page) || new RegExp(`<option[^>]*selected[^>]*value="${topic}"`).test(page), `Contact must preselect ${topic}`);
    const r = await fetch(base + '/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ name: 'Staging QA', email: 'qa@example.com', company: 'Synthetic test', size: '', topic, message: 'Synthetic service routing verification.', website: '' }) });
    assert.equal(r.status, 200, `${topic} accepted by API`);
    const data = await r.json();
    assert.equal(data.message, 'Staging preview: validated, not sent.');
  }
  console.log('PASS both service topics preselect and validate without sending');
}
