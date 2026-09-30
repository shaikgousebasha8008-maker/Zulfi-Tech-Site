const cases = [
  {
    tag: "AI & SaaS",
    title: "Launching ZulfiEra AI, a full AI assistant, on serverless infrastructure",
    desc: "Designed and shipped our own AI assistant with chat, document and image understanding, image creation, voice input, secure sign-in and usage-based plans, running on open AI models with automatic failover between providers.",
  },
  {
    tag: "Dashboards",
    title: "One view across a multi-server fleet",
    desc: "Built dashboards that bring activity and health data from many independent servers into a single view, with per-server and per-environment breakdowns that were previously impossible to see at a glance.",
  },
  {
    tag: "Web platform",
    title: "A secure client portal on the edge",
    desc: "Delivered a client portal with secure sign-in, sessions and a managed database, deployed on a global edge network, so clients reach their workspace quickly from anywhere.",
  },
];

export default function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Our work</span></div>
          <h2>Built and delivered</h2>
          <p>A few examples of what we've designed, built and run. Client names are kept confidential.</p>
        </div>
        <div className="case-grid">
          {cases.map((c) => (
            <div className="case-card reveal" key={c.title}>
              <div className="tag">{c.tag}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
