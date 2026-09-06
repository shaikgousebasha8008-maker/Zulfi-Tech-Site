export default function Logo({ variant = "onLight", showText = false, className = "" }) {
  const ink = variant === "onDark" ? "#F5F3EF" : "#20242B";
  const bronze = variant === "onDark" ? "#E0A868" : "#C17F3A";
  const slogan = variant === "onDark" ? "#A9ADB5" : "#7A7F87";
  const viewBox = showText ? "0 0 320 420" : "55 45 210 210";

  return (
    <svg
      className={`logo-mark${className ? ` ${className}` : ""}`}
      viewBox={viewBox}
      role="img"
      aria-label="ZulfiTech"
    >
      <g className="logo-ring">
        <path d="M 65 150 A 95 95 0 0 0 255 150" fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M 255 150 A 95 95 0 0 0 65 150" fill="none" stroke={bronze} strokeWidth="8" strokeLinecap="round" />
      </g>
      <g className="logo-mono" transform="translate(99, 104)">
        <line x1="17" y1="0" x2="112" y2="0" stroke={ink} strokeWidth="12" strokeLinecap="round" />
        <line x1="102" y1="4" x2="20" y2="88" stroke={ink} strokeWidth="12" strokeLinecap="round" />
        <line x1="10" y1="92" x2="112" y2="92" stroke={ink} strokeWidth="12" strokeLinecap="round" />
        <line x1="61" y1="0" x2="61" y2="92" stroke={bronze} strokeWidth="12" strokeLinecap="round" />
      </g>
      {showText && (
        <>
          <text x="160" y="305" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontWeight="600" letterSpacing="4" fill={ink} textAnchor="middle">ZULFITECH</text>
          <text x="160" y="332" fontFamily="Georgia, 'Times New Roman', serif" fontSize="11" letterSpacing="2" fill={slogan} textAnchor="middle">&#8212; INFRASTRUCTURE THAT DELIVERS. &#8212;</text>
        </>
      )}
    </svg>
  );
}
