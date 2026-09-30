// Cloud reference architecture: users -> edge -> load balancer -> auto-scaling instances,
// backed by database, backups and monitoring. Animated dots show live traffic. Illustrative.

const instances = [
  { x: 38, name: "Instance 1", cpu: 41 },
  { x: 160, name: "Instance 2", cpu: 38 },
  { x: 282, name: "Instance 3", cpu: 44 },
];
const dataNodes = [
  { x: 20, icon: "◫", name: "Database", sub: "Primary + replica" },
  { x: 200, icon: "⟲", name: "Backups", sub: "Hourly · 30 days" },
  { x: 380, icon: "◉", name: "Monitoring", sub: "Alerts 24/7" },
];
const flow = (cx) => `M280 54 L280 206 C280 236 ${cx} 232 ${cx} 262`;

function Node({ x, y, w, h, title, sub, icon, cls = "" }) {
  return (
    <g className={`ad-node ${cls}`} transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="12" />
      <rect className="ad-ic" x="10" y={(h - 28) / 2} width="28" height="28" rx="8" />
      <text className="ad-ic-t" x="24" y={h / 2 + 5} textAnchor="middle">{icon}</text>
      <text className="ad-t" x="48" y={h / 2 - 3}>{title}</text>
      <text className="ad-s" x="48" y={h / 2 + 13}>{sub}</text>
    </g>
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="ad-wrap">
      <svg className="ad" viewBox="0 0 560 450" role="img" aria-label="Cloud architecture: users, edge network, load balancer, auto-scaling instances, database, backups and monitoring">
        <g className="ad-links">
          <path d="M280 54 L280 86" />
          <path d="M280 130 L280 162" />
          {[93, 215, 337, 459].map((cx) => <path key={cx} d={`M280 206 C280 236 ${cx} 232 ${cx} 262`} className={cx === 459 ? "dash" : ""} />)}
          {[93, 215, 337].map((cx) => <path key={cx} d={`M${cx} 322 L${cx} 364`} />)}
          <path d="M100 364 L460 364" />
          {[100, 280, 460].map((cx) => <path key={cx} d={`M${cx} 364 L${cx} 382`} />)}
        </g>

        {[93, 215, 337].map((cx, i) => (
          <g key={cx}>
            <path id={`adf${i}`} d={flow(cx)} fill="none" stroke="none" />
            {[0, 1].map((k) => (
              <circle key={k} r="3.4" className="ad-pkt">
                <animateMotion dur="2.4s" begin={`${i * 0.5 + k * 1.2}s`} repeatCount="indefinite"><mpath href={`#adf${i}`} /></animateMotion>
              </circle>
            ))}
          </g>
        ))}

        <Node x={180} y={10} w={200} h={44} icon="◍" title="Users" sub="Web · mobile · API" />
        <Node x={180} y={86} w={200} h={44} icon="⛨" title="Edge network" sub="CDN · WAF · DDoS" cls="edge" />
        <Node x={160} y={162} w={240} h={44} icon="⇆" title="Load balancer" sub="L7 · TLS · health checks" cls="lb" />

        <g className="ad-group">
          <rect x="20" y="244" width="520" height="100" rx="16" />
          <text x="524" y="334" textAnchor="end">AUTO-SCALING GROUP · 3–10 INSTANCES</text>
        </g>
        {instances.map((n) => (
          <g key={n.name} className="ad-node inst" transform={`translate(${n.x} 262)`}>
            <rect width="110" height="60" rx="12" />
            <circle cx="16" cy="18" r="4" className="ad-ok" />
            <text className="ad-t" x="26" y="22">{n.name}</text>
            <text className="ad-s" x="12" y="44">CPU {n.cpu}%</text>
            <rect className="ad-bar" x="60" y="39" width="38" height="5" rx="2.5" />
            <rect className="ad-bar-f" x="60" y="39" width={(38 * n.cpu) / 100} height="5" rx="2.5" />
          </g>
        ))}
        <g className="ad-node scale" transform="translate(404 262)">
          <rect width="110" height="60" rx="12" />
          <text className="ad-t" x="55" y="27" textAnchor="middle">+ Scaling</text>
          <text className="ad-s" x="55" y="43" textAnchor="middle">on demand</text>
        </g>

        {dataNodes.map((n) => <Node key={n.name} x={n.x} y={382} w={160} h={54} icon={n.icon} title={n.name} sub={n.sub} cls="data" />)}
      </svg>
      <div className="ad-stats">
        <div><b>99.99%</b><small>uptime target</small></div>
        <div><b>&lt; 60 s</b><small>to scale out</small></div>
        <div><b>AES-256</b><small>encrypted backups</small></div>
      </div>
    </div>
  );
}
