import Link from 'next/link';
import Closing from '../../components/Closing';
import TriadDiagram from '../../components/TriadDiagram';
import JsonLd, { ORG_ID } from '../../components/JsonLd';
import { RETAINER, LOOP } from '../../content/site';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/gtm-engine/');

const FAQ = [
  ['How much does Saleslights - GTM Engine & Sales Professional cost?', 'Between $5,999 and $13,999 per month, depending on company size, markets and scope. Larger programs can cost more. Pricing is agreed before any work starts.'],
  ['Is the sales professional a real person?', 'Yes. Each program includes a dedicated, U.S.-based sales professional who makes calls, works LinkedIn, attends events and books meetings, alongside Nick as sales engineering lead. AI does the research and orchestration; people sell.'],
  ['Do you guarantee meetings or revenue?', 'No. We commit to the work, the cadence and weekly reporting, and to tuning the system every week. Anyone guaranteeing revenue from outbound is pricing in a promise they cannot control.'],
  ['Who owns the data and systems?', 'You do. We work inside your CRM and tools where possible, and the platforms, data, prospect intelligence and deliverables built for you remain yours.'],
  ['How long is the commitment?', 'An initial three months, then month to month with 30 days’ notice.'],
];

export default function GtmEngine() {
  return (
    <>
      <section className="page-head offer-head">
        <div className="wrap">
          <p className="eyebrow">Our core offer</p>
          <h1>GTM Engine &amp; Sales Professional</h1>
          <p className="lede">{RETAINER.promise}</p>
          <div className="price-hero">
            <p className="price">{RETAINER.priceRange}<small>{RETAINER.cadence}</small></p>
            <div>
              <p>{RETAINER.priceNote}</p>
              <p className="muted" style={{ marginTop: 12 }}>{RETAINER.fit}</p>
              <div className="actions" style={{ marginTop: 28 }}>
                <Link className="button" href="/contact/?topic=gtm-engine">Scope a program</Link>
                <Link className="text-link" href="/book/">Start with a paid hour</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">What is included</p>
          <h2 style={{ maxWidth: '16ch', marginTop: 24 }}>A full revenue team, minus the hiring.</h2>
          <div className="includes">
            {RETAINER.includes.map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
          <p className="footnote">{RETAINER.terms} Physical mailers, gifts, paid media spend and third-party data are billed at cost when approved.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="copy">
            <p className="eyebrow">How it is staffed</p>
            <h2>Three parts, one account.</h2>
            <p className="lede">Nick sets direction and leads the hard conversations. The platform finds and orchestrates. The team operates and engineers.</p>
          </div>
          <TriadDiagram />
        </div>
        <div className="wrap">
          <div className="loop">
            {LOOP.map(([h, p], i) => <div key={h}><span className="n">0{i + 1}</span><h3>{h}</h3><p className="muted">{p}</p></div>)}
          </div>
          <p className="footnote">You approve what ships. The engine makes each next decision better.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap split top">
          <div><p className="eyebrow">Questions</p><h2 style={{ marginTop: 24 }}>Straight answers.</h2></div>
          <div className="includes" style={{ marginTop: 0 }}>
            {FAQ.map(([q, a]) => <div key={q} style={{ gridTemplateColumns: '1fr' }}><h3>{q}</h3><p>{a}</p></div>)}
          </div>
        </div>
      </section>

      <Closing title="See if it fits in an hour." />
      <JsonLd data={{
        '@type': 'Service', name: RETAINER.name, serviceType: 'Managed go-to-market and outsourced sales', provider: { '@id': ORG_ID }, areaServed: 'US', url: absolute('/gtm-engine/'),
        offers: { '@type': 'Offer', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: 5999, maxPrice: 13999, priceCurrency: 'USD', unitText: 'MONTH' } },
      }} />
      <JsonLd data={{ '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
    </>
  );
}
