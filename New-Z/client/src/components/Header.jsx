export default function Header() {
  return (
    <header className="site-header">
      <nav>
        <div className="brand">
          Zulfi<span className="accent">Tech</span>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav-cta">Get in touch</a>
      </nav>
    </header>
  );
}
