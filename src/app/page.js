import Link from 'next/link';
import Image from 'next/image';
import EngineDiagram from '../components/EngineDiagram';
import TriadDiagram from '../components/TriadDiagram';
import LampStudy from '../components/art/LampStudy';
import Closing from '../components/Closing';
import Subscribe from '../components/Subscribe';
import ServiceOverview from '../components/ServiceOverview';
import { BOOK, LADDER, RETAINER } from '../content/site';
import { POSTS } from '../content/posts';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="wrap hero-grid">
          <div className="hero-title">
            <p className="eyebrow">Saleslights · New York</p>
            <h1><span className="line">Revenue infrastructure.</span>{' '}<span className="line">Built and operated<span className="lamp-stop" aria-hidden="true"></span><span className="sr-only">.</span></span></h1>
          </div>
          <div className="hero-art-slot" aria-hidden="true"><LampStudy /></div>
          <div className="hero-copy">
            <p className="lede">We build the system that finds, reaches and wins your buyers — then run it with you, with a real sales professional in market.</p>
            <div className="actions">
              <Link className="button" href="/book/">{BOOK.cta}</Link>
              <Link className="text-link" href="/gtm-engine/">See the GTM Engine</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="entry-index">
            <p className="eyebrow">Three ways in</p>
            <div className="ladder">
              {LADDER.map(([t, p, href], i) => (
                <Link key={href} href={href}>
                  <span className="n">0{i + 1}</span><span className="t">{t}</span><span className="p">{p}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section white" id="services">
        <div className="wrap split">
          <div className="copy">
            <p className="eyebrow">The Master Revenue Engine</p>
            <h2>One brain. Every revenue function connected to it.</h2>
            <p className="lede">Signals, prospecting, campaigns, search, analytics, content and field work run as one system — not ten tools and a spreadsheet.</p>
            <p><Link className="text-link" href="/revenue-infrastructure/">See the architecture and pricing</Link></p>
          </div>
          <EngineDiagram />
        </div>
      </section>

      <section className="section home-offer">
        <div className="wrap split">
          <div className="copy">
            <p className="eyebrow">Our core offer</p>
            <h2>{RETAINER.name.replace('Saleslights - ', '')}</h2>
            <p className="lede">{RETAINER.promise}</p>
            <p className="price">{RETAINER.priceRange}<small>{RETAINER.cadence}</small></p>
            <p className="muted">{RETAINER.priceNote}</p>
            <p><Link className="text-link" href="/gtm-engine/">What is included</Link></p>
          </div>
          <div className="copy">
            <TriadDiagram />
            <p className="muted diagram-caption">Nick, the platform and the delivery team — working on your account at the same time.</p>
          </div>
        </div>
      </section>

      <ServiceOverview />

      <section className="section white home-founder" id="founder">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">Founder-led</p>
            <h2>Senior judgment on every account.</h2>
            <p className="lede">Nick Krause has carried quota, worked in senior sales engineering and founded Sherpa, a compliance company whose assets AdRem Systems acquired. He is in the work, not above it.</p>
            <p><Link className="text-link" href="/about/">About Nick and the team</Link></p>
          </div>
          <div>
            <div className="portrait"><Image src="/media/nick-krause-founder.webp" alt="Nick Krause, founder of Saleslights" width={671} height={1200} sizes="(max-width: 900px) 80vw, 40vw" priority /></div>
          </div>
        </div>
      </section>

      <section className="section" id="studio">
        <div className="wrap">
          <div className="split top">
            <div className="copy">
              <p className="eyebrow">The AI Lab</p>
              <h2>Field notes from the system.</h2>
            </div>
            <div className="copy">
              <p className="lede">What we learn building and running revenue engines, written down. Join the letter.</p>
              <Subscribe source="home" />
            </div>
          </div>
          <div className="post-list">
            {POSTS.map((p) => (
              <Link key={p.slug} href={`/lab/${p.slug}/`}>
                <span className="eyebrow">{p.kind}</span>
                <span><h3>{p.title}</h3><p style={{ marginTop: 10 }}>{p.dek}</p></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id="contact"><Closing /></div>
    </>
  );
}
