"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { brandTweenFast } from "@/lib/motion"

type PageEnterProps = {
  children: ReactNode
}

/**
 * Short mechanical page enter for multipage / chromeless route changes.
 * Instant under reduced motion.
 */
const PageEnter = ({ children }: PageEnterProps) => {
  const { reducedMotion } = useMissionProgress()

  if (reducedMotion) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={brandTweenFast}
    >
      {children}
    </motion.div>
  )
}

export default PageEnter
