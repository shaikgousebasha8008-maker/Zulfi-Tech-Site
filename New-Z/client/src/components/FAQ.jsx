import { useState } from "react";

const faqs = [
  {
    q: "What does ZulfiTech do?",
    a: "We work across three practices: AI and SaaS products (including our own assistant, ZulfiEra AI), cloud and bare-metal infrastructure, and websites, dashboards and automation. Many clients use us for more than one, with a single team across all of it.",
  },
  {
    q: "Can you build a custom AI assistant for our company?",
    a: "Yes. We build AI assistants and agents that work with your documents, tools and workflows, and we can deploy them on the cloud or on your own servers when data must stay in-house.",
  },
  {
    q: "Can you take over infrastructure someone else set up?",
    a: "Yes, this is a large part of what we do. We start with a review of what exists (servers, cloud accounts, deployments and costs) before changing anything, so we understand exactly what we're inheriting.",
  },
  {
    q: "Which cloud platforms do you work with?",
    a: "Mainly Google Cloud, AWS and Cloudflare, plus dedicated bare-metal servers from a range of providers. If you're on another platform, tell us what you run and we'll say plainly whether we can support it.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "No. Most engagements start monthly or as a fixed-scope project. Annual terms are available if you'd like pricing stability, but they're never required.",
  },
  {
    q: "What do you need from us to get a proposal?",
    a: "A short description of what you want to build or improve, your current setup if there is one, and your timeline. Use the form below and we'll reply with next steps.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">FAQ</span></div>
          <h2>Common questions</h2>
          <p>Answers to what usually comes up before a project starts.</p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div className={`faq-item reveal${isOpen ? " open" : ""}`} key={f.q}>
                <button
                  className="faq-q"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
