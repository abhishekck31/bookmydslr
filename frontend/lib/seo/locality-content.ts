import type { Product } from "@/types"
import { CATEGORY_GROUPS, formatINR, formatPercent, formatTierRange, groupOf, type DurationTier } from "@/lib/film"
import { siteConfig } from "@/lib/seo/site"
import {
  findLocalityByName,
  localityFocus,
  type InventoryGroupKey,
  type Locality,
  type LocalityFaq,
} from "@/data/seo/localities"

export const DELIVERY_FROM = 200

export const PICKUP_ADDRESS_LINE = `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, Bangalore ${siteConfig.address.postalCode}`

const CAMERA_BRANDS = ["Canon", "Sony", "Nikon", "Fujifilm", "Panasonic", "DJI", "GoPro", "Insta360"]

export interface InventoryGroupSummary {
  key: InventoryGroupKey
  name: string
  href: string
  count: number
  availableCount: number
  minPrice: number | null
  /** Available first, then cheapest. */
  products: Product[]
}

export interface InventoryFacts {
  total: number
  available: number
  groups: Record<string, InventoryGroupSummary>
  cameraBrands: string[]
  minPrice: number | null
}

function byAvailabilityThenPrice(a: Product, b: Product) {
  if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1
  return a.price - b.price
}

export function summariseInventory(products: Product[]): InventoryFacts {
  const groups: Record<string, InventoryGroupSummary> = {}
  for (const g of CATEGORY_GROUPS) {
    groups[g.key] = { key: g.key as InventoryGroupKey, name: g.name, href: g.href, count: 0, availableCount: 0, minPrice: null, products: [] }
  }
  for (const p of products) {
    const s = groups[groupOf(p).key]
    s.count++
    if (p.isAvailable) s.availableCount++
    if (p.price > 0) s.minPrice = s.minPrice === null ? p.price : Math.min(s.minPrice, p.price)
    s.products.push(p)
  }
  for (const s of Object.values(groups)) s.products.sort(byAvailabilityThenPrice)

  const cameraText = groups.cameras.products.map((p) => `${p.brand ?? ""} ${p.name}`.toLowerCase()).join(" | ")
  const cameraBrands = CAMERA_BRANDS.filter((b) => cameraText.includes(b.toLowerCase()))
  const prices = products.map((p) => p.price).filter((n) => n > 0)

  return {
    total: products.length,
    available: products.filter((p) => p.isAvailable).length,
    groups,
    cameraBrands,
    minPrice: prices.length ? Math.min(...prices) : null,
  }
}

/** Focus groups that actually have stock, in the locality's order. */
export function focusGroups(l: Locality, facts: InventoryFacts): InventoryGroupSummary[] {
  return localityFocus(l)
    .map((k) => facts.groups[k])
    .filter((g): g is InventoryGroupSummary => Boolean(g && g.count > 0))
}

function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
}

/* ---------------------------------------------------------------- */
/* Delivery & pickup copy — driven by proximity, never a promise      */
/* ---------------------------------------------------------------- */

export function deliveryCopy(l: Locality): { headline: string; body: string[] } {
  const charge = `Delivery starts at ${formatINR(DELIVERY_FROM)} and depends on the distance from Kalyan Nagar — we confirm the exact charge when you book.`
  if (l.proximity === "pickup") {
    return {
      headline: `Collect from our Kalyan Nagar pickup point`,
      body: [
        `Our pickup point is in Kalyan Nagar itself, at ${PICKUP_ADDRESS_LINE}. Book on WhatsApp or by phone, then collect at the agreed time.`,
        `Prefer it brought to you? ${charge}`,
      ],
    }
  }
  if (l.proximity === "adjacent") {
    return {
      headline: `${l.name} is right next to our pickup point`,
      body: [
        `${l.name} borders Kalyan Nagar, where we hand over gear (${PICKUP_ADDRESS_LINE}), so collecting it yourself is usually a short trip.`,
        `${charge} Being this close, ${l.name} is at the lower end of the delivery range.`,
      ],
    }
  }
  if (l.proximity === "outskirts") {
    return {
      headline: `Getting your gear to ${l.name}`,
      body: [
        `${l.name} is on the outskirts of Bangalore. We don't have a branch here — all gear is handed over from our pickup point in Kalyan Nagar (${PICKUP_ADDRESS_LINE}).`,
        `Delivery to ${l.name} is arranged on request: tell us your address and dates and we'll confirm whether we can deliver and the charge (from ${formatINR(DELIVERY_FROM)}, based on distance) before you book.`,
      ],
    }
  }
  return {
    headline: `Getting your gear to ${l.name}`,
    body: [
      `We don't have a branch in ${l.name} — all gear is handed over from our pickup point in Kalyan Nagar (${PICKUP_ADDRESS_LINE}).`,
      `You can collect it there, or we can deliver to ${l.name}. ${charge}`,
    ],
  }
}

/* ---------------------------------------------------------------- */
/* FAQs                                                              */
/* ---------------------------------------------------------------- */

export function buildLocalityFaqs(l: Locality, facts: InventoryFacts, tiers: DurationTier[]): LocalityFaq[] {
  const cams = facts.groups.cameras
  const lenses = facts.groups.lenses
  const brands = facts.cameraBrands.filter((b) => ["Canon", "Sony", "Nikon", "Fujifilm", "Panasonic"].includes(b))
  const priceBits = [
    cams.minPrice ? `cameras from ${formatINR(cams.minPrice)}/day` : null,
    lenses.minPrice ? `lenses from ${formatINR(lenses.minPrice)}/day` : null,
  ].filter(Boolean) as string[]
  const best = [...tiers].sort((a, b) => b.percent - a.percent)[0]

  const faqs: LocalityFaq[] = [
    {
      question: `Can I rent a DSLR or mirrorless camera in ${l.name}?`,
      answer:
        `Yes. We currently list ${cams.count} cameras${brands.length ? ` from ${listJoin(brands)}` : ""}, along with ${lenses.count} lenses and other gear. ` +
        `Renters in ${l.name} can collect from our Kalyan Nagar pickup point or get it delivered.`,
    },
    {
      question: `Do you deliver cameras to ${l.name}?`,
      answer: l.proximity === "outskirts"
        ? `${l.name} is on the city's outskirts, so delivery is arranged on request. Message or call us with your address and dates; we'll confirm whether we can deliver and the charge (from ${formatINR(DELIVERY_FROM)}, based on distance) before you book. You can always collect from Kalyan Nagar.`
        : `Yes, we can deliver to ${l.name}. Delivery starts at ${formatINR(DELIVERY_FROM)} and the charge depends on the distance from Kalyan Nagar; ` +
        `we confirm the exact amount and timing on WhatsApp or by phone when you book.`,
    },
    {
      question: "Where do I collect my rented camera?",
      answer: `From our pickup point at ${PICKUP_ADDRESS_LINE}. We're open 8 am to 10 pm, every day. Please book first so the gear is ready.`,
    },
    {
      question: "How much does camera rental cost per day?",
      answer:
        (priceBits.length ? `Rates are per day — currently ${listJoin(priceBits)}. ` : "Rates are per day and shown on every product. ") +
        (best ? `Longer rentals cost less: up to ${formatPercent(best.percent)} off for ${formatTierRange(best)}. ` : "") +
        "The price you see on each product page is the live rate.",
    },
    {
      question: "Can I rent a camera for just one day?",
      answer: "Yes. The minimum rental is one day, which suits single-day shoots, events and weddings.",
    },
    {
      question: "How do I check if a camera is available on my dates?",
      answer:
        `Each product shows whether it's available right now. Add gear to your cart with your dates and send the booking on WhatsApp, or call ${siteConfig.phoneDisplay} — we confirm availability before you pay.`,
    },
    {
      question: "Is a security deposit required?",
      answer: "A refundable security deposit may apply for some equipment or for first-time renters. We tell you upfront when we confirm your booking.",
    },
  ]
  return [...faqs, ...(l.faqs ?? [])]
}

/* ---------------------------------------------------------------- */
/* Metadata                                                          */
/* ---------------------------------------------------------------- */

export function localitySeoTitle(l: Locality): string {
  return `Camera Rental in ${l.name}, Bangalore | Book My DSLR`
}

export function localityMetaDescription(l: Locality, facts: InventoryFacts | null): string {
  const from = facts?.groups.cameras.minPrice ? ` Cameras from ${formatINR(facts.groups.cameras.minPrice)}/day.` : ""
  const pickup =
    l.proximity === "pickup" ? "Pickup right here in Kalyan Nagar" : l.proximity === "adjacent" ? "Pickup next door in Kalyan Nagar" : "Pickup in Kalyan Nagar"
  const how = l.proximity === "outskirts" ? `${pickup}; delivery on request.` : `${pickup} or delivery from ${formatINR(DELIVERY_FROM)}.`
  return `Rent DSLR & mirrorless cameras, lenses and drones in ${l.name}, Bangalore. ${how}${from}`
}

export function localityKeywords(l: Locality): string[] {
  const n = l.name
  return [
    `camera rental in ${n}`,
    `camera on rent in ${n}`,
    `DSLR rental in ${n}`,
    `Sony camera rental in ${n}`,
    `Canon camera rental in ${n}`,
    `lens rental in ${n}`,
    `photography equipment rental in ${n}`,
    `video camera rental in ${n}`,
    ...(l.aliases ?? []).map((a) => `camera rental ${a}`),
  ]
}

export function nearbyLinks(l: Locality): { name: string; href: string | null }[] {
  return l.nearby.map((n) => {
    const target = findLocalityByName(n)
    return { name: n, href: target?.published ? `/camera-rental-bangalore/${target.slug}` : null }
  })
}
