"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useMissionProgress } from "@/components/providers/MissionProvider"

type SmoothScrollContextValue = {
  /** Scroll to a selector, element, or Lenis keyword. Uses Lenis when active. */
  scrollTo: (
    target: string | HTMLElement,
    options?: { immediate?: boolean },
  ) => void
  /** Live Lenis instance when smooth scroll is armed (null otherwise). */
  lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
)

type SmoothScrollProps = {
  children: ReactNode
  /** Keep the provider mounted but never instantiate Lenis (native scroll). */
  disabled?: boolean
}

/**
 * Site-wide Lenis — mechanical brand ease, soft inertia.
 * Instantiated only when prefers-reduced-motion is off AND the boot gate
 * has been dismissed.
 */
export const SmoothScroll = ({ children, disabled = false }: SmoothScrollProps) => {
  const { gateDismissed, reducedMotion } = useMissionProgress()
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const shouldRun = gateDismissed && !reducedMotion && !disabled
    if (!shouldRun) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      setLenis(null)
      return
    }

    const instance = new Lenis({
      // Lower lerp = longer glide; brand-mechanical, not springy.
      lerp: 0.068,
      smoothWheel: true,
      // Slightly damp wheel so stack cards don't jump a full stage per tick.
      wheelMultiplier: 0.78,
      touchMultiplier: 1.35,
      syncTouch: true,
      syncTouchLerp: 0.06,
      gestureOrientation: "vertical",
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      duration: 1.15,
    })
    lenisRef.current = instance
    setLenis(instance)

    const raf = (time: number) => {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      instance.destroy()
      if (lenisRef.current === instance) lenisRef.current = null
      setLenis(null)
    }
  }, [gateDismissed, reducedMotion, disabled])

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { immediate?: boolean }) => {
      const immediate = Boolean(options?.immediate) || reducedMotion
      const el =
        typeof target === "string" ? document.querySelector(target) : target

      if (!(el instanceof HTMLElement)) return

      const active = lenisRef.current
      if (active && gateDismissed && !reducedMotion) {
        active.scrollTo(el, {
          immediate,
          offset: -8,
        })
        return
      }

      el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" })
    },
    [gateDismissed, reducedMotion],
  )

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = (): SmoothScrollContextValue => {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScroll")
  }
  return ctx
}
