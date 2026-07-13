"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { bootGate } from "@/content/site"
import type { StageKey } from "@/content/divisions"
import { missionStages } from "@/content/divisions"

export type MissionContextValue = {
  progress: number
  activeStage: StageKey | null
  clearedStages: ReadonlySet<StageKey>
  /** Non-stage sections that have been scrolled past (e.g. s-positioning). */
  clearedSections: ReadonlySet<string>
  complete: boolean
  gateDismissed: boolean
  /** Persist session + dismiss — used by BootGate on mission home. */
  dismissGate: () => void
  /** Arm reveals/Lenis without writing sessionStorage — used on multipage routes. */
  armReveals: () => void
  /** Re-open boot pending state when landing on `/` before the session flag is set. */
  prepareBootGate: () => void
  /** Register a stage section element for IntersectionObserver tracking. */
  registerStage: (key: StageKey, el: HTMLElement | null) => void
  /** Register a non-stage section for cleared-tick tracking. */
  registerClearable: (id: string, el: HTMLElement | null) => void
  reducedMotion: boolean
}

const MissionContext = createContext<MissionContextValue | null>(null)

const STAGE_KEYS = missionStages.map((s) => s.key)

const readBootSeen = (): boolean => {
  try {
    return sessionStorage.getItem(bootGate.sessionKey) === "1"
  } catch {
    return false
  }
}

const writeBootSeen = () => {
  try {
    sessionStorage.setItem(bootGate.sessionKey, "1")
  } catch {
    /* private mode — gate still dismisses for this page life */
  }
}

type MissionProviderProps = {
  children: ReactNode
}

export const MissionProvider = ({ children }: MissionProviderProps) => {
  const [progress, setProgress] = useState(0)
  const [activeStage, setActiveStage] = useState<StageKey | null>("discover")
  const [clearedStages, setClearedStages] = useState<ReadonlySet<StageKey>>(
    () => new Set(),
  )
  const [clearedSections, setClearedSections] = useState<ReadonlySet<string>>(
    () => new Set(),
  )
  const [complete, setComplete] = useState(false)
  // Always false on first paint (SSR + hydrate). Session restore runs in an effect
  // so client markup matches the server and BootGate can still skip via its own read.
  const [gateDismissed, setGateDismissed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const completeRef = useRef(false)
  const stageEls = useRef(new Map<StageKey, HTMLElement>())
  const clearableEls = useRef(new Map<string, HTMLElement>())
  const observersRef = useRef<IntersectionObserver[]>([])

  const dismissGate = useCallback(() => {
    writeBootSeen()
    setGateDismissed(true)
  }, [])

  const armReveals = useCallback(() => {
    setGateDismissed(true)
  }, [])

  const prepareBootGate = useCallback(() => {
    if (!readBootSeen()) setGateDismissed(false)
  }, [])

  useEffect(() => {
    if (readBootSeen()) setGateDismissed(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => setReducedMotion(mq.matches)
    syncMotion()
    mq.addEventListener("change", syncMotion)
    return () => mq.removeEventListener("change", syncMotion)
  }, [])

  const markCleared = useCallback((key: StageKey) => {
    setClearedStages((prev) => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }, [])

  const markSectionCleared = useCallback((id: string) => {
    setClearedSections((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const markAllCleared = useCallback(() => {
    setClearedStages(new Set(STAGE_KEYS))
    setClearedSections((prev) => {
      const next = new Set(prev)
      clearableEls.current.forEach((_, id) => next.add(id))
      return next
    })
  }, [])

  // Single passive scroll listener — progress + one-shot complete.
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p =
        max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100
      setProgress(p)

      if (p >= 100 && !completeRef.current) {
        completeRef.current = true
        setComplete(true)
        markAllCleared()
        setActiveStage(STAGE_KEYS[STAGE_KEYS.length - 1] ?? "ops")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [markAllCleared])

  // body.complete hook for Final / system-line styling (Phase 9).
  useEffect(() => {
    document.body.classList.toggle("complete", complete)
    return () => document.body.classList.remove("complete")
  }, [complete])

  const reconnectObservers = useCallback(() => {
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []

    const stageIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).dataset.stage as
            | StageKey
            | undefined
          if (!key) return

          if (entry.isIntersecting) {
            setActiveStage(key)
            return
          }

          if (entry.boundingClientRect.top < 0) {
            markCleared(key)
            ;(entry.target as HTMLElement).classList.add("cleared")
          }
        })
      },
      { threshold: 0 },
    )

    stageEls.current.forEach((el) => stageIO.observe(el))
    observersRef.current.push(stageIO)

    const clearIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.clearable
          if (!id) return
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            markSectionCleared(id)
            ;(entry.target as HTMLElement).classList.add("cleared")
          }
        })
      },
      { threshold: 0 },
    )

    clearableEls.current.forEach((el) => clearIO.observe(el))
    observersRef.current.push(clearIO)
  }, [markCleared, markSectionCleared])

  const registerStage = useCallback(
    (key: StageKey, el: HTMLElement | null) => {
      if (el) {
        el.dataset.stage = key
        stageEls.current.set(key, el)
      } else {
        stageEls.current.delete(key)
      }
      reconnectObservers()
    },
    [reconnectObservers],
  )

  const registerClearable = useCallback(
    (id: string, el: HTMLElement | null) => {
      if (el) {
        el.dataset.clearable = id
        clearableEls.current.set(id, el)
      } else {
        clearableEls.current.delete(id)
      }
      reconnectObservers()
    },
    [reconnectObservers],
  )

  useEffect(() => () => {
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []
  }, [])

  const value = useMemo<MissionContextValue>(
    () => ({
      progress,
      activeStage,
      clearedStages,
      clearedSections,
      complete,
      gateDismissed,
      dismissGate,
      armReveals,
      prepareBootGate,
      registerStage,
      registerClearable,
      reducedMotion,
    }),
    [
      progress,
      activeStage,
      clearedStages,
      clearedSections,
      complete,
      gateDismissed,
      dismissGate,
      armReveals,
      prepareBootGate,
      registerStage,
      registerClearable,
      reducedMotion,
    ],
  )

  return (
    <MissionContext.Provider value={value}>{children}</MissionContext.Provider>
  )
}

export const useMissionProgress = (): MissionContextValue => {
  const ctx = useContext(MissionContext)
  if (!ctx) {
    throw new Error("useMissionProgress must be used within MissionProvider")
  }
  return ctx
}
