// "Offline AI": ZulfiEra Edge runs on site with no internet; an optional satellite link
// syncs small encrypted updates with the ZulfiTech cloud when a link is available.

const steps = [
  { n: "01", t: "Install on site", d: "A ZulfiEra Edge server or laptop with an open AI model, your documents and your automations." },
  { n: "02", t: "Work fully offline", d: "Your team uses chat, document reading and workflows over local Wi-Fi. No internet needed." },
  { n: "03", t: "Sync by satellite", d: "When a satellite link is available, only small encrypted changes move: updates, backups, reports." },
];

const uses = [
  { icon: "⚓", t: "Ships & offshore" },
  { icon: "⛏️", t: "Mines & oil fields" },
  { icon: "🏥", t: "Remote clinics" },
  { icon: "🚨", t: "Disaster response" },
  { icon: "🛡️", t: "Defence & border posts" },
  { icon: "🏫", t: "Rural schools" },
];

function Diagram() {
  return (
    <div className="oa-diagram">
      <svg viewBox="0 0 1000 520" role="img" aria-label="Field team devices connect over local Wi-Fi to a ZulfiEra Edge server on site that works fully offline. An optional satellite link carries encrypted sync to the ZulfiTech cloud.">
        <defs>
          <radialGradient id="oaGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#E0A868" stopOpacity=".35" /><stop offset="1" stopColor="#E0A868" stopOpacity="0" /></radialGradient>
          <linearGradient id="oaGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F8D596" /><stop offset="1" stopColor="#C17F3A" /></linearGradient>
        </defs>

        {/* stars */}
        <g className="oa-stars">
          {[[80, 40], [160, 90], [260, 30], [420, 60], [540, 24], [860, 40], [940, 90], [620, 110], [330, 120], [760, 140]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.2} />
          ))}
        </g>

        {/* orbit + satellite */}
        <path className="oa-orbit" d="M 470 210 Q 720 -40 980 200" />
        <g transform="translate(720 92)"><g className="oa-sat">
          <circle r="34" fill="url(#oaGlow)" />
          <rect x="-12" y="-9" width="24" height="18" rx="3" className="oa-sat-body" />
          <rect x="-46" y="-6" width="30" height="12" rx="2" className="oa-panel" />
          <rect x="16" y="-6" width="30" height="12" rx="2" className="oa-panel" />
          <path d="M0 9 V18" className="oa-ant" />
        </g></g>
        <text x="720" y="150" className="oa-label" textAnchor="middle">LEO satellite · optional</text>

        {/* links */}
        <path id="oaUp" className="oa-link sat" d="M 650 268 L 704 112" />
        <path id="oaDown" className="oa-link sat" d="M 738 112 L 860 300" />
        <path id="oaLan1" className="oa-link lan" d="M 230 330 L 360 350" />
        <path id="oaLan2" className="oa-link lan" d="M 230 400 L 360 380" />
        {["oaLan1", "oaLan2"].map((id, i) => (
          <circle key={id} r="4" className="oa-pkt">
            <animateMotion dur="1.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"><mpath href={`#${id}`} /></animateMotion>
          </circle>
        ))}
        {[0, 1.4].map((b) => (
          <circle key={b} r="4" className="oa-pkt sync">
            <animateMotion dur="2.8s" begin={`${b}s`} repeatCount="indefinite"><mpath href="#oaUp" /></animateMotion>
          </circle>
        ))}
        {[0.7, 2.1].map((b) => (
          <circle key={b} r="4" className="oa-pkt sync">
            <animateMotion dur="2.8s" begin={`${b}s`} repeatCount="indefinite"><mpath href="#oaDown" /></animateMotion>
          </circle>
        ))}

        {/* field team */}
        <g className="oa-node">
          <rect x="40" y="280" width="190" height="170" rx="18" />
          <rect x="66" y="312" width="44" height="74" rx="8" className="oa-dev" />
          <rect x="122" y="322" width="84" height="56" rx="6" className="oa-dev" />
          <rect x="112" y="378" width="104" height="8" rx="3" className="oa-dev" />
          <text x="135" y="418" className="oa-title" textAnchor="middle">Field team</text>
          <text x="135" y="438" className="oa-sub" textAnchor="middle">phones · laptops · Wi-Fi</text>
        </g>

        {/* edge server */}
        <g className="oa-node main">
          <rect x="360" y="270" width="250" height="190" rx="20" />
          <text x="485" y="304" className="oa-title gold" textAnchor="middle">ZulfiEra Edge</text>
          <rect x="384" y="320" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="340" className="oa-sub strong">✦ AI model on site</text>
          <rect x="384" y="356" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="376" className="oa-sub strong">▤ Documents & data</text>
          <rect x="384" y="392" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="412" className="oa-sub strong">⟳ Automations</text>
          <rect x="420" y="436" width="130" height="34" rx="17" className="oa-badge" />
          <text x="485" y="458" className="oa-badge-t" textAnchor="middle">100% offline</text>
        </g>

        {/* satellite terminal */}
        <g className="oa-node">
          <path d="M 628 300 Q 650 250 690 262 Z" className="oa-dish" />
          <path d="M 656 284 L 640 318 M 646 318 H 676" className="oa-ant" />
        </g>

        {/* cloud */}
        <g className="oa-node">
          <rect x="800" y="300" width="180" height="150" rx="18" />
          <path d="M 862 352 a 18 18 0 0 1 34 -6 a 13 13 0 1 1 6 25 h -42 a 10 10 0 0 1 2 -19 z" className="oa-cloud" />
          <text x="890" y="404" className="oa-title" textAnchor="middle">ZulfiTech Cloud</text>
          <text x="890" y="424" className="oa-sub" textAnchor="middle">updates · backups</text>
        </g>

        {/* status strip */}
        <g className="oa-status">
          <rect x="190" y="482" width="620" height="30" rx="15" />
          <circle cx="214" cy="497" r="5" className="off" />
          <text x="226" y="502" className="oa-sub">Internet: none</text>
          <circle cx="400" cy="497" r="5" className="on" />
          <text x="412" y="502" className="oa-sub">Local AI: online</text>
          <circle cx="590" cy="497" r="5" className="wait" />
          <text x="602" y="502" className="oa-sub">Satellite sync: queued</text>
        </g>
      </svg>
    </div>
  );
}

export default function OfflineAI() {
  return (
    <section className="offline-ai" id="offline">
      <div className="wrap">
        <div className="oa-grid">
          <div className="oa-copy reveal">
            <div className="section-head">
              <div className="kicker"><span className="txt">Offline &amp; satellite AI</span></div>
              <h2>AI that works where the internet doesn't</h2>
              <p>ZulfiEra Edge runs the AI on your own server or laptop, so your team keeps working with no connection at all. Where there's no network, an optional satellite link syncs small, encrypted updates with our cloud.</p>
            </div>
            <ul className="oa-uses">
              {uses.map((u) => <li key={u.t}><span aria-hidden="true">{u.icon}</span>{u.t}</li>)}
            </ul>
            <div className="oa-ctas">
              <a href="#contact" className="btn-primary">Request the offline edition</a>
              <span className="oa-note">Tested today on a standard laptop: no internet, no GPU.</span>
            </div>
          </div>
          <Diagram />
        </div>
        <div className="oa-steps">
          {steps.map((s) => (
            <div className="oa-step reveal" key={s.n}>
              <span className="oa-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
