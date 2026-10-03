import { useEffect, useRef, useState } from "react";

const icons = {
  ai: (
    <svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 1.5v3.5M15 1.5v3.5M9 19v3.5M15 19v3.5M1.5 9h3.5M1.5 15h3.5M19 9h3.5M19 15h3.5" /><path d="M12 8.5c.3 1.9 1.2 2.8 3.1 3.1-1.9.3-2.8 1.2-3.1 3.1-.3-1.9-1.2-2.8-3.1-3.1 1.9-.3 2.8-1.2 3.1-3.1z" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24"><path d="M7 11a4.5 4.5 0 0 1 8.7-1.6A3.5 3.5 0 1 1 17.5 16H7a2.5 2.5 0 0 1 0-5z" /><rect x="4" y="18.5" width="16" height="3.5" rx="1" /><path d="M7 20.25h.01M10 20.25h.01" /></svg>
  ),
  web: (
    <svg viewBox="0 0 24 24"><rect x="2" y="3.5" width="20" height="15" rx="2.5" /><path d="M2 7.5h20M5 5.5h.01M7.5 5.5h.01" /><path d="M6 15l3.5-3.5 2.5 2.5L18 9" /><path d="M8 21.5h8" /></svg>
  ),
};

// Starting prices: [INR, USD]. `per` marks monthly items; everything else is a one-time project price.
// null = priced per quote (hardware varies too much for a fixed number).
const pillars = [
  {
    icon: "ai",
    title: "AI & SaaS Products",
    desc: "Intelligent products and software platforms, from idea to launch. We build our own, like ZulfiEra AI, and we build them for clients.",
    items: [
      { name: "ZulfiEra AI, our AI assistant for teams", price: [349, 8], per: "user / mo" },
      { name: "Custom AI assistants & agents on your data", price: [40000, 900] },
      { name: "SaaS product design, engineering & launch", price: [150000, 3500] },
      { name: "AI integration into existing apps & workflows", price: [30000, 700] },
    ],
    from: { price: [349, 8], per: "month" },
  },
  {
    icon: "cloud",
    title: "Cloud & Bare Metal",
    desc: "Secure, scalable infrastructure on Google Cloud, AWS, Cloudflare or dedicated hardware, sized to what you actually use and monitored around the clock.",
    items: [
      { name: "Cloud architecture, migration & cost optimisation", price: [50000, 1200] },
      { name: "Dedicated bare-metal servers & GPU hosting", price: null },
      { name: "Kubernetes, Docker & CI/CD pipelines", price: [30000, 700] },
      { name: "Security hardening, monitoring & backups", price: [25000, 600] },
    ],
    from: { price: [25000, 600] },
  },
  {
    icon: "web",
    title: "Websites, Dashboards & Automation",
    desc: "The digital layer your customers and teams use every day: fast websites, clear dashboards, and automation that removes manual work.",
    items: [
      { name: "Corporate websites & web applications", price: [15000, 350] },
      { name: "Analytics dashboards & client portals", price: [40000, 900] },
      { name: "Workflow automation & system integrations", price: [30000, 700] },
      { name: "CRM setup, reporting & data pipelines", price: [35000, 800] },
    ],
    from: { price: [15000, 350] },
  },
];

const money = (price, cur) =>
  cur === "INR" ? `₹${price[0].toLocaleString("en-IN")}` : `$${price[1].toLocaleString("en-US")}`;

// First guess from the browser's time zone (no flicker for most visitors), then confirm with Cloudflare.
function useCurrency() {
  const [cur, setCur] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      return /Kolkata|Calcutta/.test(tz) ? "INR" : "USD";
    } catch {
      return "USD";
    }
  });
  const picked = useRef(false);
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : null))
      .then((g) => { if (g?.country && !picked.current) setCur(g.country === "IN" ? "INR" : "USD"); })
      .catch(() => {});
  }, []);
  return [cur, (c) => { picked.current = true; setCur(c); }];
}

export default function Services() {
  const [cur, setCur] = useCurrency();
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><span className="txt">What we do</span></div>
          <h2>Three practices, one accountable team</h2>
          <p>From AI products to the infrastructure beneath them and the interfaces on top, one team designs, builds and runs it all.</p>
        </div>
        <div className="svc-currency" role="radiogroup" aria-label="Currency">
          {["INR", "USD"].map((c) => (
            <button key={c} type="button" role="radio" aria-checked={cur === c} onClick={() => setCur(c)}>
              {c === "INR" ? "₹ INR" : "$ USD"}
            </button>
          ))}
        </div>
        <div className="service-grid">
          {pillars.map((s, i) => (
            <div className="service-card reveal" key={s.title}>
              <div className="service-top">
                <div className="service-icon" aria-hidden="true">{icons[s.icon]}</div>
                <span className="service-num">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-list priced">
                {s.items.map((item) => (
                  <li key={item.name}>
                    <span className="svc-name">{item.name}</span>
                    <span className="svc-price">
                      {item.price ? (
                        <>
                          <small>from </small>{money(item.price, cur)}
                          {item.per && <small> / {item.per}</small>}
                        </>
                      ) : (
                        <small className="svc-quote">Custom quote</small>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="svc-foot">
                <div>
                  <span className="svc-from-label">Starting at</span>
                  <span className="svc-from">
                    {money(s.from.price, cur)}
                    {s.from.per && <small> / {s.from.per}</small>}
                  </span>
                </div>
                <a href="#contact" className="svc-cta">Get a quote →</a>
              </div>
            </div>
          ))}
        </div>
        <p className="svc-note reveal">
          Starting prices for a typical project. You get an exact, fixed quote after a free 30-minute call.{" "}
          {cur === "INR" ? "GST (18%) extra." : "Local taxes may apply."} Monthly support plans are available for everything we build.
        </p>
      </div>
    </section>
  );
}
