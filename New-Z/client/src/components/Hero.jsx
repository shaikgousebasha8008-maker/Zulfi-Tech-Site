import { useEffect, useState } from "react";
import SolarSwirl from "./SolarSwirl.jsx";

// Hero visual: a live-looking "AI agent" console that works through an automation,
// with floating cards for the AI model and the infrastructure it runs on. Sample data.
const steps = [
  { title: "Read enquiry and classify", sub: "ZulfiEra Ai · private model" },
  { title: "Provision cloud workspace", sub: "Terraform · AWS + bare-metal" },
  { title: "Deploy dashboard and portal", sub: "Kubernetes · 6/6 pods ready" },
  { title: "Notify team and client", sub: "Slack · email summary" },
];

function HeroVisual() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDone((n) => (n >= steps.length + 2 ? 0 : n + 1)), 1100);
    return () => clearInterval(t);
  }, []);
  const complete = Math.min(done, steps.length);
  const pct = Math.round((complete / steps.length) * 100);

  return (
    <div className="hv" aria-hidden="true">
      <div className="hv-card hv-model">
        <span className="hv-ic">⟳</span>
        <span><small>Automations today</small><b>38 runs · 0 failed</b></span>
      </div>

      <div className="hv-console">
        <div className="hv-bar">
          <span className="mx-lights"><i></i><i></i><i></i></span>
          <span className="hv-title">ZulfiTech · AI agent</span>
          <span className="hv-live"><i></i>Live</span>
        </div>
        <div className="hv-body">
          <div className="hv-prompt"><span className="hv-spark">✦</span><span>Onboard new client <b>Acme Corp</b> and set up their workspace</span></div>
          <ol className="hv-steps">
            {steps.map((s, i) => {
              const state = i < complete ? "ok" : i === complete ? "run" : "wait";
              return (
                <li key={s.title} className={state}>
                  <span className="hv-dot">{state === "ok" ? "✓" : ""}</span>
                  <span><b>{s.title}</b><small>{s.sub}</small></span>
                  <em>{state === "ok" ? "Done" : state === "run" ? "Running" : "Queued"}</em>
                </li>
              );
            })}
          </ol>
          <div className="hv-progress"><span style={{ width: `${pct}%` }}></span></div>
          <div className="hv-foot">
            <span>{complete === steps.length ? "Workflow complete · 4 steps · 38 s" : `Step ${complete + 1} of ${steps.length}`}</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>

      <div className="hv-card hv-infra">
        <span className="hv-ok"></span>
        <span><small>Cloud + bare-metal</small><b>12 nodes healthy</b></span>
      </div>
      <div className="hv-card hv-term"><span>$</span> zt deploy --prod <em>✓</em></div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow"></div>
      <div className="hero-gridbg"></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow-mark">
            <span className="txt">AI &amp; SaaS &middot; Offline AI &middot; Cloud &amp; Bare-Metal &middot; Websites &amp; Automation</span>
          </div>
          <h1>
            AI, cloud and automation, <span className="accent">built for business.</span>
          </h1>
          <p className="lede">
            ZulfiTech builds AI products that run online or <b className="lede-hl">fully offline</b>, the cloud and
            bare-metal infrastructure behind them, and the websites, dashboards and automation that move a
            business forward. One accountable team, end to end.
          </p>
          <div className="hero-ctas">
            <a href="#services" className="btn-primary">Explore solutions</a>
            <a href="https://ai.zulfi-tech.com" className="btn-secondary" target="_blank" rel="noreferrer">Try ZulfiEra Ai</a>
          </div>
          <div className="hero-badges">
            <span>AI &amp; LLM products</span>
            <a href="#offline" className="badge-offline">🛰️ Offline &amp; satellite AI</a>
            <span>Google Cloud</span>
            <span>AWS</span>
            <span>Cloudflare</span>
            <span>Kubernetes &amp; Docker</span>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">3</div><div className="lbl">core practices</div></div>
            <div className="hero-stat"><div className="num">1</div><div className="lbl">accountable team</div></div>
            <div className="hero-stat"><div className="num">24/7</div><div className="lbl">monitored environments</div></div>
          </div>
        </div>
        <div className="hero-3d">
          <SolarSwirl />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
