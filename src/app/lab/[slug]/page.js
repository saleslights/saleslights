import Link from 'next/link';
import { notFound } from 'next/navigation';
import Subscribe from '../../../components/Subscribe';
import JsonLd, { ORG_ID } from '../../../components/JsonLd';
import { POSTS } from '../../../content/posts';
import { absolute } from '../../../lib/env';

export const dynamicParams = false;
export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const path = `/lab/${post.slug}/`;
  return {
    title: { absolute: `${post.title} | Saleslights AI Lab` },
    description: post.dek,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: post.title, description: post.dek, url: path, publishedTime: post.date },
  };
}

function Block({ type, content }) {
  if (type === 'h2') return <h2>{content}</h2>;
  if (type === 'ul') return <ul>{content.map((c) => <li key={c}>{c}</li>)}</ul>;
  return <p>{content}</p>;
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <section className="section">
      <article className="wrap">
        <div className="article">
          <p className="eyebrow"><Link href="/lab/">AI Lab</Link> · {post.kind}</p>
          <h1 style={{ marginTop: 28 }}>{post.title}</h1>
          <p className="meta">Saleslights AI Lab · <time dateTime={post.date}>{new Date(post.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></p>
          <div className="answer"><p className="eyebrow" style={{ marginBottom: 10 }}>The short answer</p><p>{post.answer}</p></div>
          <div className="body">{post.body.map((b, i) => <Block key={i} type={b[0]} content={b[1]} />)}</div>
          <hr className="rule" style={{ margin: '72px 0 40px' }} />
          <p className="eyebrow">The Saleslights letter</p>
          <p className="muted" style={{ marginTop: 12 }}>Get the next one in your inbox.</p>
          <Subscribe source={`post-${post.slug}`} />
          <p style={{ marginTop: 40 }}><Link className="text-link" href="/book/">Talk it through with Nick · $250 / hour</Link></p>
        </div>
      </article>
      <JsonLd data={{
        '@type': 'BlogPosting', headline: post.title, description: post.dek, abstract: post.answer, datePublished: post.date, dateModified: post.date,
        url: absolute(`/lab/${post.slug}/`), mainEntityOfPage: absolute(`/lab/${post.slug}/`), author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
      }} />
    </section>
  );
}
