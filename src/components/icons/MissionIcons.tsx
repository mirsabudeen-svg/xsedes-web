import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true as const,
})

/** Mechanical line icons — hairline stroke, square caps, brand-safe. */

export const IconDiscover = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
)

export const IconConsult = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 6h16v9H9l-5 4V6z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
)

export const IconLab = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M9 3h6M10 3v6.5L5.5 18.5A2 2 0 0 0 7.3 21h9.4a2 2 0 0 0 1.8-2.5L14 9.5V3" />
    <path d="M8.5 15h7" />
  </svg>
)

export const IconBuild = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 20V9l8-5 8 5v11" />
    <path d="M9 20v-6h6v6" />
    <path d="M4 12.5l8 4.5 8-4.5" />
  </svg>
)

export const IconOps = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
    <path d="M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
  </svg>
)

export const IconCamera = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <rect x="3" y="7" width="18" height="12" rx="0" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8 7l1.5-3h5L16 7" />
  </svg>
)

export const IconMotion = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 16l6-8 4 5 6-9" />
    <path d="M4 20h16" />
  </svg>
)

export const IconEducation = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M3 10l9-5 9 5-9 5-9-5z" />
    <path d="M7 12.5V17c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" />
  </svg>
)

export const IconRetail = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 8h16l-1.5 11H5.5L4 8z" />
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
  </svg>
)

export const IconLegal = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M12 3v18" />
    <path d="M6 8h12" />
    <path d="M6 8l-3 7h6L6 8zM18 8l-3 7h6l-3-7z" />
    <path d="M8 21h8" />
  </svg>
)

export const IconInnovation = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M9 18h6M10 21h4" />
    <path d="M8 14a5 5 0 1 1 8 0c0 1.8-1 2.7-1.8 3.5H9.8C9 16.7 8 15.8 8 14z" />
  </svg>
)

export const IconEngineering = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5l1.2 2.8 3-.4 1.2 2.8 2.7 1.3-.8 2.9 2 2.2-2 2.2.8 2.9-2.7 1.3-1.2 2.8-3-.4L12 21.5l-1.2-2.8-3 .4-1.2-2.8-2.7-1.3.8-2.9-2-2.2 2-2.2-.8-2.9 2.7-1.3 1.2-2.8 3 .4L12 2.5z" />
  </svg>
)

export const IconReliability = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconPartnership = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="9" r="2.5" />
    <path d="M3.5 18c.8-2.8 2.8-4 4.5-4s3.7 1.2 4.5 4" />
    <path d="M11.5 18c.8-2.8 2.8-4 4.5-4s3.7 1.2 4.5 4" />
  </svg>
)

export const IconIntegrity = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <rect x="5" y="4" width="14" height="16" />
    <path d="M9 9h6M9 13h6M9 17h4" />
  </svg>
)

export const IconLearning = ({ size = 18, className, ...rest }: IconProps) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 19V6l8-3 8 3v13" />
    <path d="M12 3v16" />
    <path d="M4 19c2 1.2 4.5 2 8 2s6-.8 8-2" />
  </svg>
)

export type StageIconKey = "discover" | "consult" | "lab" | "build" | "ops"
export type VentureIconKey =
  | "photoshap"
  | "velos"
  | "konstrukt"
  | "bobbs-kitchen"
  | "deed"

export const stageIcons = {
  discover: IconDiscover,
  consult: IconConsult,
  lab: IconLab,
  build: IconBuild,
  ops: IconOps,
} as const

export const ventureIcons = {
  photoshap: IconCamera,
  velos: IconMotion,
  konstrukt: IconEducation,
  "bobbs-kitchen": IconRetail,
  deed: IconLegal,
} as const

export const valueIcons = {
  Innovation: IconInnovation,
  "Engineering Excellence": IconEngineering,
  Reliability: IconReliability,
  Partnership: IconPartnership,
  Integrity: IconIntegrity,
  "Continuous Learning": IconLearning,
} as const
