import Link from 'next/link';
import Subscribe from '../../components/Subscribe';
import JsonLd, { ORG_ID } from '../../components/JsonLd';
import { POSTS, SHELF } from '../../content/posts';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/lab/');

export default function Lab() {
  return (
    <>
      <section className="page-head lab-head">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">Saleslights · AI Lab</p>
            <h1>The AI Lab</h1>
          </div>
          <div className="copy">
            <p className="lede">Where we write down what we learn building and running revenue engines: essays, field notes, video and tools.</p>
            <p className="muted">The Saleslights letter, no more than twice a month.</p>
            <Subscribe source="lab" />
          </div>
        </div>
      </section>

      <section className="section white tight">
        <div className="wrap">
          <p className="eyebrow">Writing</p>
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

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">On the shelf</p>
          <h2 style={{ maxWidth: '16ch', marginTop: 24 }}>Coming out of the Lab.</h2>
          <div className="shelf">
            {SHELF.map(([h, s, d]) => <div key={h}><span className="status">{s}</span><h3>{h}</h3><p className="muted">{d}</p></div>)}
          </div>
          <p className="footnote">Interested in lead data or a workshop now? <Link href="/contact/?topic=lead-data">Tell us what you need</Link>.</p>
        </div>
      </section>

      <JsonLd data={{
        '@type': 'Blog', name: 'The Saleslights AI Lab', url: absolute('/lab/'), publisher: { '@id': ORG_ID },
        blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absolute(`/lab/${p.slug}/`), datePublished: p.date })),
      }} />
    </>
  );
}
