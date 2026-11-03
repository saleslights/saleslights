import Link from 'next/link';
import Closing from '../../components/Closing';
import { pageMeta } from '../../content/seo';

export const metadata = pageMeta('/venture-partnerships/');

const PORTFOLIO = [
  ['FindUrLawyer', 'A legal marketplace focused on trust and matching.'],
  ['Sherpa', 'GovCon cybersecurity and CUI enclave development.'],
  ['InfernoBlue', 'Security expertise and resident AI security operations.'],
  ['VideoFunker', 'Video creation connected to sales and marketing work.'],
];

export default function VenturePartnerships() {
  return (
    <>
      <section className="page-head venture-head">
        <div className="wrap">
          <p className="eyebrow">Saleslights · AI-native venture operator · Venture partnerships</p>
          <h1>Great founders. Domain expertise. One shared operating engine.</h1>
          <p className="lede">For domain founders building businesses where trust, expertise and customer relationships matter.</p>
          <p className="venture-alignment">We seek long-term alignment through negotiated equity partnerships. Structure and scope are agreed with each founder.</p>
          <div className="actions"><Link className="button" href="/contact/">Talk about a partnership</Link></div>
        </div>
      </section>
      <section className="section white">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">How we operate</p>
            <h2>AI executes defined work. People own the decisions.</h2>
            <p className="lede">We combine company building, hands-on operation and a shared AI operating engine.</p>
          </div>
          <div className="copy">
            <p>We begin with go-to-market: finding the market, building demand, coordinating execution and learning from results. Our ambition is to help small teams operate substantial businesses—not just complete more tasks.</p>
            <p>Shared playbooks and infrastructure support the work; company data and permissions stay separate. Models and agent frameworks are inputs to the operating system, not inventions we claim to own.</p>
          </div>
        </div>
        <div className="wrap">
          <ol className="venture-loop" aria-label="Operating loop">
            {['Context', 'Priorities', 'Bounded execution', 'Human review', 'Measured results'].map((item, i) => <li key={item}><span className="n">0{i + 1}</span><span>{item}</span></li>)}
          </ol>
          <p className="footnote">Shared playbooks and infrastructure; separate company data and permissions.</p>
        </div>
      </section>
      <section className="section soft">
        <div className="wrap split top">
          <div className="copy"><p className="eyebrow">Businesses in our operating work</p><h2>Different domains. A common operating discipline.</h2></div>
          <div className="venture-portfolio">
            {PORTFOLIO.map(([name, description]) => <article key={name}><h3>{name}</h3><p className="muted">{description}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section white">
        <div className="wrap split top">
          <div className="copy"><p className="eyebrow">GTM Engine</p><h2>Revenue infrastructure, built and operated for your business.</h2><p className="lede">The commercial GTM offer remains available to companies that want operating support without a venture partnership.</p></div>
          <div className="copy"><p>Implementation, training, development and booking remain part of the existing Saleslights offer.</p><div className="actions"><Link className="text-link" href="/gtm-engine/">Explore the GTM Engine</Link><Link className="text-link" href="/contact/">Contact Saleslights</Link></div></div>
        </div>
      </section>
      <Closing title="Building in a domain you know deeply?" text="Tell us about the business, the customer and the work ahead." contactFirst />
    </>
  );
}
