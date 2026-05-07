export function AtomSvg() {
  return (
    <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* orbit paths */}
      <ellipse cx="180" cy="180" rx="140" ry="54" fill="none" stroke="var(--color-border-subtle)" strokeWidth="1" strokeDasharray="4 7" />
      <ellipse cx="180" cy="180" rx="118" ry="50" fill="none" stroke="rgba(254,84,1,0.11)" strokeWidth="1" strokeDasharray="4 7" transform="rotate(60 180 180)" />
      <ellipse cx="180" cy="180" rx="98" ry="44" fill="none" stroke="rgba(1,156,255,0.09)" strokeWidth="1" strokeDasharray="4 7" transform="rotate(120 180 180)" />

      {/* back-layer electrons */}
      <g className="oa2"><circle cx="270" cy="92" r="6" fill="rgba(254,84,1,0.9)" stroke="#fe5401" strokeWidth="1" /></g>
      <g className="oa3"><circle cx="148" cy="148" r="5" fill="rgba(1,156,255,0.65)" stroke="#019cff" strokeWidth="1" /></g>

      {/* user image nucleus */}
      <image
        x="30" y="30"
        width="300" height="300"
        href="/al-adil-ashrafi-saikat.png"
        preserveAspectRatio="xMidYMid meet"
      />
      <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(1,156,255,0.4)" strokeWidth="1.5" />
      <circle cx="180" cy="180" r="165" fill="none" stroke="rgba(1,156,255,0.2)" strokeWidth="1" strokeDasharray="2 4" />

      {/* front-layer electron (biggest) */}
      <g className="oa1"><circle cx="320" cy="180" r="7" fill="rgba(1,156,255,0.85)" stroke="#019cff" strokeWidth="1" /></g>

      {/* labels */}
      <text x="55" y="74" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(1,156,255,0.38)" letterSpacing="1">STRATEGY</text>
      <text x="255" y="312" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(254,84,1,0.36)" letterSpacing="1">GROWTH</text>
      <text x="32" y="262" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(1,156,255,0.28)" letterSpacing="1">REVENUE</text>
      <text x="268" y="62" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(254,84,1,0.3)" letterSpacing="1">SALES</text>
    </svg>
  );
}
