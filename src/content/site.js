/* Single source of truth for public copy, prices and offers.
   Every price below traces to research/truth/pricing-evidence.json:
   - $250 session: live Stripe product (verified 2026-10-23).
   - Retainer range: Nick's instruction, 2026-10-23.
   - Implementation ranges: Saleslights master brand & offer architecture (owner targets).
   - Per-tier ongoing support: positions within the owner's retainer range; no sub-bands invented. */

export const SITE_NAME = 'Saleslights';

import { IS_PRODUCTION } from '../lib/env';

export const LINKS = {
  bookCheckout: 'https://buy.stripe.com/9B6eVefjlfZQcZw7OHcZa01',
  bookCheckoutTest: 'https://buy.stripe.com/test_3cI8wQ9Z19Bs1gO5GzcZa00',
  calendarAfterPayment: 'https://calendly.com/nkrause-tvw8/book-time-with-nick',
  introCall: 'https://calendly.com/nkrause-tvw8/saleslights-nick-30-min',
  linkedin: 'https://www.linkedin.com/in/nicholas-krause',
  email: 'sales@saleslights.com',
  sherpaAcquisition: 'https://www.cmswire.com/the-wire/adrem-systems-corporation-strengthens-its-compliance-and-cybersecurity-portfolio-with-acquisition-of-sherpa/',
};

/* Live Stripe link only on the production build; staging reviewers get test mode. */
export const CHECKOUT_URL = IS_PRODUCTION ? LINKS.bookCheckout : LINKS.bookCheckoutTest;

export const NAV = [
  { href: '/gtm-engine/', label: 'GTM Engine' },
  { href: '/revenue-infrastructure/', label: 'Revenue Infrastructure' },
  { href: '/training/', label: 'Training' },
  { href: '/lab/', label: 'AI Lab' },
  { href: '/about/', label: 'About' },
];

export const BOOK = {
  name: 'Book Time With Nick',
  duration: '1 hour',
  price: '$250',
  summary:
    'A focused working session with Nick Krause on go-to-market strategy, revenue infrastructure, sales execution or AI-enabled growth systems.',
  steps: [
    'Pay securely through Stripe.',
    'You are taken straight to Nick’s calendar to choose a time.',
    'Bring the problem. Leave with a point of view and next steps.',
  ],
  goodFor: [
    'Pressure-testing a go-to-market plan before you hire or spend',
    'Diagnosing why outbound, calls or pipeline have stalled',
    'Scoping an AI, RevOps or automation build',
    'Deciding whether a Saleslights engagement is the right fit',
  ],
};

export const RETAINER = {
  name: 'Saleslights - GTM Engine & Sales Professional',
  priceRange: '$5,999–$13,999',
  cadence: 'per month',
  priceNote: 'Depends on company size, markets and scope. Larger programs can be more.',
  promise:
    'The full Saleslights GTM engine, operated for you, plus an actual sales professional in market.',
  includes: [
    ['A dedicated, U.S.-based sales professional', 'Calls, LinkedIn, prospecting, events and meeting generation alongside Nick.'],
    ['Nick as sales engineering and strategic lead', 'Executive meetings, account strategy, complex deals and campaign direction.'],
    ['The Master Revenue Engine', 'Radar signals, the prospecting engine, campaigns, analytics and reporting run as one system.'],
    ['Top-down and bottom-up account coverage', 'Decision-makers, growth accounts and technical champions, worked in parallel.'],
    ['Founder-led authority', 'Articles and co-created video, edited and distributed across your channels.'],
    ['Multichannel outreach', 'Phone, email across parallel domains, and LinkedIn — coordinated, not stacked.'],
    ['Search for humans and machines', 'SEO, AI search, answer-engine and generative-engine optimisation.'],
    ['Your stack, your data', 'We work in Salesforce, HubSpot, Apollo and the tools you already own. Platforms, data and IP stay yours.'],
  ],
  fit: 'Built for B2B companies with a product that works and a pipeline that does not yet match it.',
  terms: 'Initial three-month commitment. No guaranteed meeting or revenue figures — we commit to the work, the cadence and the reporting.',
};

export const TIERS = [
  {
    id: 'smb',
    name: 'Small business',
    who: 'Founder-led teams, first sellers, one core motion.',
    implementation: '$7.5K–$20K',
    implementationNote: 'Focused builds: ICP & data, outbound system or sales training.',
    support: 'from $5,999',
    supportNote: 'Ongoing operation through the GTM Engine retainer.',
  },
  {
    id: 'midmarket',
    name: 'Midmarket',
    who: 'Multiple segments or sellers, a CRM that needs to become a system.',
    implementation: '$15K–$35K+',
    implementationNote: 'GTM strategy & implementation, or an AI RevOps & automation build.',
    support: '$5,999–$13,999',
    supportNote: 'Set by scope within the GTM Engine range.',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    who: 'Business units, geographies, buying committees, governance.',
    implementation: '$50K–$100K+',
    implementationNote: 'Transformation-scale programs with security, procurement and change management.',
    support: 'from $13,999',
    supportNote: 'Scoped individually; larger programs can be more.',
  },
];

/* The Master Revenue Engine, by domain. Mirrors the Master Engine re-design. */
export const DOMAINS = [
  { key: 'signal', name: 'Lead Generation', outcome: 'Know who to pursue next.', functions: ['Radar: intent, demand signals, priority leads', 'Prospecting engine: ICP-built, enriched lead generation'] },
  { key: 'ops', name: 'Operations', outcome: 'One accountable cadence.', functions: ['Master task management with owners, dates and blockers', 'Weekly operating review'] },
  { key: 'campaigns', name: 'Campaigns', outcome: 'Reach people properly.', functions: ['Email', 'LinkedIn messaging', 'Direct mail and physical campaigns', 'Cold-calling suite with daily lists'] },
  { key: 'search', name: 'Website & Search', outcome: 'Be found — and cited.', functions: ['SEO', 'AI search', 'Answer-engine optimisation (AEO)', 'Generative-engine optimisation (GEO)'] },
  { key: 'cx', name: 'UX & CX', outcome: 'Convert and keep.', functions: ['Customer-experience dashboard', 'Lifecycle email'] },
  { key: 'paid', name: 'Paid Acquisition', outcome: 'Buy attention with control.', functions: ['Meta Ads', 'Google Ads'] },
  { key: 'analytics', name: 'Lead Magnets & Analytics', outcome: 'Measure what converts.', functions: ['Landing pages', 'GA4 and Tag Manager funnel analytics'] },
  { key: 'authority', name: 'Content & Authority', outcome: 'Earn trust before the call.', functions: ['Social listening', 'Content calendar and production', 'Thought leadership and blog'] },
  { key: 'field', name: 'Field Marketing', outcome: 'Be in the room.', functions: ['Event research and planning', 'In-market representation'] },
  { key: 'finance', name: 'Finance', outcome: 'See revenue and spend clearly.', functions: ['Monthly master finance tracker'] },
];

export const LOOP = [
  ['Engineer', 'ICPs, segments, triggers and the buying committee.'],
  ['Create authority', 'Founder-led content, proof and premium assets.'],
  ['Activate', 'Phone, email, LinkedIn, field and partner motions.'],
  ['Learn', 'What buyers say on calls feeds next week’s targeting, messaging and workflows.'],
];

export const TRAINING = [
  {
    name: 'Cold Call & Objection Training',
    price: '$7.5K–$15K',
    detail: 'Call audit, opener and value-proposition redesign, an objection system, live role-play and recording review — with scripts and a manager guide your team keeps.',
  },
  {
    name: 'Sales Team Performance Training',
    price: '$7.5K–$15K',
    detail: 'Discovery, qualification and follow-up for account executives and SDRs, coached against your real calls rather than a generic curriculum.',
  },
  {
    name: 'Enterprise Performance Transformation',
    price: '$50K–$100K',
    detail: 'Cross-team call analysis, top-performer behaviours, coaching systems, manager enablement and certification.',
  },
];

export const TRIAD = [
  ['Nick Krause', 'Founder. Strategy, sales engineering and the client relationship.'],
  ['The Saleslights platform', 'Agentic GTM engine: signals, prospecting, campaigns, analytics and reporting.'],
  ['The delivery team', 'Operations and full-stack engineering that make the system run in your stack.'],
];

export const LADDER = [
  ['Book an hour', '$250', '/book/'],
  ['Implement the system', 'from $7.5K', '/revenue-infrastructure/'],
  ['Run it with us', 'from $5,999 / mo', '/gtm-engine/'],
];
