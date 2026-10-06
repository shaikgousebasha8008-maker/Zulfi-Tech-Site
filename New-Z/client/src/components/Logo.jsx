// Brand mark shared by ZulfiTech and ZulfiEra AI: the six-petal swirl (violet, gold and electric blue)
// with a gold AI spark at its centre. Drawn from the #zm symbol in index.html.
const Glyph = ({ className = "zm" }) => (
  <svg className={className} aria-hidden="true" focusable="false"><use href="#zm" /></svg>
);

export default function Logo({ showText = false, className = "" }) {
  if (!showText) return <Glyph className={`zm-solo ${className}`} />;
  return (
    <div className={`logo-lockup ${className}`} role="img" aria-label="ZulfiTech">
      <span className="logo-name"><BrandName /></span>
      <span className="logo-slogan">AI · CLOUD · AUTOMATION</span>
    </div>
  );
}

// The swirl mark followed by the name in the brand type, "Zulfi" plus a gold-to-violet accent.
export function BrandName({ rest = "Tech" }) {
  return (
    <span className="zt-brand" aria-label={`Zulfi${rest}`}>
      <Glyph />
      <span className="zt-name">Zulfi<span className="accent">{rest}</span></span>
    </span>
  );
}
