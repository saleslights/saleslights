import Link from 'next/link';
import DevelopmentStudy from '../../components/art/DevelopmentStudy';
import ServiceFAQ from '../../components/ServiceFAQ';
import ServiceClosing from '../../components/ServiceClosing';
import { SOFTWARE_FAQS, SOFTWARE_TIERS } from '../../content/services';
import { pageMeta } from '../../content/seo';
import { IS_PRODUCTION } from '../../lib/env';
import '../services.css';

export const metadata = pageMeta('/software-development/');

const DELIVERY = [
  ['Start with the idea', 'Name the user, the problem and what a useful result would change for the business.'],
  ['Validate the first version', 'Test the need, choose a focused scope and agree the acceptance criteria. Configure existing software if that is the better answer.'],
  ['Design the architecture', 'Map the experience, data, permissions and integrations. Make ownership and operating costs explicit.'],
  ['Build in tested staging', 'Push reviewed code, run tests and demonstrate working increments against the agreed user journey.'],
  ['Prepare an authorized release', 'Document access, backups and rollback. Release to production only with the client’s approval.'],
  ['Learn from real use', 'Review adoption, conversion and cost. Improve the next useful part within the agreed monthly capacity.'],
];

export default function SoftwareDevelopment() {
  return (
    <div className="service-page service-development">
      <section className="service-hero">
        <div className="wrap">
          <p className="eyebrow">Software Development</p>
          <h1><span>Software development.</span>{' '}<span>Built for growth.</span></h1>
          <div className="service-hero-spread">
            <figure className="service-sculpture">
              <DevelopmentStudy />
              <figcaption>Two complementary roles. One working product.<br />An original study in joined forms and light.</figcaption>
            </figure>
            <div className="service-hero-copy">
              <p className="lede">Turn an idea, a new business offering or a difficult workflow into software people can use—and a product your business can own.</p>
              <p className="service-hero-note">Nick Krause as your forward-deployed engineer, paired with a full-stack software engineer. Business context and hands-on code, in one monthly engagement.</p>
              <div className="actions">
                <Link className="button" href="/contact/?topic=software-development">Discuss your build</Link>
                <a className="text-link" href="#how-we-build">See how we build</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white service-section">
        <div className="wrap service-editorial">
          <div className="service-section-head">
            <p className="eyebrow">The paired model</p>
            <h2>Close to the business.<br />Deep in the code.</h2>
            <p className="lede">We push reviewed code, not just recommendations.</p>
            <p>AI-assisted development helps us make rapid progress through focused scope, short feedback loops and demonstrated increments. It does not replace engineering judgment, tests or review.</p>
          </div>
          <div className="service-roles">
            <article>
              <p className="eyebrow">Forward-deployed engineer</p>
              <h3>Nick Krause</h3>
              <p>Works with your users, shapes the product and writes code. Connects technical decisions to the workflow, the customer and the business model.</p>
            </article>
            <article>
              <p className="eyebrow">Engineering partner</p>
              <h3>Full-stack software engineer</h3>
              <p>Builds alongside Nick across the interface, application, data and integrations. Shares responsibility for architecture, testing and release readiness.</p>
            </article>
            <div className="service-client-role"><p><strong>Your part:</strong> a client decision owner, a domain reviewer, approved access and clear feedback. The roles are paired; capacity and cadence are agreed for your engagement.</p></div>
          </div>
        </div>
      </section>

      <section className="section service-section" id="how-we-build">
        <div className="wrap">
          <div className="service-section-intro">
            <div className="service-section-head"><p className="eyebrow">From thought to working product</p><h2>Build the useful thing.<br />Then improve it.</h2></div>
            <p className="lede">A new product for your existing business, a better customer experience, or a workflow your current tools cannot handle. Start with a clear need, not a stack of technology.</p>
          </div>
          <div className="service-build-layout">
            <div className="service-build-types">
              <h3>What we build</h3>
              <dl>
                <div><dt>Customer products &amp; SaaS</dt><dd>A usable product with onboarding, billing and monetization designed into the right scope.</dd></div>
                <div><dt>Portals &amp; internal tools</dt><dd>Clear interfaces for customers, teams and the decisions they make every day.</dd></div>
                <div><dt>Integrations</dt><dd>Connect systems with defined data ownership, reliable handoffs and visible failures.</dd></div>
                <div><dt>Bounded AI agents</dt><dd>Useful actions within explicit permissions, human approvals and operating limits.</dd></div>
              </dl>
            </div>
            <ol className="service-delivery" role="list">
              {DELIVERY.map(([title, description], index) => (
                <li key={title}><span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section soft service-section">
        <div className="wrap">
          <div className="service-section-intro">
            <div className="service-section-head"><p className="eyebrow">Cybersecurity-first engineering</p><h2>Simple architecture.<br />Explicit boundaries.</h2></div>
            <p className="lede">Elegant software is understandable software. Keep the parts clear, the permissions narrow and the next change manageable.</p>
          </div>
          <div className="service-security-columns">
            <div>
              <h3>A maintainable foundation.</h3>
              <ul role="list">
                <li><strong>Clean, modular architecture.</strong> Separate the interface, application rules, data access and external actions. Add complexity only where it earns its place.</li>
                <li><strong>Authentication and data boundaries.</strong> Check who can do what on the server. Test tenant isolation and protect secrets and sensitive records.</li>
                <li><strong>Changes you can inspect and recover.</strong> Reviewed code, automated tests, separate staging, dependency checks and a rollback plan.</li>
              </ul>
            </div>
            <div>
              <h3>Ready for agentic work.</h3>
              <ul role="list">
                <li><strong>Permissions are not a prompt.</strong> Apply least privilege and keep authorization outside the model. Bind approvals to the exact action and target.</li>
                <li><strong>Untrusted content stays untrusted.</strong> Treat documents, emails and tool results as data. Test prompt injection attempts; they cannot grant permission.</li>
                <li><strong>Bound the action.</strong> Set spend limits and run limits. Keep an audit trail, require approval for high-impact actions and provide controls to stop execution.</li>
              </ul>
            </div>
          </div>
          <p className="service-source-note">A useful reference for the design review: <a href="https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html">OWASP’s AI Agent Security guidance</a>.</p>
        </div>
      </section>

      <section className="section white service-section">
        <div className="wrap service-editorial">
          <div className="service-section-head">
            <p className="eyebrow">Ownership &amp; growth</p>
            <h2>Your product.<br />Your next move.</h2>
            <p className="lede">Build something your business can run, understand and improve.</p>
          </div>
          <div className="service-format-notes">
            <div>
              <h3>Know what you own.</h3>
              <p>Commissioned source code, business data and account control are defined in the agreement. We establish repository access and handoff early, with documented exceptions for third-party licences, model services and pre-existing materials.</p>
              <p className="service-takeaway">Leave with the source, architecture decisions, access inventory and operating notes—not a dependency on an unexplained black box.</p>
            </div>
            <div>
              <h3>Measure the work that matters.</h3>
              <p>For a customer product, that might mean onboarding, activation, paid conversion and correct billing. For an internal tool, it might mean task quality, review effort and repeat use.</p>
              <p className="service-takeaway">We scope the events, consent rules and reporting, test them in staging, then use observed adoption and cost to guide improvements. Revenue is an objective, not a guarantee.</p>
              <Link className="text-link" href="/ai-training/">Train the team using the product</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-section" id="software-pricing">
        <div className="wrap">
          <div className="service-section-intro">
            <div className="service-section-head"><p className="eyebrow">Monthly engagements · USD</p><h2>A clear scope.<br />Room to build.</h2></div>
            <p className="lede">Choose a starting point for the complexity of the work. We agree the backlog, engineering capacity and delivery cadence before the engagement begins.</p>
          </div>
          <div className="service-pricing">
            {SOFTWARE_TIERS.map(tier => (
              <article className="service-tier" key={tier.name}>
                <h3>{tier.name}</h3>
                <p className="service-tier-price"><span className="service-price-amount">{tier.price}</span><span className="service-price-unit">per month</span></p>
                <p className="service-tier-detail">{tier.detail}</p>
              </article>
            ))}
          </div>
          <p className="service-pricing-caveat">Pricing is subject to change based on scope. Capacity, delivery cadence and final fees are agreed in the statement of work. Hosting, software and model/API usage are separate unless included.</p>
          {!IS_PRODUCTION && <p className="service-review-note" role="note">For review: midmarket and enterprise starting prices are proposed.</p>}
          <div className="service-separate-offer"><p>Need the revenue engine operated, with a sales professional in market? That is a separate engagement.</p><Link className="text-link" href="/gtm-engine/">Explore the GTM Engine</Link></div>
        </div>
      </section>

      <section className="section white service-section" id="software-development-faq">
        <div className="wrap service-editorial">
          <div className="service-section-head"><p className="eyebrow">Before we build</p><h2>Software development questions.</h2></div>
          <ServiceFAQ items={SOFTWARE_FAQS} />
        </div>
      </section>

      <ServiceClosing topic="software-development" title="Bring the idea. Let’s make it work." text="Tell us what you want to launch or improve, who will use it and what success would look like. We’ll work out the smallest useful next step." cta="Discuss your build" />
    </div>
  );
}
