/** Brand mechanical easing — matches CSS `--ease`. Never use springs. */
export const brandEase = [0.22, 0.61, 0.2, 1] as const

export const brandTween = {
  type: "tween" as const,
  ease: brandEase,
  duration: 1,
}

export const brandTweenFast = {
  type: "tween" as const,
  ease: brandEase,
  duration: 0.55,
}

export const staggerStep = 0.12

export const revealHidden = {
  opacity: 0,
  y: 26,
  filter: "blur(6px)",
  clipPath: "inset(0 0 12% 0)",
}

export const revealVisible = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  clipPath: "inset(0 0 0% 0)",
}
