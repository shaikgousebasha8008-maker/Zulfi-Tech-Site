import { useState } from "react";

const faqs = [
  {
    q: "Do you require a long-term contract?",
    a: "No. Most engagements start month-to-month. If a client wants a contracted term for pricing stability, that's available too, but it's never a requirement.",
  },
  {
    q: "Can you take over infrastructure someone else set up?",
    a: "Yes — this is a large part of what we do. We start with an audit of what exists (DNS, IPs, server configuration, sending history) before touching anything, so we understand what we're inheriting.",
  },
  {
    q: "We already have IPs on a blocklist. Can you help?",
    a: "Usually, yes. Delisting starts with figuring out why the listing happened — misconfigured records, a compromised sender, genuine complaint volume — since the fix depends entirely on the cause.",
  },
  {
    q: "Do you only work with Google Cloud and AWS?",
    a: "Those are the two we work with most, alongside bare metal and VMs from a range of providers. If you're on a different platform, tell us what you're running and we'll say plainly whether it's something we can support.",
  },
  {
    q: "What do you need from us to get a quote?",
    a: "A rough picture of what you're running or want built — approximate server/IP count, sending volume if it's a deliverability engagement, and your timeline. Use the form below or email us directly.",
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
          <p>Answers to what usually comes up before an engagement starts.</p>
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
