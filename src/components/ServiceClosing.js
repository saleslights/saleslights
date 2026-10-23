import Link from 'next/link';
import { BOOK } from '../content/site';
import '../app/services.css';

export default function ServiceClosing({ topic, title, text, cta }) {
  return (
    <section className="closing service-closing">
      <div className="wrap closing-inner">
        <h2>{title}</h2>
        <div>
          <p className="lede">{text}</p>
          <div className="actions">
            <Link className="button" href={`/contact/?topic=${encodeURIComponent(topic)}`}>{cta}</Link>
            <Link className="text-link" href="/book/">{BOOK.cta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
