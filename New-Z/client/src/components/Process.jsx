const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "We learn your goals and review what you run today (applications, infrastructure, costs and workflows), then tell you plainly what's solid and what isn't.",
  },
  {
    n: "02",
    title: "Design & scope",
    desc: "A written proposal with the architecture, deliverables, timeline and cost. No open-ended retainers before you know exactly what you're paying for.",
  },
  {
    n: "03",
    title: "Build & launch",
    desc: "Engineering, migration or rollout happens with a named lead on point, the same person you'll speak to after go-live.",
  },
  {
    n: "04",
    title: "Operate & improve",
    desc: "Once it's live, it's monitored for uptime, performance, security and cost, and improved continuously as your business grows.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Our approach</span></div>
          <h2>Four steps, no surprises</h2>
          <p>Every engagement follows the same path, whether it's a single website or a full platform build.</p>
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
