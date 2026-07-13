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
  complete: boolean
  gateDismissed: boolean
  dismissGate: () => void
  /** Register a stage section element for IntersectionObserver tracking. */
  registerStage: (key: StageKey, el: HTMLElement | null) => void
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
  const [complete, setComplete] = useState(false)
  // Immediate client init from sessionStorage so revisits arm reveals on first paint.
  const [gateDismissed, setGateDismissed] = useState(() => {
    if (typeof window === "undefined") return false
    return readBootSeen()
  })
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  const completeRef = useRef(false)
  const stageEls = useRef(new Map<StageKey, HTMLElement>())
  const observersRef = useRef<IntersectionObserver[]>([])

  const dismissGate = useCallback(() => {
    writeBootSeen()
    setGateDismissed(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => setReducedMotion(mq.matches)
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

  const markAllCleared = useCallback(() => {
    setClearedStages(new Set(STAGE_KEYS))
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
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [markAllCleared])

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
  }, [markCleared])

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

  useEffect(() => () => {
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []
  }, [])

  const value = useMemo<MissionContextValue>(
    () => ({
      progress,
      activeStage,
      clearedStages,
      complete,
      gateDismissed,
      dismissGate,
      registerStage,
      reducedMotion,
    }),
    [
      progress,
      activeStage,
      clearedStages,
      complete,
      gateDismissed,
      dismissGate,
      registerStage,
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
