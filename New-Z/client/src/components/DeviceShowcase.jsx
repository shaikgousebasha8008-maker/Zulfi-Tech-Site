import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrandName } from "./Logo.jsx";

// "See it in action": a MacBook mock-up running a macOS-style "ZulfiTech Studio" window,
// with tabs for the product work we build. All figures on the screens are sample data.

const STAGE_W = 960; // the screen is designed at 960 x 600 and scaled to fit
const STAGE_H = 600;

function Spark({ size = 18 }) {
  // ZulfiEra AI mark: the Zulfiqar over a Z monogram.
  return <img src="/zulfiera-mark.svg?v=6" width={size} height={size} alt="" aria-hidden="true" style={{ flexShrink: 0 }} />;
}

/* ---------- AI Assistant ---------- */
function AssistantScreen() {
  return (
    <div className="mx-split">
      <div className="mx-main mx-chat">
        <div className="mx-head">
          <strong>Server report review</strong>
          <span className="mx-pill">ZulfiEra AI · open models</span>
        </div>
        <div className="mx-msgs">
          <div className="mx-b user">Summarise today's server report and flag anything urgent.</div>
          <div className="mx-b bot">
            <Spark size={16} />
            <div>
              All <b>12 servers</b> are healthy and response times are normal. One thing to watch: disk on <b>db-02</b> is at 86%,
              so I'd expand it this week before the nightly backup window.
              <div className="mx-chips"><span>Draft ticket</span><span>Show 7-day trend</span><span>Notify on-call</span></div>
            </div>
          </div>
          <div className="mx-b user">Draft the ticket for the hosting team.</div>
          <div className="mx-b bot typing"><Spark size={16} /><span className="mx-dots"><i></i><i></i><i></i></span></div>
        </div>
        <div className="mx-composer"><span>Ask anything, or drop a file…</span><em aria-hidden="true">↑</em></div>
      </div>
      <aside className="mx-side">
        <h5>Sources</h5>
        <div className="mx-file"><span className="mx-ext pdf">PDF</span><span><b>server-report.pdf</b><small>12 pages · read</small></span></div>
        <div className="mx-file"><span className="mx-ext img">PNG</span><span><b>grafana-disk.png</b><small>Screenshot · read</small></span></div>
        <div className="mx-file"><span className="mx-ext doc">DOC</span><span><b>runbook-storage.md</b><small>Knowledge base</small></span></div>
        <h5>Connected tools</h5>
        <div className="mx-tags"><span>Slack</span><span>Jira</span><span>Grafana</span><span>Google Drive</span></div>
      </aside>
    </div>
  );
}

/* ---------- Automation: node-based workflow canvas ---------- */
const nodes = [
  { id: "n1", x: 12, y: 165, kind: "trigger", icon: "⚡", title: "Website form", sub: "Trigger · new enquiry" },
  { id: "n2", x: 188, y: 165, kind: "ai", icon: "✦", title: "AI model", sub: "Classify & draft reply" },
  { id: "n3", x: 366, y: 60, kind: "app", icon: "🗂", title: "CRM", sub: "Create lead + owner" },
  { id: "n4", x: 366, y: 165, kind: "app", icon: "💬", title: "Slack", sub: "Notify #sales" },
  { id: "n5", x: 366, y: 270, kind: "app", icon: "✉", title: "Review queue", sub: "Proposal draft" },
];
const NW = 150;
const NH = 54;
const edge = (a, b) => {
  const x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x, y2 = b.y + NH / 2, mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const edges = [["n1", "n2"], ["n2", "n3"], ["n2", "n4"], ["n2", "n5"]];

function AutomationScreen() {
  return (
    <div className="mx-split">
      <div className="mx-main">
        <div className="mx-head">
          <strong>New client onboarding</strong>
          <span className="mx-pill ok">● Active</span>
          <span className="mx-btn">Run now</span>
        </div>
        <div className="mx-canvas">
          <svg className="mx-edges" aria-hidden="true">
            {edges.map(([a, b]) => <path key={a + b} d={edge(byId[a], byId[b])} />)}
          </svg>
          {nodes.map((n) => (
            <div key={n.id} className={`mx-node ${n.kind}`} style={{ left: n.x, top: n.y }}>
              <span className="mx-nic">{n.icon}</span>
              <span><b>{n.title}</b><small>{n.sub}</small></span>
              <i className="mx-ok" aria-hidden="true">✓</i>
            </div>
          ))}
        </div>
        <div className="mx-log">
          <span className="mx-okdot"></span> Run #1284 succeeded · 5 steps · 4.2 s
          <span className="mx-log-r">Today: 38 runs · 0 failed</span>
        </div>
      </div>
      <aside className="mx-side">
        <h5>AI model step</h5>
        <div className="mx-field"><small>Model</small><b>Llama 4 Scout</b></div>
        <div className="mx-field"><small>Fallback</small><b>Qwen3 · Llama 3.3</b></div>
        <div className="mx-field"><small>Instruction</small><p>Classify the enquiry by service and urgency, then draft a friendly reply and a short proposal outline.</p></div>
        <div className="mx-field row"><small>Human review</small><span className="mx-toggle on"></span></div>
        <h5>Other automations</h5>
        <div className="mx-mini"><span>Weekly KPI report</span><span className="mx-toggle on"></span></div>
        <div className="mx-mini"><span>Nightly backups</span><span className="mx-toggle on"></span></div>
        <div className="mx-mini"><span>Invoice reminders</span><span className="mx-toggle"></span></div>
      </aside>
    </div>
  );
}

/* ---------- AI Models: hosted open models ---------- */
const models = [
  { name: "Llama 3.3 70B", task: "Chat & reasoning", host: "Cloud GPU", lat: "0.4 s", req: "18.2k", spark: [6, 9, 7, 11, 10, 14, 13] },
  { name: "Llama 4 Scout", task: "Vision · documents", host: "Cloud GPU", lat: "0.7 s", req: "6.4k", spark: [4, 5, 7, 6, 8, 9, 11] },
  { name: "Qwen3 32B", task: "Coding · fallback", host: "Bare-metal", lat: "0.5 s", req: "4.9k", spark: [7, 6, 8, 8, 9, 8, 10] },
  { name: "Whisper v3", task: "Speech to text", host: "Bare-metal", lat: "1.1 s", req: "1.3k", spark: [3, 4, 3, 5, 6, 5, 7] },
  { name: "FLUX.2 klein", task: "Image generation", host: "Cloud GPU", lat: "3.8 s", req: "912", spark: [2, 3, 5, 4, 6, 7, 6] },
];
const sparkPath = (v) => v.map((y, i) => `${i ? "L" : "M"}${i * 10} ${16 - y}`).join(" ");

function ModelsScreen() {
  return (
    <div className="mx-split">
      <div className="mx-main">
        <div className="mx-head">
          <strong>Model deployments</strong>
          <span className="mx-pill ok">5 live</span>
          <span className="mx-btn">Deploy model</span>
        </div>
        <div className="mx-models">
          <div className="mx-mrow mx-mhead"><span>Model</span><span>Hosting</span><span>Latency</span><span>Requests (24h)</span><span>Trend</span></div>
          {models.map((m) => (
            <div className="mx-mrow" key={m.name}>
              <span className="mx-mname"><span className="mx-okdot"></span><span><b>{m.name}</b><small>{m.task}</small></span></span>
              <span><span className={`mx-host ${m.host === "Bare-metal" ? "bm" : ""}`}>{m.host}</span></span>
              <span className="num">{m.lat}</span>
              <span className="num">{m.req}</span>
              <span><svg width="62" height="18" viewBox="0 -1 62 18" aria-hidden="true"><path d={sparkPath(m.spark)} /></svg></span>
            </div>
          ))}
        </div>
      </div>
      <aside className="mx-side">
        <h5>GPU capacity</h5>
        <div className="mx-gauge"><div><b>72%</b><small>Cloud GPU pool</small></div><span><i style={{ width: "72%" }}></i></span></div>
        <div className="mx-gauge"><div><b>48%</b><small>Bare-metal cluster</small></div><span><i style={{ width: "48%" }}></i></span></div>
        <h5>Guardrails</h5>
        <div className="mx-mini"><span>PII redaction</span><span className="mx-toggle on"></span></div>
        <div className="mx-mini"><span>Auto-fallback</span><span className="mx-toggle on"></span></div>
        <div className="mx-mini"><span>Usage limits</span><span className="mx-toggle on"></span></div>
      </aside>
    </div>
  );
}

/* ---------- Dashboards ---------- */
const trend = [30, 38, 34, 46, 42, 55, 51, 63, 58, 70, 66, 78];
const W = 460, H = 150;
const pts = trend.map((v, i) => [(i / (trend.length - 1)) * W, H - (v / 90) * H]);
const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

function DashboardScreen() {
  return (
    <div className="mx-main mx-dash">
      <div className="mx-head">
        <strong>Operations overview</strong>
        <span className="mx-pill">Last 12 weeks</span>
      </div>
      <div className="mx-kpis">
        <div><small>Uptime</small><b>99.98%</b><em>▲ 0.02%</em></div>
        <div><small>Avg response</small><b>182 ms</b><em>▼ 12 ms</em></div>
        <div><small>Active users</small><b>2,418</b><em>▲ 9%</em></div>
        <div><small>Cloud cost</small><b>$1.2k</b><em>▼ 6%</em></div>
      </div>
      <div className="mx-dgrid">
        <div className="mx-card">
          <div className="mx-card-h"><b>Requests</b><small>weekly, thousands</small></div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ flex: 1, minHeight: 0 }} aria-hidden="true">
            <defs>
              <linearGradient id="mxa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#C17F3A" stopOpacity=".35" /><stop offset="1" stopColor="#C17F3A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="mx-grid" />)}
            <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#mxa)" />
            <path d={line} className="mx-line" />
          </svg>
        </div>
        <div className="mx-card">
          <div className="mx-card-h"><b>Traffic by region</b></div>
          {[["Asia Pacific", 46], ["Europe", 27], ["North America", 19], ["Middle East", 8]].map(([r, p]) => (
            <div className="mx-reg" key={r}><span>{r}</span><span className="mx-bar"><i style={{ width: `${p * 2}%` }}></i></span><b>{p}%</b></div>
          ))}
        </div>
      </div>
      <div className="mx-log"><span className="mx-okdot"></span> All systems operational<span className="mx-log-r">Updated 1 min ago</span></div>
    </div>
  );
}

/* ---------- Cloud & Bare-Metal: slim macOS terminal ---------- */
const P = "~/infra ❯ ";
const termLines = [
  { t: "cmd", s: "zt provision --site mumbai-dc1 --nodes 3" },
  { t: "out", s: "▸ Bare-metal  PXE boot · 3 servers online", r: "done 2m14s" },
  { t: "out", s: "▸ Ubuntu 24.04 LTS · RAID-10 · LVM", r: "✓" },
  { t: "out", s: "▸ Ansible  hardening, firewall, monitoring", r: "✓ 42 tasks" },
  { t: "cmd", s: "terraform apply -auto-approve" },
  { t: "dim", s: "  + cloudflare_load_balancer.api  + aws_eks_cluster.prod" },
  { t: "dim", s: "  + google_container_cluster.eu    + cloudflare_waf.rules" },
  { t: "ok", s: "  Apply complete! Resources: 14 added, 0 changed, 0 destroyed." },
  { t: "cmd", s: "kubectl rollout status deploy/api -n prod" },
  { t: "ok", s: "  deployment \"api\" rolled out · 6/6 pods ready" },
  { t: "cmd", s: "zt health --all" },
  { t: "row", c: ["mumbai-dc1", "bare-metal", "3/3", "healthy", "CPU 34%"] },
  { t: "row", c: ["aws-ap-south", "EKS", "6/6", "healthy", "p95 182ms"] },
  { t: "row", c: ["gcp-europe", "GKE", "4/4", "healthy", "p95 164ms"] },
  { t: "ok", s: "  Backups ✓  TLS ✓  Alerts 0  Cost today $38.20" },
];

// Network map links: users -> edge -> load balancer -> three target pools.
const nwPaths = [
  "M186 46 L186 84",
  "M186 126 L186 164",
  "M186 206 C186 236 56 232 56 262",
  "M186 206 L186 262",
  "M186 206 C186 236 316 232 316 262",
];

function TerminalScene() {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setShown((n) => (n < termLines.length ? n + 1 : n)), 380);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="tm-scene">
      <div className="tm-window">
        <div className="tm-bar">
          <span className="mx-lights"><i></i><i></i><i></i></span>
          <span className="tm-tabs"><span className="on">infra — zsh</span><span>k8s — logs</span></span>
        </div>
        <div className="tm-body">
          {termLines.slice(0, shown).map((l, i) => {
            if (l.t === "cmd") return <div key={i} className="tm-l"><span className="tm-p">{P}</span>{l.s}</div>;
            if (l.t === "row") return (
              <div key={i} className="tm-l tm-row">
                <span>{l.c[0]}</span><span className="tm-dim">{l.c[1]}</span><span>{l.c[2]}</span>
                <span className="tm-ok">● {l.c[3]}</span><span className="tm-dim">{l.c[4]}</span>
              </div>
            );
            return <div key={i} className={`tm-l tm-${l.t}`}><span>{l.s}</span>{l.r && <span className="tm-r">{l.r}</span>}</div>;
          })}
          <div className="tm-l"><span className="tm-p">{P}</span><span className="tm-cursor"></span></div>
        </div>
      </div>
      <div className="nw-window">
        <div className="tm-bar">
          <span className="mx-lights"><i></i><i></i><i></i></span>
          <span className="tm-tabs"><span className="on">Network · live traffic</span></span>
        </div>
        <div className="nw-body">
          <div className="nw-map">
            <svg className="nw-links" viewBox="0 0 372 320" aria-hidden="true">
              {nwPaths.map((d, i) => (
                <g key={i}>
                  <path id={`nwp${i}`} d={d} />
                  <circle r="3.2" className="nw-pkt">
                    <animateMotion dur={`${1.3 + (i % 3) * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.2}s`}><mpath href={`#nwp${i}`} /></animateMotion>
                  </circle>
                </g>
              ))}
            </svg>
            <div className="nw-node" style={{ left: 96, top: 4 }}><span className="nw-ic">◍</span><span><b>Users worldwide</b><small>42.1k req/min</small></span></div>
            <div className="nw-node edge" style={{ left: 96, top: 84 }}><span className="nw-ic">⛨</span><span><b>Cloudflare edge</b><small>CDN · WAF · DDoS</small></span></div>
            <div className="nw-node lb" style={{ left: 96, top: 164 }}><span className="nw-ic">⇆</span><span><b>Load balancer</b><small>L7 · health checks</small></span></div>
            {[["AWS · EKS", "ap-south-1", "45%", 0], ["GCP · GKE", "europe-west", "30%", 130], ["Bare-metal", "Mumbai DC1", "25%", 260]].map(([a, b, c, x]) => (
              <div className="nw-target" key={a} style={{ left: x, top: 262 }}>
                <span className="mx-okdot"></span><span><b>{a}</b><small>{b}</small></span><em>{c}</em>
              </div>
            ))}
          </div>
          <div className="nw-stats">
            <div><small>p95 latency</small><b>164 ms</b></div>
            <div><small>Error rate</small><b>0.01%</b></div>
            <div><small>Threats blocked</small><b>1,204</b></div>
            <div><small>Uptime · 30d</small><b>99.99%</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  {
    key: "ai",
    label: "AI Assistant",
    nav: "Assistant",
    title: "AI that works alongside your team",
    desc: "ZulfiEra AI and custom assistants read your documents and screenshots, answer questions, draft replies and tickets, and connect to the tools you already use.",
    points: ["Assistants trained on your documents", "Secure sign-in, plans and admin controls", "Runs on cloud or your own servers"],
    Screen: AssistantScreen,
  },
  {
    key: "auto",
    label: "Automation",
    nav: "Automations",
    title: "Workflows that run themselves",
    desc: "Visual workflows connect your website, CRM, chat and cloud. AI model steps handle the parts that need judgment, with human review where it matters.",
    points: ["Lead capture, onboarding and reporting", "AI steps to classify, draft and summarise", "Monitored runs with alerts on failure"],
    Screen: AutomationScreen,
  },
  {
    key: "cloud",
    label: "Cloud & Bare-Metal",
    terminal: true,
    ms: 9000,
    title: "Cloud and bare-metal, automated end to end",
    desc: "One command provisions bare-metal servers, cloud clusters, DNS and monitoring. Infrastructure as code with Terraform, Ansible and Kubernetes, across AWS, Google Cloud, Cloudflare and your own data centre.",
    points: ["Bare-metal provisioning and hardening", "Terraform, Ansible and Kubernetes pipelines", "Hybrid monitoring, backups and cost control"],
  },
  {
    key: "models",
    label: "AI Models",
    nav: "AI Models",
    title: "Open AI models, deployed and managed",
    desc: "We deploy and operate open-weight models for chat, vision, speech and images on cloud GPUs or bare-metal, with fallbacks, guardrails and usage limits built in.",
    points: ["Private hosting: your data stays yours", "Automatic fallback between models", "Latency, usage and cost monitoring"],
    Screen: ModelsScreen,
  },
  {
    key: "dash",
    label: "Dashboards",
    nav: "Dashboards",
    title: "Every metric on one screen",
    desc: "Live dashboards and client portals that bring uptime, performance, users and cost together, on desktop, tablet and mobile.",
    points: ["Real-time infrastructure and product metrics", "Branded client portals with secure access", "Cost tracking across cloud providers"],
    Screen: DashboardScreen,
  },
];

const navIcons = { ai: "✦", auto: "⟳", models: "◈", dash: "▦" };

export default function DeviceShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState(1);
  const displayRef = useRef(null);

  // Gently rotate through the tabs until the visitor picks one.
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setActive((i) => (i + 1) % tabs.length), tabs[active].ms || 7000);
    return () => clearTimeout(t);
  }, [paused, active]);

  // Scale the fixed-size screen design to the display's actual width.
  useLayoutEffect(() => {
    const el = displayRef.current;
    if (!el) return undefined;
    const fit = () => setScale(el.clientWidth / STAGE_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pick = (i) => { setActive(i); setPaused(true); };
  const tab = tabs[active];
  const Screen = tab.Screen;

  return (
    <section className="showcase" id="showcase">
      <div className="showcase-glow" aria-hidden="true"></div>
      <div className="wrap">
        <div className="section-head reveal showcase-head">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">See it in action</span></div>
          <h2>AI, automation and insight on every screen</h2>
        </div>

        <div className="ios-tabs" role="tablist" aria-label="Product examples">
          {tabs.map((t, i) => (
            <button key={t.key} role="tab" aria-selected={i === active} className={i === active ? "on" : ""} onClick={() => pick(i)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="showcase-text" key={tab.key}>
          <h3>{tab.title}</h3>
          <p>{tab.desc}</p>
          <ul className="showcase-points">
            {tab.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="macbook" role="img" aria-label={`${tab.label} sample screen`}>
          <div className="mac-lid">
            <span className="mac-notch" aria-hidden="true"></span>
            <div className="mac-display" ref={displayRef}>
              <div className="mx-stage" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
                {tab.terminal ? <TerminalScene key="term" /> : (
                <div className="mx-window">
                  <div className="mx-titlebar">
                    <span className="mx-lights"><i></i><i></i><i></i></span>
                    <span className="mx-title">{tab.nav}</span>
                  </div>
                  <div className="mx-body">
                    <nav className="mx-nav">
                      <div className="mx-brand"><b><BrandName /></b></div>
                      {tabs.map((t, i) => t.terminal ? null : (
                        <span key={t.key} className={i === active ? "on" : ""}><em>{navIcons[t.key]}</em>{t.nav}</span>
                      ))}
                      <div className="mx-nav-foot"><span className="mx-okdot"></span>All systems normal</div>
                    </nav>
                    <div className="mx-content" key={tab.key}><Screen /></div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="mac-base" aria-hidden="true"><span></span></div>
        </div>
        <p className="phone-note">Screens show sample data.</p>
      </div>
    </section>
  );
}
