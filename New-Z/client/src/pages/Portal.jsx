import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Portal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("unauthenticated");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUser(data.user);
      })
      .catch(() => {
        if (!cancelled) navigate("/login");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    navigate("/login");
  };

  if (loading) {
    return <div className="portal-loading">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div>
      <header className="site-header">
        <nav>
          <Link to="/" className="brand">
            <Logo variant="onDark" className="brand-mark" />
            Zulfi<span className="accent">Tech</span>
          </Link>
          <button className="nav-cta" onClick={handleLogout}>Sign out</button>
        </nav>
      </header>

      <div className="portal-page">
        <div className="wrap">
          <div className="portal-head">
            <h1>Welcome back{user.name ? `, ${user.name}` : ""}.</h1>
            <p>Signed in as {user.email}</p>
          </div>

          <div className="portal-grid">
            <div className="portal-card">
              <div className="portal-card-h">Server Status</div>
              <p>No servers linked to this account yet — we'll connect your infrastructure here once it's provisioned.</p>
            </div>
            <div className="portal-card">
              <div className="portal-card-h">Monitoring</div>
              <p>Uptime, bounce, and reputation monitoring for infrastructure we manage for you will appear here.</p>
            </div>
            <div className="portal-card">
              <div className="portal-card-h">Tickets</div>
              <p>No open support requests. Email us directly for anything urgent.</p>
            </div>
            <div className="portal-card">
              <div className="portal-card-h">Invoices</div>
              <p>Billing history will show up here once your first invoice is issued.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
