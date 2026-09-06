const pillars = [
  {
    mark: "ES",
    title: "Email Systems",
    desc: "SMTP infrastructure and the DNS records around it, configured and monitored for senders who already have real, permissioned recipients — customers, subscribers, transactional traffic.",
    items: ["SMTP relay setup & management", "DNS, SPF, DKIM, DMARC, PTR", "IP & domain reputation monitoring", "Blocklist diagnosis & remediation"],
  },
  {
    mark: "CI",
    title: "Cloud Infrastructure",
    desc: "Servers provisioned, hardened, and kept running — on Google Cloud, AWS, or dedicated hardware, sized to what you actually use.",
    items: ["VPS & VM provisioning (GCP, AWS, bare metal)", "Linux administration & hardening", "Docker & containerized deployments", "CI/CD pipelines, monitoring, backups"],
  },
  {
    mark: "AU",
    title: "Automation",
    desc: "Internal tooling that removes manual work — connecting the systems you already run instead of replacing them.",
    items: ["AI agents for support & internal tasks", "CRM setup & integration", "Workflow automation between tools", "Reporting dashboards & lead systems"],
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">What we run</span></div>
          <h2>Three pillars, one team</h2>
          <p>We don't hand you off between departments for infrastructure, email, and the automation that runs on top of it.</p>
        </div>
        <div className="service-grid">
          {pillars.map((s) => (
            <div className="service-card reveal" key={s.title}>
              <div className="service-mark">{s.mark}</div>
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
