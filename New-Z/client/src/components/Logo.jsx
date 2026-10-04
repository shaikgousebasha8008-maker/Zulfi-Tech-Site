// Brand mark shared by ZulfiTech and ZulfiEra AI: "Blade Z", a Z whose diagonal is a straight blade
// (the Zulfiqar) with a glint at the tip (public/zulfiera-logo.svg).
export default function Logo({ showText = false, className = "" }) {
  const mark = <img src="/zulfiera-logo.svg?v=6" alt="" className={`logo-mark${showText ? "" : ` ${className}`}`} />;
  if (!showText) return mark;
  return (
    <div className={`logo-lockup ${className}`} role="img" aria-label="ZulfiTech">
      {mark}
      <span className="logo-name"><BrandName /></span>
      <span className="logo-slogan">AI · CLOUD · AUTOMATION</span>
    </div>
  );
}

// The name in the brand type, with a sparkle in place of the dot on the i of "Zulfi".
export function BrandName({ rest = "Tech" }) {
  return (
    <span className="zw">Zulf<span className="zi">ı</span><span className="accent">{rest}</span></span>
  );
}
