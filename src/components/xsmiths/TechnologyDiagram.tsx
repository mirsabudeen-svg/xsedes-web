/**
 * Hairline blueprint diagram (Design System §7.15, §12.2): white 1px lines
 * on black, accent for the signal path only. Static SVG — no animation, no
 * decoration. Text alternative provided by the surrounding section.
 */
export default function TechnologyDiagram() {
  const layers = [
    { y: 20, label: "SENSE" },
    { y: 80, label: "DECIDE" },
    { y: 140, label: "RESPOND" },
    { y: 200, label: "OPERATE" },
  ]

  return (
    <svg
      viewBox="0 0 560 250"
      role="img"
      aria-label="System diagram: a signal travels from the Sense layer through Decide and Respond, while the Operate layer monitors all three."
      className="w-full max-w-[560px]"
    >
      {layers.map((layer) => (
        <g key={layer.label}>
          <rect
            x="120"
            y={layer.y}
            width="320"
            height="36"
            fill="none"
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1"
          />
          <text
            x="280"
            y={layer.y + 23}
            textAnchor="middle"
            fill="#EDF2F0"
            fontSize="11"
            letterSpacing="3"
            fontFamily="var(--font-barlow), sans-serif"
          >
            {layer.label}
          </text>
        </g>
      ))}

      {/* Signal path — the only accent element. */}
      <line x1="280" y1="0" x2="280" y2="20" stroke="#4EF2D3" strokeWidth="1.5" />
      <line x1="280" y1="56" x2="280" y2="80" stroke="#4EF2D3" strokeWidth="1.5" />
      <line x1="280" y1="116" x2="280" y2="140" stroke="#4EF2D3" strokeWidth="1.5" />
      <circle cx="280" cy="8" r="3" fill="#4EF2D3" />

      {/* Operate supervises every layer — hairline return path. */}
      <line
        x1="120"
        y1="218"
        x2="80"
        y2="218"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="218"
        x2="80"
        y2="38"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="38"
        x2="120"
        y2="38"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="98"
        x2="120"
        y2="98"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="158"
        x2="120"
        y2="158"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />

      {/* Visitor at the response layer. */}
      <text
        x="470"
        y="162"
        fill="rgba(237,242,240,0.55)"
        fontSize="10"
        letterSpacing="2"
        fontFamily="var(--font-barlow), sans-serif"
      >
        VISITOR
      </text>
      <line
        x1="440"
        y1="158"
        x2="462"
        y2="158"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
    </svg>
  )
}
