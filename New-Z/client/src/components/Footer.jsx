import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="brand">Zulfi<span className="accent">Tech</span></div>
          <p>Cloud, bare metal, and email infrastructure — built and managed by one team, start to finish.</p>
        </div>
        <div className="footer-col">
          <div className="footer-h">Site</div>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-col">
          <div className="footer-h">Company</div>
          <a href="mailto:info@zulfi-tech.com">info@zulfi-tech.com</a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <div>&copy; 2026 ZulfiTech. Infrastructure that delivers.</div>
      </div>
      {/*
        Tawk.to live chat - paste your embed script here once you have your account code.
        Example:
        useEffect(() => {
          var s1 = document.createElement("script");
          s1.async = true;
          s1.src = 'https://embed.tawk.to/YOUR_TAWKTO_ID_HERE/default';
          document.body.appendChild(s1);
        }, []);
      */}
    </footer>
  );
}
