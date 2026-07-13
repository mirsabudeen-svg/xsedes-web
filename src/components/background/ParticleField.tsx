"use client"

import { useEffect, useRef } from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"

type Pt = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: boolean
}

type Ping = { x: number; y: number; r: number; life: number }

const LINK = 130
const REPEL = 110

/** Interactive selectors that must not spawn sonar pings. */
const PING_IGNORE =
  "a,button,[data-mission-rail],[data-mission-bar],[data-venture],[data-boot-gate]"

/**
 * Canvas 2D particle geometry field — ported exactly from the canonical
 * prototype engine. Returns null under prefers-reduced-motion.
 */
const ParticleField = () => {
  const { reducedMotion, gateDismissed } = useMissionProgress()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pingsRef = useRef<Ping[]>([])

  // Engine: RAF, pointer, resize, visibility — no click until gate dismisses.
  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    let pts: Pt[] = []
    let running = true
    let raf: number | null = null
    const mouse = { x: -9999, y: -9999 }
    const pings = pingsRef.current

    const seed = () => {
      const n = Math.min(90, Math.round((W * H) / 16000))
      pts = []
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.3 + 0.6,
          a: Math.random() < 0.14,
        })
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const step = () => {
      if (!running) return
      ctx.clearRect(0, 0, W, H)

      for (let k = pings.length - 1; k >= 0; k--) {
        const g = pings[k]
        g.r += 3.2
        g.life -= 0.016
        if (g.life <= 0) {
          pings.splice(k, 1)
          continue
        }
        ctx.strokeStyle = `rgba(78,242,211,${(g.life * 0.35).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]

        const dxm = p.x - mouse.x
        const dym = p.y - mouse.y
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < REPEL && dm > 0.001) {
          const f = ((REPEL - dm) / REPEL) * 0.18
          p.vx += (dxm / dm) * f
          p.vy += (dym / dm) * f
        }

        for (let k = 0; k < pings.length; k++) {
          const g = pings[k]
          const dxp = p.x - g.x
          const dyp = p.y - g.y
          const dp = Math.sqrt(dxp * dxp + dyp * dyp)
          if (dp > 0.001 && Math.abs(dp - g.r) < 26) {
            const fp = g.life * 0.5
            p.vx += (dxp / dp) * fp
            p.vy += (dyp / dp) * fp
          }
        }

        p.vx *= 0.985
        p.vy *= 0.985
        p.vx += (Math.random() - 0.5) * 0.004
        p.vy += (Math.random() - 0.5) * 0.004

        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = W + 20
        if (p.x > W + 20) p.x = -20
        if (p.y < -20) p.y = H + 20
        if (p.y > H + 20) p.y = -20
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK
            const accent = a.a || b.a
            ctx.strokeStyle = accent
              ? `rgba(78,242,211,${(t * 0.14).toFixed(3)})`
              : `rgba(237,242,240,${(t * 0.08).toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        ctx.fillStyle = p.a
          ? "rgba(78,242,211,.5)"
          : "rgba(237,242,240,.28)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handlePointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const handleVisibility = () => {
      if (document.hidden) {
        running = false
        if (raf !== null) {
          cancelAnimationFrame(raf)
          raf = null
        }
        return
      }
      running = true
      step()
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("resize", resize, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)

    resize()
    step()

    return () => {
      running = false
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
      pings.length = 0
    }
  }, [reducedMotion])

  // Sonar click listener — registered only after the boot gate dismisses.
  useEffect(() => {
    if (reducedMotion || !gateDismissed) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest(PING_IGNORE)) return
      const pings = pingsRef.current
      pings.push({ x: e.clientX, y: e.clientY, r: 4, life: 1 })
      if (pings.length > 6) pings.shift()
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [reducedMotion, gateDismissed])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-50"
    />
  )
}

export default ParticleField
