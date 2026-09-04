export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow"></div>
      <div className="hero-gridbg"></div>
      <div className="wrap">
        <div className="eyebrow-mark">
          <div className="diamond"></div>
          <div className="eline"></div>
          <span className="txt">CLOUD &middot; BARE METAL &middot; EMAIL &middot; WEB</span>
        </div>
        <h1>
          Infrastructure <span className="accent">that delivers.</span>
        </h1>
        <p className="lede">
          Cloud, bare metal, and email infrastructure built and managed properly —
          Google Cloud, AWS, dedicated servers and VMs, deliverability engineering,
          and the websites that sit on top of it all.
        </p>
        <div className="hero-ctas">
          <a href="#services" className="btn-primary">View services</a>
          <a href="#contact" className="btn-secondary">Talk to us</a>
        </div>
        <div className="hero-badges">
          <span>Google Cloud</span>
          <span>AWS</span>
          <span>SPF · DKIM · DMARC</span>
          <span>Bare Metal</span>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">5</div><div className="lbl">infrastructure domains</div></div>
          <div className="hero-stat"><div className="num">1</div><div className="lbl">team, start to finish</div></div>
          <div className="hero-stat"><div className="num">24/7</div><div className="lbl">monitored environments</div></div>
        </div>
      </div>
    </section>
  );
}
