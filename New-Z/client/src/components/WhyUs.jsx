const points = [
  {
    idx: "01",
    title: "We monitor what we manage",
    desc: `Every environment we run comes with real visibility into delivery, uptime, and reputation — not just a status page that says "operational."`,
  },
  {
    idx: "02",
    title: "One team, not a hand-off chain",
    desc: "The people who provision your infrastructure are the same people who answer when something needs attention.",
  },
  {
    idx: "03",
    title: "We fix root causes",
    desc: "Blocklist issues, DNS mismatches, and reputation problems get diagnosed and resolved — not just restarted and hoped away.",
  },
];

export default function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Why us</span></div>
          <h2>Why teams work with us</h2>
          <p>We built our own tools to run this business, before we ever offered it as a service.</p>
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
