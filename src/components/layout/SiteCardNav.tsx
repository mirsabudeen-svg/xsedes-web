"use client"

import CardNav from "@/components/ui/CardNav"
import { cardNavItems } from "@/content/card-nav"

type SiteCardNavProps = {
  className?: string
}

/**
 * Floating hamburger → CardNav popup (no site header bar).
 */
const SiteCardNav = ({ className = "" }: SiteCardNavProps) => (
  <CardNav
    className={className}
    items={cardNavItems}
    baseColor="#000000"
    menuColor="#EDF2F0"
    ease="power2.out"
  />
)

export default SiteCardNav
