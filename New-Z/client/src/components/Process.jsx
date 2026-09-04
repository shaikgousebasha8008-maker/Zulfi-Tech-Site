const steps = [
  {
    n: "01",
    title: "Audit",
    desc: "We look at what you're running today — cloud spend, server sprawl, DNS records, sender reputation — and tell you plainly what's solid and what isn't.",
  },
  {
    n: "02",
    title: "Scope",
    desc: "A written quote covering exactly what gets built or fixed, on what timeline, for what cost. No open-ended retainers before you know what you're paying for.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Provisioning, migration, or remediation happens with a named engineer on point — the same person you'll talk to if something needs attention afterward.",
  },
  {
    n: "04",
    title: "Monitor",
    desc: "Once it's live, it's watched — uptime, bounce and complaint rates, blocklist status — so problems get caught before they become outages.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">How we work</span></div>
          <h2>Four steps, no surprises</h2>
          <p>Every engagement follows the same path, whether it's a single mail server or a full migration.</p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="process-item reveal" key={s.n}>
              <div className="process-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="process-connector" aria-hidden="true"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
