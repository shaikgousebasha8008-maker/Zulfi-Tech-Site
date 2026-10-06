import ArchitectureDiagram from "./ArchitectureDiagram.jsx";

// Suggestion cards copied from the real ZulfiEra AI welcome screen (ai.zulfi-tech.com).
const suggestions = [
  { cls: "ic-image", title: "Create an image", sub: "Logos, posters, photo edits", svg: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="9" cy="9" r="1.8" /><path d="m21 15-4.5-4.5L6 21" /></> },
  { cls: "ic-mail", title: "Write a pro email", sub: "Replies, updates, tickets", svg: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></> },
  { cls: "ic-file", title: "Explain a file", sub: "PDF, Word, screenshots", svg: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></> },
  { cls: "ic-code", title: "Fix my code", sub: "Debug, DevOps, cloud", svg: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" /> },
];

const features = [
  { icon: "💬", text: "Chat, coding and research" },
  { icon: "📄", text: "Reads photos, PDFs and Word" },
  { icon: "🎨", text: "Creates and edits images" },
  { icon: "🎙️", text: "Voice input and projects" },
];

function AppPreview() {
  return (
    <div className="zp-app" aria-hidden="true">
      <div className="zp-bar">
        <span className="mx-lights"><i></i><i></i><i></i></span>
        <span className="zp-url">🔒 ai.zulfi-tech.com</span>
      </div>
      <div className="zp-body">
        <aside className="zp-side">
          <span className="zp-new">＋ New chat</span>
          <small>Projects</small>
          <span>📁 Server migration</span>
          <small>Recent</small>
          <span className="on">Docker exit code 137</span>
          <span>Client proposal email</span>
          <span>Gulmarg trip plan</span>
        </aside>
        <div className="zp-main">
          <img src="/zulfiera-mark.svg?v=7" alt="" className="zp-logo" />
          <p className="zp-eyebrow">Zulfi<span>Era AI</span></p>
          <h4>What can I help you with<span>?</span></h4>
          <div className="zp-sugg">
            {suggestions.map((s) => (
              <div className="zp-sg" key={s.title}>
                <span className={`zp-ic ${s.cls}`}><svg viewBox="0 0 24 24">{s.svg}</svg></span>
                <span><b>{s.title}</b><small>{s.sub}</small></span>
              </div>
            ))}
          </div>
          <div className="zp-composer">
            <em className="zp-plus">＋</em>
            <span className="zp-ph">Ask anything</span>
            <span className="zp-think">💡 Think</span>
            <em className="zp-send">↑</em>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <section className="platform" id="product">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><span className="txt">Built by ZulfiTech</span></div>
          <h2>Products and platforms we run ourselves</h2>
          <p>We build and operate our own products on the same stack we deliver for clients, so every recommendation comes from real production experience.</p>
        </div>
        <div className="platform-grid">
          <div className="platform-panel zp-panel reveal">
            <div className="pp-head">
              <img src="/zulfiera-mark.svg?v=7" alt="" className="pp-logo" />
              <div><h3>Zulfi<span className="gold">Era AI</span></h3><small>AI assistant · web, iPhone and Android</small></div>
              <span className="pp-live"><i></i>Live</span>
            </div>
            <p>Our own AI assistant: a sharp, friendly expert for infrastructure, code, business writing and everyday questions. Free to try, with Premium plans for teams.</p>
            <AppPreview />
            <div className="zp-feats">
              {features.map((f) => <span key={f.text}><em aria-hidden="true">✓</em>{f.text}</span>)}
            </div>
            <div className="pp-ctas">
              <a href="https://ai.zulfi-tech.com" className="btn-primary" target="_blank" rel="noreferrer">Try ZulfiEra AI free</a>
              <span className="pp-note">No card needed · sign in with Google or email</span>
            </div>
          </div>
          <div className="platform-panel ad-panel reveal">
            <div className="pp-head">
              <span className="pp-icon"><svg viewBox="0 0 24 24"><path d="M7 11a4.5 4.5 0 0 1 8.7-1.6A3.5 3.5 0 1 1 17.5 16H7a2.5 2.5 0 0 1 0-5z" /></svg></span>
              <div><h3>Cloud Infrastructure</h3><small>Reference architecture we deploy</small></div>
              <span className="pp-live"><i></i>Live traffic</span>
            </div>
            <p>Traffic passes through the edge network and a load balancer to instances that scale with demand, backed by a replicated database, backups and 24/7 monitoring.</p>
            <ArchitectureDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
