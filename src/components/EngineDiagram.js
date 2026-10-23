import { useId } from 'react';
import { DOMAINS } from '../content/site';
import '../app/art.css';

/* An open folio: ten leaves joined by one continuous, lit binding.
   HTML labels keep their size and wrap independently of the drawing. */
export default function EngineDiagram({ size = 560, className = '' }) {
  const id = `engine-${useId().replace(/:/g, '')}`;
  return (
    <div className={`engine-diagram sl-engine ${className}`} style={{ '--engine-size': `${size}px` }} role="img"
      aria-label={`The Master Revenue Engine connecting ${DOMAINS.length} domains: ${DOMAINS.map((d) => d.name).join(', ')}`}>
      <div className="sl-engine-binding" aria-hidden="true">
        <svg viewBox="0 0 64 86" focusable="false">
          <defs>
            <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#E1DCCF" />
              <stop offset=".48" stopColor="#FFFEFA" />
              <stop offset="1" stopColor="#F0ECDF" />
            </linearGradient>
          </defs>
          <path d="M12 30Q12 10 32 10Q52 10 52 30V57Q48 72 32 78Q16 72 12 57Z" fill={`url(#${id}-fold)`} stroke="#A49B88" strokeWidth=".8" />
          <path d="M32 14V77" fill="none" stroke="#FFFDF5" strokeWidth="1.5" />
          <circle cx="32" cy="40" r="10" fill="#F4EDA6" stroke="#8D8054" strokeWidth=".8" />
          <path d="M27 34Q31 31 36 34" fill="none" stroke="#FFFEDE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <ol className="sl-engine-leaves" aria-hidden="true">
        {DOMAINS.map((domain, i) => (
          <li className="sl-engine-leaf" key={domain.key}>
            <span className="sl-engine-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="sl-engine-name">{domain.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
