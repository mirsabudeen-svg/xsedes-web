"use client"

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react"
import Lenis from "lenis"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"
import "./ScrollStack.css"

export type ScrollStackItemProps = {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

type ScrollStackProps = {
  children: ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

type CardTransform = {
  translateY: number
  scale: number
  rotation: number
  blur: number
  opacity: number
}

/** Hermite smoothstep — softens scale / pin edge transitions. */
const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

/**
 * Scroll-linked card stack for §01–§05.
 * Window mode reuses site Lenis; transforms are lightly eased toward targets
 * so stage handoffs feel continuous rather than stepped.
 */
const ScrollStack = ({
  children,
  className = "",
  itemDistance = 140,
  itemScale = 0.02,
  itemStackDistance = 22,
  stackPosition = "18%",
  scaleEndPosition = "12%",
  baseScale = 0.92,
  scaleDuration: _scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const { reducedMotion } = useMissionProgress()
  const { lenis: siteLenis } = useSmoothScroll()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const cardTopsRef = useRef<number[]>([])
  const endTopRef = useRef(0)
  const lastTransformsRef = useRef(new Map<number, CardTransform>())
  const displayedRef = useRef(new Map<number, CardTransform>())
  const isUpdatingRef = useRef(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  void _scaleDuration

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0
      if (scrollTop > end) return 1
      if (end === start) return 1
      return (scrollTop - start) / (end - start)
    },
    [],
  )

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight
      }
      return typeof value === "number" ? value : parseFloat(value)
    },
    [],
  )

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      // Prefer Lenis animated scroll when available — stays in sync with inertia.
      const animated =
        typeof siteLenis?.scroll === "number" ? siteLenis.scroll : window.scrollY
      return {
        scrollTop: animated,
        containerHeight: window.innerHeight,
      }
    }
    const scroller = scrollerRef.current
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? 0,
    }
  }, [useWindowScroll, siteLenis])

  const cacheCardTops = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    if (useWindowScroll) {
      const scrollY = window.scrollY
      cardTopsRef.current = cards.map((card, i) => {
        const rectTop = card.getBoundingClientRect().top
        const appliedY = displayedRef.current.get(i)?.translateY ?? 0
        return rectTop + scrollY - appliedY
      })
      const endElement = scrollerRef.current?.querySelector(
        ".scroll-stack-end",
      ) as HTMLElement | null
      endTopRef.current = endElement
        ? endElement.getBoundingClientRect().top + scrollY
        : 0
      return
    }

    cardTopsRef.current = cards.map((card) => card.offsetTop)
    const endElement = scrollerRef.current?.querySelector(
      ".scroll-stack-end",
    ) as HTMLElement | null
    endTopRef.current = endElement?.offsetTop ?? 0
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    if (reducedMotion || !cardsRef.current.length || isUpdatingRef.current) {
      return
    }

    isUpdatingRef.current = true

    const { scrollTop, containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    )
    const endElementTop = endTopRef.current
    const tops = cardTopsRef.current
    const cardCount = cardsRef.current.length

    // Which card is currently on top of the stack (for depth fade).
    let activeIndex = 0
    for (let j = 0; j < cardCount; j++) {
      const jCardTop = tops[j] ?? 0
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
      if (scrollTop >= jTriggerStart) activeIndex = j
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = tops[i] ?? 0
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const rawScaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      )
      const scaleProgress = smoothstep(rawScaleProgress)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount
        ? i * rotationAmount * scaleProgress
        : 0

      let blur = 0
      if (blurAmount && i < activeIndex) {
        blur = Math.max(0, (activeIndex - i) * blurAmount)
      }

      // Buried cards soften — keeps the stack readable without harsh edges.
      const depth = Math.max(0, activeIndex - i)
      const opacity =
        i > activeIndex ? 1 : Math.max(0.55, 1 - depth * 0.12)

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const target: CardTransform = {
        translateY,
        scale,
        rotation,
        blur,
        opacity,
      }

      const previous = displayedRef.current.get(i) ?? target
      // Pin Y tracks scroll 1:1; only ease scale / depth so handoffs feel soft.
      const ease = 0.28
      const displayed: CardTransform = {
        translateY: target.translateY,
        scale: previous.scale + (target.scale - previous.scale) * ease,
        rotation:
          previous.rotation + (target.rotation - previous.rotation) * ease,
        blur: previous.blur + (target.blur - previous.blur) * ease,
        opacity:
          previous.opacity + (target.opacity - previous.opacity) * ease,
      }

      const rounded: CardTransform = {
        translateY: Math.round(displayed.translateY * 100) / 100,
        scale: Math.round(displayed.scale * 1000) / 1000,
        rotation: Math.round(displayed.rotation * 100) / 100,
        blur: Math.round(displayed.blur * 100) / 100,
        opacity: Math.round(displayed.opacity * 1000) / 1000,
      }

      const last = lastTransformsRef.current.get(i)
      const hasChanged =
        !last ||
        Math.abs(last.translateY - rounded.translateY) > 0.02 ||
        Math.abs(last.scale - rounded.scale) > 0.0003 ||
        Math.abs(last.rotation - rounded.rotation) > 0.02 ||
        Math.abs(last.blur - rounded.blur) > 0.02 ||
        Math.abs(last.opacity - rounded.opacity) > 0.002

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${rounded.translateY}px, 0) scale(${rounded.scale}) rotate(${rounded.rotation}deg)`
        card.style.filter =
          rounded.blur > 0.05 ? `blur(${rounded.blur}px)` : "none"
        card.style.opacity = String(rounded.opacity)
        card.style.zIndex = String(i + 1)

        lastTransformsRef.current.set(i, rounded)
      }

      displayedRef.current.set(i, displayed)

      if (i === cardCount - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })

    isUpdatingRef.current = false
  }, [
    reducedMotion,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ])

  const handleScroll = useCallback(() => {
    updateCardTransforms()
  }, [updateCardTransforms])

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      // Drive off the shared site Lenis RAF cadence via our own loop that
      // reads animated scroll — avoids a second Lenis fighting the first.
      const raf = () => {
        handleScroll()
        animationFrameRef.current = requestAnimationFrame(raf)
      }
      animationFrameRef.current = requestAnimationFrame(raf)
      return null
    }

    const scroller = scrollerRef.current
    if (!scroller) return null

    const content = scroller.querySelector(
      ".scroll-stack-inner",
    ) as HTMLElement | null
    if (!content) return null

    const lenis = new Lenis({
      wrapper: scroller,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 0.85,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.06,
    })

    lenis.on("scroll", handleScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis
    return lenis
  }, [handleScroll, useWindowScroll])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(
      scroller.querySelectorAll(".scroll-stack-card"),
    ) as HTMLElement[]

    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = "transform, opacity"
      card.style.transformOrigin = "top center"
      card.style.backfaceVisibility = "hidden"
      card.style.transform = "translate3d(0, 0, 0)"
      card.style.opacity = "1"
      card.style.zIndex = String(i + 1)
    })

    if (reducedMotion) {
      cards.forEach((card) => {
        card.style.transform = ""
        card.style.filter = ""
        card.style.marginBottom = ""
        card.style.willChange = "auto"
        card.style.opacity = ""
      })
      return () => {
        cardsRef.current = []
        cardTopsRef.current = []
        transformsCache.clear()
        displayedRef.current.clear()
      }
    }

    cacheCardTops()
    setupLenis()
    updateCardTransforms()

    let resizeRaf: number | null = null
    const handleResize = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null
        transformsCache.clear()
        displayedRef.current.clear()
        cacheCardTops()
        updateCardTransforms()
      })
    }

    window.addEventListener("resize", handleResize, { passive: true })

    const ro = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserverRef.current = ro
    ro.observe(scroller)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      resizeObserverRef.current = null
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      cardTopsRef.current = []
      transformsCache.clear()
      displayedRef.current.clear()
      isUpdatingRef.current = false
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    reducedMotion,
    setupLenis,
    updateCardTransforms,
    cacheCardTops,
  ])

  return (
    <div
      className={`scroll-stack-scroller ${
        useWindowScroll ? "scroll-stack-scroller--window" : ""
      } ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  )
}

export default ScrollStack
