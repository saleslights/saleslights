import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>That page is not here.</h1>
        <p className="lede">It may have moved in the redesign.</p>
        <div className="actions"><Link className="button" href="/">Go home</Link><Link className="text-link" href="/lab/">Read the AI Lab</Link></div>
      </div>
    </section>
  );
}
