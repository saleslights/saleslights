import ContactForm from '../../components/ContactForm';
import { LINKS } from '../../content/site';
import { pageMeta } from '../../content/seo';
import Link from 'next/link';

export const metadata = pageMeta('/contact/');

import { CONTACT_TOPIC_VALUES as TOPICS } from '../../content/contact-topics';

export default async function Contact({ searchParams }) {
  const sp = (await searchParams) || {};
  const topic = TOPICS.includes(sp.topic) ? sp.topic : '';
  return (
    <section className="page-head contact-head">
      <div className="wrap split top">
        <div className="copy">
          <p className="eyebrow">Contact</p>
          <h1>Tell us what you are building.</h1>
          <p className="lede">We come back with a point of view or a scope.</p>
          <p className="muted">Prefer to talk now? <Link className="text-link" href="/book/">Book an hour with Nick</Link>.</p>
          <p className="muted">Or email <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</p>
        </div>
        <ContactForm defaultTopic={topic} />
      </div>
    </section>
  );
}
