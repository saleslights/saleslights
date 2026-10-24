// Source-level SSR acceptance. No build, server, install or external requests.
// Run: node --test scripts/test-services-content.mjs
// Uses actual page, metadata, content and artwork modules. Only CSS is ignored
// by the existing SWC loader; this does not replace final Next/browser QA.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { loadSource } from './test-service-art.mjs';
import nextConfig from '../next.config.mjs';

// Outside the Next compiler, Link needs the real app's trailing-slash policy.
if (nextConfig.trailingSlash) process.env.__NEXT_TRAILING_SLASH = 'true';
else delete process.env.__NEXT_TRAILING_SLASH;

const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const render = (Component, props = {}) => renderToStaticMarkup(React.createElement(Component, props));
const text = html => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const includesText = (html, expected) => assert(text(html).includes(expected), `Missing rendered text: ${expected}`);
function checkHeading(html, expected) {
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1, 'Exactly one H1');
  assert.equal(text(headings[0][1]), expected, 'H1 retains explicit sentence spacing');
}
function checkFaqs(html, items, expectedCount) {
  assert.equal(items.length, expectedCount);
  const details = [...html.matchAll(/<details\b[^>]*class="service-faq-item"[^>]*>([\s\S]*?)<\/details>/g)];
  assert.equal(details.length, expectedCount, 'Native FAQ details count');
  for (const [index, item] of items.entries()) {
    assert(details[index][1].includes('<summary'), 'Native summary remains keyboard-operable');
    includesText(details[index][1], item.question);
    includesText(details[index][1], item.answer);
  }
}
function checkClaims(html) {
  const visible = text(html);
  assert(!/laypeople|regional established|established[- ]SMB|10x|guaranteed (?:revenue|ROI|rankings)|100% secure|risk-free|\$500/i.test(visible), 'No banned targeting, guarantees or booking price');
  assert(!/href="https:\/\/(?:calendly|buy\.stripe)/.test(html), 'Service CTAs stay on the existing contact/book routes');
}

// Vertical slice 1: beginner-to-intermediate learning, real examples, FAQs and CTA.
test('AI Training renders the full learning and review journey', () => {
  const page = loadSource('src/app/ai-training/page.js');
  const { DOMAINS } = loadSource('src/content/site.js');
  const { AI_FAQS, DOMAIN_PRACTICE } = loadSource('src/content/services.js');
  const html = render(page.default);
  checkHeading(html, 'AI training. For the work that matters.');
  assert.equal(page.metadata.title.absolute, 'Practical AI Training for Business Teams | Saleslights');
  assert.equal(page.metadata.alternates.canonical, '/ai-training/');
  assert.equal(DOMAIN_PRACTICE.length, 10);
  assert.deepEqual(DOMAIN_PRACTICE.map(item => item.key).sort(), DOMAINS.map(item => item.key).sort());
  assert.equal(new Set(DOMAIN_PRACTICE.map(item => item.key)).size, 10);
  assert.equal([...html.matchAll(/<details\b[^>]*class="service-workflow"/g)].length, 10, 'Ten compact expandable examples');
  for (const domain of DOMAINS) {
    includesText(html, domain.name);
    const practice = DOMAIN_PRACTICE.find(item => item.key === domain.key);
    for (const field of ['exercise', 'artifact', 'review']) {
      assert.equal(typeof practice[field], 'string');
      assert(practice[field].length > 20, `Substantive ${field} for ${domain.key}`);
      includesText(html, practice[field]);
    }
  }
  assert.match(html, /class="sl-training-map /, 'Actual ten-domain infographic is rendered');
  assert.match(html, /class="sl-service-study sl-training-study /, 'Actual sculpture is rendered');
  assert.match(html, /<figcaption\b/, 'Artwork has meaningful HTML context');
  for (const expected of ['No coding required.', 'beginner', 'intermediate', 'review and rework', 'approved data', 'prompt injection', 'incident summary', 'variance', 'OpenAI Academy', 'Microsoft Learn']) includesText(html, expected);
  checkFaqs(html, AI_FAQS, 7);
  for (const href of ['/contact/?topic=ai-training', '#workflow-examples', '/software-development/', '/training/', '/revenue-infrastructure/']) assert(html.includes(`href="${href}"`), `Real link: ${href}`);
  assert(!/\$\d/.test(text(html)), 'No invented training price');
  checkClaims(html);
});

// Vertical slice 2: the named engineering pair, delivery gates and monthly offer.
test('Software Development renders the paired model and bounded monthly offer', () => {
  const page = loadSource('src/app/software-development/page.js');
  const { SOFTWARE_FAQS, SOFTWARE_TIERS } = loadSource('src/content/services.js');
  const { IS_PRODUCTION } = loadSource('src/lib/env.js');
  const html = render(page.default);
  checkHeading(html, 'Software development. Built for growth.');
  assert.equal(page.metadata.title.absolute, 'Custom Software Development & FDE | Saleslights');
  assert.equal(page.metadata.alternates.canonical, '/software-development/');
  assert.match(html, /class="sl-service-study sl-development-study /, 'Actual paired sculpture is rendered');
  for (const expected of ['Nick Krause', 'Forward-deployed engineer', 'Full-stack software engineer', 'reviewed code', 'client decision owner', 'short feedback loops', 'staging', 'authorized release', 'source code', 'third-party', 'pre-existing', 'monetization', 'billing', 'conversion', 'rollback', 'least privilege', 'authorization outside the model', 'prompt injection', 'spend limits', 'audit', 'stop']) includesText(html, expected);
  assert.deepEqual(SOFTWARE_TIERS.map(({ name, price }) => [name, price]), [
    ['Small business', '$5,999–$13,999'], ['Midmarket', 'from $18,999'], ['Enterprise', 'from $29,999'],
  ]);
  const pricing = html.match(/<section\b[^>]*id="software-pricing"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert(pricing, 'Visible pricing section');
  for (const tier of SOFTWARE_TIERS) {
    includesText(pricing, tier.name);
    assert(pricing.includes(`class="service-price-amount">${tier.price}</span>`), 'Exact unbroken price amount');
  }
  assert.equal([...pricing.matchAll(/class="service-price-unit">per month<\/span>/g)].length, 3, 'Monthly units have their own label');
  includesText(pricing, 'Pricing is subject to change based on scope. Capacity, delivery cadence and final fees are agreed in the statement of work. Hosting, software and model/API usage are separate unless included.');
  assert.equal(text(pricing).includes('For review: midmarket and enterprise starting prices are proposed.'), !IS_PRODUCTION, 'Proposed-price note is staging-only');
  checkFaqs(html, SOFTWARE_FAQS, 8);
  for (const href of ['/contact/?topic=software-development', '/ai-training/', '/gtm-engine/']) assert(html.includes(`href="${href}"`), `Real link: ${href}`);
  assert(!/two (?:dedicated )?full-time (?:dedicated )?engineers (?:are |is )?included/i.test(text(html)), 'No full-time-pair promise');
  checkClaims(html);
});

// Vertical slice 3: compact, distinct homepage entries with real art and links.
test('Homepage service sections compose with both pages without duplicate IDs', () => {
  const Overview = loadSource('src/components/ServiceOverview.js').default;
  const html = render(Overview);
  assert.equal([...html.matchAll(/<section\b/g)].length, 2);
  assert.equal([...html.matchAll(/<h2\b/g)].length, 2);
  assert(!/<h1\b/.test(html), 'Overview does not compete with homepage H1');
  for (const route of ['ai-training', 'software-development']) {
    const section = html.match(new RegExp(`<section\\b[^>]*id="${route}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1];
    assert(section, `Distinct homepage section: ${route}`);
    assert(section.includes(`href="/${route}/"`), `Descriptive service CTA: ${route}`);
    assert.match(section, /<svg\b[^>]*aria-hidden="true"/, 'Original sculpture stays decorative');
    assert.match(section, /<figcaption\b/, 'HTML caption provides context');
  }
  checkClaims(html);
  const together = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Overview),
    React.createElement(loadSource('src/app/ai-training/page.js').default),
    React.createElement(loadSource('src/app/software-development/page.js').default),
  ));
  const ids = [...together.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert(ids.length > 0);
  assert.equal(new Set(ids).size, ids.length, 'Overview and both pages have unique IDs in one React tree');
  for (const [, id] of together.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(id), `Paint reference resolves: ${id}`);
  for (const [, label] of together.matchAll(/aria-labelledby="([^"]+)"/g)) {
    for (const id of label.split(' ')) assert(ids.includes(id), `Accessible figure name resolves: ${id}`);
  }
});

// Shared-component edge cases supplement the real-page integration assertions.
test('FAQ and closing components preserve caller content and native controls', () => {
  const FAQ = loadSource('src/components/ServiceFAQ.js').default;
  assert.equal([...render(FAQ).matchAll(/<details\b/g)].length, 0, 'Empty FAQ input is valid');
  const items = [{ question: 'Who checks A & B?', answer: 'A named owner checks the output before it is used.' }];
  checkFaqs(render(FAQ, { items }), items, 1);
  const Closing = loadSource('src/components/ServiceClosing.js').default;
  const html = render(Closing, { topic: 'software-development', title: 'A useful next step.', text: 'Bring the workflow to the conversation.', cta: 'Discuss the workflow' });
  for (const expected of ['A useful next step.', 'Bring the workflow to the conversation.', 'Discuss the workflow']) includesText(html, expected);
  assert(html.includes('href="/contact/?topic=software-development"'));
  assert(html.includes('href="/book/"'));
  checkClaims(html);
});

test('Service stylesheet parses without leaking rules into existing pages', () => {
  const postcss = require('postcss');
  const css = postcss.parse(readFileSync(new URL('../src/app/services.css', import.meta.url), 'utf8'));
  let rules = 0;
  css.walkRules(rule => {
    rules++;
    assert(rule.selector.split(',').every(selector => selector.trim().startsWith('.service-')), `Unscoped service selector: ${rule.selector}`);
  });
  assert(rules > 0);
  let unbrokenPrices = false;
  css.walkRules('.service-price-amount', rule => rule.walkDecls('white-space', declaration => {
    if (declaration.value === 'nowrap') unbrokenPrices = true;
  }));
  assert(unbrokenPrices, 'Amounts do not wrap away from their currency/range');
});
