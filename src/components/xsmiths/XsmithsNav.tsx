"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import XsmithsLogo from "@/components/xsmiths/XsmithsLogo"
import { xsmithsPrimaryNav } from "@/content/xsmiths"
import { touchLink, touchLinkBlock } from "@/lib/xsmiths/touch-target"

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Primary navigation (Design System §7.2, IA §6.2): sticky, quiet, never
 * hides on scroll. Wordmark is Home. Mobile uses a disclosure menu so every
 * room is reachable by touch and keyboard — no hover-only paths.
 */
export default function XsmithsNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      closeMenu()
      toggleRef.current?.focus()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen, closeMenu])

  return (
    <header className="sticky top-0 z-[var(--xs-z-nav,20)] border-b border-[var(--hairline)] bg-[var(--xs-overlay-nav,rgba(0,0,0,0.9))] backdrop-blur-[var(--xs-blur-nav,6px)]">
      <nav
        aria-label="XSMITHS"
        className="flex min-h-[72px] items-center justify-between px-[var(--xs-container-pad,5%)]"
      >
        <XsmithsLogo variant="nav" linked />

        <ul className="hidden flex-row items-center gap-2 md:flex">
          {xsmithsPrimaryNav.map((item) => {
            const active = isNavActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`${touchLink} text-[14px] tracking-[0.08em] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] ${focusRing} ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text)] opacity-85 hover:text-[var(--accent)] hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
          className={`${touchLink} gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--text)] transition-colors duration-[var(--xs-duration-fast,200ms)] hover:text-[var(--accent)] md:hidden ${focusRing}`}
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>
      </nav>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-[var(--hairline)] md:hidden"
      >
        <ul className="px-[var(--xs-container-pad,5%)] py-2">
          {xsmithsPrimaryNav.map((item) => {
            const active = isNavActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`${touchLinkBlock} text-[15px] tracking-[0.08em] no-underline transition-colors duration-[var(--xs-duration-fast,200ms)] ${focusRing} ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
