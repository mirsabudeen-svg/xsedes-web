"use client"

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type XsmithsRevealProps = {
  children: ReactNode
  className?: string
  /**
   * When true, direct children marked with [data-reveal-item] stagger at
   * 150ms (Design System §9.2, max 5). When false the block reveals as one
   * group — required for the philosophy poem (§9.3).
   */
  stagger?: boolean
}

/**
 * Canonical scroll reveal (Design System §9.2):
 * opacity 0 → 1, y 18 → 0, blur 6 → 0, 900ms, mechanical ease,
 * triggered once at 15% viewport entry. Uses gsap.from so content is
 * fully visible when JavaScript is unavailable, and untouched entirely
 * under prefers-reduced-motion.
 */
export default function XsmithsReveal({
  children,
  className,
  stagger = false,
}: XsmithsRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const targets = stagger
      ? Array.from(element.querySelectorAll("[data-reveal-item]")).slice(0, 5)
      : element

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 18,
        filter: "blur(6px)",
        duration: 0.9,
        ease: "cubic-bezier(0.22, 0.61, 0.2, 1)",
        stagger: stagger ? 0.15 : 0,
        clearProps: "filter",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
