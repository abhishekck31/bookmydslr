import { API_BASE_URL } from "@/config/constants"

/**
 * Fire-and-forget POST to /api/whatsapp-clicks/ so the Django backend
 * records every "Book on WhatsApp" or "Send booking" action.
 *
 * The call is intentionally non-blocking — the user should never wait
 * for it and a failure must never prevent WhatsApp from opening.
 */
export type ClickEvent = {
  event_type: "product_enquiry" | "cart_checkout" | "general_enquiry" | "notify_me"
  product?: number | string | null
  product_names?: string
  cart_total?: number | null
  page_url?: string
}

export function trackWhatsAppClick(event: ClickEvent): void {
  try {
    const body: Record<string, unknown> = {
      event_type: event.event_type,
      page_url: event.page_url || (typeof window !== "undefined" ? window.location.href : ""),
    }

    if (event.product) body.product = Number(event.product)
    if (event.product_names) body.product_names = event.product_names
    if (event.cart_total != null) body.cart_total = Math.round(event.cart_total)

    const url = `${API_BASE_URL.replace(/\/$/, "")}/whatsapp-clicks/`

    // Use sendBeacon when available — it survives page navigations
    // (the user is opening wa.me in a new tab, so the current page stays).
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url, JSON.stringify(body))
      return
    }

    // Fallback to fetch (fire-and-forget).
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // tracking must never break the site
  }
}
