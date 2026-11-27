import type { Product } from "@/types"
import { CATEGORY_GROUPS, formatINR, formatPercent, formatTierRange, groupOf, type DurationTier } from "@/lib/film"
import { siteConfig } from "@/lib/seo/site"
import {
  PUBLISHED_LOCALITIES,
  findLocalityByName,
  localityAliases,
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
      question: `Where can I get a camera on rent near ${l.name}?`,
      answer:
        `Book My DSLR rents cameras to ${l.name} from our pickup point in Kalyan Nagar, North-East Bangalore. ` +
        (l.proximity === "outskirts"
          ? "Collect it there, or ask us about delivery — we confirm before you book."
          : `Collect it there or have it delivered to ${l.name}; either way you book on WhatsApp or by phone.`),
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
      answer: "Yes. The minimum rental is one day (24 hours from pickup), which suits single-day shoots, events and weddings.",
    },
    {
      question: `Can I rent a DSLR camera in ${l.name} for a wedding or event?`,
      answer:
        `Yes. For weddings and events in ${l.name}, renters usually take a camera body, one or two lenses and spare batteries${facts.groups.gimbals.count ? ", often with a gimbal for video" : ""}. ` +
        "Tell us the event and we'll suggest a kit from what's available on your dates.",
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
  return `Camera & DSLR Rental in ${l.name}, Bangalore | Book My DSLR`
}

export function localityMetaDescription(l: Locality, facts: InventoryFacts | null): string {
  const from = facts?.groups.cameras.minPrice ? ` Cameras from ${formatINR(facts.groups.cameras.minPrice)}/day.` : ""
  const pickup =
    l.proximity === "pickup" ? "Pickup right here in Kalyan Nagar" : l.proximity === "adjacent" ? "Pickup next door in Kalyan Nagar" : "Pickup in Kalyan Nagar"
  const how = l.proximity === "outskirts" ? `${pickup}; delivery on request.` : `${pickup} or delivery from ${formatINR(DELIVERY_FROM)}.`
  return `Camera on rent near ${l.name}: DSLR & mirrorless cameras, lenses, GoPro, drones and gimbals. ${how}${from}`
}

export function localityKeywords(l: Locality): string[] {
  const n = l.name
  return [
    `camera rental in ${n}`,
    `camera rent in ${n}`,
    `camera on rent in ${n}`,
    `camera rent near ${n}`,
    `camera rental near ${n}`,
    `DSLR camera rent in ${n}`,
    `DSLR camera on rent near ${n}`,
    `DSLR rental in ${n}`,
    `mirrorless camera rental in ${n}`,
    `Sony camera rental in ${n}`,
    `Canon camera rental in ${n}`,
    `lens rental in ${n}`,
    `GoPro on rent in ${n}`,
    `drone rental in ${n}`,
    `video camera rental in ${n}`,
    `photography equipment rental in ${n}`,
    ...localityAliases(l).flatMap((a) => [`camera rental ${a}`, `DSLR on rent ${a}`]),
  ]
}

/**
 * The locality's own neighbours, then published localities that list it as
 * a neighbour (so a new page is linked from the pages around it, not only
 * from the hub).
 */
export function nearbyLinks(l: Locality, max = 10): { name: string; href: string | null }[] {
  const names = [
    ...l.nearby,
    ...PUBLISHED_LOCALITIES.filter((o) => o.name !== l.name && o.nearby.includes(l.name)).map((o) => o.name),
  ]
  return [...new Set(names)].slice(0, Math.max(max, l.nearby.length)).map((n) => {
    const target = findLocalityByName(n)
    return { name: target?.name ?? n, href: target?.published ? `/camera-rental-bangalore/${target.slug}` : null }
  })
}

/* ---------------------------------------------------------------- */
/* "Popular rentals" — keyword-phrased links to real inventory        */
/* ---------------------------------------------------------------- */

export interface PopularRental {
  label: string
  href: string
  note: string
}

/** Only searches we can actually serve: each needs stock in its group or brand. */
export function popularRentals(l: Locality, facts: InventoryFacts): PopularRental[] {
  const n = l.name
  const g = facts.groups
  const from = (s: InventoryGroupSummary) => (s.minPrice ? `from ${formatINR(s.minPrice)}/day` : `${s.count} listed`)
  const out: PopularRental[] = []
  if (g.cameras.count) {
    out.push({ label: `DSLR camera on rent in ${n}`, href: "/rentals/dslr-camera-rental-bangalore", note: from(g.cameras) })
    out.push({ label: `Mirrorless camera rental near ${n}`, href: "/rentals/mirrorless-camera-rental-bangalore", note: `${g.cameras.count} cameras` })
    if (facts.cameraBrands.includes("Sony")) out.push({ label: `Sony camera rent in ${n}`, href: "/rentals/sony-camera-rental-bangalore", note: "Sony bodies" })
    if (facts.cameraBrands.includes("Canon")) out.push({ label: `Canon camera on rent in ${n}`, href: "/rentals/canon-camera-rental-bangalore", note: "Canon bodies" })
    out.push({ label: `Cheap camera rent near ${n}`, href: "/rentals/cheap-dslr-rental-bangalore", note: "Budget picks" })
  }
  if (g.lenses.count) out.push({ label: `Lens rental in ${n}`, href: "/rentals/lens-rental-bangalore", note: from(g.lenses) })
  if (g.action.count) out.push({ label: `GoPro / Insta360 on rent in ${n}`, href: g.action.href, note: from(g.action) })
  if (g.drones.count) out.push({ label: `Drone on rent near ${n}`, href: g.drones.href, note: from(g.drones) })
  if (g.gimbals.count) out.push({ label: `Gimbal rental in ${n}`, href: g.gimbals.href, note: from(g.gimbals) })
  if (g.lighting.count) out.push({ label: `Video light rental near ${n}`, href: g.lighting.href, note: from(g.lighting) })
  if (g.audio.count) out.push({ label: `Mic & audio gear on rent in ${n}`, href: g.audio.href, note: from(g.audio) })
  return out
}

/** What people around Bangalore rent for — phrased for the locality, varied by kind of place. */
export function localityUseCases(l: Locality): { title: string; body: string }[] {
  const n = l.name
  const shoot =
    l.name === "Cubbon Park"
      ? { title: "Photoshoots in the park", body: `Portraits, pre-wedding and fashion shoots at ${n}: a camera body with a portrait or telephoto lens, plus a light for shaded spots.` }
      : { title: "Weddings & pre-wedding shoots", body: `Renting a DSLR camera for a wedding in or around ${n}? Pair a body with a standard zoom and a fast prime, and add a gimbal for the video.` }
  return [
    shoot,
    { title: "YouTube, reels & vlogs", body: `Creators near ${n} rent mirrorless cameras, mics and lights by the day — no need to buy before you know what suits your channel.` },
    {
      title: l.proximity === "outskirts" ? "Trips & weekend getaways" : "Events, birthdays & corporate shoots",
      body:
        l.proximity === "outskirts"
          ? `Heading out from ${n} for a trip? Rent an action camera or drone for the days you're away and return it when you're back.`
          : `For a birthday, office event or product shoot in ${n}, rent a camera and lens for just the day of the event.`,
    },
    { title: "Students & first-time shooters", body: `Learning photography or working on a film project near ${n}? Rent a DSLR camera for a few days before deciding what to buy.` },
  ]
}
