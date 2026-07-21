import Image from "next/image"
import Link from "next/link"
import { xsmithsSite } from "@/content/xsmiths"
import { touchLink } from "@/lib/xsmiths/touch-target"

type XsmithsLogoProps = {
  /** Nav bar wordmark or homepage threshold scale. */
  variant?: "nav" | "hero"
  /** Wrap in home link — false when parent already links (e.g. nav). */
  linked?: boolean
  className?: string
  priority?: boolean
}

const variantConfig = {
  nav: {
    width: 148,
    height: 36,
    className: "h-9 w-auto max-w-[148px]",
  },
  hero: {
    width: 520,
    height: 120,
    className: "h-[clamp(52px,9vw,104px)] w-auto max-w-[min(520px,88vw)]",
  },
} as const

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"

/**
 * XSMITHS wordmark — logo-light on the pure black canvas (Design System §4).
 * Text fallback remains the site name for SSR/accessibility if image fails.
 */
export default function XsmithsLogo({
  variant = "nav",
  linked = true,
  className = "",
  priority = false,
}: XsmithsLogoProps) {
  const config = variantConfig[variant]

  const image = (
    <Image
      src="/xsmiths/logo-light.png"
      alt={linked ? "" : xsmithsSite.name}
      aria-hidden={linked}
      width={config.width}
      height={config.height}
      priority={priority || variant === "hero"}
      className={`${config.className} ${className}`.trim()}
    />
  )

  const wordmark = linked ? (
    <Link
      href={xsmithsSite.basePath}
      className={`${touchLink} inline-block no-underline transition-opacity duration-[var(--xs-duration-fast,200ms)] hover:opacity-85 ${focusRing}`}
      aria-label={`${xsmithsSite.name} home`}
    >
      {image}
    </Link>
  ) : (
    image
  )

  return (
    <span className="inline-flex flex-col items-center">
      {wordmark}
      <span className="sr-only">{xsmithsSite.name}</span>
    </span>
  )
}
