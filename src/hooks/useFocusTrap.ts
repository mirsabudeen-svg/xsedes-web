"use client"

import { useEffect, type RefObject } from "react"

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const getFocusable = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )

type UseFocusTrapOptions = {
  active: boolean
  containerRef: RefObject<HTMLElement | null>
  onEscape?: () => void
  /** Element to restore focus to on deactivate (defaults to previous activeElement). */
  restoreFocusRef?: RefObject<HTMLElement | null>
  /** Prefer this element on open when present. */
  initialFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Traps Tab inside a modal container; Escape calls onEscape.
 * Restores focus when the trap deactivates.
 */
export const useFocusTrap = ({
  active,
  containerRef,
  onEscape,
  restoreFocusRef,
  initialFocusRef,
}: UseFocusTrapOptions) => {
  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    if (!container) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const focusInitial = () => {
      const preferred = initialFocusRef?.current
      if (preferred && container.contains(preferred)) {
        preferred.focus({ preventScroll: true })
        return
      }
      const list = getFocusable(container)
      list[0]?.focus({ preventScroll: true })
    }

    // After paint so dialog children are focusable.
    const raf = requestAnimationFrame(focusInitial)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onEscape?.()
        return
      }

      if (e.key !== "Tab") return

      const list = getFocusable(container)
      if (list.length === 0) {
        e.preventDefault()
        return
      }

      const first = list[0]!
      const last = list[list.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus({ preventScroll: true })
        return
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", handleKeyDown)
      const restore = restoreFocusRef?.current ?? previouslyFocused
      restore?.focus?.({ preventScroll: true })
    }
  }, [active, containerRef, onEscape, restoreFocusRef, initialFocusRef])
}
