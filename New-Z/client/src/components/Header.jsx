import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav>
        <a href="#top" className="brand">
          <Logo variant="onDark" className="brand-mark" />
          Zulfi<span className="accent">Tech</span>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-login">Client Login</Link>
          <a href="#contact" className="nav-cta">Get in touch</a>
        </div>
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
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <Link to="/login" onClick={() => setOpen(false)}>Client Login</Link>
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Get in touch</a>
      </div>
    </header>
  );
}
