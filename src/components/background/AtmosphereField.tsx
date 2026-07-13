"use client"

import { useId } from "react"

/**
 * Sitewide depth: teal radial wash + film grain. Fixed, non-interactive.
 * Complements GridField / ParticleField without competing with content.
 */
const AtmosphereField = () => {
  const grainId = `grain-${useId().replace(/:/g, "")}`

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(900px 620px at 82% 8%, rgba(78,242,211,0.07), transparent 62%),
            radial-gradient(720px 520px at 12% 88%, rgba(78,242,211,0.035), transparent 58%),
            radial-gradient(1200px 800px at 50% 50%, rgba(237,242,240,0.02), transparent 70%)
          `,
        }}
      />
      <div
        className="absolute inset-x-0 top-[42%] h-px opacity-[0.14]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(78,242,211,0.35), transparent)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-overlay">
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  )
}

export default AtmosphereField
