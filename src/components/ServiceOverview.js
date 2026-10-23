import Link from 'next/link';
import AITrainingStudy from './art/AITrainingStudy';
import DevelopmentStudy from './art/DevelopmentStudy';
import '../app/services.css';

export default function ServiceOverview() {
  return (
    <>
      <section className="service-overview service-overview-training" id="ai-training">
        <div className="wrap service-overview-spread">
          <div className="service-overview-copy">
            <p className="eyebrow">AI Training</p>
            <h2>Make AI useful.<br />Every day.</h2>
            <p>Practical training for sales, operations, finance and security teams. Work on familiar tasks, learn to check the result, and leave with workflows you can use again.</p>
            <Link className="text-link" href="/ai-training/">Explore AI training</Link>
          </div>
          <figure className="service-overview-art">
            <AITrainingStudy />
            <figcaption>Learn. Apply. Review.</figcaption>
          </figure>
        </div>
      </section>
      <section className="service-overview service-overview-development" id="software-development">
        <div className="wrap service-overview-spread">
          <div className="service-overview-copy">
            <p className="eyebrow">Software Development</p>
            <h2>An idea, built into a product.</h2>
            <p>Nick as your forward-deployed engineer, paired with a full-stack software engineer. Shape, build and improve software around a real business need—with ownership, security and growth in view.</p>
            <Link className="text-link" href="/software-development/">Explore software development</Link>
          </div>
          <figure className="service-overview-art">
            <DevelopmentStudy />
            <figcaption>Business context, joined to engineering.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
