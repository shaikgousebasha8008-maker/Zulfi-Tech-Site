import { useState } from "react";

const services = ["AI & SaaS", "Cloud & Bare-Metal", "Websites & Automation", "Not sure yet"];

const steps = [
  { n: "1", t: "Share your brief", d: "Tell us what you want to build or improve." },
  { n: "2", t: "We review it", d: "An engineer reads it and asks the right questions." },
  { n: "3", t: "Clear plan", d: "You get a plan, timeline and next steps." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [service, setService] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const details = service ? `[Interested in: ${service}]\n${form.details}` : form.details;
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", details: "" });
      setService("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info reveal">
          <div className="section-head">
            <div className="kicker"><span className="txt">Get in touch</span></div>
            <h2>Let's build what's next.</h2>
            <p>Tell us about your product, platform or project, and we'll reply with a clear plan and next steps.</p>
          </div>

          <div className="ci-cards">
            <a href="mailto:info@zulfi-tech.com" className="ci-card">
              <span className="ci-ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg></span>
              <span><small>Email</small><b>info@zulfi-tech.com</b></span>
              <em aria-hidden="true">→</em>
            </a>
            <a href="https://wa.me/917386533633" target="_blank" rel="noreferrer" className="ci-card">
              <span className="ci-ic wa"><svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /><path d="M9.5 9.5c.3 1.8 2.2 3.8 4 4.2l1-1 1.6.8c-.2 1-1 1.6-2 1.5-3-.3-5.9-3.2-6.1-6.1 0-1 .6-1.8 1.5-2l.8 1.6z" /></svg></span>
              <span><small>WhatsApp</small><b>+91 73865 33633</b></span>
              <em aria-hidden="true">→</em>
            </a>
          </div>

          <ol className="ci-steps">
            {steps.map((s) => (
              <li key={s.n}><span>{s.n}</span><div><b>{s.t}</b><small>{s.d}</small></div></li>
            ))}
          </ol>
        </div>

        <form className="quote-card reveal" onSubmit={handleSubmit}>
          <h3>Request a proposal</h3>
          <p className="qc-sub">Takes about a minute. We reply personally.</p>

          <span className="qc-label">What do you need?</span>
          <div className="qc-chips" role="group" aria-label="Service">
            {services.map((s) => (
              <button type="button" key={s} className={service === s ? "on" : ""} aria-pressed={service === s} onClick={() => setService(service === s ? "" : s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="qf-row">
            <label className="qc-field">
              <span className="qc-label">Full name</span>
              <input type="text" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
            </label>
            <label className="qc-field">
              <span className="qc-label">Work email</span>
              <input type="email" name="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
            </label>
          </div>
          <label className="qc-field">
            <span className="qc-label">Project details</span>
            <textarea
              name="details"
              placeholder="What would you like to build or improve? Goals, current setup, timeline…"
              rows={5}
              value={form.details}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button type="submit" className="btn-primary qc-submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send request →"}
          </button>
          {status === "success" && <p className="form-status success">Thanks, we've got it. We'll get back to you shortly.</p>}
          {status === "error" && <p className="form-status error">{errorMsg}</p>}
          <p className="qc-privacy">By sending, you agree to our <a href="/privacy">Privacy Policy</a>.</p>
        </form>
      </div>
    </section>
  );
}
