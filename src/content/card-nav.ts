// CardNav menu structure — routes only, approved labels.

export type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: readonly CardNavLink[]
}

export const cardNavItems: readonly CardNavItem[] = [
  {
    label: "Divisions",
    bgColor: "#000000",
    textColor: "#EDF2F0",
    links: [
      {
        label: "X-Consult",
        href: "/divisions/x-consult",
        ariaLabel: "View X-Consult division",
      },
      {
        label: "X-Lab",
        href: "/divisions/x-lab",
        ariaLabel: "View X-Lab division",
      },
      {
        label: "X-Build",
        href: "/divisions/x-build",
        ariaLabel: "View X-Build division",
      },
      {
        label: "X-Ops",
        href: "/divisions/x-ops",
        ariaLabel: "View X-Ops division",
      },
    ],
  },
  {
    label: "Work",
    bgColor: "rgba(78,242,211,0.08)",
    textColor: "#EDF2F0",
    links: [
      {
        label: "Case studies",
        href: "/work",
        ariaLabel: "View case studies",
      },
      {
        label: "Brands",
        href: "/brands",
        ariaLabel: "View brand ventures",
      },
      {
        label: "Careers",
        href: "/careers",
        ariaLabel: "View careers",
      },
    ],
  },
  {
    label: "Company",
    bgColor: "#4EF2D3",
    textColor: "#000000",
    links: [
      {
        label: "About",
        href: "/about",
        ariaLabel: "Learn about us",
      },
      {
        label: "Contact",
        href: "/contact",
        ariaLabel: "Get in touch",
      },
      {
        label: "Privacy",
        href: "/legal/privacy",
        ariaLabel: "Privacy policy",
      },
    ],
  },
] as const
