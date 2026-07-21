import type { Metadata } from "next"
import ContactForm from "@/components/xsmiths/ContactForm"
import XsmithsMain from "@/components/xsmiths/XsmithsMain"
import XsmithsSectionLabel from "@/components/xsmiths/XsmithsSectionLabel"
import { contactContent } from "@/content/xsmiths/contact"
import { xsmithsPageMetadata } from "@/lib/xsmiths/metadata"

export const metadata: Metadata = xsmithsPageMetadata(
  "Contact",
  "Start a conversation with XSMITHS about interactive experience engineering.",
  "/contact",
)

/**
 * Contact (IA §8.6, §4.5):
 * Threshold → understanding → form → trust (no booking theatre).
 */
export default function ContactPage() {
  return (
    <XsmithsMain>
      <XsmithsSectionLabel>§ Contact</XsmithsSectionLabel>
      <h1 className="max-w-[18ch] text-[var(--xs-type-heading-xl,clamp(36px,5vw,64px))] font-bold uppercase leading-[1.05] tracking-[0.02em]">
        {contactContent.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[var(--xs-type-body,17px)] font-light leading-relaxed text-[var(--dim)]">
        {contactContent.lede}
      </p>

      <ContactForm />

      <p className="mx-auto mt-10 max-w-[560px] text-[13px] font-light leading-relaxed text-[var(--dim)]">
        {contactContent.trustNote}
      </p>
    </XsmithsMain>
  )
}
