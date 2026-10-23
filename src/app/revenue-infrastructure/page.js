import Link from 'next/link';
import EngineDiagram from '../../components/EngineDiagram';
import Closing from '../../components/Closing';
import JsonLd, { ORG_ID } from '../../components/JsonLd';
import { DOMAINS, TIERS } from '../../content/site';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/revenue-infrastructure/');

const BUILDS = [
  ['GTM Strategy + Implementation', '$15K–$30K', 'ICP, positioning, messaging, sales process, data and CRM architecture, KPIs and a 90-day operating roadmap.'],
  ['ICP + B2B Data Engineering', '$7.5K–$20K', 'A scored account universe with buying committees, signals and a CRM-ready dataset — not a list of email addresses.'],
  ['Outbound Sales & Messaging', '$10K–$20K', 'Personas, research, email, LinkedIn and phone messaging, sequences, triggers and rep workflows.'],
  ['Sales Playbook & Enablement', '$10K–$25K', 'Discovery, qualification, objections, battlecards, deal stages and onboarding your team will actually use.'],
  ['AI RevOps & Sales Automation', '$15K–$35K+', 'CRM hygiene, enrichment, scoring and routing, AI research, alerts, dashboards and next-action logic.'],
  ['Enterprise transformation', '$50K–$100K+', 'Any of the above across business units, geographies and buying committees, with security, procurement and governance.'],
];

export default function RevenueInfrastructure() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">The Master Revenue Engine</p>
          <h1>Revenue infrastructure</h1>
          <p className="lede">The systems behind a revenue team: who to pursue, what to say, how to reach them, what happened and what to do next — connected, measured and owned by you.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap split">
          <EngineDiagram />
          <div className="copy">
            <p className="eyebrow">Architecture</p>
            <h2>Ten domains. One brain.</h2>
            <p className="lede">Every domain writes to and reads from the same engine, so a signal in one place changes what happens in the next.</p>
            <p className="muted">Humans approve what ships. Agents do the research, orchestration and reporting inside the systems you permit. Your data stays isolated to your account.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">The architecture we implement</p>
          <div className="domains" style={{ marginTop: 32 }}>
            {DOMAINS.map((d, i) => (
              <div className="domain" key={d.key} id={d.key}>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.name}</h3>
                <p className="out">{d.outcome}</p>
                <ul>{d.functions.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="footnote">Every engagement is scoped to the domains you need. Start with the three or four that matter most; the written scope says exactly what each one delivers.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">Pricing by company size</p>
          <h2 style={{ maxWidth: '18ch', marginTop: 24 }}>Implementation, then ongoing support.</h2>
          <div className="tiers">
            {TIERS.map((t) => (
              <div className="tier" key={t.id} id={t.id}>
                <h3>{t.name}</h3>
                <p className="who">{t.who}</p>
                <div className="divider" />
                <div><p className="label">Implementation</p><p className="amt">{t.implementation}</p><p className="note">{t.implementationNote}</p></div>
                <div><p className="label">Ongoing support · per month</p><p className="amt">{t.support}</p><p className="note">{t.supportNote}</p></div>
              </div>
            ))}
          </div>
          <p className="footnote">Estimates in U.S. dollars. A written scope and fixed price follow discovery. Implementations are finite projects with deliverables and a finish line, and you keep everything built. Ongoing operation is optional: the <Link href="/gtm-engine/">GTM Engine &amp; Sales Professional</Link> program, or a lighter support scope agreed separately.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Implementation builds</p>
          <div className="offers">
            {BUILDS.map(([h, p, d]) => <div className="offer" key={h}><h3>{h}</h3><p>{d}</p><span className="amt">{p}</span></div>)}
          </div>
        </div>
      </section>

      <Closing title="Scope your engine." text="Start with an hour with Nick, or send us the outline and we will come back with a scope." />
      <JsonLd data={{
        '@type': 'Service', name: 'Revenue infrastructure implementation', serviceType: 'Revenue operations and go-to-market engineering', provider: { '@id': ORG_ID }, url: absolute('/revenue-infrastructure/'),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Implementation builds', itemListElement: BUILDS.map(([h]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: h } })) },
      }} />
    </>
  );
}
