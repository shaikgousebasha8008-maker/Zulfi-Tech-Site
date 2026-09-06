const segments = [
  { label: "Delivered", value: 94, color: "#16a34a" },
  { label: "Bounced", value: 4, color: "#dc2626" },
  { label: "Suppressed", value: 2, color: "#8B8F97" },
];

const RADIUS = 70;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 4;

function buildArcs() {
  let cursor = 0;
  return segments.map((s) => {
    const slot = (s.value / 100) * CIRCUMFERENCE;
    const len = Math.max(slot - GAP, 0);
    const offset = -cursor;
    cursor += slot;
    return { ...s, len, offset };
  });
}

export default function DeliveryChart() {
  const arcs = buildArcs();

  return (
    <div className="delivery-chart">
      <div className="delivery-stats">
        <div className="delivery-stat">
          <div className="num" style={{ color: "#16a34a" }}>94%</div>
          <div className="lbl">Delivery rate</div>
        </div>
        <div className="delivery-stat">
          <div className="num" style={{ color: "#dc2626" }}>4%</div>
          <div className="lbl">Bounce rate</div>
        </div>
        <div className="delivery-stat">
          <div className="num" style={{ color: "#8B8F97" }}>2%</div>
          <div className="lbl">Suppressed</div>
        </div>
      </div>

      <div className="delivery-donut-wrap">
        <svg viewBox="0 0 180 180" className="delivery-donut" role="img" aria-label="Delivered, bounced, and suppressed email breakdown">
          <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="#E4E1DA" strokeWidth={STROKE} />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="90"
              cy="90"
              r={RADIUS}
              fill="none"
              stroke={a.color}
              strokeWidth={STROKE}
              strokeDasharray={`${a.len} ${CIRCUMFERENCE - a.len}`}
              strokeDashoffset={a.offset}
              transform="rotate(-90 90 90)"
            />
          ))}
          <text x="90" y="86" textAnchor="middle" className="donut-center-num">94%</text>
          <text x="90" y="104" textAnchor="middle" className="donut-center-lbl">Delivered</text>
        </svg>
      </div>

      <div className="delivery-legend">
        {segments.map((s) => (
          <div className="legend-row" key={s.label}>
            <span className="legend-swatch" style={{ background: s.color }}></span>
            <span className="legend-label">{s.label}</span>
            <span className="legend-value">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
