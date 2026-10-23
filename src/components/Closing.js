import Link from 'next/link';

/* Closing call to action shared by every page: the three-rung ladder. */
export default function Closing({ title = 'Start with an hour.', text = 'One paid working session with Nick. If there is a bigger engagement in it, you will know by the end of the hour.', contactFirst = false }) {
  return (
    <section className="closing">
      <div className="wrap closing-inner">
        <h2>{title}</h2>
        <p className="lede">{text}</p>
        <div className="actions">
          {contactFirst
            ? <Link className="button" href="/contact/">Tell us about the project</Link>
            : <><Link className="button" href="/book/">Book time with Nick · $250</Link><Link className="text-link" href="/contact/">Or tell us about the project →</Link></>}
        </div>
      </div>
    </section>
  );
}
