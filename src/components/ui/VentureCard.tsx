"use client"

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { brandTweenFast } from "@/lib/motion"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import {
  ventureIcons,
  type VentureIconKey,
} from "@/components/icons/MissionIcons"

const handleCardPointerMove = (e: PointerEvent<HTMLElement>) => {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--gx", `${e.clientX - rect.left}px`)
  el.style.setProperty("--gy", `${e.clientY - rect.top}px`)
}

type VentureCardProps = {
  href: string
  id: string
  name: string
  eyebrow: string
  description: string
  headingLevel?: "h2" | "h3"
  children?: ReactNode
}

/**
 * Shared interactive venture/brand card — Link + icon + cursor glow.
 */
const VentureCard = ({
  href,
  id,
  name,
  eyebrow,
  description,
  headingLevel = "h3",
}: VentureCardProps) => {
  const { reducedMotion } = useMissionProgress()
  const Heading = headingLevel
  const Icon = ventureIcons[id as VentureIconKey]

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[450ms] ease-[var(--ease)] group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--gx) var(--gy), rgba(78,242,211,.09), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute right-3.5 top-3.5 h-3 w-3 border-r border-t border-[var(--hairline-strong)] transition-[border-color] duration-500 ease-[var(--ease)] group-hover:border-[var(--accent)] group-focus-visible:border-[var(--accent)]"
      />
      {Icon ? (
        <span className="relative mb-5 inline-flex h-10 w-10 items-center justify-center border border-[var(--hairline)] text-[var(--faint)] transition-colors duration-500 ease-[var(--ease)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          <Icon size={18} />
        </span>
      ) : null}
      <div className="relative mb-[18px] text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]">
        {eyebrow}
      </div>
      <Heading className="relative text-[20px] font-extrabold uppercase tracking-[0.04em] text-[var(--text)]">
        {name}
      </Heading>
      <p className="relative mt-3.5 text-[14px] leading-[1.65] text-[var(--dim)]">
        {description}
      </p>
      <span className="relative mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)] transition-colors duration-500 ease-[var(--ease)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
        Open →
      </span>
    </>
  )

  const className =
    "group relative block overflow-hidden bg-[var(--ink)]/80 px-7 pb-[38px] pt-[34px] no-underline outline-none backdrop-blur-[2px] transition-[background,transform] duration-500 ease-[var(--ease)] hover:bg-[var(--glass)] focus-visible:bg-[var(--glass)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"

  if (reducedMotion) {
    return (
      <Link
        href={href}
        data-venture={id}
        aria-label={`${name} — ${eyebrow}`}
        className={className}
        style={{ "--gx": "50%", "--gy": "50%" } as CSSProperties}
        onPointerMove={handleCardPointerMove}
      >
        {inner}
      </Link>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileFocus={{ y: -2 }}
      transition={brandTweenFast}
      className="h-full"
    >
      <Link
        href={href}
        data-venture={id}
        aria-label={`${name} — ${eyebrow}`}
        className={`${className} h-full`}
        style={{ "--gx": "50%", "--gy": "50%" } as CSSProperties}
        onPointerMove={handleCardPointerMove}
      >
        {inner}
      </Link>
    </motion.div>
  )
}

export default VentureCard
