import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo, { BrandName } from "../components/Logo.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const perks = [
  { icon: "◉", t: "Live service status", d: "Uptime and health of everything we run for you" },
  { icon: "✎", t: "Support tickets", d: "Raise and track requests with our engineers" },
  { icon: "▤", t: "Invoices and reports", d: "Billing, usage and monthly reports in one place" },
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState(null); // null | "sending" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      navigate("/portal");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="lg-page">
      <aside className="lg-brand">
        <Link to="/" className="brand lg-logo">
          <Logo variant="onDark" className="brand-mark" />
          <BrandName />
        </Link>
        <div className="lg-brand-body">
          <div className="eyebrow-mark"><span className="txt">Client portal</span></div>
          <h2>Everything we run for you, in one place.</h2>
          <ul className="lg-perks">
            {perks.map((p) => (
              <li key={p.t}><span className="lg-ic">{p.icon}</span><div><b>{p.t}</b><small>{p.d}</small></div></li>
            ))}
          </ul>
          <div className="lg-status">
            <span className="mx-okdot"></span>
            <div><b>All systems operational</b><small>Monitored 24/7 by the ZulfiTech team</small></div>
          </div>
        </div>
        <p className="lg-foot">© {new Date().getFullYear()} ZulfiTech · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></p>
      </aside>

      <main className="lg-main">
        <div className="lg-top"><Link to="/" className="lg-back">← Back to website</Link><ThemeToggle /></div>
        <div className="lg-card">
          <span className="lg-lock" aria-hidden="true">
            <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          </span>
          <h1>Sign in to your portal</h1>
          <p className="lg-sub">Use the email and password provided by ZulfiTech.</p>

          <form className="lg-form" onSubmit={handleSubmit}>
            <label>
              <span>Email address</span>
              <input type="email" name="email" placeholder="you@company.com" autoComplete="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              <span>Password</span>
              <div className="lg-pw">
                <input type={showPw ? "text" : "password"} name="password" placeholder="••••••••" autoComplete="current-password" value={form.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <button type="submit" className="btn-primary lg-submit" disabled={status === "sending"}>
              {status === "sending" ? "Signing in…" : "Sign in"}
            </button>
            {status === "error" && <p className="form-status error">{errorMsg}</p>}
          </form>

          <div className="lg-help">
            <span>Forgot your password?</span>
            <a href="mailto:info@zulfi-tech.com?subject=Portal%20password%20reset">Contact support</a>
          </div>
          <p className="lg-secure">🔒 Encrypted connection · Secure session cookies</p>
        </div>
        <p className="lg-new">Not a client yet? <Link to="/#contact">Request a proposal</Link></p>
      </main>
    </div>
  );
}
