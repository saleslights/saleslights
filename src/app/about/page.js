import Image from 'next/image';
import Link from 'next/link';
import TriadDiagram from '../../components/TriadDiagram';
import Closing from '../../components/Closing';
import JsonLd, { ORG_ID, PERSON_ID } from '../../components/JsonLd';
import { LINKS, TRIAD } from '../../content/site';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/about/');

const DISCIPLINES = ['Go-to-market engineering', 'Revenue systems', 'Intent and demand signals', 'Content and authority', 'Agentic AI orchestration', 'Full-stack engineering', 'Security and compliance'];

export default function About() {
  return (
    <>
      <section className="page-head about-head">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">About</p>
            <h1>Founder‑led. System‑backed.</h1>
            <p className="lede">Saleslights is Nick Krause, the Saleslights GTM platform and a delivery team working the same account at the same time.</p>
          </div>
          <div>
            <div className="portrait"><Image src="/media/nick-krause-founder.webp" alt="Nick Krause" width={671} height={1200} sizes="(max-width: 900px) 80vw, 40vw" priority /></div>
            <p className="portrait-caption">Nick Krause, founder</p>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">Nick Krause</p>
            <h2>A seller who builds the system.</h2>
          </div>
          <div className="copy">
            <p className="lede">Nick helps companies move their product forward and make the impressions that generate revenue.</p>
            <p>His career runs through senior sales engineering and quota-carrying roles — leading opportunity meetings with deep technical expertise while account teams managed the stakeholders. He founded Sherpa to help government contractors navigate cybersecurity compliance; a February 2024 announcement reported AdRem Systems’ acquisition of Sherpa assets and named Nick as Sherpa’s former CEO and founder of Saleslights.</p>
            <p>Today he leads Saleslights from New York: GTM strategy and sales engineering for clients, in-market representation, and the agentic engineering behind the Saleslights platform, which also runs go-to-market for portfolio companies including FindUrLawyer, VideoFunker and InfernoBlue.</p>
            <p>He works in English, Spanish and Portuguese.</p>
            <ul className="disciplines">
              {DISCIPLINES.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p><a className="text-link" href={LINKS.sherpaAcquisition} rel="noopener">Read the acquisition announcement</a> · <a className="text-link" href={LINKS.linkedin} rel="noopener">LinkedIn</a></p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap split">
          <div className="copy">
            <p className="eyebrow">How the work is done</p>
            <h2>A triad, not a hand-off.</h2>
            <div className="triad-list">
              {TRIAD.map(([h, p]) => <div key={h}><h3>{h}</h3><p className="muted" style={{ marginTop: 6 }}>{p}</p></div>)}
            </div>
          </div>
          <div><TriadDiagram /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Principles</p>
          <div className="history">
            <article><h3>Pipeline, not advice.</h3><p className="muted">We build the system and run it. Strategy that never meets a buyer is a document.</p></article>
            <article><h3>People sell. Systems scale them.</h3><p className="muted">Agents research, orchestrate and report. Humans hold the relationship and the judgment.</p></article>
            <article><h3>Yours to keep.</h3><p className="muted">Your data, platforms and deliverables stay with you. Your private information stays isolated to your account.</p></article>
          </div>
          <p className="footnote">Career history describes Nick’s own background. Portfolio companies are businesses Saleslights operates go-to-market for; they are not presented as client testimonials.</p>
        </div>
      </section>

      <Closing title="Meet Nick." text="One paid hour. Bring the problem; leave with a point of view." />
      <JsonLd data={{
        '@type': 'Person', '@id': PERSON_ID, name: 'Nick Krause', jobTitle: 'Founder', worksFor: { '@id': ORG_ID }, url: absolute('/about/'),
        image: absolute('/media/nick-krause-founder.webp'), sameAs: [LINKS.linkedin], knowsLanguage: ['en', 'es', 'pt'], knowsAbout: DISCIPLINES,
      }} />
    </>
  );
}
