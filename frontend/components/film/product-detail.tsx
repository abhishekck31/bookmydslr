"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import {
  addDaysISO,
  daysBetween,
  formatINR,
  formatShortDate,
  formatPercent,
  formatTierRange,
  getPricing,
  nextTier,
  productFrameCode,
  rentalTotal,
  tierFor,
  tomorrowISO,
  whatsappLink,
} from "@/lib/film"
import { Arrow, Availability, DiscountBadge, FilmButton, PriceTag, WhatsAppIcon } from "./primitives"
import { DaysStepper, RentalRangePicker } from "./rental-controls"
import { FilmAccordion } from "./faq"
import { ContactSheet, FilmProductCard } from "./product-card"
import { MobileStickyBar } from "./mobile-sticky-bar"
import { TierTable, useDurationTiers } from "./duration-tiers"
import { trackWhatsAppClick } from "@/lib/track"

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addItem, dates, setDates } = useCart()
  const { triggerCartGlow } = useCartGlow()
  const tiers = useDurationTiers()
  const pricing = getPricing(product)
  const code = productFrameCode(product)

  const [start, setStart] = React.useState(() => tomorrowISO())
  const [days, setDays] = React.useState(1)

  // Reuse the dates already chosen for the cart, if they are still in the future.
  React.useEffect(() => {
    if (dates && dates.start >= tomorrowISO()) {
      setStart(dates.start)
      setDays(daysBetween(dates.start, dates.end))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const end = addDaysISO(start, days)
  const subtotal = pricing.price * days
  const total = rentalTotal(pricing.price, days, tiers)
  const saving = subtotal - total
  const tier = tierFor(days, tiers)
  const upcoming = nextTier(days, tiers)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: pricing.price,
      image: product.image || "/placeholder.svg",
      days,
      category: product.category?.name ?? "Equipment",
      brand: product.brand,
    })
    setDates({ start, end })
    triggerCartGlow()
  }

  const waMessage = [
    "Hi Book My DSLR, I'd like to rent:",
    "",
    `${product.name}${product.brand ? ` (${product.brand})` : ""}`,
    `Dates: ${formatShortDate(start)} → ${formatShortDate(end)} (${days} ${days === 1 ? "day" : "days"})`,
    `Rate: ${formatINR(pricing.price)}/day`,
    ...(tier && saving > 0 ? [`Duration discount: ${formatPercent(tier.percent)} (−${formatINR(saving)})`] : []),
    `Estimated total: ${formatINR(total)}`,
    "",
    "Please confirm availability.",
  ].join("\n")

  const specs: [string, string][] = [
    ["Brand", product.brand || "—"],
    ["Category", product.category?.name ?? "—"],
    ["Frame code", code],
    ["Status", product.isAvailable ? "Available" : "Booked"],
    ["Day rate", formatINR(pricing.price)],
    ["Billing", "Per 24 hours"],
  ]

  const accordion = [
    ...(product.description?.trim()
      ? [{ question: "About this item", answer: <p className="whitespace-pre-line">{product.description}</p> }]
      : []),
    {
      question: "Key specs",
      answer: (
        <dl className="grid grid-cols-1 border-t border-border sm:grid-cols-2 sm:gap-x-8">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border py-2.5">
              <dt className="label-mono text-muted-foreground">{k}</dt>
              <dd className="font-mono text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      question: "Rental terms",
      answer: (
        <ul className="space-y-2">
          <li>Rental runs from pickup or delivery to the agreed return date; any part of a day counts as a day.</li>
          <li>A refundable security deposit may be required for some gear or first-time renters.</li>
          <li>Late returns are charged at the daily rate for each day overdue.</li>
          <li>Cancel more than 48 hours ahead for a full refund; later cancellations may carry a 50% fee.</li>
          <li>
            You are responsible for loss or damage during the rental.{" "}
            <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
              Full terms
            </Link>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <>
      <div className="film-container pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="label-mono flex flex-wrap gap-x-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/rental-equipment" className="hover:text-foreground">All gear</Link>
            </li>
            {product.category ? (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/rental-equipment/${product.category.slug}`} className="hover:text-foreground">
                    {product.category.name}
                  </Link>
                </li>
              </>
            ) : null}
          </ol>
        </nav>
      </div>

      <section className="film-container grid gap-8 pb-14 pt-6 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-20">
        {/* Image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative border border-border bg-tile">
            <div className={`relative aspect-square p-8 md:p-14 ${product.isAvailable ? "" : "opacity-60"}`}>
              <div className="relative h-full w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>
            <span className="label-mono absolute left-4 top-4 text-muted-foreground">▸ {code}</span>
            {pricing.percentOff && pricing.originalPrice ? (
              <DiscountBadge percentOff={pricing.percentOff} originalPrice={pricing.originalPrice} className="absolute bottom-0 left-0" />
            ) : null}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="label-mono text-muted-foreground">
            {product.brand} <span aria-hidden>·</span> <span className="text-primary">{code}</span>
          </p>
          <h1 className="mt-3 font-serif text-display-m text-foreground">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <PriceTag price={pricing.price} originalPrice={pricing.originalPrice} size="lg" />
            <Availability available={product.isAvailable} className="text-[11px]" />
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="label-mono text-muted-foreground">Rental window</h2>
            <div className="mt-3 flex flex-col gap-4">
              <RentalRangePicker
                start={start}
                end={end}
                onChange={(r) => {
                  setStart(r.start)
                  setDays(daysBetween(r.start, r.end))
                }}
              />
              <DaysStepper value={days} onChange={setDays} />
            </div>

            <div className="mt-6 border border-dashed border-border-strong p-4" aria-live="polite">
              <p className="flex flex-wrap items-baseline justify-between gap-2 text-[15px] text-body">
                <span>
                  {days} {days === 1 ? "day" : "days"} × {formatINR(pricing.price)}
                </span>
                <span className="price text-foreground">{formatINR(subtotal)}</span>
              </p>
              {tier && saving > 0 ? (
                <p className="mt-2 flex justify-between gap-2 text-sm text-success">
                  <span>
                    {tier.label ?? "Duration discount"} · {formatPercent(tier.percent)} off {formatTierRange(tier)}
                  </span>
                  <span className="price">−{formatINR(saving)}</span>
                </p>
              ) : null}
              <p className="mt-3 flex items-baseline justify-between gap-2 border-t border-border pt-3">
                <span className="label-mono text-muted-foreground">Estimated total</span>
                <span className="flex items-baseline gap-2">
                  {saving > 0 ? <s className="price text-sm text-subtle">{formatINR(subtotal)}</s> : null}
                  <span className="price text-[28px] text-primary">{formatINR(total)}</span>
                </span>
              </p>
              {upcoming ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Rent {upcoming.minDays}+ days and save {formatPercent(upcoming.percent)}.
                </p>
              ) : null}
            </div>

            <TierTable days={days} className="mt-6" />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.isAvailable ? (
                <FilmButton size="lg" onClick={handleAdd}>
                  Add to cart <Arrow />
                </FilmButton>
              ) : (
                <FilmButton size="lg" variant="secondary" asChild>
                  <a
                    href={whatsappLink(`Hi Book My DSLR, please notify me when ${product.name} is available.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick({
                        event_type: "notify_me",
                        product: product.id,
                        product_names: product.name,
                      })
                    }
                  >
                    Notify me
                  </a>
                </FilmButton>
              )}
              <FilmButton size="lg" variant="whatsapp" asChild>
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      event_type: "product_enquiry",
                      product: product.id,
                      product_names: product.name,
                    })
                  }
                >
                  <WhatsAppIcon /> Book on WhatsApp
                </a>
              </FilmButton>
            </div>
          </div>

          <FilmAccordion items={accordion} type="multiple" className="mt-10" />
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-heading" className="film-section border-t border-border">
          <div className="film-container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-heading" className="font-serif text-display-m text-foreground">
                You may also <em className="text-primary">need</em>
              </h2>
              {product.category ? (
                <FilmButton asChild variant="ghost">
                  <Link href={`/rental-equipment/${product.category.slug}`}>
                    More in {product.category.name} <Arrow />
                  </Link>
                </FilmButton>
              ) : null}
            </div>
            <ContactSheet className="lg:grid-cols-4">
              {related.map((p) => (
                <FilmProductCard key={p.id} product={p} />
              ))}
            </ContactSheet>
          </div>
        </section>
      ) : null}

      <MobileStickyBar>
        {product.isAvailable ? (
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-primary-foreground"
          >
            Add · <span className="price">{formatINR(total)}</span> total
          </button>
        ) : (
          <a
            href={whatsappLink(`Hi Book My DSLR, please notify me when ${product.name} is available.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                event_type: "notify_me",
                product: product.id,
                product_names: product.name,
              })
            }
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-border-strong text-[15px] font-semibold text-foreground"
          >
            Notify me
          </a>
        )}
      </MobileStickyBar>
    </>
  )
}
