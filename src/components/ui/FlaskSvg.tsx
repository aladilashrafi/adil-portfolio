export function FlaskSvg() {
  return (
    <svg viewBox="40 20 320 360" xmlns="http://www.w3.org/2000/svg" width="500" height="525" className="max-w-full h-auto">
      {/* flask body */}
      <path
        d="M155 85 L155 225 Q155 285 128 315 L272 315 Q245 285 245 225 L245 85 Z"
        fill="rgba(1,156,255,0.04)"
        stroke="rgba(1,156,255,0.25)"
        strokeWidth="1.5"
      />
      {/* flask neck */}
      <rect x="140" y="62" width="120" height="29" rx="3" fill="none" stroke="rgba(1,156,255,0.2)" strokeWidth="1.5" />
      {/* liquid fill */}
      <path d="M157 248 Q157 285 130 312 L270 312 Q243 285 243 248 Z" fill="rgba(1,156,255,0.1)" />
      {/* bubbles */}
      <circle className="bubble" cx="185" cy="278" r="6" fill="rgba(1,156,255,0.2)" stroke="rgba(1,156,255,0.45)" strokeWidth="1" />
      <circle className="bubble bubble-b2" cx="210" cy="294" r="4" fill="rgba(254,84,1,0.2)" stroke="rgba(254,84,1,0.45)" strokeWidth="1" />
      <circle className="bubble bubble-b3" cx="196" cy="304" r="3" fill="rgba(1,156,255,0.15)" stroke="rgba(1,156,255,0.35)" strokeWidth="1" />
      {/* satellite nodes */}
      <circle cx="68" cy="165" r="19" fill="rgba(254,84,1,0.08)" stroke="rgba(254,84,1,0.3)" strokeWidth="1" />
      <text x="68" y="169" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="rgba(254,84,1,0.7)">SEO</text>
      <line x1="88" y1="165" x2="155" y2="165" stroke="rgba(254,84,1,0.2)" strokeWidth="1" strokeDasharray="3 4" />

      <circle cx="332" cy="142" r="19" fill="rgba(1,156,255,0.08)" stroke="rgba(1,156,255,0.3)" strokeWidth="1" />
      <text x="332" y="146" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="rgba(1,156,255,0.7)">PPC</text>
      <line x1="313" y1="142" x2="245" y2="142" stroke="rgba(1,156,255,0.2)" strokeWidth="1" strokeDasharray="3 4" />

      <circle cx="342" cy="245" r="19" fill="rgba(254,84,1,0.08)" stroke="rgba(254,84,1,0.3)" strokeWidth="1" />
      <text x="342" y="249" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="7" fill="rgba(254,84,1,0.7)">SMM</text>
      <line x1="323" y1="245" x2="245" y2="245" stroke="rgba(254,84,1,0.2)" strokeWidth="1" strokeDasharray="3 4" />

      <circle cx="58" cy="265" r="19" fill="rgba(1,156,255,0.08)" stroke="rgba(1,156,255,0.3)" strokeWidth="1" />
      <text x="58" y="269" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="7" fill="rgba(1,156,255,0.7)">WEB</text>
      <line x1="78" y1="265" x2="155" y2="265" stroke="rgba(1,156,255,0.2)" strokeWidth="1" strokeDasharray="3 4" />

      <text x="200" y="40" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fill="rgba(1,156,255,0.33)" letterSpacing="1">Mktg + Data + Creative</text>
      <text x="200" y="358" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="10" fill="rgba(1,156,255,0.4)" letterSpacing="2">→  GROWTH</text>
    </svg>
  );
}
