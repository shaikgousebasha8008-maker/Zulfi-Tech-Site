import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo variant="onDark" showText className="footer-badge" />
          <p>AI and SaaS products, cloud and bare-metal infrastructure, and websites, dashboards and automation, built and run by one team.</p>
        </div>
        <div className="footer-col">
          <div className="footer-h">Site</div>
          <a href="#services">Solutions</a>
          <a href="#product">ZulfiEra AI</a>
          <a href="#process">Approach</a>
          <a href="#case-studies">Our work</a>
          <a href="#faq">FAQ</a>
          <Link to="/services">Services &amp; pricing</Link>
        </div>
        <div className="footer-col">
          <div className="footer-h">Company</div>
          <a href="mailto:info@zulfi-tech.com">info@zulfi-tech.com</a>
          <a href="https://ai.zulfi-tech.com" target="_blank" rel="noreferrer">ZulfiEra AI</a>
          <Link to="/login">Client Login</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <div>&copy; 2026 ZulfiTech. All rights reserved.</div>
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
