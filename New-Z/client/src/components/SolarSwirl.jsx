// Hero logo as a small solar system: the ZulfiEra swirl is the sun (turning slowly in a soft glow),
// and our services orbit it as planets on tilted rings. Pure CSS animation: light enough for any phone,
// and still when the visitor prefers reduced motion.
const PLANETS = [
  { label: "AI", r: 118, size: 16, speed: 16, delay: -2, tone: "gold" },
  { label: "Cloud", r: 160, size: 14, speed: 24, delay: -11, tone: "violet" },
  { label: "Web", r: 200, size: 13, speed: 34, delay: -20, tone: "blue" },
  { label: "Agents", r: 236, size: 11, speed: 46, delay: -30, tone: "gold" },
  { label: "Offline", r: 236, size: 11, speed: 46, delay: -7, tone: "violet" },
];

export default function SolarSwirl() {
  const rings = [...new Set(PLANETS.map((p) => p.r))];
  return (
    <div className="solar" aria-hidden="true">
      <div className="solar-glow" />
      <div className="solar-plane">
        {rings.map((r) => <div key={r} className="solar-ring" style={{ "--r": `${r}px` }} />)}
        {PLANETS.map((p) => (
          <div key={p.label} className="solar-orbit" style={{ "--r": `${p.r}px`, "--t": `${p.speed}s`, "--d": `${p.delay}s` }}>
            <div className={`solar-planet ${p.tone}`} style={{ "--s": `${p.size}px` }}>
              <i />
              <span>{p.label}</span>
            </div>
          </div>
        ))}
      </div>
      <svg className="solar-sun"><use href="#zm" /></svg>
    </div>
  );
}
