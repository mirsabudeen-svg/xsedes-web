"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"

type RevealProps = {
  children: ReactNode
  /** Stagger step index — multiplies by 0.12s (prototype .rv.d1–d4). */
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
}

/**
 * IntersectionObserver reveal: blur(6px) + translateY(26px) + opacity 0 → clear.
 * Observers arm only after the boot gate dismisses. Reduced motion → final state.
 */
const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { gateDismissed, reducedMotion } = useMissionProgress()
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }
    if (!gateDismissed) return

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setVisible(true)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.18 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [gateDismissed, reducedMotion])

  const delayMs = delay * 120

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(26px)",
              filter: visible ? "none" : "blur(6px)",
              transition: visible
                ? `opacity 1s var(--ease) ${delayMs}ms, transform 1s var(--ease) ${delayMs}ms, filter 1s var(--ease) ${delayMs}ms`
                : undefined,
              willChange: visible ? undefined : "opacity, transform, filter",
            }
      }
    >
      {children}
    </div>
  )
}

export default Reveal
