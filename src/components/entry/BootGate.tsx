"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { bootGate } from "@/content/site"
import { useFocusTrap } from "@/hooks/useFocusTrap"

const readBootSeen = (): boolean => {
  if (typeof window === "undefined") return false
  try {
    return sessionStorage.getItem(bootGate.sessionKey) === "1"
  } catch {
    return false
  }
}

/**
 * Mission boot entry gate — once per session (sessionStorage).
 * On revisit (flag set): does not mount. Reveals arm ~250ms into exit.
 */
const BootGate = () => {
  const { dismissGate, reducedMotion } = useMissionProgress()

  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [lineOn, setLineOn] = useState<boolean[]>(() =>
    bootGate.logLines.map(() => false),
  )
  const [pct, setPct] = useState(0)
  const [ready, setReady] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const dismissedRef = useRef(false)
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const focusMainContent = () => {
    document.getElementById("main-content")?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (readBootSeen()) {
      dismissGate()
      return
    }
    setShow(true)
  }, [dismissGate])

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    clearTimers()
    document.body.classList.remove("gated")

    if (reducedMotionRef.current) {
      dismissGate()
      setRemoved(true)
      requestAnimationFrame(focusMainContent)
      return
    }

    setExiting(true)
    timersRef.current.push(setTimeout(() => dismissGate(), 250))
    timersRef.current.push(
      setTimeout(() => {
        setRemoved(true)
        focusMainContent()
      }, 1000),
    )
  }, [dismissGate])

  const handleDismissRef = useRef(handleDismiss)
  handleDismissRef.current = handleDismiss

  useFocusTrap({
    active: show && !exiting && !removed,
    containerRef: dialogRef,
    onEscape: () => handleDismissRef.current(),
    initialFocusRef: skipRef,
  })

  useEffect(() => {
    if (!show) return

    document.body.classList.add("gated")

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && btnRef.current?.dataset.ready === "1") {
        handleDismissRef.current()
      }
    }
    document.addEventListener("keydown", onKey)

    if (reducedMotionRef.current) {
      setLineOn(bootGate.logLines.map(() => true))
      setPct(100)
      setReady(true)
      timersRef.current.push(
        setTimeout(() => btnRef.current?.focus({ preventScroll: true }), 0),
      )
    } else {
      const total = bootGate.logLines.length
      bootGate.logLines.forEach((_, i) => {
        timersRef.current.push(
          setTimeout(
            () => {
              setLineOn((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
              setPct(Math.round(((i + 1) / total) * 100))
              if (i === total - 1) {
                timersRef.current.push(
                  setTimeout(() => {
                    setReady(true)
                    btnRef.current?.focus({ preventScroll: true })
                  }, 450),
                )
              }
            },
            500 + i * 380,
          ),
        )
      })
    }

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.classList.remove("gated")
      clearTimers()
    }
  }, [show])

  if (!show || removed) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label={bootGate.ariaLabel}
      aria-modal="true"
      data-boot-gate=""
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--ink)] px-8 text-center transition-[opacity,filter,transform] duration-[900ms] ease-[var(--ease)] ${
        exiting
          ? "pointer-events-none -translate-y-6 opacity-0 blur-[8px]"
          : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[26px] top-[26px] h-[22px] w-[22px] border-l border-t border-[var(--hairline-strong)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[26px] right-[26px] h-[22px] w-[22px] border-b border-r border-[var(--hairline-strong)]"
      />

      <button
        ref={skipRef}
        type="button"
        onClick={handleDismiss}
        className="absolute right-[26px] top-[26px] border border-[var(--hairline-strong)] bg-transparent px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)] transition-colors duration-[400ms] ease-[var(--ease)] hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--text)] focus-visible:outline-none"
      >
        {bootGate.skipLabel}
      </button>

      <div className="pl-[0.42em] text-[clamp(22px,3.4vw,34px)] font-extrabold uppercase tracking-[0.42em]">
        {bootGate.wordmark}
        <span className="text-[var(--accent)]">.</span>
      </div>
      <div className="mt-3.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--faint)]">
        {bootGate.tagline}
      </div>

      <ol className="mt-[52px] min-h-[186px] w-[min(420px,86vw)] list-none text-left text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--dim)]">
        {bootGate.logLines.map((line, i) => (
          <li
            key={line.label}
            className={`flex justify-between gap-5 border-b border-[var(--hairline)] py-2 transition-[opacity,transform] duration-500 ease-[var(--ease)] ${
              lineOn[i]
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <span>{line.label}</span>
            <span className="font-bold text-[var(--accent)]">{line.status}</span>
          </li>
        ))}
      </ol>

      <div className="relative mt-[30px] h-px w-[min(420px,86vw)] bg-[var(--hairline)]">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-[width] duration-[450ms] ease-[var(--ease)]"
          style={{
            width: `${pct}%`,
            transition: reducedMotion ? "none" : undefined,
          }}
        />
      </div>
      <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)] tabular-nums">
        {pct}
        {bootGate.progressSuffix}
      </div>

      <button
        ref={btnRef}
        type="button"
        data-ready={ready ? "1" : "0"}
        onClick={handleDismiss}
        disabled={!ready}
        className={`mt-11 inline-flex items-center gap-3.5 border-none bg-[var(--accent)] px-[34px] py-[18px] text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--ink)] transition-[opacity,transform] duration-700 ease-[var(--ease)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--text)] ${
          ready
            ? "pointer-events-auto translate-y-0 opacity-100 motion-safe:animate-[btnPulse_2.6s_ease-in-out_infinite]"
            : "pointer-events-none translate-y-2.5 opacity-0"
        }`}
      >
        {bootGate.cta}
      </button>
      <div
        className={`mt-4 text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--faint)] transition-opacity duration-700 ease-[var(--ease)] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {bootGate.keyHint}
      </div>
    </div>
  )
}

export default BootGate
