const expertise = [
  "AI & SaaS — assistants, agents and product engineering",
  "Cloud & bare metal — Google Cloud, AWS, Cloudflare and dedicated servers",
  "Platform engineering — Kubernetes, Docker and CI/CD",
  "Web — websites, web apps, dashboards and client portals",
  "Automation, integrations and 24/7 monitoring",
];

export default function TeamPricing() {
  return (
    <section className="team-pricing" id="team">
      <div className="wrap">
        <div className="tp-grid">
          <div>
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Our expertise</span></div>
              <h2>One team, every layer</h2>
              <p>A focused team of engineers covering the full stack, from AI models to the servers they run on.</p>
            </div>
            <ul className="expertise-list reveal">
              {expertise.map((e) => (
                <li key={e}><span className="dot"></span>{e}</li>
              ))}
            </ul>
          </div>
          <div className="pricing-box reveal">
            <h3>Engagements</h3>
            <p>Every project is different, so we scope and price it around what you actually need rather than a one-size-fits-all package.</p>
            <ul>
              <li>Fixed-scope projects or ongoing managed services</li>
              <li>No hidden markup on cloud provider costs</li>
              <li>Monthly or annual terms, with no long lock-in</li>
            </ul>
            <a href="#contact" className="btn-primary">Request a proposal</a>
          </div>
        </div>
      </div>
    </section>
  );
}
