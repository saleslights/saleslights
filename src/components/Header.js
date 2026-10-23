import Link from 'next/link';
import Mark from './Mark';
import { NAV } from '../content/site';

function Links() {
  return (
    <ul>
      {NAV.map((item) => (
        <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
      ))}
      <li className="nav-cta"><Link href="/book/">Book Nick · $250</Link></li>
    </ul>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Saleslights home">
          <Mark size={30} />
          <span className="brand-word">Saleslights</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary"><Links /></nav>
        <details className="menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile"><Links /></nav>
        </details>
      </div>
    </header>
  );
}
