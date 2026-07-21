/** Paths that render without site header/footer or mission chrome. */
export const CHROMELESS_PATHS = [
  "/photoshap",
  "/velos",
  "/konstrukt",
  "/bobbs-kitchen",
  "/deed",
  "/xsmiths",
] as const

export type ChromelessPath = (typeof CHROMELESS_PATHS)[number]

export const isChromelessPath = (pathname: string | null): boolean => {
  if (!pathname) return false
  return CHROMELESS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
}

/** Single-page mission home — BootGate, rail/bar, particles, mission Footer. */
export const isMissionHomePath = (pathname: string | null): boolean =>
  pathname === "/"

/**
 * XSMITHS runtime shell isolation (Frontend Architecture, Appendix B §3):
 * no parent atmosphere, grid texture, or Lenis smooth-scroll may leak into
 * the venture. XSMITHS uses native scroll (Design System §8.2) and owns its
 * own canvas structure.
 */
export const isXsmithsPath = (pathname: string | null): boolean => {
  if (!pathname) return false
  return pathname === "/xsmiths" || pathname.startsWith("/xsmiths/")
}
