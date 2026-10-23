import Link from 'next/link';
import AITrainingStudy from '../../components/art/AITrainingStudy';
import AITrainingMap from '../../components/AITrainingMap';
import ServiceFAQ from '../../components/ServiceFAQ';
import ServiceClosing from '../../components/ServiceClosing';
import { DOMAINS } from '../../content/site';
import { AI_FAQS, DOMAIN_PRACTICE } from '../../content/services';
import { pageMeta } from '../../content/seo';
import '../services.css';

export const metadata = pageMeta('/ai-training/');

export default function AITraining() {
  return (
    <div className="service-page service-training">
      <section className="service-hero">
        <div className="wrap">
          <p className="eyebrow">AI Training</p>
          <h1><span>AI training.</span>{' '}<span>For the work that matters.</span></h1>
          <div className="service-hero-spread">
            <figure className="service-sculpture">
              <AITrainingStudy />
              <figcaption>Learning, connected to the work.<br />An original study in folded paper and light.</figcaption>
            </figure>
            <div className="service-hero-copy">
              <p className="lede">Give your team a useful way to work with AI. Start with the tasks they know, practice together, and learn what a good result looks like.</p>
              <p className="service-hero-note">Practical training for sales, operations, security and finance teams. From beginner foundations to intermediate workflows. No coding required.</p>
              <div className="actions">
                <Link className="button" href="/contact/?topic=ai-training">Plan your team’s training</Link>
                <a className="text-link" href="#workflow-examples">Explore the workflows</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white service-section">
        <div className="wrap service-editorial">
          <div className="service-section-head">
            <p className="eyebrow">Confidence, then capability</p>
            <h2>From a first draft to a way of working.</h2>
            <p>Learn the essentials, use them on real work, then make the useful parts repeatable. The team keeps the instructions and examples—not just the slides.</p>
          </div>
          <ol className="service-progression" role="list">
            <li>
              <span className="service-index" aria-hidden="true">01</span>
              <div><h3>Start with the foundations.</h3><p>Choose a useful task. Understand where AI helps, where it invents an answer, and which approved data and tools belong in the exercise.</p><p className="service-takeaway"><span>Keep</span> A task map, baseline example and safe-input checklist.</p></div>
            </li>
            <li>
              <span className="service-index" aria-hidden="true">02</span>
              <div><h3>Apply it. Then check it.</h3><p>Give clear context and instructions. Compare outputs, verify sources and calculations, and improve the draft with a named human reviewer.</p><p className="service-takeaway"><span>Keep</span> Reusable prompts and instructions, a review rubric and a corrected example.</p></div>
            </li>
            <li>
              <span className="service-index" aria-hidden="true">03</span>
              <div><h3>Repeat what works.</h3><p>Write down the handoffs and stop points. Compare similar tasks, track actual reuse, and measure quality and effort—including review and rework.</p><p className="service-takeaway"><span>Keep</span> A workflow checklist, an adoption scorecard and an internal owner.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section service-section" id="workflow-examples">
        <div className="wrap">
          <div className="split service-domain-intro">
            <div className="service-section-head">
              <p className="eyebrow">Practice across the business</p>
              <h2>Your work.<br />A shared method.</h2>
              <p className="lede">The same skills travel from a better account brief to a clearer finance review.</p>
              <p>These ten domains are the Saleslights revenue system. We choose the training focus with you; every domain is not automatically included. Security and human review run through all of them.</p>
              <Link className="text-link" href="/revenue-infrastructure/">See the wider revenue system</Link>
            </div>
            <AITrainingMap />
          </div>
          <div className="service-example-heading">
            <h3>A useful exercise in every domain.</h3>
            <p>Illustrative workflows. Open one to see the work, the takeaway and the human check.</p>
          </div>
          <div className="service-workflows">
            {DOMAINS.map((domain, index) => {
              const practice = DOMAIN_PRACTICE.find(item => item.key === domain.key);
              return (
                <details className="service-workflow" key={domain.key}>
                  <summary><span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{domain.name}</span><span className="service-disclosure" aria-hidden="true" /></summary>
                  <dl>
                    <div><dt>Practice</dt><dd>{practice.exercise}</dd></div>
                    <div><dt>Take away</dt><dd>{practice.artifact}</dd></div>
                    <div><dt>Human check</dt><dd>{practice.review}</dd></div>
                  </dl>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section soft service-section">
        <div className="wrap">
          <div className="service-section-intro">
            <div className="service-section-head"><p className="eyebrow">Good judgment is part of the skill</p><h2>Useful work.<br />Clear boundaries.</h2></div>
            <p className="lede">Use approved tools and data. Check the facts and sources. A person approves the work before publishing, sending, changing access or making payments.</p>
          </div>
          <div className="service-practice-pair">
            <article>
              <p className="eyebrow">Illustrative security exercise</p>
              <h3>Read the evidence, not just the summary.</h3>
              <p>Compare an AI-generated incident summary with sanitized source evidence. Spot a fabricated source and an instruction hidden in a document—the kind of prompt injection that tries to redirect an AI tool.</p>
              <p className="service-takeaway"><span>The boundary</span> A security owner checks the summary and decides what to escalate. No live secrets, access changes or automated remediation.</p>
            </article>
            <article>
              <p className="eyebrow">Illustrative finance exercise</p>
              <h3>Explain the variance. Verify the numbers.</h3>
              <p>Draft commentary on a de-identified revenue and expense sheet. Check each figure in the spreadsheet and separate supported explanations from guesses.</p>
              <p className="service-takeaway"><span>The boundary</span> A finance owner verifies the calculations and interpretation. The exercise does not post to the ledger or move money.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section white service-section">
        <div className="wrap service-editorial">
          <div className="service-section-head">
            <p className="eyebrow">A program shaped around your team</p>
            <h2>Bring the work.<br />Build the habit.</h2>
            <p>Live workshops introduce the foundations. Role-based labs apply them. Adoption follow-through helps the team use the workflow after the session.</p>
            <p>We scope the participants, sessions, approved tools and follow-up in your proposal. Start with the work worth improving—not a long list of AI products.</p>
          </div>
          <div className="service-format-notes">
            <div>
              <h3>Free courses have a place.</h3>
              <p><a href="https://academy.openai.com/">OpenAI Academy</a> and <a href="https://learn.microsoft.com/en-us/training/organizations">Microsoft Learn</a> offer useful self-paced foundations. If that is enough, start there. Our value is live practice on your own workflows, clear review ownership and help turning learning into use.</p>
            </div>
            <div>
              <h3>When a prompt needs a product.</h3>
              <p>Some workflows need connected systems, permissions or a better interface. Training helps define the need; a separately scoped engineering engagement can build it.</p>
              <Link className="text-link" href="/software-development/">Build the workflow with us</Link>
            </div>
            <p className="service-related">Working on conversations and objections instead? <Link href="/training/">Explore Sales Training</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section service-section" id="ai-training-faq">
        <div className="wrap service-editorial">
          <div className="service-section-head"><p className="eyebrow">Before we start</p><h2>AI training questions.</h2></div>
          <ServiceFAQ items={AI_FAQS} />
        </div>
      </section>

      <ServiceClosing topic="ai-training" title="Start with one useful workflow." text="Tell us what your team does, what they have tried and where they need confidence. We’ll shape the training around that." cta="Plan your team’s training" />
    </div>
  );
}
