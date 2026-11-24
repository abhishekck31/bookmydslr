import type { Category, Product } from "@/types"
import { WHATSAPP_NUMBER } from "@/config/constants"

/* ---------------------------------------------------------------- */
/* Formatting                                                        */
/* ---------------------------------------------------------------- */

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 })

export function formatINR(value: number): string {
  return `₹${inr.format(Math.round(value))}`
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

/* ---------------------------------------------------------------- */
/* Frame codes — "07A" style markers derived from real ids            */
/* ---------------------------------------------------------------- */

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ"

export function categoryLetter(category?: Pick<Category, "id"> | null): string {
  const id = Number(category?.id ?? 0)
  return LETTERS[Math.abs(id) % LETTERS.length]
}

export function productFrameCode(product: Pick<Product, "id" | "category">): string {
  const id = Number(product.id)
  const num = Number.isFinite(id) ? pad2(id) : product.id.slice(0, 3).toUpperCase()
  return `${num}${categoryLetter(product.category)}`
}

/* ---------------------------------------------------------------- */
/* Pricing                                                           */
/* ---------------------------------------------------------------- */

export type Pricing = {
  /** What the customer pays per day. */
  price: number
  /** Struck-through price, only when a real discount applies. */
  originalPrice?: number
  /** Whole-number percent off, only when a real discount applies. */
  percentOff?: number
}

/**
 * Per-day price shown on the site.
 *
 * The backend exposes a discounted `final_price` (mapped to
 * `discountPercentage`), but the live site has always charged the base
 * `price_per_day`. Keep that behaviour until the business decides to
 * surface the backend offer — flip this flag to show it everywhere.
 */
export const SHOW_BACKEND_DISCOUNTS = false

export function getPricing(product: Pick<Product, "price" | "discountPercentage">): Pricing {
  const base = product.price || 0
  const pct = product.discountPercentage ?? 0
  if (SHOW_BACKEND_DISCOUNTS && pct > 0 && base > 0) {
    const price = Math.round(base * (1 - pct / 100))
    if (price < base) return { price, originalPrice: base, percentOff: Math.round(((base - price) / base) * 100) }
  }
  return { price: base }
}

/* ---------------------------------------------------------------- */
/* Duration discounts — configured in the Django admin               */
/* ---------------------------------------------------------------- */

export type DurationTier = {
  minDays: number
  /** Inclusive upper bound; null means "and above". */
  maxDays: number | null
  percent: number
  label?: string
}

/**
 * Used only when the backend has no duration-discount endpoint yet, so the
 * site keeps its previous behaviour (20% for 3–6 days, 25% for 7–9 days).
 * Once the endpoint is live, the admin-configured tiers replace these —
 * including an empty list, which means no duration discounts.
 */
export const DEFAULT_DURATION_TIERS: DurationTier[] = [
  { minDays: 3, maxDays: 6, percent: 20 },
  { minDays: 7, maxDays: 9, percent: 25 },
]

export function tierFor(days: number, tiers: DurationTier[]): DurationTier | null {
  return tiers.find((t) => days >= t.minDays && (t.maxDays === null || days <= t.maxDays)) ?? null
}

/** The next tier that would give a bigger discount than the current one. */
export function nextTier(days: number, tiers: DurationTier[]): DurationTier | null {
  const current = tierFor(days, tiers)?.percent ?? 0
  return (
    [...tiers]
      .sort((a, b) => a.minDays - b.minDays)
      .find((t) => t.minDays > days && t.percent > current) ?? null
  )
}

export function rentalTotal(pricePerDay: number, days: number, tiers: DurationTier[]): number {
  if (days <= 0) return 0
  const pct = tierFor(days, tiers)?.percent ?? 0
  return Math.round(pricePerDay * days * (1 - pct / 100))
}

export function formatTierRange(t: DurationTier): string {
  if (t.maxDays === null) return `${t.minDays}+ days`
  if (t.maxDays === t.minDays) return `${t.minDays} ${t.minDays === 1 ? "day" : "days"}`
  return `${t.minDays}–${t.maxDays} days`
}

export function formatPercent(p: number): string {
  return `${Number.isInteger(p) ? p : p.toFixed(1)}%`
}

/* ---------------------------------------------------------------- */
/* Category groups — the 8 tiles on the home page                    */
/* ---------------------------------------------------------------- */

export type CategoryGroup = {
  key: string
  name: string
  code: string
  href: string
  match: (categoryName: string) => boolean
}

const has = (...words: string[]) => (name: string) => {
  const n = name.toLowerCase()
  return words.some((w) => n.includes(w))
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { key: "cameras", name: "Cameras", code: "1A", href: "/cameras", match: (n) => has("camera", "camcorder")(n) && !has("lens")(n) },
  { key: "lenses", name: "Lenses", code: "2A", href: "/lenses", match: has("lens") },
  { key: "drones", name: "Drones", code: "3A", href: "/rental-equipment/drones", match: has("drone") },
  { key: "action", name: "Action", code: "4A", href: "/rental-equipment/gopro-insta360", match: has("gopro", "insta360") },
  { key: "gimbals", name: "Gimbals", code: "5A", href: "/rental-equipment/gimbals-mobile-gimbals", match: has("gimbal") },
  { key: "lighting", name: "Lighting", code: "6A", href: "/rental-equipment/videography-lights", match: has("light", "reflector") },
  { key: "audio", name: "Audio", code: "7A", href: "/rental-equipment/microphones-audio-gear", match: has("audio", "microphone", "walkie") },
  { key: "accessories", name: "Accessories", code: "8A", href: "/accessories", match: () => true },
]

/** Assigns each product to exactly one group (first match wins; Accessories is the catch-all). */
export function groupOf(product: Pick<Product, "category">): CategoryGroup {
  const name = product.category?.name ?? ""
  return CATEGORY_GROUPS.find((g) => g.match(name)) ?? CATEGORY_GROUPS[CATEGORY_GROUPS.length - 1]
}

export function groupCounts(products: Pick<Product, "category">[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of products) {
    const g = groupOf(p)
    counts[g.key] = (counts[g.key] ?? 0) + 1
  }
  return counts
}

/* ---------------------------------------------------------------- */
/* WhatsApp                                                          */
/* ---------------------------------------------------------------- */

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Book My DSLR, I'd like to check gear availability for my shoot."

/* ---------------------------------------------------------------- */
/* Dates (local, yyyy-mm-dd)                                         */
/* ---------------------------------------------------------------- */

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

export function addDaysISO(iso: string, days: number): string {
  const d = fromISODate(iso)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

/** Whole days between two ISO dates (end exclusive), minimum 1. */
export function daysBetween(start: string, end: string): number {
  const ms = fromISODate(end).getTime() - fromISODate(start).getTime()
  return Math.max(1, Math.round(ms / 86_400_000))
}

export function tomorrowISO(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return toISODate(d)
}

export function formatShortDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}
