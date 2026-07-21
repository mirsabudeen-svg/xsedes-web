"use client"

import { usePathname } from "next/navigation"
import SkipLink from "@/components/ui/SkipLink"
import { isXsmithsPath } from "@/lib/chromeless"

/** Root skip link — suppressed on XSMITHS routes; venture layout owns its own. */
export default function RootSkipLink() {
  const pathname = usePathname()
  if (isXsmithsPath(pathname)) return null
  return <SkipLink />
}
