import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Privacy() {
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
      <div className="legal-page">
        <Link to="/" className="back">&larr; Back to home</Link>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: September 2026</p>

        <p>ZulfiTech ("we", "us", "our") provides cloud, bare metal, email deliverability, and website infrastructure services. This policy explains what information we collect when you use our website or services, and how we handle it.</p>

        <h2>Information we collect</h2>
        <p>When you submit a quote request or contact form on this site, we collect the information you provide directly: your name, email address, and any details you share about your infrastructure needs.</p>
        <p>If you engage us as a client, we may additionally collect technical information necessary to deliver services, such as domain names, IP addresses, and server access credentials you provide for the purpose of managing your infrastructure.</p>

        <h2>How we use this information</h2>
        <ul>
          <li>To respond to quote requests and inquiries</li>
          <li>To provision, configure, and manage infrastructure services you engage us for</li>
          <li>To communicate with you about your account or ongoing services</li>
        </ul>

        <h2>What we don't do</h2>
        <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. We do not use your data for purposes beyond delivering the services you've requested.</p>

        <h2>Data retention</h2>
        <p>We retain contact and service-related information for as long as necessary to provide services or as required for legitimate business or legal purposes. You may request deletion of your information by contacting us directly.</p>

        <h2>Third-party services</h2>
        <p>Our website may use third-party tools (such as live chat widgets) that have their own privacy practices. We recommend reviewing the privacy policy of any such tool if you interact with it on our site.</p>

        <h2>Contact us</h2>
        <p>Questions about this policy can be sent to <a href="mailto:info@zulfi-tech.com">info@zulfi-tech.com</a>.</p>

        <p style={{ marginTop: 40, fontSize: 13, color: "#8B8F97" }}>
          This is a general privacy policy template. We recommend having it reviewed by a qualified professional to ensure it fully meets your specific legal and regulatory obligations.
        </p>
      </div>
    </div>
  );
}
