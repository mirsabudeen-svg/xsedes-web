"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import Link from "next/link"
import { gsap } from "gsap"
import type { CardNavItem } from "@/content/card-nav"
import { useFocusTrap } from "@/hooks/useFocusTrap"
import "./CardNav.css"

export type CardNavProps = {
  items: readonly CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
}

const ArrowUpRight = () => (
  <svg
    className="nav-card-link-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 17L17 7M9 7h8v8"
    />
  </svg>
)

const TOP_BAR = 52

/**
 * Hamburger-only site menu — expands into the CardNav popup (no header bar).
 */
const CardNav = ({
  items,
  className = "",
  ease = "power2.out",
  baseColor = "#000000",
  menuColor = "#EDF2F0",
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const menuBtnRef = useRef<HTMLButtonElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 280

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
      const contentEl = navEl.querySelector(
        ".card-nav-content",
      ) as HTMLElement | null
      if (contentEl) {
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = "visible"
        contentEl.style.pointerEvents = "auto"
        contentEl.style.position = "static"
        contentEl.style.height = "auto"

        void contentEl.offsetHeight

        const padding = 16
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return TOP_BAR + contentHeight + padding
      }
    }
    return 280
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: TOP_BAR, overflow: "hidden" })
    gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    })

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    )

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items])

  const refreshTimeline = (progress?: number) => {
    tlRef.current?.kill()
    const newTl = createTimeline()
    if (!newTl) return
    if (progress !== undefined) newTl.progress(progress)
    tlRef.current = newTl
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() })
        refreshTimeline(1)
        return
      }
      refreshTimeline()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const handleCloseMenu = () => {
    const tl = tlRef.current
    setIsHamburgerOpen(false)
    if (tl) {
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false))
      tl.reverse()
    } else {
      setIsExpanded(false)
    }
  }

  const handleToggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
      return
    }
    handleCloseMenu()
  }

  useFocusTrap({
    active: isExpanded,
    containerRef: navRef,
    onEscape: handleCloseMenu,
    restoreFocusRef: menuBtnRef,
    initialFocusRef: firstLinkRef,
  })

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleToggleMenu()
    }
  }

  const focusCardLink = (cardIndex: number, linkIndex: number) => {
    navRef.current
      ?.querySelectorAll<HTMLAnchorElement>(
        `[data-nav-card="${cardIndex}"] .nav-card-link`,
      )
      [linkIndex]?.focus()
  }

  /** Arrow keys within Divisions / Work / Company link lists. */
  const handleLinkKeyDown = (
    e: KeyboardEvent<HTMLAnchorElement>,
    cardIndex: number,
    linkIndex: number,
  ) => {
    const card = items[cardIndex]
    if (!card) return
    const { links } = card
    const cardCount = Math.min(items.length, 3)

    if (e.key === "ArrowDown") {
      e.preventDefault()
      focusCardLink(cardIndex, links[linkIndex + 1] ? linkIndex + 1 : 0)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      focusCardLink(
        cardIndex,
        linkIndex > 0 ? linkIndex - 1 : links.length - 1,
      )
      return
    }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      const delta = e.key === "ArrowRight" ? 1 : -1
      const nextCard = (cardIndex + delta + cardCount) % cardCount
      navRef.current
        ?.querySelector<HTMLAnchorElement>(
          `[data-nav-card="${nextCard}"] .nav-card-link`,
        )
        ?.focus()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el
  }

  const handleCloseOnNavigate = () => {
    if (!isExpanded) return
    handleCloseMenu()
  }

  return (
    <div className={`card-nav-container ${className}`.trim()}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        style={{ backgroundColor: baseColor }}
        aria-label="Primary"
      >
        <div className="card-nav-top">
          <button
            ref={menuBtnRef}
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={handleToggleMenu}
            onKeyDown={handleMenuKeyDown}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            aria-haspopup="true"
            aria-controls="card-nav-panel"
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </button>
        </div>

        <div
          id="card-nav-panel"
          className="card-nav-content"
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              data-nav-card={idx}
              ref={setCardRef(idx)}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links" role="menu">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    ref={idx === 0 && i === 0 ? firstLinkRef : undefined}
                    className="nav-card-link"
                    href={lnk.href}
                    role="menuitem"
                    aria-label={lnk.ariaLabel}
                    onClick={handleCloseOnNavigate}
                    onKeyDown={(e) => handleLinkKeyDown(e, idx, i)}
                    tabIndex={isExpanded ? 0 : -1}
                  >
                    <ArrowUpRight />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default CardNav
