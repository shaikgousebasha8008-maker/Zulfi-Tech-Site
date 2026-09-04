const expertise = [
  "Cloud infrastructure — Google Cloud & AWS",
  "Systems engineering — bare metal & virtualization",
  "Email deliverability & DNS",
  "Full-stack development",
  "Network operations & monitoring",
];

export default function TeamPricing() {
  return (
    <section className="team-pricing" id="team">
      <div className="wrap">
        <div className="tp-grid">
          <div>
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Who's behind it</span></div>
              <h2>One team, every layer</h2>
              <p>A small, focused team covering the full stack we manage for you.</p>
            </div>
            <ul className="expertise-list reveal">
              {expertise.map((e) => (
                <li key={e}><span className="dot"></span>{e}</li>
              ))}
            </ul>
          </div>
          <div className="pricing-box reveal">
            <h3>Pricing</h3>
            <p>Every infrastructure setup is different, so we quote based on what you actually need rather than a one-size-fits-all plan.</p>
            <ul>
              <li>Scoped to your actual server count, IP volume, and complexity</li>
              <li>No hidden markup on cloud provider costs</li>
              <li>Month-to-month or contracted terms available</li>
            </ul>
            <a href="#contact" className="btn-primary">Get a quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}
