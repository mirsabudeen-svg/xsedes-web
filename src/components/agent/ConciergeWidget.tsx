"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { isChromelessPath } from "@/lib/chromeless"
import { useFocusTrap } from "@/hooks/useFocusTrap"

type Msg = { role: "user" | "assistant"; content: string }

const OPENER: Msg = {
  role: "assistant",
  content:
    "Hello — I'm the XSEDES concierge (assistive guide). For project enquiries, use Contact — I can help you find the right division or venture.",
}

export default function ConciergeWidget() {
  const pathname = usePathname()
  const { gateDismissed } = useMissionProgress()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([OPENER])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => setOpen(false), [])

  useFocusTrap({
    active: open,
    containerRef: panelRef,
    onEscape: handleClose,
    restoreFocusRef: launcherRef,
    initialFocusRef: inputRef,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [msgs, open])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return
    const next = [...msgs, { role: "user" as const, content: text }]
    setMsgs(next)
    setInput("")
    setBusy(true)
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-20) }),
      })
      const data = (await res.json()) as { reply?: string; error?: string }
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Something went wrong — please try again or use Contact.",
        },
      ])
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: "Connection issue — please try again or use Contact.",
        },
      ])
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  if (!mounted || !gateDismissed || isChromelessPath(pathname)) return null

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-[Barlow]">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="XSEDES concierge chat"
          className="mb-3 flex h-[440px] w-[min(360px,calc(100vw-3rem))] flex-col border border-white/15 bg-black/90 backdrop-blur-md"
        >
          <div className="flex items-baseline justify-between border-b border-white/10 px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white">
              § Concierge <span className="text-[#4EF2D3]">· Assist</span>
            </span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close chat"
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              Close
            </button>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 border border-[#4EF2D3]/30 px-3 py-2 text-[13px] leading-relaxed text-white"
                    : "mr-8 border border-white/10 px-3 py-2 text-[13px] leading-relaxed text-white/70"
                }
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="mr-8 border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
                Processing…
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
            Project lead?{" "}
            <Link
              href="/contact"
              className="text-[#4EF2D3] no-underline hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#4EF2D3]"
              onClick={handleClose}
            >
              Contact form
            </Link>
          </div>

          <div className="flex gap-2 border-t border-white/10 p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about XSEDES…"
              aria-label="Message the concierge"
              className="min-w-0 flex-1 border border-white/15 bg-transparent px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#4EF2D3] focus:outline-none"
            />
            <button
              type="button"
              onClick={send}
              disabled={busy}
              className="bg-[#4EF2D3] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-opacity duration-300 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close concierge" : "Open concierge chat"}
        className="ml-auto flex items-center gap-3 border border-white/15 bg-black/80 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md transition-colors duration-300 hover:border-[#4EF2D3] focus-visible:border-[#4EF2D3] focus-visible:outline-none"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#4EF2D3]" />
        Concierge
      </button>
    </div>
  )
}
