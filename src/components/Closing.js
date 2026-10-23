import Link from 'next/link';
import { BOOK } from '../content/site';

/* Closing call to action shared by every page: the three-rung ladder. */
export default function Closing({ title = 'Start with an hour.', text = 'One paid working session with Nick. If there is a bigger engagement in it, you will know by the end of the hour.', contactFirst = false }) {
  return (
    <section className="closing">
      <div className="wrap closing-inner">
        <h2>{title}</h2>
        <div className="closing-copy">
          <p className="lede">{text}</p>
          <div className="actions">
            {contactFirst
              ? <Link className="button" href="/contact/">Tell us about the project</Link>
              : <><Link className="button" href="/book/">{BOOK.cta}</Link><Link className="text-link" href="/contact/">Or tell us about the project →</Link></>}
          </div>
        </div>
      </div>
    </section>
  );
}
