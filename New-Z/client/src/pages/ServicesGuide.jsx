import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrandName } from "../components/Logo.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { icons } from "../components/ServiceIcons.jsx";
import { products, pillars, supportPlans, steps, safety, faqs, money } from "../data/services.js";
import { useCurrency } from "../useCurrency.js";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "our-software", label: "Our software" },
  ...pillars.map((p) => ({ id: p.id, label: p.title })),
  { id: "monthly", label: "Monthly care plans" },
  { id: "process", label: "How we work" },
  { id: "security", label: "Access & security" },
  { id: "faq", label: "Questions" },
];

function Price({ item, cur }) {
  if (!item.price) return <span className="sg-price quote">Custom quote</span>;
  return (
    <span className="sg-price">
      <small>from</small> {money(item.price, cur)}
      {item.per && <small> / {item.per}</small>}
    </span>
  );
}

// Highlights the section currently on screen in the left-hand contents list.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const tocIds = toc.map((t) => t.id);

export default function ServicesGuide() {
  const [cur, setCur] = useCurrency();
  const active = useActiveSection(tocIds);

  useEffect(() => {
    document.title = "Services & pricing guide · ZulfiTech";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sg">
      <header className="sg-bar">
        <Link to="/" className="brand">
          <BrandName />
        </Link>
        <div className="sg-bar-right">
          <div className="sg-cur" role="radiogroup" aria-label="Currency">
            {["INR", "USD"].map((c) => (
              <button key={c} type="button" role="radio" aria-checked={cur === c} onClick={() => setCur(c)}>
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <Link to="/#contact" className="sg-cta-sm">Get a quote</Link>
        </div>
      </header>

      <section className="sg-hero" id="overview">
        <div className="sg-wrap">
          <Link to="/" className="sg-back">← Back to home</Link>
          <span className="sg-kicker">Services &amp; pricing guide</span>
          <h1>Our software, and the software we build for you</h1>
          <p className="sg-lede">
            ZulfiTech does two things. We build and run our own AI products that you can use today, and we design, build and run
            AI, cloud and web systems for your business. This guide explains every option, what you get, what we need from you,
            and what it costs.
          </p>
          <div className="sg-paths">
            <a href="#our-software" className="sg-path">
              <span className="sg-path-tag">Ready to use</span>
              <h2>Our software</h2>
              <p>Products we built and run. Sign up and start today.</p>
              <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
              <span className="sg-path-go">Explore our software →</span>
            </a>
            <a href={`#${pillars[0].id}`} className="sg-path alt">
              <span className="sg-path-tag">Built for you</span>
              <h2>Your software</h2>
              <p>Projects we design, build and run for your business.</p>
              <ul>{pillars.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
              <span className="sg-path-go">Explore our services →</span>
            </a>
          </div>
          <p className="sg-meta">
            ZulfiEra Ai prices in {cur === "INR" ? "Indian rupees" : "US dollars"} · Services are quoted per project after a free call · Updated October 2026
          </p>
        </div>
      </section>

      <div className="sg-wrap sg-layout">
        <nav className="sg-toc" aria-label="On this page">
          <div className="sg-toc-h">On this page</div>
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className={active === t.id ? "on" : ""}>{t.label}</a>
          ))}
          <Link to="/#contact" className="sg-toc-cta">Talk to us →</Link>
        </nav>

        <main className="sg-main">
          {/* ---------- Our software ---------- */}
          <section id="our-software" className="sg-section">
            <div className="sg-section-head">
              <span className="sg-eyebrow">Ready to use</span>
              <h2>Our software</h2>
              <p>Products we built ourselves and run every day. No project needed: sign up, or ask us to set one up for you.</p>
            </div>
            <div className="sg-products">
              {products.map((p) => (
                <article key={p.id} id={p.id} className="sg-product">
                  <div className="sg-product-top">
                    <h3>{p.name}</h3>
                    <span className={`sg-status ${p.status === "Live" ? "live" : p.status === "Early access" ? "soon" : "biz"}`}>{p.status}</span>
                  </div>
                  <p className="sg-tagline">{p.tagline}</p>
                  <p>{p.what}</p>
                  <ul className="sg-checks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  {p.plans && (
                    <div className="sg-plans">
                      {p.plans.map((pl) => (
                        <div key={pl.name}><b>{pl.name}</b><span>{pl.detail}</span></div>
                      ))}
                    </div>
                  )}
                  <div className="sg-product-foot">
                    <div>
                      {p.price ? <Price item={p} cur={cur} /> : <span className="sg-price quote">{p.priceNote}</span>}
                      {p.price && <div className="sg-price-note">{p.priceNote}</div>}
                    </div>
                    {p.link.href.startsWith("http") ? (
                      <a href={p.link.href} target="_blank" rel="noreferrer" className="sg-btn">{p.link.label} →</a>
                    ) : (
                      <Link to={p.link.href} className="sg-btn ghost">{p.link.label} →</Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ---------- Built for you ---------- */}
          {pillars.map((pl, i) => (
            <section key={pl.id} id={pl.id} className="sg-section">
              <div className="sg-section-head with-icon">
                <div className="sg-icon" aria-hidden="true">{icons[pl.icon]}</div>
                <div>
                  <span className="sg-eyebrow">Built for you · Practice 0{i + 1}</span>
                  <h2>{pl.title}</h2>
                  <p>{pl.desc}</p>
                </div>
                {pl.from && <div className="sg-from">
                  <span>Starting at</span>
                  <b>{money(pl.from.price, cur)}{pl.from.per && <small> / {pl.from.per}</small>}</b>
                </div>}
              </div>

              {pl.items.map((s) => (
                <article key={s.id} id={s.id} className="sg-service">
                  <div className="sg-service-head">
                    <div>
                      <h3>{s.name}{s.tag && <em className="sg-tag">{s.tag}</em>}</h3>
                      <p className="sg-sub">{s.sub}</p>
                    </div>
                    <div className="sg-service-price">
                      <Price item={s} cur={cur} />
                      {s.priceExtra && <small>{s.priceExtra}</small>}
                    </div>
                  </div>
                  <p className="sg-what">{s.what}</p>
                  {s.example && <div className="sg-example"><b>Example</b>{s.example}</div>}
                  <div className="sg-cols">
                    <div>
                      <h4>Who it's for</h4>
                      <p>{s.who}</p>
                    </div>
                    <div>
                      <h4>What you get</h4>
                      <ul className="sg-checks">{s.gets.map((g) => <li key={g}>{g}</li>)}</ul>
                    </div>
                    <div>
                      <h4>What we need from you</h4>
                      <ul className="sg-dots">{s.need.map((n) => <li key={n}>{n}</li>)}</ul>
                    </div>
                  </div>
                  <div className="sg-time"><span>Timeline</span>{s.time}</div>
                </article>
              ))}
            </section>
          ))}

          {/* ---------- Monthly care ---------- */}
          <section id="monthly" className="sg-section">
            <div className="sg-section-head">
              <span className="sg-eyebrow">After launch</span>
              <h2>Monthly care plans</h2>
              <p>Every project can continue on a monthly plan, so it stays fast, secure and up to date without you thinking about it.</p>
            </div>
            <div className="sg-table" role="table" aria-label="Monthly care plans">
              <div className="sg-tr sg-th" role="row"><span role="columnheader">Plan</span><span role="columnheader">What's included</span><span role="columnheader">Pricing</span></div>
              {supportPlans.map((sp) => (
                <div className="sg-tr" role="row" key={sp.name}>
                  <span role="cell"><b>{sp.name}</b></span>
                  <span role="cell">{sp.what}</span>
                  <span role="cell" className="num">
                    {!sp.price ? "Custom quote" : sp.upto ? `${money(sp.price, cur)} – ${money(sp.upto, cur)}` : `from ${money(sp.price, cur)}`}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- Process ---------- */}
          <section id="process" className="sg-section">
            <div className="sg-section-head">
              <span className="sg-eyebrow">Simple and fixed</span>
              <h2>How we work</h2>
              <p>The same clear steps for every project, from a one-week website to a full product launch.</p>
            </div>
            <ol className="sg-steps">
              {steps.map((st, i) => (
                <li key={st.title}>
                  <span className="sg-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{st.title}</h4>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- Security ---------- */}
          <section id="security" className="sg-section">
            <div className="sg-section-head">
              <span className="sg-eyebrow">Your systems stay yours</span>
              <h2>Access &amp; security</h2>
              <p>We ask only for the access a project needs, in the safest form, and you can remove it at any time.</p>
            </div>
            <div className="sg-table three" role="table" aria-label="Access and security rules">
              <div className="sg-tr sg-th" role="row"><span role="columnheader">What</span><span role="columnheader">How we receive it</span><span role="columnheader">Our rule</span></div>
              {safety.map((s) => (
                <div className="sg-tr" role="row" key={s.item}>
                  <span role="cell"><b>{s.item}</b></span>
                  <span role="cell">{s.how}</span>
                  <span role="cell">{s.rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- FAQ ---------- */}
          <section id="faq" className="sg-section">
            <div className="sg-section-head">
              <span className="sg-eyebrow">Good to know</span>
              <h2>Questions</h2>
            </div>
            <div className="sg-faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="sg-final">
            <h2>Not sure which one you need?</h2>
            <p>Tell us what you want to achieve. In a free 30-minute call we'll recommend the simplest option and send a fixed quote.</p>
            <div className="sg-final-actions">
              <Link to="/#contact" className="sg-btn">Book a free call →</Link>
              <a href="mailto:info@zulfi-tech.com" className="sg-btn ghost">info@zulfi-tech.com</a>
            </div>
          </section>
        </main>
      </div>

      <footer className="sg-foot">
        <div className="sg-wrap">
          <span>© 2026 ZulfiTech</span>
          <span>
            <Link to="/">Home</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
