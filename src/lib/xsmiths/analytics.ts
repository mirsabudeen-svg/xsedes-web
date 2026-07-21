// Analytics contract (Frontend Architecture §14/§18): providers sit behind
// this adapter; product code never imports a vendor. Events carry no
// personal data — names, emails, and message content are never event
// properties.

export type XsmithsEventName =
  | "contact_submitted"
  | "family_opened"
  | "journal_read"
  | "industry_viewed"

export type XsmithsEvent = {
  name: XsmithsEventName
  /** Non-personal dimensions only (slug, family, domain). */
  properties?: Record<string, string>
}

type AnalyticsProvider = {
  track: (event: XsmithsEvent) => void
}

/** No-op provider — replaced via `setAnalyticsProvider` when a vendor is
 * approved through governance. Contract exists before collection begins. */
let provider: AnalyticsProvider = {
  track: () => undefined,
}

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next
}

export function track(event: XsmithsEvent): void {
  try {
    provider.track(event)
  } catch {
    // Analytics must never break the experience.
  }
}
