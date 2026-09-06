import ArchitectureDiagram from "./ArchitectureDiagram.jsx";
import DeliveryChart from "./DeliveryChart.jsx";

export default function Platform() {
  return (
    <section className="platform" id="platform">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker"><div className="diamond"></div><div className="kline"></div><span className="txt">What it looks like</span></div>
          <h2>Built to be observed, not just built</h2>
          <p>Illustrative examples of the visibility we build into what we manage — not a specific client's live data.</p>
        </div>
        <div className="platform-grid">
          <div className="platform-panel reveal">
            <h3>Cloud Infrastructure</h3>
            <p>Traffic hits a load balancer in front of an instance group that scales with demand, backed by monitoring, backups, and a managed database layer.</p>
            <ArchitectureDiagram />
          </div>
          <div className="platform-panel reveal">
            <h3>Email Systems</h3>
            <p>Delivered, bounced, and suppressed mail tracked continuously — so a reputation problem gets caught before it becomes an outage.</p>
            <DeliveryChart />
          </div>
        </div>
      </div>
    </section>
  );
}
