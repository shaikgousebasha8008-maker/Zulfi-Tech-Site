import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
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
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", details: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap reveal">
        <div className="eyebrow-mark" style={{ justifyContent: "center", margin: "0 auto 28px" }}>
          <div className="diamond" style={{ borderColor: "var(--graphite)" }}></div>
          <div className="eline" style={{ background: "var(--graphite)", width: 40, animation: "none" }}></div>
          <span className="txt" style={{ color: "var(--graphite)" }}>GET IN TOUCH</span>
        </div>
        <h2>Let's talk about your infrastructure.</h2>
        <p>Tell us what you're running today and where it's falling short — we'll tell you plainly whether we can help.</p>
        <a href="mailto:info@zulfi-tech.com" className="contact-email">info@zulfi-tech.com</a>

        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="qf-row">
            <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
          </div>
          <textarea
            name="details"
            placeholder="What do you need? (services, scale, timeline...)"
            rows={4}
            value={form.details}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Request a quote"}
          </button>
          {status === "success" && <p className="form-status success">Thanks — we'll get back to you shortly.</p>}
          {status === "error" && <p className="form-status error">{errorMsg}</p>}
        </form>

        <div className="contact-alt">
          {/* Replace WHATSAPP_NUMBER_HERE with your number, country code first, no + or spaces (e.g. 919876543210) */}
          <a href="https://wa.me/WHATSAPP_NUMBER_HERE" target="_blank" rel="noreferrer" className="alt-link whatsapp">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
