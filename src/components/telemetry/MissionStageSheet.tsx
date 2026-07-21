"use client"

import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"
import { missionStages, type StageKey } from "@/content/divisions"
import { rail } from "@/content/site"
import { useFocusTrap } from "@/hooks/useFocusTrap"

/**
 * Mobile sheet mirroring MissionRail stage jumps (mission home only).
 */
const MissionStageSheet = () => {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const { clearedStages, activeStage, reducedMotion } = useMissionProgress()
  const { scrollTo } = useSmoothScroll()

  const handleClose = useCallback(() => setOpen(false), [])
  const handleToggle = useCallback(() => setOpen((v) => !v), [])

  useFocusTrap({
    active: open,
    containerRef: panelRef,
    onEscape: handleClose,
    restoreFocusRef: triggerRef,
  })

  const handleNavigate = (sectionId: string) => {
    setOpen(false)
    // Allow sheet close paint before scroll.
    requestAnimationFrame(() => {
      scrollTo(`#${sectionId}`, { immediate: reducedMotion })
    })
  }

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleToggle()
    }
  }

  const stateFor = (key: StageKey, index: number) => {
    if (clearedStages.has(key)) return rail.stateCleared
    if (index > 0) {
      const prev = missionStages[index - 1]
      if (prev && clearedStages.has(prev.key)) return rail.stateUnlocked
    }
    return missionStages[index]?.idleState ?? rail.stateLocked
  }

  return (
    <div className="min-[981px]:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="border border-[var(--hairline-strong)] bg-transparent px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)] transition-colors duration-300 ease-[var(--ease)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
      >
        Stages
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-[4px]"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Mission stages"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-[80] border-t border-[var(--hairline)] bg-[var(--ink)] px-5 pb-8 pt-5 transition-[transform,opacity] duration-400 ease-[var(--ease)] min-[981px]:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--faint)]">
            {rail.progressLabel}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="border border-[var(--hairline-strong)] bg-transparent px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--faint)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:border-[var(--accent)] focus-visible:outline-none"
          >
            Close
          </button>
        </div>

        <ol className="list-none">
          {missionStages.map((stage, index) => {
            const isActive = activeStage === stage.key
            const isCleared = clearedStages.has(stage.key)
            return (
              <li key={stage.key} className="border-b border-[var(--hairline)]">
                <button
                  type="button"
                  onClick={() => handleNavigate(stage.sectionId)}
                  aria-current={isActive ? "step" : undefined}
                  className="flex w-full items-center justify-between gap-4 bg-transparent py-3.5 text-left transition-colors duration-300 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span
                    className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${
                      isCleared || isActive
                        ? "text-[var(--text)]"
                        : "text-[var(--dim)]"
                    }`}
                  >
                    {stage.name}
                  </span>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                      isCleared
                        ? "text-[var(--accent)]"
                        : "text-[var(--faint)]"
                    }`}
                  >
                    {stateFor(stage.key, index)}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default MissionStageSheet
