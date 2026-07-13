"use client"

import type { ReactNode } from "react"
import PageEnter from "@/components/motion/PageEnter"

type TemplateProps = {
  children: ReactNode
}

/**
 * Remounts on segment navigation so PageEnter can run per route change.
 */
const Template = ({ children }: TemplateProps) => (
  <PageEnter>{children}</PageEnter>
)

export default Template
