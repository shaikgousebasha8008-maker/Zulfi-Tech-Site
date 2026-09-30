const points = [
  {
    idx: "01",
    title: "We run what we build",
    desc: "Our own products, including ZulfiEra AI, run on the same cloud and automation stack we deliver. You get engineering proven in production, not theory.",
  },
  {
    idx: "02",
    title: "One team, not a hand-off chain",
    desc: "The engineers who design your platform are the same people who launch it, monitor it and answer when you need them.",
  },
  {
    idx: "03",
    title: "Transparent and built to last",
    desc: "Clear written scopes, no hidden markup on cloud costs, and documented systems you fully own, so you're never locked in.",
  },
];

export default function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Why ZulfiTech</span></div>
          <h2>Why businesses choose ZulfiTech</h2>
          <p>We built our own products and tools before we ever offered them as a service.</p>
        </div>
        <div className="why-grid">
          {points.map((p) => (
            <div className="why-item reveal" key={p.idx}>
              <div className="idx">{p.idx}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
