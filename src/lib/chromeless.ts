/** Paths that render without site header/footer or mission chrome. */
export const CHROMELESS_PATHS = [
  "/photoshap",
  "/velos",
  "/konstrukt",
  "/bobbs-kitchen",
  "/deed",
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
