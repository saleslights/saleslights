import { useId } from 'react';
import '../app/art.css';

/* Three paper leaves share a real, clipped intersection. The soft material
   is an abstraction of collaboration, never a picture of a live platform. */
const LEAF = 'M212 67C257 67 287 101 287 146L287 233C287 257 270 275 246 275H178C154 275 137 257 137 233V146C137 101 167 67 212 67Z';

export default function TriadDiagram({ className = '' }) {
  const id = `triad-${useId().replace(/:/g, '')}`;
  return (
    <svg className={`triad-diagram sl-triad ${className}`} viewBox="0 0 424 430" width="424" height="430" role="img" focusable="false"
      aria-label="Nick Krause, the Saleslights platform and the delivery team overlap; client work happens where all three meet.">
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFEFA" />
          <stop offset=".6" stopColor="#EDE8DC" />
          <stop offset="1" stopColor="#D6CEBD" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-25%" y="-25%" width="150%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#3A3020" floodOpacity=".09" />
        </filter>
        <clipPath id={`${id}-a`}><path d={LEAF} /></clipPath>
        <clipPath id={`${id}-b`}><path d={LEAF} transform="rotate(120 212 233)" /></clipPath>
      </defs>
      <g aria-hidden="true">
        {[0, 120, 240].map((angle) => (
          <path key={angle} d={LEAF} transform={`rotate(${angle} 212 233)`} fill={`url(#${id}-paper)`} fillOpacity=".95" filter={`url(#${id}-shadow)`} />
        ))}
        <g clipPath={`url(#${id}-a)`}><g clipPath={`url(#${id}-b)`}>
          <path d={LEAF} transform="rotate(240 212 233)" fill="#F4EDA6" fillOpacity=".7" />
        </g></g>
        {[0, 120, 240].map((angle) => (
          <path key={angle} d={LEAF} transform={`rotate(${angle} 212 233)`} className="sl-triad-edge" />
        ))}
        <path d="M212 47V57M64 354L74 337M360 354L350 337" className="sl-triad-tick" />
        <circle cx="212" cy="233" r="8" fill="#F4EDA6" stroke="#8D8054" strokeWidth=".9" />
        <path d="M208 229Q212 226 216 229" fill="none" stroke="#FFFEDE" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <g className="sl-triad-labels" aria-hidden="true">
        <text x="212" y="32" textAnchor="middle">Nick</text>
        <text x="64" y="385" textAnchor="middle">Platform</text>
        <text x="360" y="385" textAnchor="middle">Team</text>
      </g>
    </svg>
  );
}
