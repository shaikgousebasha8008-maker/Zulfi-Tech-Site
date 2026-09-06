export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow"></div>
      <div className="hero-gridbg"></div>
      <div className="wrap">
        <div className="eyebrow-mark">
          <div className="diamond"></div>
          <div className="eline"></div>
          <span className="txt">CLOUD INFRASTRUCTURE &middot; EMAIL SYSTEMS &middot; AUTOMATION</span>
        </div>
        <h1>
          Infrastructure <span className="accent">that delivers.</span>
        </h1>
        <p className="lede">
          We run the cloud servers, email systems, and internal automation that most
          teams don't have in-house — configured properly, monitored continuously,
          and owned by people you can actually reach when something needs attention.
        </p>
        <div className="hero-ctas">
          <a href="#services" className="btn-primary">View services</a>
          <a href="#contact" className="btn-secondary">Talk to us</a>
        </div>
        <div className="hero-badges">
          <span>Google Cloud</span>
          <span>AWS</span>
          <span>SPF · DKIM · DMARC</span>
          <span>CI/CD &amp; Automation</span>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">3</div><div className="lbl">core disciplines</div></div>
          <div className="hero-stat"><div className="num">1</div><div className="lbl">team, start to finish</div></div>
          <div className="hero-stat"><div className="num">24/7</div><div className="lbl">monitored environments</div></div>
        </div>
      </div>
    </section>
  );
}
