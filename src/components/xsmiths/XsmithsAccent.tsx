import type { ReactNode } from "react"

type XsmithsAccentProps = {
  children: ReactNode
  className?: string
}

/** Selective italic accent face — website type system only. */
export default function XsmithsAccent({
  children,
  className = "",
}: XsmithsAccentProps) {
  return (
    <em
      className={`font-[family-name:var(--font-xsmiths-accent)] italic text-[var(--accent)] ${className}`.trim()}
    >
      {children}
    </em>
  )
}
