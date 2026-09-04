const cases = [
  {
    tag: "Deliverability",
    title: "Untangling a Spamhaus SBL listing built on the wrong evidence",
    desc: "A client's subnet was listed on Spamhaus with evidence pointing to IPs and domains that didn't belong to them. We proved the mismatch through IP-range analysis, DNS verification, and account cross-referencing — turning a vague dispute into a factual case.",
  },
  {
    tag: "Monitoring",
    title: "Unified visibility across a multi-server mail fleet",
    desc: "Built dashboards aggregating sent/bounce/suppression data across multiple independent mail servers into one view — with per-domain, per-IP, and per-instance breakdowns previously impossible to see at a glance.",
  },
  {
    tag: "IP Reputation",
    title: "Diagnosing rate-limit throttling before it becomes a bigger problem",
    desc: "Traced a sending backlog to ISP-level rate-limiting rather than a broken pipeline, using the mail server's own rate-limit records — avoiding a much larger reputation problem from resuming full-volume sending too soon.",
  },
];

export default function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">Case studies</span></div>
          <h2>Problems we've actually solved</h2>
          <p>No client names, just the real work — because the infrastructure problems are the interesting part.</p>
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
