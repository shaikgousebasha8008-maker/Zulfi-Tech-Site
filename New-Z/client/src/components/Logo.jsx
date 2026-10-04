// Brand glyph shared by ZulfiTech and ZulfiEra AI: "Blade Z", a Z whose diagonal is a straight blade
// (the Zulfiqar) with a glint at the tip. Drawn from the #bz symbol in index.html, with no background tile.
const Glyph = ({ className = "bz" }) => (
  <svg className={className} aria-hidden="true" focusable="false"><use href="#bz" /></svg>
);

export default function Logo({ showText = false, className = "" }) {
  if (!showText) return <Glyph className={`bz-solo ${className}`} />;
  return (
    <div className={`logo-lockup ${className}`} role="img" aria-label="ZulfiTech">
      <span className="logo-name"><BrandName /></span>
      <span className="logo-slogan">AI · CLOUD · AUTOMATION</span>
    </div>
  );
}

// The name in the brand type; the blade Z is its first letter.
export function BrandName({ rest = "Tech" }) {
  return (
    <span className="zw" aria-label={`Zulfi${rest}`}><Glyph />ulfi<span className="accent">{rest}</span></span>
  );
}
