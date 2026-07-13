"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { divisions } from "@/content/divisions"
import { site } from "@/content/site"

const navLinkClass = (active: boolean) =>
  `text-[11px] font-semibold uppercase tracking-[0.2em] no-underline transition-colors duration-300 ease-[var(--ease)] ${
    active
      ? "text-[var(--accent)]"
      : "text-[var(--dim)] hover:text-[var(--accent)]"
  }`

/**
 * Sticky multipage top nav with active-route teal cue.
 */
const SiteHeader = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [divisionsOpen, setDivisionsOpen] = useState(false)

  const isDivisions = pathname?.startsWith("/divisions") ?? false
  const isWork = pathname === "/work" || (pathname?.startsWith("/work/") ?? false)
  const isBrands = pathname === "/brands"
  const isAbout = pathname === "/about"
  const isContact = pathname === "/contact"

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--hairline)] bg-black/75 px-[clamp(28px,7vw,110px)] py-5 backdrop-blur-[8px]">
      <Link
        href="/"
        className="text-[15px] font-extrabold uppercase tracking-[0.28em] text-[var(--text)] no-underline"
      >
        {site.name}
        <span className="text-[var(--accent)]">.</span>
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
        <div
          className="relative"
          onMouseEnter={() => setDivisionsOpen(true)}
          onMouseLeave={() => setDivisionsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setDivisionsOpen((v) => !v)}
            aria-expanded={divisionsOpen}
            aria-current={isDivisions ? "page" : undefined}
            className={`flex items-center gap-1.5 bg-transparent ${navLinkClass(isDivisions)}`}
          >
            Divisions
          </button>
          <ul
            className={`absolute left-0 top-full mt-2 min-w-[180px] list-none border border-[var(--hairline)] bg-[var(--ink)] p-2 ${
              divisionsOpen ? "flex flex-col" : "hidden"
            }`}
          >
            {divisions.map((d) => {
              const href = `/divisions/${d.id}`
              const active = pathname === href
              return (
                <li key={d.id}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] no-underline transition-colors duration-300 ease-[var(--ease)] ${
                      active
                        ? "text-[var(--accent)]"
                        : "text-[var(--dim)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {d.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <Link
          href="/work"
          aria-current={isWork ? "page" : undefined}
          className={navLinkClass(isWork)}
        >
          Work
        </Link>
        <Link
          href="/brands"
          aria-current={isBrands ? "page" : undefined}
          className={navLinkClass(isBrands)}
        >
          Brands
        </Link>
        <Link
          href="/about"
          aria-current={isAbout ? "page" : undefined}
          className={navLinkClass(isAbout)}
        >
          About
        </Link>
        <Link
          href="/contact"
          aria-current={isContact ? "page" : undefined}
          className={navLinkClass(isContact)}
        >
          Contact
        </Link>
      </nav>

      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
        className="border border-[var(--hairline-strong)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--dim)] md:hidden"
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>

      {mobileOpen && (
        <nav
          aria-label="Primary mobile"
          className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-[var(--hairline)] bg-[var(--ink)] px-[clamp(28px,7vw,110px)] py-4 md:hidden"
        >
          {divisions.map((d) => (
            <Link
              key={d.id}
              href={`/divisions/${d.id}`}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
            >
              {d.name}
            </Link>
          ))}
          <Link
            href="/work"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Work
          </Link>
          <Link
            href="/brands"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Brands
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)] no-underline"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}

export default SiteHeader
