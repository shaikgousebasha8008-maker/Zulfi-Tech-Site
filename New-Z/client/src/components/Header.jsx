import { useState } from "react";
import { Link } from "react-router-dom";
import { BrandName } from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { href: "#services", label: "Solutions" },
  { to: "/services", label: "Services" },
  { href: "#product", label: "ZulfiEra Ai" },
  { href: "#showcase", label: "AI & Automation" },
  { href: "#offline", label: "Offline AI" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav>
        <a href="#top" className="brand">
          <BrandName />
        </a>
        <div className="nav-links">
          {links.map((l) =>
            l.to ? <Link key={l.to} to={l.to}>{l.label}</Link> : <a key={l.href} href={l.href}>{l.label}</a>,
          )}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/login" className="nav-login"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>Client Login</Link>
          <a href="#contact" className="nav-cta">Get in touch</a>
        </div>
        <ThemeToggle className="theme-toggle-mobile" />
        <button
          className={`nav-burger${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-mobile${open ? " open" : ""}`}>
        {links.map((l) =>
          l.to
            ? <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
            : <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>,
        )}
        <Link to="/login" onClick={() => setOpen(false)}>Client Login</Link>
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Get in touch</a>
      </div>
    </header>
  );
}
