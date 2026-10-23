import { pageMeta } from '../../content/seo';

export const metadata = pageMeta('/privacy/');

export default function Privacy() {
  return (
    <section className="page-head">
      <div className="wrap legal">
        <p className="eyebrow">Legal</p>
        <h1>Privacy</h1>
        <p className="muted">Draft for owner and counsel review. Last updated October 23, 2026.</p>
        <h2>What we collect</h2>
        <p>When you subscribe to the Saleslights letter we collect your email address. When you contact us we collect what you enter in the form: name, work email, company, company size, topic and message. Our web server records standard request logs.</p>
        <h2>Payments and scheduling</h2>
        <p>Payments are processed by Stripe and scheduling by Calendly under their own privacy policies. We do not receive or store your full card details.</p>
        <h2>How we use it</h2>
        <p>To reply to you, deliver what you purchased, and send the letter if you subscribed. We do not sell personal information. You can unsubscribe at any time.</p>
        <h2>Contact</h2>
        <p>Saleslights, Inc., 8 The Green, Ste B, Dover, DE 19901 · legal@saleslights.com</p>
      </div>
    </section>
  );
}
