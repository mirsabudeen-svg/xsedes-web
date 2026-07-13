"use client"

import type { ReactNode } from "react"
import Reveal from "@/components/ui/Reveal"

type SectionEnterProps = {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
}

/**
 * Section-level cinematic enter — wipe + stagger via Reveal.
 */
const SectionEnter = ({
  children,
  className = "",
  delay = 0,
}: SectionEnterProps) => (
  <Reveal delay={delay} wipe className={className}>
    {children}
  </Reveal>
)

export default SectionEnter
