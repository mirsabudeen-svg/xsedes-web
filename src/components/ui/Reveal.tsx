"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion } from "motion/react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import {
  brandTween,
  revealHidden,
  revealVisible,
  staggerStep,
} from "@/lib/motion"

type RevealProps = {
  children: ReactNode
  /** Stagger step index — multiplies by 0.12s (prototype .rv.d1–d4). */
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  /** Mechanical clip wipe on enter (cinematic, no spring). */
  wipe?: boolean
}

/**
 * Gate-armed enter reveal: opacity + y + blur (+ optional clip wipe).
 * Uses Motion tweens with brand ease. Reduced motion → final state.
 */
const Reveal = ({
  children,
  delay = 0,
  className = "",
  wipe = false,
}: RevealProps) => {
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

    const reveal = () => setVisible(true)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal()
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.18 },
    )

    io.observe(el)

    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 0
    const overlap = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
    if (rect.height > 0 && overlap / rect.height >= 0.18) {
      reveal()
      io.unobserve(el)
    }

    return () => io.disconnect()
  }, [gateDismissed, reducedMotion])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const hidden = wipe
    ? revealHidden
    : { opacity: 0, y: 26, filter: "blur(6px)" }
  const shown = wipe
    ? revealVisible
    : { opacity: 1, y: 0, filter: "blur(0px)" }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{
        ...brandTween,
        delay: delay * staggerStep,
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
