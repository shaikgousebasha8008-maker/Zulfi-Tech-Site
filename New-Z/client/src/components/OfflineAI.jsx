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
      <svg viewBox="0 0 1000 532" role="img" aria-label="Field team devices connect over local Wi-Fi to a ZulfiEra Edge server on site that works fully offline. An optional satellite link carries encrypted sync to the ZulfiTech cloud.">
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
        <text x="720" y="40" className="oa-label" textAnchor="middle">LEO satellite · optional</text>
        <g transform="translate(720 92)"><g className="oa-sat">
          <circle r="34" fill="url(#oaGlow)" />
          <rect x="-12" y="-9" width="24" height="18" rx="3" className="oa-sat-body" />
          <rect x="-46" y="-6" width="30" height="12" rx="2" className="oa-panel" />
          <rect x="16" y="-6" width="30" height="12" rx="2" className="oa-panel" />
          <path d="M-16 0 H-12 M12 0 H16" className="oa-ant" />
          <path d="M0 9 V18" className="oa-ant" />
        </g></g>

        {/* links */}
        <path id="oaUp" className="oa-link sat" d="M 692 290 L 712 112" />
        <path id="oaDown" className="oa-link sat" d="M 732 112 L 868 298" />
        <path id="oaLan1" className="oa-link lan" d="M 236 336 L 360 352" />
        <path id="oaLan2" className="oa-link lan" d="M 236 404 L 360 388" />
        <path className="oa-cable" d="M 666 356 Q 640 364 610 364" />
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

        {/* field team: an iPhone and a MacBook running ZulfiEra */}
        <g className="oa-node">
          <rect x="40" y="270" width="196" height="190" rx="18" />
          {/* phone */}
          <rect x="60" y="290" width="50" height="98" rx="11" className="oa-bezel" />
          <rect x="64" y="295" width="42" height="88" rx="8" className="oa-screen" />
          <rect x="77" y="298" width="16" height="4" rx="2" className="oa-bezel-fill" />
          <rect x="68" y="310" width="26" height="8" rx="4" className="oa-ui" />
          <rect x="76" y="323" width="26" height="8" rx="4" className="oa-ui gold" />
          <rect x="68" y="336" width="30" height="8" rx="4" className="oa-ui" />
          <rect x="68" y="349" width="20" height="8" rx="4" className="oa-ui" />
          <rect x="68" y="368" width="34" height="9" rx="4.5" className="oa-ui field" />
          {/* laptop */}
          <rect x="122" y="296" width="104" height="70" rx="6" className="oa-bezel" />
          <rect x="127" y="301" width="94" height="60" rx="3" className="oa-screen" />
          <rect x="127" y="301" width="24" height="60" className="oa-side" />
          <circle cx="139" cy="311" r="4" className="oa-logo" />
          <rect x="132" y="322" width="14" height="4" rx="2" className="oa-ui" />
          <rect x="132" y="330" width="14" height="4" rx="2" className="oa-ui" />
          <rect x="157" y="309" width="54" height="6" rx="3" className="oa-ui" />
          <rect x="165" y="321" width="46" height="6" rx="3" className="oa-ui gold" />
          <rect x="157" y="333" width="58" height="6" rx="3" className="oa-ui" />
          <rect x="157" y="349" width="58" height="7" rx="3.5" className="oa-ui field" />
          <path d="M 114 366 H 234 L 228 377 H 120 Z" className="oa-base" />
          <rect x="166" y="366" width="16" height="3" rx="1.5" className="oa-bezel-fill" />
          <text x="138" y="420" className="oa-title" textAnchor="middle">Field team</text>
          <text x="138" y="442" className="oa-sub" textAnchor="middle">iPhone · Mac · Wi-Fi</text>
        </g>

        {/* edge server */}
        <g className="oa-node main">
          <rect x="360" y="262" width="250" height="206" rx="20" />
          <text x="485" y="296" className="oa-title gold" textAnchor="middle">ZulfiEra Edge</text>
          <rect x="384" y="312" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="332" className="oa-sub strong">✦ AI model on site</text>
          <rect x="384" y="348" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="368" className="oa-sub strong">▤ Documents &amp; data</text>
          <rect x="384" y="384" width="202" height="30" rx="8" className="oa-row" />
          <text x="400" y="404" className="oa-sub strong">⟳ Automations</text>
          <rect x="420" y="424" width="130" height="32" rx="16" className="oa-badge" />
          <text x="485" y="445" className="oa-badge-t" textAnchor="middle">100% offline</text>
        </g>

        {/* satellite terminal: dish on a stand, cabled to the edge server */}
        <g className="oa-terminal">
          <rect x="664" y="352" width="36" height="7" rx="3" className="oa-dish-base" />
          <path d="M 682 352 V 318" className="oa-stand" />
          <g transform="rotate(25 682 310)">
            <path d="M 652 310 Q 682 342 712 310 Z" className="oa-dish" />
            <path d="M 682 326 V 292" className="oa-feed" />
            <circle cx="682" cy="290" r="3.5" className="oa-logo" />
          </g>
          <text x="682" y="382" className="oa-sub" textAnchor="middle">Satellite terminal</text>
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
          <rect x="190" y="488" width="620" height="30" rx="15" />
          <circle cx="214" cy="503" r="5" className="off" />
          <text x="226" y="508" className="oa-sub">Internet: none</text>
          <circle cx="400" cy="503" r="5" className="on" />
          <text x="412" y="508" className="oa-sub">Local AI: online</text>
          <circle cx="590" cy="503" r="5" className="wait" />
          <text x="602" y="508" className="oa-sub">Satellite sync: queued</text>
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
