import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-wrap">
        <div>&copy; 2026 ZulfiTech. Infrastructure that delivers.</div>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
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
