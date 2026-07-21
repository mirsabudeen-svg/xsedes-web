import type { ReactNode } from "react"

type XsmithsMainProps = {
  children: ReactNode
  className?: string
}

/** Shared inner-page shell — skip-target + consistent horizontal/vertical rhythm. */
export default function XsmithsMain({
  children,
  className = "",
}: XsmithsMainProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`px-[5%] py-[100px] ${className}`.trim()}
    >
      {children}
    </main>
  )
}
