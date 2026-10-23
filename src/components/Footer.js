import Link from 'next/link';
import Mark from './Mark';
import Subscribe from './Subscribe';
import { LINKS, NAV } from '../content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Mark size={44} />
          <p className="footer-line">Revenue infrastructure. Built and operated.</p>
          <p className="muted small">New York · Delaware</p>
        </div>
        <div className="footer-letter">
          <p className="eyebrow">The Saleslights letter</p>
          <p className="muted">Field notes from the AI Lab on revenue systems, selling and what is actually working. No more than twice a month.</p>
          <Subscribe source="footer" compact />
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {NAV.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
            <li><Link href="/book/">Book time with Nick</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
            <li><a href={LINKS.linkedin} rel="noopener">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Saleslights, Inc.</span>
        <span><Link href="/privacy/">Privacy</Link> · <Link href="/terms/">Terms</Link></span>
      </div>
    </footer>
  );
}
