"use client"

import { useCallback, useState, type FormEvent } from "react"
import CornerMarks from "@/components/ui/CornerMarks"
import Reveal from "@/components/ui/Reveal"
import SectionLabel from "@/components/ui/SectionLabel"
import { useMissionProgress } from "@/components/providers/MissionProvider"
import { contactForm, contactHero } from "@/content/contact"

const SECTION_ID = "s-contact"

type Status = "idle" | "sending" | "success" | "error"

/**
 * Contact form UI. POSTs FormData to /api/contact (honeypot + optional Resend).
 */
const ContactContent = () => {
  const { clearedSections, registerClearable } = useMissionProgress()
  const [status, setStatus] = useState<Status>("idle")

  const sectionRef = useCallback(
    (el: HTMLElement | null) => registerClearable(SECTION_ID, el),
    [registerClearable],
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (!response.ok) throw new Error("Request failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  const statusText =
    status === "sending"
      ? contactForm.sending
      : status === "success"
        ? contactForm.success
        : status === "error"
          ? contactForm.error
          : ""

  return (
    <main>
      <section
        ref={sectionRef}
        id={SECTION_ID}
        className="relative border-b border-[var(--hairline)] px-[clamp(28px,7vw,110px)] py-[120px]"
      >
        <CornerMarks />
        <Reveal>
          <SectionLabel cleared={clearedSections.has(SECTION_ID)}>
            {contactHero.eyebrow}
          </SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="text-[clamp(34px,4.8vw,64px)] font-extrabold uppercase leading-[1.04] tracking-[0.015em]">
            {contactHero.title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-[560px] text-[15px] text-[var(--dim)]">
            {contactHero.lede}
          </p>
        </Reveal>

        <Reveal delay={3}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 grid max-w-[720px] grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]"
              >
                {contactForm.fields.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="border border-[var(--hairline-strong)] bg-transparent px-3.5 py-3 text-[14px] text-[var(--text)] outline-none transition-colors duration-300 ease-[var(--ease)] focus-visible:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]"
              >
                {contactForm.fields.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="border border-[var(--hairline-strong)] bg-transparent px-3.5 py-3 text-[14px] text-[var(--text)] outline-none transition-colors duration-300 ease-[var(--ease)] focus-visible:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]"
              >
                {contactForm.fields.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="border border-[var(--hairline-strong)] bg-transparent px-3.5 py-3 text-[14px] text-[var(--text)] outline-none transition-colors duration-300 ease-[var(--ease)] focus-visible:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="division"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]"
              >
                {contactForm.fields.division}
              </label>
              <select
                id="division"
                name="division"
                defaultValue=""
                className="border border-[var(--hairline-strong)] bg-[var(--ink)] px-3.5 py-3 text-[14px] text-[var(--text)] outline-none transition-colors duration-300 ease-[var(--ease)] focus-visible:border-[var(--accent)]"
              >
                <option value="">{contactForm.divisionPlaceholder}</option>
                {contactForm.divisionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="message"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--faint)]"
              >
                {contactForm.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="border border-[var(--hairline-strong)] bg-transparent px-3.5 py-3 text-[14px] text-[var(--text)] outline-none transition-colors duration-300 ease-[var(--ease)] focus-visible:border-[var(--accent)]"
              />
            </div>

            {/* honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Leave blank</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-fit items-center gap-3 bg-[var(--accent)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink)] transition-[transform,box-shadow] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(78,242,211,0.22)] disabled:pointer-events-none disabled:opacity-60 sm:col-span-2"
            >
              {contactForm.submit}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="min-h-[1.2em] text-[13px] text-[var(--dim)] sm:col-span-2"
            >
              {statusText}
            </p>
          </form>
        </Reveal>
      </section>
    </main>
  )
}

export default ContactContent
