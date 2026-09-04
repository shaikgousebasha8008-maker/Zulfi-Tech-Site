const services = [
  {
    mark: "GC",
    title: "Google Cloud Services",
    desc: "Compute Engine, networking, and IAM configured properly from day one — provisioning, cost control, and ongoing management for production workloads on GCP.",
  },
  {
    mark: "AWS",
    title: "AWS",
    desc: "EC2, VPC, and Route 53 setup and operation, sized to what you actually need — including migration support if you're moving off another provider.",
  },
  {
    mark: "BM",
    title: "Bare Metal & VMs",
    desc: "Dedicated servers and virtual machines across multiple providers, provisioned, hardened, and monitored — the foundation everything else runs on.",
  },
  {
    mark: "ED",
    title: "Email Deliverability",
    desc: "IP warmup, SPF/DKIM/DMARC, reverse DNS, reputation monitoring, and blocklist remediation. Includes managed SMTP relay tuned specifically for Outlook, Yahoo, Comcast, and iCloud — the mailbox providers with the strictest, most distinct filtering rules — so mail lands in the inbox, not the spam folder.",
  },
  {
    mark: "WB",
    title: "Website Building",
    desc: "Sites and dashboards built to fit how your business actually operates, from marketing pages to internal tools, hosted on infrastructure we already manage for you.",
    wide: true,
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">What we run</span></div>
          <h2>Five domains, one team</h2>
          <p>We don't hand you off between departments for infrastructure and the applications that depend on it.</p>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <div className={`service-card reveal${s.wide ? " wide" : ""}`} key={s.title}>
              <div className="service-mark">{s.mark}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
