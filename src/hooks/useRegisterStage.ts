"use client"

import { useCallback } from "react"
import {
  useMissionProgress,
  type MissionContextValue,
} from "@/components/providers/MissionProvider"
import type { StageKey } from "@/content/divisions"

/**
 * Attach a section element to MissionContext stage tracking.
 * Use on any section with a data-stage key (Discover + four divisions).
 * Returns a callback ref — assign to the stage <section>.
 */
export const useRegisterStage = (key: StageKey) => {
  const { registerStage } = useMissionProgress()

  return useCallback(
    (el: HTMLElement | null) => {
      registerStage(key, el)
    },
    [key, registerStage],
  )
}

export type { MissionContextValue }
