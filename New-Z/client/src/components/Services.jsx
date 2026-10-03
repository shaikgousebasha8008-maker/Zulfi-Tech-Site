import { Link } from "react-router-dom";
import { icons } from "./ServiceIcons.jsx";
import { pillars, money } from "../data/services.js";
import { useCurrency } from "../useCurrency.js";

export default function Services() {
  const [cur, setCur] = useCurrency();
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><span className="txt">What we do</span></div>
          <h2>Three practices, one accountable team</h2>
          <p>From AI products to the infrastructure beneath them and the interfaces on top, one team designs, builds and runs it all.</p>
        </div>
        <div className="svc-currency" role="radiogroup" aria-label="Currency">
          {["INR", "USD"].map((c) => (
            <button key={c} type="button" role="radio" aria-checked={cur === c} onClick={() => setCur(c)}>
              {c === "INR" ? "₹ INR" : "$ USD"}
            </button>
          ))}
        </div>
        <div className="service-grid">
          {pillars.map((s, i) => (
            <div className="service-card reveal" key={s.title}>
              <div className="service-top">
                <div className="service-icon" aria-hidden="true">{icons[s.icon]}</div>
                <span className="service-num">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-list priced">
                {s.items.map((item) => (
                  <li key={item.name}>
                    <span className="svc-name">
                      <b>{item.name}</b>
                      {item.tag && <em className="svc-tag">{item.tag}</em>}
                      <span className="svc-sub">{item.sub}</span>
                    </span>
                    <span className="svc-price">
                      {item.price ? (
                        <>
                          <small>from </small>{money(item.price, cur)}
                          {item.per && <small> / {item.per}</small>}
                        </>
                      ) : (
                        <small className="svc-quote">Custom quote</small>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="svc-foot">
                <div>
                  <span className="svc-from-label">Starting at</span>
                  <span className="svc-from">
                    {money(s.from.price, cur)}
                    {s.from.per && <small> / {s.from.per}</small>}
                  </span>
                </div>
                <a href="#contact" className="svc-cta">Get a quote →</a>
              </div>
            </div>
          ))}
        </div>
        <p className="svc-note reveal">
          Starting prices for a typical project. You get an exact, fixed quote after a free 30-minute call.{" "}
          {cur === "INR" ? "GST (18%) extra." : "Local taxes may apply."} Monthly support plans are available for everything we build.
        </p>
        <div className="svc-guide-link reveal">
          <Link to="/services" className="btn-ghost-dark">Read the full services guide →</Link>
        </div>
      </div>
    </section>
  );
}
