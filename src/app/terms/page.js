import { pageMeta } from '../../content/seo';

export const metadata = pageMeta('/terms/');

export default function Terms() {
  return (
    <section className="page-head">
      <div className="wrap legal">
        <p className="eyebrow">Legal</p>
        <h1>Website terms</h1>
        <p className="muted">Draft for owner and counsel review. Last updated October 23, 2026.</p>
        <h2>Book Time With Nick</h2>
        <p>A purchased session is one hour by video call, scheduled through the calendar link shown after payment. If you cannot attend, reschedule through the confirmation email at least 24 hours in advance.</p>
        <h2>Engagements</h2>
        <p>Programs, implementations and training are governed by a separate signed agreement or order form. Prices on this site are estimates in U.S. dollars until confirmed in writing.</p>
        <h2>No guarantees</h2>
        <p>Content on this site and in the AI Lab is general information, not professional advice. Saleslights does not guarantee specific meetings, pipeline or revenue outcomes.</p>
        <h2>Contact</h2>
        <p>Saleslights, Inc., 8 The Green, Ste B, Dover, DE 19901 · legal@saleslights.com</p>
      </div>
    </section>
  );
}
