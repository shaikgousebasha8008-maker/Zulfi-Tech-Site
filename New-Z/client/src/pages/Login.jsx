import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
    <div>
      <header className="site-header">
        <nav>
          <Link to="/" className="brand">
            <Logo variant="onDark" className="brand-mark" />
            Zulfi<span className="accent">Tech</span>
          </Link>
        </nav>
      </header>

      <div className="auth-page">
        <div className="auth-card">
          <div className="eyebrow-mark" style={{ justifyContent: "center", margin: "0 auto 22px" }}>
            <div className="diamond" style={{ borderColor: "var(--graphite)" }}></div>
            <div className="eline" style={{ background: "var(--graphite)", width: 40, animation: "none" }}></div>
            <span className="txt" style={{ color: "var(--graphite)" }}>CLIENT LOGIN</span>
          </div>
          <h1>Sign in to your portal</h1>
          <p className="auth-sub">Server status, tickets, and invoices for the infrastructure we manage for you.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={status === "sending"}>
              {status === "sending" ? "Signing in..." : "Sign in"}
            </button>
            {status === "error" && <p className="form-status error">{errorMsg}</p>}
          </form>

          <p className="auth-footnote">
            Not a client yet? <a href="mailto:info@zulfi-tech.com">Get in touch</a> or{" "}
            <Link to="/#contact">request a quote</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
