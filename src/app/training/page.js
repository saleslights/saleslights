import Link from 'next/link';
import Closing from '../../components/Closing';
import JsonLd, { ORG_ID, PERSON_ID } from '../../components/JsonLd';
import { TRAINING } from '../../content/site';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/training/');

const METHOD = [
  ['Listen first', 'We review your real calls and sequences before we teach anything.'],
  ['Rebuild the opener', 'A first ten seconds that earns the next thirty, for your buyer, not a generic script.'],
  ['Systemise objections', 'The objections your team actually hears, with responses they rehearse until they are theirs.'],
  ['Coach live', 'Role-play and live call coaching, then recording review against the new standard.'],
  ['Leave a system', 'Scripts, an objection library and a manager guide so the training survives Monday.'],
];

export default function Training() {
  return (
    <>
      <section className="page-head editorial-head">
        <div className="wrap">
          <p className="eyebrow">Training</p>
          <h1>Sales and cold-call training</h1>
          <p className="lede">Your team picks up the phone more confidently, opens better and handles the objections it hears every day. Taught by a founder who still sells.</p>
          <div className="actions">
            <Link className="button" href="/contact/?topic=training">Plan a training</Link>
            <Link className="text-link" href="/book/">Or book an hour for a call review</Link>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">Programs</p>
          <div className="offers">
            {TRAINING.map((t) => <div className="offer" key={t.name}><h3>{t.name}</h3><p>{t.detail}</p><span className="amt">{t.price}</span></div>)}
          </div>
          <p className="footnote">Estimates; final scope depends on team size, number of sessions and whether calls are reviewed in advance. Delivered in person in New York or remotely, in English, Spanish or Portuguese.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2 style={{ maxWidth: '16ch', marginTop: 24 }}>Built from your calls, not a slide deck.</h2>
          <div className="loop five">
            {METHOD.map(([h, p], i) => <div key={h}><span className="n">0{i + 1}</span><h3>{h}</h3><p className="muted">{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap split top">
          <div className="copy"><p className="eyebrow">Off the shelf</p><h2>Workshops, coming to the Lab.</h2></div>
          <div className="copy">
            <p className="lede">Packaged cold-calling and outbound workshops for smaller teams are in development.</p>
            <p className="muted">Join the letter and you will hear first. Until then, any team can start with a one-hour session with Nick.</p>
            <p><Link className="text-link" href="/lab/">Visit the AI Lab</Link></p>
          </div>
        </div>
      </section>

      <Closing title="Hear your team’s calls with fresh ears." />
      <JsonLd data={{
        '@type': 'Service', name: 'Sales and cold call training', serviceType: 'Sales training', provider: { '@id': ORG_ID }, url: absolute('/training/'), areaServed: 'US',
        audience: { '@type': 'BusinessAudience', name: 'B2B sales teams' }, brand: { '@id': PERSON_ID },
      }} />
    </>
  );
}
