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

const pillars = [
  {
    icon: "ai",
    title: "AI & SaaS Products",
    desc: "Intelligent products and software platforms, from idea to launch. We build our own, like ZulfiEra AI, and we build them for clients.",
    items: [
      "ZulfiEra AI, our AI assistant for teams",
      "Custom AI assistants & agents on your data",
      "SaaS product design, engineering & launch",
      "AI integration into existing apps & workflows",
    ],
  },
  {
    icon: "cloud",
    title: "Cloud & Bare Metal",
    desc: "Secure, scalable infrastructure on Google Cloud, AWS, Cloudflare or dedicated hardware, sized to what you actually use and monitored around the clock.",
    items: [
      "Cloud architecture, migration & cost optimisation",
      "Dedicated bare-metal servers & GPU hosting",
      "Kubernetes, Docker & CI/CD pipelines",
      "Security hardening, monitoring & backups",
    ],
  },
  {
    icon: "web",
    title: "Websites, Dashboards & Automation",
    desc: "The digital layer your customers and teams use every day: fast websites, clear dashboards, and automation that removes manual work.",
    items: [
      "Corporate websites & web applications",
      "Analytics dashboards & client portals",
      "Workflow automation & system integrations",
      "CRM setup, reporting & data pipelines",
    ],
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><span className="txt">What we do</span></div>
          <h2>Three practices, one accountable team</h2>
          <p>From AI products to the infrastructure beneath them and the interfaces on top, one team designs, builds and runs it all.</p>
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
              <ul className="service-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
