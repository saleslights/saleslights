/* Three overlapping circles: Nick, the platform, the delivery team. The work
   happens in the lit intersection. An idea, not an org chart or a staff photo. */
export default function TriadDiagram() {
  return (
    <svg className="triad-diagram" viewBox="0 0 420 380" role="img"
      aria-label="Nick Krause, the Saleslights platform and the delivery team overlap; client work happens where all three meet.">
      <defs>
        <clipPath id="t-a"><circle cx="210" cy="140" r="110" /></clipPath>
        <clipPath id="t-b"><circle cx="150" cy="245" r="110" /></clipPath>
      </defs>
      <circle cx="210" cy="140" r="110" className="triad-ring" />
      <circle cx="150" cy="245" r="110" className="triad-ring" />
      <circle cx="270" cy="245" r="110" className="triad-ring" />
      <g clipPath="url(#t-a)"><g clipPath="url(#t-b)"><circle cx="270" cy="245" r="110" className="triad-core" /></g></g>
      <text x="210" y="78" textAnchor="middle" className="triad-label">Nick</text>
      <text x="92" y="300" textAnchor="middle" className="triad-label">Platform</text>
      <text x="328" y="300" textAnchor="middle" className="triad-label">Team</text>
      <circle cx="210" cy="212" r="7" className="mark-dot" />
    </svg>
  );
}
