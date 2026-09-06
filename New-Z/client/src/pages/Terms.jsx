import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Terms() {
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
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: September 2026</p>

        <p>These terms govern your use of ZulfiTech's website and services. By engaging us for services, you agree to the terms below.</p>

        <h2>Services</h2>
        <p>ZulfiTech provides cloud infrastructure (Google Cloud, AWS), bare metal and virtual machine provisioning, email deliverability engineering, and website development services. Specific scope, deliverables, and pricing for any engagement are agreed separately in writing (email or signed quote) before work begins.</p>

        <h2>Quotes and pricing</h2>
        <p>All pricing is custom-quoted based on the scope of infrastructure requested. A quote is valid for the period stated at the time it is issued and does not constitute a binding commitment until accepted by both parties.</p>

        <h2>Client responsibilities</h2>
        <ul>
          <li>Provide accurate information necessary to scope and deliver services</li>
          <li>Ensure any domains, IP ranges, or sending infrastructure you ask us to manage are legally owned or controlled by you</li>
          <li>Comply with applicable laws regarding email sending, data handling, and acceptable use of any infrastructure we provision on your behalf</li>
        </ul>

        <h2>Acceptable use</h2>
        <p>We do not knowingly provision or maintain infrastructure used for unsolicited bulk email in violation of anti-spam law, fraud, or any other illegal activity. We reserve the right to suspend services if infrastructure we manage is found to be used for such purposes.</p>

        <h2>Limitation of liability</h2>
        <p>While we take reasonable care in configuring and monitoring the infrastructure we manage, ZulfiTech is not liable for indirect, incidental, or consequential damages arising from service interruptions, third-party provider outages (e.g. cloud providers, ISPs, blocklist operators), or actions taken by third parties such as Spamhaus or mailbox providers.</p>

        <h2>Termination</h2>
        <p>Either party may terminate an ongoing engagement per the terms agreed in the relevant service quote or contract. Outstanding fees for work performed remain payable upon termination.</p>

        <h2>Changes to these terms</h2>
        <p>We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.</p>

        <h2>Contact us</h2>
        <p>Questions about these terms can be sent to <a href="mailto:info@zulfi-tech.com">info@zulfi-tech.com</a>.</p>

        <p style={{ marginTop: 40, fontSize: 13, color: "#8B8F97" }}>
          This is a general terms of service template. We recommend having it reviewed by a qualified professional to ensure it fully meets your specific legal and regulatory obligations.
        </p>
      </div>
    </div>
  );
}
