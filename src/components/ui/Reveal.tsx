"use client"

import { usePathname } from "next/navigation"
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { bootGate } from "@/content/site"
import { staggerStep } from "@/lib/motion"

type RevealProps = {
  children: ReactNode
  /** Stagger step index — multiplies by 0.12s (prototype .rv.d1–d4). */
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  /** Mechanical clip wipe on enter (cinematic, no spring). */
  wipe?: boolean
}

const readBootSeen = (): boolean => {
  try {
    return sessionStorage.getItem(bootGate.sessionKey) === "1"
  } catch {
    return false
  }
}

const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || 0
  const overlap = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
  return rect.height <= 0 || overlap > 0
}

/**
 * Gate-armed enter reveal via CSS transitions.
 * Catch-up: already-in-view nodes reveal immediately after arm / route change
 * so navigation never leaves copy stuck at opacity 0.
 */
const Reveal = ({
  children,
  delay = 0,
  className = "",
  wipe = false,
}: RevealProps) => {
  const pathname = usePathname()
  const { gateDismissed, reducedMotion, armReveals } = useMissionProgress()
  const ref = useRef<HTMLDivElement | null>(null)
  // Boot revisit: start visible so first paint cannot flash blank.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false
    return readBootSeen()
  })

  useLayoutEffect(() => {
    if (gateDismissed) return
    if (!readBootSeen()) return
    armReveals()
  }, [gateDismissed, armReveals])

  useLayoutEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const bootSeen = readBootSeen()
    const armed = gateDismissed || bootSeen
    if (!armed) return

    const el = ref.current
    if (!el) {
      setVisible(true)
      return
    }

    // Route change / arm: catch up immediately when already on screen.
    if (isInViewport(el)) {
      setVisible(true)
      return
    }

    const reveal = () => setVisible(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        reveal()
        io.unobserve(entry.target)
      },
      { threshold: 0.05, rootMargin: "120px 0px" },
    )
    io.observe(el)

    // Hard fallback — never leave hero/copy invisible after arming.
    const fallback = window.setTimeout(reveal, 80)
    return () => {
      window.clearTimeout(fallback)
      io.disconnect()
    }
  }, [gateDismissed, reducedMotion, pathname])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  let clipPath: string | undefined
  if (wipe) {
    clipPath = visible ? "inset(0 0 0% 0)" : "inset(0 0 6% 0)"
  }

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    filter: visible ? "blur(0px)" : "blur(2px)",
    clipPath,
    transitionProperty: wipe
      ? "opacity, transform, filter, clip-path"
      : "opacity, transform, filter",
    transitionDuration: "720ms",
    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.2, 1)",
    transitionDelay: visible ? `${delay * staggerStep}s` : "0s",
  }

  return (
    <div ref={ref} className={className} style={style} data-reveal="">
      {children}
    </div>
  )
}

export default Reveal
