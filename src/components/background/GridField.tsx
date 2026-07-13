"use client"

import { useEffect, useRef } from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"

/**
 * Fixed hairline structural grid with a radial mask that tracks the
 * pointer (--mx/--my). Under reduced motion the mask stays static.
 */
const GridField = () => {
  const { reducedMotion } = useMissionProgress()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const handlePointerMove = (e: PointerEvent) => {
      el.style.setProperty(
        "--mx",
        `${(e.clientX / window.innerWidth) * 100}%`,
      )
      el.style.setProperty(
        "--my",
        `${(e.clientY / window.innerHeight) * 100}%`,
      )
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(1100px 700px at var(--mx, 70%) var(--my, 20%), rgba(0,0,0,.9), rgba(0,0,0,.25) 70%)",
        WebkitMaskImage:
          "radial-gradient(1100px 700px at var(--mx, 70%) var(--my, 20%), rgba(0,0,0,.9), rgba(0,0,0,.25) 70%)",
      }}
    />
  )
}

export default GridField
