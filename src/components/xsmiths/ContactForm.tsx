"use client"

import { useState, type FormEvent } from "react"
import { contactFormCopy } from "@/content/xsmiths/contact"
import { productFamilies } from "@/content/xsmiths/products"
import { touchLink } from "@/lib/xsmiths/touch-target"

type Status = "idle" | "sending" | "ok" | "error"

type FieldName = "name" | "email" | "message"

type FieldErrors = Partial<Record<FieldName, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClass = (invalid: boolean) =>
  `w-full min-h-11 border bg-transparent px-4 py-3 text-[15px] text-[var(--text)] outline-none transition-colors duration-[var(--xs-duration-fast,200ms)] focus-visible:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
    invalid
      ? "border-[var(--accent)]"
      : "border-[var(--hairline)]"
  }`

const labelClass =
  "mb-2 block text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]"

const validateFields = (form: HTMLFormElement): FieldErrors => {
  const errors: FieldErrors = {}
  const nameInput = form.elements.namedItem("name")
  const emailInput = form.elements.namedItem("email")
  const messageInput = form.elements.namedItem("message")
  const name =
    nameInput instanceof HTMLInputElement ? nameInput.value.trim() : ""
  const email =
    emailInput instanceof HTMLInputElement ? emailInput.value.trim() : ""
  const message =
    messageInput instanceof HTMLTextAreaElement ? messageInput.value.trim() : ""

  if (!name) errors.name = "Enter your name."
  if (!email) errors.email = "Enter your email address."
  else if (!emailPattern.test(email)) errors.email = "Enter a valid email address."
  if (!message) errors.message = "Enter a message."

  return errors
}

/**
 * XSMITHS enquiry form (IA §8.6, Frontend Architecture §14.5).
 * POSTs multipart FormData to shared /api/contact — same pipeline as the
 * parent XSEDES contact form (honeypot + optional Resend delivery).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [serverError, setServerError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError("")

    const form = event.currentTarget
    const errors = validateFields(form)
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      setStatus("idle")
      const firstInvalid = (["name", "email", "message"] as const).find(
        (field) => errors[field],
      )
      if (firstInvalid) {
        const element = form.elements.namedItem(firstInvalid)
        if (element instanceof HTMLElement) element.focus()
      }
      return
    }

    setStatus("sending")

    const data = new FormData(form)
    const family = String(data.get("productFamily") ?? "").trim()
    data.set("division", family ? `XSMITHS / ${family}` : "XSMITHS")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      const json = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) {
        setStatus("error")
        setServerError(json.error ?? contactFormCopy.error)
        return
      }
      setStatus("ok")
      setFieldErrors({})
      form.reset()
    } catch {
      setStatus("error")
      setServerError(contactFormCopy.error)
    }
  }

  const handleFieldChange = (field: FieldName) => {
    if (!fieldErrors[field]) return
    setFieldErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-[560px] space-y-5"
      aria-busy={status === "sending"}
      noValidate
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="xs-contact-name" className={labelClass}>
          {contactFormCopy.fields.name}
        </label>
        <input
          id="xs-contact-name"
          required
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "xs-contact-name-error" : undefined}
          onChange={() => handleFieldChange("name")}
          className={fieldClass(Boolean(fieldErrors.name))}
        />
        {fieldErrors.name ? (
          <p
            id="xs-contact-name-error"
            role="alert"
            className="mt-2 text-[13px] text-[var(--text)]"
          >
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="xs-contact-company" className={labelClass}>
          {contactFormCopy.fields.organization}
        </label>
        <input
          id="xs-contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label htmlFor="xs-contact-email" className={labelClass}>
          {contactFormCopy.fields.email}
        </label>
        <input
          id="xs-contact-email"
          required
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "xs-contact-email-error" : undefined}
          onChange={() => handleFieldChange("email")}
          className={fieldClass(Boolean(fieldErrors.email))}
        />
        {fieldErrors.email ? (
          <p
            id="xs-contact-email-error"
            role="alert"
            className="mt-2 text-[13px] text-[var(--text)]"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="xs-contact-family" className={labelClass}>
          {contactFormCopy.fields.productFamily}
        </label>
        <select
          id="xs-contact-family"
          name="productFamily"
          defaultValue=""
          className={fieldClass(false)}
        >
          <option value="">{contactFormCopy.productFamilyPlaceholder}</option>
          {productFamilies.map((family) => (
            <option key={family.slug} value={family.name}>
              {family.number} · {family.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="xs-contact-message" className={labelClass}>
          {contactFormCopy.fields.message}
        </label>
        <textarea
          id="xs-contact-message"
          required
          name="message"
          rows={6}
          aria-required="true"
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={
            fieldErrors.message ? "xs-contact-message-error" : undefined
          }
          onChange={() => handleFieldChange("message")}
          className={`${fieldClass(Boolean(fieldErrors.message))} min-h-[160px] resize-y`}
        />
        {fieldErrors.message ? (
          <p
            id="xs-contact-message-error"
            role="alert"
            className="mt-2 text-[13px] text-[var(--text)]"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${touchLink} border border-[var(--accent)] bg-[var(--accent)] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--xs-text-inverse,#000)] transition-opacity duration-[var(--xs-duration-fast,200ms)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-40`}
      >
        {status === "sending"
          ? contactFormCopy.sending
          : contactFormCopy.submit}
      </button>

      {status === "ok" ? (
        <p
          role="status"
          aria-live="polite"
          className="border-l-2 border-[var(--accent)] pl-4 text-[var(--xs-type-body,17px)] text-[var(--text)]"
        >
          {contactFormCopy.success}
        </p>
      ) : null}

      {status === "error" && serverError ? (
        <p
          role="alert"
          aria-live="assertive"
          className="text-[var(--xs-type-body-sm,15px)] text-[var(--text)]"
        >
          {serverError}
        </p>
      ) : null}
    </form>
  )
}
