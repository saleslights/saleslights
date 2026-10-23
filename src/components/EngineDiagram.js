import { DOMAINS } from '../content/site';

/* An abstract orrery: one lit core (the Master Revenue Engine) with every
   functional domain on a single orbit. Thin lines, one warm light, no icons.
   The list beside it carries the meaning; the drawing carries the idea that
   every domain is connected to one brain rather than bolted on. */
export default function EngineDiagram({ size = 560 }) {
  const c = size / 2;
  const R = size * 0.34;
  const nodes = DOMAINS.map((d, i) => {
    const a = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
    return { ...d, x: c + R * Math.cos(a), y: c + R * Math.sin(a), a };
  });
  return (
    <svg className="engine-diagram" viewBox={`0 0 ${size} ${size}`} role="img"
      aria-label={`The Master Revenue Engine connecting ${DOMAINS.length} domains: ${DOMAINS.map((d) => d.name).join(', ')}`}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4EDA6" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#F4EDA6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F4EDA6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={R} className="orbit" />
      <circle cx={c} cy={c} r={R * 0.56} className="orbit faint" />
      {nodes.map((n) => <line key={`l-${n.key}`} x1={c} y1={c} x2={n.x} y2={n.y} className="spoke" />)}
      <circle cx={c} cy={c} r={size * 0.17} fill="url(#glow)" />
      <circle cx={c} cy={c} r={size * 0.045} className="core" />
      {nodes.map((n, i) => {
        const anchor = Math.abs(Math.cos(n.a)) < 0.2 ? 'middle' : Math.cos(n.a) > 0 ? 'start' : 'end';
        const dx = anchor === 'start' ? 14 : anchor === 'end' ? -14 : 0;
        const dy = anchor === 'middle' ? (Math.sin(n.a) > 0 ? 26 : -16) : 5;
        return (
          <g key={n.key}>
            <circle cx={n.x} cy={n.y} r={5.5} className="node" />
            <text x={n.x + dx} y={n.y + dy} textAnchor={anchor} className="node-label">
              <tspan className="node-index">{String(i + 1).padStart(2, '0')} </tspan>{n.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
