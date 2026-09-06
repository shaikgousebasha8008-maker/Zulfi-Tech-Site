const INK = "#20242B";
const BRONZE = "#C17F3A";
const MUTED = "#8B8F97";

export default function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 460 340" className="arch-diagram" role="img" aria-label="Scalable cloud architecture diagram">
      <text x="230" y="24" textAnchor="middle" className="arch-label">Traffic</text>
      <line x1="230" y1="32" x2="230" y2="58" stroke={MUTED} strokeWidth="2" />

      <rect x="150" y="58" width="160" height="42" rx="4" fill="none" stroke={BRONZE} strokeWidth="2" />
      <text x="230" y="84" textAnchor="middle" className="arch-label-strong">Load Balancer</text>

      {[80, 180, 280].map((cx) => (
        <line key={`lb-${cx}`} x1="230" y1="100" x2={cx} y2="140" stroke={MUTED} strokeWidth="2" />
      ))}
      <line x1="230" y1="100" x2="380" y2="140" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />

      {[80, 180, 280].map((cx) => (
        <g key={`inst-${cx}`}>
          <rect x={cx - 40} y="140" width="80" height="50" rx="4" fill="none" stroke={INK} strokeWidth="2" />
          <text x={cx} y="170" textAnchor="middle" className="arch-label">Instance</text>
        </g>
      ))}
      <rect x="340" y="140" width="80" height="50" rx="4" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
      <text x="380" y="164" textAnchor="middle" className="arch-label-muted">Scales</text>
      <text x="380" y="178" textAnchor="middle" className="arch-label-muted">on demand</text>

      {[80, 180, 280, 380].map((cx) => (
        <line key={`down-${cx}`} x1={cx} y1="190" x2="230" y2="230" stroke={MUTED} strokeWidth="1.5" opacity="0.6" />
      ))}

      <line x1="60" y1="230" x2="400" y2="230" stroke={MUTED} strokeWidth="2" />

      {[
        { cx: 90, label: "Monitoring" },
        { cx: 230, label: "Backups" },
        { cx: 370, label: "Database" },
      ].map((s) => (
        <g key={s.label}>
          <line x1={s.cx} y1="230" x2={s.cx} y2="254" stroke={MUTED} strokeWidth="2" />
          <rect x={s.cx - 55} y="254" width="110" height="46" rx="4" fill="none" stroke={INK} strokeWidth="2" />
          <text x={s.cx} y="282" textAnchor="middle" className="arch-label">{s.label}</text>
        </g>
      ))}
    </svg>
  );
}
