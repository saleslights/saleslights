import { useId } from 'react';
import { DOMAINS } from '../content/site';
import '../app/services-art.css';

/* A bound folio, not a collection of ten unrelated cards. The common method
   feeds every leaf; security and human review support the whole binding.
   All meaningful labels are real, wrapping HTML, including without JS. */
export default function AITrainingMap({ className = '' }) {
  const id = `sl-training-map-${useId().replace(/:/g, '')}`;
  return (
    <figure className={`sl-training-map ${className}`} aria-labelledby={`${id}-caption`}>
      <figcaption id={`${id}-caption`} className="sl-training-map-caption">One approach. Ten domains.</figcaption>
      <div className="sl-training-map-method">
        <ol className="sl-training-map-steps" aria-label="Learning approach" role="list">
          {['Learn', 'Apply', 'Review'].map((step, index) => (
            <li key={step}>
              <span className="sl-training-map-step-number" aria-hidden="true">0{index + 1}</span>
              <span>{step}</span>
              {index < 2 && <span className="sl-training-map-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        <svg className="sl-training-map-fold" viewBox="0 0 64 58" width="64" height="58" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${id}-paper`} x1="7" y1="15" x2="52" y2="47" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEFA" />
              <stop offset=".42" stopColor="#EBE4D4" />
              <stop offset=".64" stopColor="#F6F0CD" />
              <stop offset="1" stopColor="#FFFEF8" />
            </linearGradient>
          </defs>
          <path d="M7 12Q20 12 32 22Q44 12 57 12L54 42Q42 42 32 51Q22 42 10 42Z" fill={`url(#${id}-paper)`} stroke="#8A806A" strokeWidth=".8" />
          <path d="M32 23V51" fill="none" stroke="#8A806A" strokeWidth=".8" />
          <path d="M35 23L34 46" fill="none" stroke="#F4EDA6" strokeWidth="3" />
          <path d="M8 13Q20 14 31 23" fill="none" stroke="#FFFEF8" strokeWidth="1" />
        </svg>
      </div>
      <div className="sl-training-map-folio">
        <ol className="sl-training-map-domains" aria-label="Ten application domains" role="list">
          {DOMAINS.map((domain, index) => (
            <li className="sl-training-map-domain" key={domain.key}>
              <span className="sl-training-map-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="sl-training-map-name">{domain.name}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="sl-training-map-foundation">
        <p className="sl-training-map-foundation-title">Security + human review</p>
        <p className="sl-training-map-foundation-note">Across every domain, at every step.</p>
      </div>
    </figure>
  );
}
