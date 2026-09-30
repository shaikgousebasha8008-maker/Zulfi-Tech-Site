// Brand emblem shared by ZulfiTech and ZulfiEra AI: the Zulfiqar over a Z monogram,
// in a laurel wreath and beaded gold ring (public/zulfiera-logo.svg).
export default function Logo({ showText = false, className = "" }) {
  const mark = <img src="/zulfiera-logo.svg?v=5" alt="" className={`logo-mark${showText ? "" : ` ${className}`}`} />;
  if (!showText) return mark;
  return (
    <div className={`logo-lockup ${className}`} role="img" aria-label="ZulfiTech">
      {mark}
      <span className="logo-name">ZULFI<span className="gold">TECH</span></span>
      <span className="logo-slogan">AI · CLOUD · AUTOMATION</span>
    </div>
  );
}
