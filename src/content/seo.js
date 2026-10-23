/* Per-route SEO contract. scripts/verify-routes.mjs asserts rendered HTML
   against this table: status, one H1, title, description and canonical. */
export const PAGES = {
  '/': { title: 'Saleslights — Revenue infrastructure, built and operated', h1: 'Revenue infrastructure. Built and operated.' },
  '/gtm-engine/': {
    title: 'GTM Engine & Sales Professional — managed GTM with a rep in market',
    description: 'Saleslights runs your full GTM engine and puts a dedicated U.S.-based sales professional in market alongside founder Nick Krause. $5,999–$13,999 per month by company size.',
    h1: 'GTM Engine & Sales Professional',
  },
  '/revenue-infrastructure/': {
    title: 'Revenue Infrastructure — the Master Revenue Engine, implemented',
    description: 'The Master Revenue Engine architecture Saleslights implements — signals, prospecting, campaigns, search, CX, paid, analytics, content, field and finance — with SMB, midmarket and enterprise pricing.',
    h1: 'Revenue infrastructure',
  },
  '/training/': {
    title: 'Sales & Cold Call Training for B2B Teams',
    description: 'Cold call and objection training, sales team performance coaching and enterprise enablement, run by Saleslights founder Nick Krause against your real calls.',
    h1: 'Sales and cold-call training',
  },
  '/book/': {
    title: 'Book Time With Nick — one-hour GTM working session ($500)',
    description: 'Pay $500 and book a one-hour working session with Saleslights founder Nick Krause on go-to-market strategy, revenue infrastructure, sales execution or AI growth systems.',
    h1: 'Book time with Nick',
  },
  '/about/': {
    title: 'About Nick Krause and Saleslights',
    description: 'Saleslights is led by founder Nick Krause, supported by an agentic GTM platform and a delivery team of operations and full-stack engineering.',
    h1: 'Founder‑led. System‑backed.',
  },
  '/lab/': {
    title: 'The Saleslights AI Lab — revenue systems field notes',
    description: 'Thought leadership, video and working notes from Saleslights on GTM engineering, AI revenue infrastructure, selling and search. Subscribe to the letter.',
    h1: 'The AI Lab',
  },
  '/contact/': {
    title: 'Contact Saleslights',
    description: 'Tell Saleslights about your go-to-market, revenue infrastructure or training project, or book a paid hour with Nick Krause.',
    h1: 'Tell us what you are building.',
  },
  '/privacy/': { title: 'Privacy', description: 'How Saleslights handles information submitted through saleslights.com.', h1: 'Privacy' },
  '/terms/': { title: 'Website terms', description: 'Terms for using saleslights.com and purchasing a session with Nick Krause.', h1: 'Website terms' },
};

export function pageMeta(path) {
  const p = PAGES[path];
  return {
    title: { absolute: p.title.includes('Saleslights') ? p.title : `${p.title} | Saleslights` },
    description: p.description,
    alternates: { canonical: path },
    openGraph: { title: p.title, description: p.description, url: path },
  };
}
