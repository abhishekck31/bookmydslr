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

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackWhatsAppClick(event: ClickEvent): void {
  try {
    const pageUrl = event.page_url || (typeof window !== "undefined" ? window.location.href : "")

    // 1. Send to Google Tag Manager / Google Analytics 4
    if (typeof window !== "undefined") {
      const eventParams = {
        event_category: "engagement",
        event_label: event.event_type,
        whatsapp_event_type: event.event_type,
        product_id: event.product ? String(event.product) : undefined,
        product_names: event.product_names || undefined,
        value: event.cart_total != null ? Math.round(event.cart_total) : undefined,
        currency: event.cart_total != null ? "INR" : undefined,
      }

      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", eventParams)
        if (event.event_type === "cart_checkout") {
          window.gtag("event", "whatsapp_cart_checkout", {
            value: event.cart_total != null ? Math.round(event.cart_total) : 0,
            currency: "INR",
            items_summary: event.product_names || "",
          })
        }
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "whatsapp_click", ...eventParams })
      if (event.event_type === "cart_checkout") {
        window.dataLayer.push({
          event: "whatsapp_cart_checkout",
          value: event.cart_total != null ? Math.round(event.cart_total) : 0,
          currency: "INR",
          items_summary: event.product_names || "",
        })
      }
    }

    // 2. Send to Django backend (/api/whatsapp-clicks/)
    const body: Record<string, unknown> = {
      event_type: event.event_type,
      page_url: pageUrl,
    }

    if (event.product) body.product = Number(event.product)
    if (event.product_names) body.product_names = event.product_names
    if (event.cart_total != null) body.cart_total = Math.round(event.cart_total)

    const url = `${API_BASE_URL.replace(/\/$/, "")}/whatsapp-clicks/`
    const json = JSON.stringify(body)

    // Use Blob with application/json so DRF's JSONParser accepts sendBeacon requests.
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(url, new Blob([json], { type: "application/json" }))
      if (sent) return
    }

    // Fallback to fetch (fire-and-forget).
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // tracking must never break the site
  }
}
