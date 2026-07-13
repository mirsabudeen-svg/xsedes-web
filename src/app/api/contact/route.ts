import { NextResponse } from "next/server"

/**
 * Contact form handler — parity with website/functions/api/contact.ts.
 * Accepts multipart FormData from ContactContent. Honeypot field `website`
 * short-circuits bots with a fake success. Optional Resend delivery when
 * RESEND_API_KEY + CONTACT_INBOX (+ optional CONTACT_FROM) are set.
 */
export const POST = async (request: Request) => {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 })
  }

  if (formData.get("website")) {
    return NextResponse.json({ ok: true })
  }

  const payload = {
    name: String(formData.get("name") ?? "").trim().slice(0, 200),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    company: String(formData.get("company") ?? "").trim().slice(0, 200),
    division: String(formData.get("division") ?? "").trim().slice(0, 80),
    message: String(formData.get("message") ?? "").trim().slice(0, 4000),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    )
  }

  const resendKey = process.env.RESEND_API_KEY
  const inbox = process.env.CONTACT_INBOX
  const from = process.env.CONTACT_FROM ?? "onboarding@resend.dev"

  if (resendKey && inbox) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [inbox],
          subject: `[xsedes.com] Project brief from ${payload.name}`,
          text: [
            `Name: ${payload.name}`,
            `Email: ${payload.email}`,
            `Company: ${payload.company || "—"}`,
            `Division: ${payload.division || "—"}`,
            "",
            payload.message,
          ].join("\n"),
        }),
      })
      if (!res.ok) {
        console.error("[contact] Resend failed:", await res.text())
        return NextResponse.json(
          { ok: false, error: "Delivery failed" },
          { status: 502 },
        )
      }
    } catch (err) {
      console.error("[contact] Resend error:", err)
      return NextResponse.json(
        { ok: false, error: "Delivery failed" },
        { status: 502 },
      )
    }
  } else {
    console.log(
      "[contact] submission received (RESEND_API_KEY / CONTACT_INBOX not set):",
      payload,
    )
  }

  return NextResponse.json({ ok: true })
}
