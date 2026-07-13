"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

type SmoothScrollProps = {
  children: ReactNode
}

/**
 * Lenis is instantiated only when prefers-reduced-motion is off AND the
 * boot gate has been dismissed. Destroyed on unmount or when either
 * condition flips off.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const { gateDismissed, reducedMotion } = useMissionProgress()
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const shouldRun = gateDismissed && !reducedMotion
    if (!shouldRun) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      return
    }

    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lenis.destroy()
      if (lenisRef.current === lenis) lenisRef.current = null
    }
  }, [gateDismissed, reducedMotion])

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { immediate?: boolean }) => {
      const immediate = Boolean(options?.immediate) || reducedMotion
      const el =
        typeof target === "string" ? document.querySelector(target) : target

      if (!(el instanceof HTMLElement)) return

      const lenis = lenisRef.current
      if (lenis && gateDismissed && !reducedMotion) {
        lenis.scrollTo(el, { immediate })
        return
      }

      el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" })
    },
    [gateDismissed, reducedMotion],
  )

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
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
