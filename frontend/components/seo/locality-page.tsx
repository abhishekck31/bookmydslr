import Link from "next/link"
import { Phone } from "lucide-react"
import { formatINR, formatPercent, formatTierRange, whatsappLink, type DurationTier } from "@/lib/film"
import { siteConfig } from "@/lib/seo/site"
import type { Locality } from "@/data/seo/localities"
import {
  DELIVERY_FROM,
  PICKUP_ADDRESS_LINE,
  deliveryCopy,
  focusGroups,
  nearbyLinks,
  type InventoryFacts,
} from "@/lib/seo/locality-content"
import type { LocalityFaq } from "@/data/seo/localities"
import { Arrow, FilmButton, FrameLabel, FrameSection, WhatsAppIcon } from "@/components/film/primitives"
import { ContactSheet, FilmProductCard } from "@/components/film/product-card"
import { StepsGrid } from "@/components/film/sections"

const PER_GROUP = 4

export function CallButton({ size = "lg", className }: { size?: "md" | "lg"; className?: string }) {
  return (
    <FilmButton asChild size={size} className={className}>
      <a href={`tel:${siteConfig.phone}`}>
        <Phone aria-hidden className="h-[18px] w-[18px]" /> Call {siteConfig.phoneDisplay}
      </a>
    </FilmButton>
  )
}

export function LocalityPage({
  locality: l,
  facts,
  faqs,
  tiers,
}: {
  locality: Locality
  facts: InventoryFacts
  faqs: LocalityFaq[]
  tiers: DurationTier[]
}) {
  const groups = focusGroups(l, facts)
  const delivery = deliveryCopy(l)
  const nearby = nearbyLinks(l)
  const waMessage = `Hi Book My DSLR, I'm in ${l.name} and want to rent gear for my shoot. Can you check availability?`
  const camsFrom = facts.groups.cameras.minPrice
  const bestTier = [...tiers].sort((a, b) => b.percent - a.percent)[0]

  const facts4: [string, string][] = [
    ["Pickup", "Kalyan Nagar, Hennur Main Road"],
    [l.proximity === "pickup" ? "Delivery" : `Delivery to ${l.name}`, `From ${formatINR(DELIVERY_FROM)}, by distance`],
    ["Rates", camsFrom ? `Cameras from ${formatINR(camsFrom)}/day` : "Per day, shown on each item"],
    ["Open", "8 am – 10 pm, every day"],
  ]

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="film-container grid gap-8 py-10 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <FrameLabel n={1}>
            <span className="label-mono text-primary">{l.region} Bangalore</span>
          </FrameLabel>
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/camera-rental-bangalore" className="hover:text-foreground">Camera Rental Bangalore</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-foreground">{l.name}</li>
              </ol>
            </nav>
            <h1 className="max-w-5xl font-serif text-display-l text-foreground">
              Camera Rental in <em className="text-primary">{l.name}</em>, Bangalore
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body">
              Rent DSLR and mirrorless cameras, lenses, drones, lights and audio gear for your shoot in {l.name}.{" "}
              {l.proximity === "city"
                ? `Collect from our Kalyan Nagar pickup point or get it delivered to ${l.name}.`
                : `Our pickup point in Kalyan Nagar is ${l.proximity === "pickup" ? "right here" : "next door"}, and delivery is available too.`}{" "}
              {facts.total} items listed, with live prices and availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton />
              <FilmButton asChild size="lg" variant="whatsapp">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp us
                </a>
              </FilmButton>
              <FilmButton asChild size="lg" variant="secondary">
                <Link href="/rental-equipment">
                  Browse all gear <Arrow />
                </Link>
              </FilmButton>
            </div>
            <dl className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {facts4.map(([k, v]) => (
                <div key={k} className="border-b border-border py-4 pr-6">
                  <dt className="label-mono text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-[15px] text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Equipment */}
      {groups.length ? (
        <FrameSection n={2} aside={<span className="label-mono">{facts.available} available now</span>} labelledBy="gear-heading">
          <h2 id="gear-heading" className="mb-2 font-serif text-display-m text-foreground">
            Gear you can rent in <em className="text-primary">{l.name}</em>
          </h2>
          <p className="mb-10 max-w-2xl text-[15px] text-body">
            Real items from our current inventory. Prices are per day; availability updates as gear is booked.
          </p>
          <div className="space-y-14">
            {groups.map((g) => (
              <div key={g.key}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h3 className="font-serif text-display-s text-foreground">
                    {g.name}{" "}
                    <span className="label-mono align-middle text-muted-foreground">
                      {g.count} listed{g.minPrice ? ` · from ${formatINR(g.minPrice)}/day` : ""}
                    </span>
                  </h3>
                  <FilmButton asChild variant="ghost">
                    <Link href={g.href}>
                      All {g.name.toLowerCase()} <Arrow />
                    </Link>
                  </FilmButton>
                </div>
                <ContactSheet>
                  {g.products.slice(0, PER_GROUP).map((p) => (
                    <FilmProductCard key={p.id} product={p} />
                  ))}
                </ContactSheet>
              </div>
            ))}
          </div>
        </FrameSection>
      ) : null}

      {/* Pickup & delivery */}
      <FrameSection n={3} band labelledBy="delivery-heading">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div>
            <h2 id="delivery-heading" className="font-serif text-display-m text-foreground">
              {delivery.headline}
            </h2>
            {delivery.body.map((p) => (
              <p key={p} className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body">{p}</p>
            ))}
          </div>
          <div className="border border-border bg-background p-6">
            <p className="label-mono text-muted-foreground">Pickup point</p>
            <address className="mt-2 not-italic text-[15px] leading-relaxed text-foreground">{PICKUP_ADDRESS_LINE}</address>
            <p className="mt-4 label-mono text-muted-foreground">Phone</p>
            <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-[15px] text-foreground underline-offset-4 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            <p className="mt-4 label-mono text-muted-foreground">Hours</p>
            <p className="mt-1 text-[15px] text-foreground">8 am – 10 pm, every day</p>
          </div>
        </div>
      </FrameSection>

      {/* Why us + how it works */}
      <FrameSection n={4} labelledBy="why-heading">
        <h2 id="why-heading" className="mb-8 font-serif text-display-m text-foreground">
          Why renters in {l.name} book with us
        </h2>
        <ul className="mb-12 grid gap-px bg-border md:grid-cols-2">
          {[
            [`${facts.total} items to choose from`, `Cameras${facts.cameraBrands.length ? ` from ${facts.cameraBrands.slice(0, 4).join(", ")}` : ""}, lenses, drones, gimbals, lights, audio and accessories — all in one booking.`],
            ["Clear per-day pricing", `Every item shows its daily rate${camsFrom ? ` (cameras from ${formatINR(camsFrom)}/day)` : ""}. No account needed to see prices.`],
            bestTier
              ? ["Longer rentals cost less", `Save up to ${formatPercent(bestTier.percent)} when you rent for ${formatTierRange(bestTier)}. The discount is shown before you book.`]
              : ["Rent for exactly the days you need", "Pick your dates; the minimum rental is a single day."],
            ["Booked by a real person", `Send your cart on WhatsApp or call ${siteConfig.phoneDisplay}. We confirm availability, deposit and timing before you pay.`],
          ].map(([t, d]) => (
            <li key={t} className="bg-background p-6">
              <h3 className="font-serif text-title text-foreground">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{d}</p>
            </li>
          ))}
        </ul>
        <h3 className="mb-6 font-serif text-display-s text-foreground">How renting works</h3>
        <StepsGrid />
      </FrameSection>

      {/* About + nearby */}
      <FrameSection n={5} band labelledBy="area-heading">
        <h2 id="area-heading" className="font-serif text-display-m text-foreground">About {l.name}</h2>
        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-body">{l.about}</p>
        {l.aliases?.length ? (
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">Also covers: {l.aliases.join(", ")}.</p>
        ) : null}
        <h3 className="mt-10 font-serif text-display-s text-foreground">Camera rental in nearby areas</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((n) => (
            <li key={n.name}>
              {n.href ? (
                <Link
                  href={n.href}
                  className="inline-flex h-11 items-center rounded-full border border-border-strong bg-background px-4 text-sm text-body transition-colors hover:border-primary hover:text-foreground"
                >
                  {n.name}
                </Link>
              ) : (
                <span className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm text-muted-foreground">
                  {n.name}
                </span>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/camera-rental-bangalore"
              className="inline-flex h-11 items-center rounded-full border border-border-strong bg-background px-4 text-sm font-semibold text-foreground hover:border-primary"
            >
              All of Bangalore <Arrow />
            </Link>
          </li>
        </ul>
      </FrameSection>

      {/* FAQ */}
      <FrameSection n={6} labelledBy="faq-heading">
        <h2 id="faq-heading" className="mb-8 font-serif text-display-m text-foreground">
          Camera rental in {l.name}: <em className="text-primary">FAQs</em>
        </h2>
        <div className="grid gap-px border-t border-border bg-border md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.question} className="bg-background py-6 md:p-6">
              <h3 className="font-serif text-[20px] leading-snug text-foreground md:text-[22px]">{f.question}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{f.answer}</p>
            </div>
          ))}
        </div>
      </FrameSection>

      {/* Final CTA */}
      <section className="border-b border-border bg-foreground py-14 text-background md:py-20">
        <div className="film-container">
          <h2 className="max-w-3xl font-serif text-display-m">Shooting in {l.name}? Tell us your dates.</h2>
          <p className="mt-4 max-w-2xl text-[16px] text-background/80">
            Call or WhatsApp with the gear and dates you need — we&apos;ll confirm availability and the delivery charge for {l.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <FilmButton asChild size="lg" variant="whatsapp">
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp us
              </a>
            </FilmButton>
          </div>
        </div>
      </section>
    </>
  )
}
