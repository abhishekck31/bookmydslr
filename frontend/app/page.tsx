import Image from "next/image"
import Link from "next/link"
import { HomeSeoAccordion } from "@/components/homepage/home-seo-accordion"
import { fetchProducts } from "@/lib/api"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema"
import { buildMainCityFaqs, buildMainCitySections } from "@/lib/seo/page-content"
import type { Product } from "@/types"
import { CATEGORY_GROUPS, DEFAULT_WHATSAPP_MESSAGE, formatINR, getPricing, groupOf, whatsappLink } from "@/lib/film"
import { Arrow, FilmButton, FrameLabel, FrameSection, WhatsAppIcon } from "@/components/film/primitives"
import { ContactSheet, FilmProductCard } from "@/components/film/product-card"
import { CategoryStrip, ReviewsBlock, StepsGrid } from "@/components/film/sections"
import { FilmAccordion } from "@/components/film/faq"
import { Reveal } from "@/components/film/reveal"

export const revalidate = 300

const homeFaqs = buildMainCityFaqs()

export const metadata = buildMetadata({
  title: "Camera Rental Bangalore | Book My DSLR",
  description:
    "Rent DSLR, mirrorless, lenses, drones, and filmmaking gear in Bangalore. Fast pickup from Kalyan Nagar and city-wide support.",
  path: "/",
  keywords: [
    "camera rental Bangalore",
    "DSLR rental Bangalore",
    "mirrorless camera rental Bangalore",
    "lens rental Bangalore",
    "filmmaking equipment rental Bangalore",
  ],
})

/** A varied featured row: round-robin across category groups, available items with photos only. */
function pickFeatured(products: Product[], limit = 8): Product[] {
  const pool = products.filter((p) => p.image && p.isAvailable)
  const buckets = new Map<string, Product[]>()
  for (const p of pool) {
    const key = groupOf(p).key
    buckets.set(key, [...(buckets.get(key) ?? []), p])
  }
  const order = CATEGORY_GROUPS.map((g) => buckets.get(g.key) ?? [])
  const picked: Product[] = []
  for (let round = 0; picked.length < limit && order.some((b) => b.length > round); round++) {
    for (const bucket of order) {
      if (bucket[round] && picked.length < limit) picked.push(bucket[round])
    }
  }
  return picked
}

export default async function HomePage() {
  const products = await fetchProducts()
  const featured = pickFeatured(products)
  const available = products.filter((p) => p.isAvailable && p.price > 0)
  const fromPrice = available.length ? Math.min(...available.map((p) => getPricing(p).price)) : null

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Rental Bangalore | Book My DSLR",
            description:
              "Rent DSLR, mirrorless, lenses, drones, and filmmaking gear in Bangalore with fast pickup and delivery support.",
            path: "/",
          }),
          buildFaqSchema(homeFaqs),
          buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
          buildLocalBusinessSchema("/"),
        ]}
      />

      {/* FRAME 01 — hero */}
      <section className="border-b border-border">
        <div className="film-container grid gap-8 py-8 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:py-20">
          <div className="order-2 lg:order-1">
            <FrameLabel n={1} />
            <h1 className="mt-5 font-serif text-display-xl text-foreground">
              Rent <em className="text-primary">pro</em> camera gear in Bangalore.
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body md:text-[17px]">
              DSLR, mirrorless and cinema bodies, lenses, drones, gimbals, light and sound — checked before every
              rental. Pick up from Kalyan Nagar or get it delivered across the city.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <FilmButton asChild size="lg">
                <Link href="/rental-equipment">
                  Browse gear <Arrow />
                </Link>
              </FilmButton>
              <FilmButton asChild size="lg" variant="secondary">
                <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="text-whatsapp" /> WhatsApp
                </a>
              </FilmButton>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-2 border-t border-border pt-5">
              <div>
                <dt className="label-mono text-muted-foreground">In the catalogue</dt>
                <dd className="price mt-1 text-[26px] text-foreground">{products.length || "—"}</dd>
              </div>
              <div>
                <dt className="label-mono text-muted-foreground">Open daily</dt>
                <dd className="price mt-1 text-[26px] text-foreground">8 – 10</dd>
              </div>
            </dl>
          </div>

          <div className="relative order-1 -mx-[var(--gutter)] aspect-[4/3] overflow-hidden border-y border-border lg:order-2 lg:mx-0 lg:aspect-[4/5] lg:border">
            <Image
              src="/images/hero-cinema-camera.png"
              alt="Cinema camera rig on a dark set, available to rent"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <span className="label-mono absolute left-4 top-4 text-amber-400">▸ 14A</span>
            <span className="label-mono absolute right-4 top-4 text-white/80">Cinema rig</span>
            {fromPrice !== null ? (
              <div className="absolute bottom-4 left-4 border border-border-strong bg-background/90 px-4 py-3 backdrop-blur">
                <p className="label-mono text-muted-foreground">From</p>
                <p className="price text-[26px] leading-tight text-primary">
                  {formatINR(fromPrice)}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">/ day</span>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* FRAME 02 — categories */}
      <section aria-labelledby="cat-heading" className="film-section border-b border-border">
        <div className="film-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <FrameLabel n={2} />
              <h2 id="cat-heading" className="mt-3 font-serif text-display-m text-foreground">
                Pick a <em className="text-primary">reel</em>
              </h2>
            </div>
            <FilmButton asChild variant="ghost">
              <Link href="/rental-equipment">
                All {products.length || ""} items <Arrow />
              </Link>
            </FilmButton>
          </div>
          <CategoryStrip products={products} />
        </div>
      </section>

      {/* FRAME 03 — featured gear */}
      {featured.length ? (
        <FrameSection n={3} labelledBy="featured-heading" aside={<span className="label-mono">Contact sheet</span>}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="featured-heading" className="font-serif text-display-m text-foreground">
              On the <em className="text-primary">bench</em>
            </h2>
            <FilmButton asChild variant="ghost">
              <Link href="/rental-equipment">
                Browse everything <Arrow />
              </Link>
            </FilmButton>
          </div>
          <ContactSheet className="lg:grid-cols-4">
            {featured.map((product) => (
              <FilmProductCard key={product.id} product={product} />
            ))}
          </ContactSheet>
        </FrameSection>
      ) : null}

      {/* FRAME 04 — how it works */}
      <FrameSection n={4} band labelledBy="how-heading">
        <h2 id="how-heading" className="mb-8 font-serif text-display-m text-foreground">
          Three steps to <em className="text-primary">rolling</em>
        </h2>
        <Reveal>
          <StepsGrid />
        </Reveal>
      </FrameSection>

      {/* FRAME 05 — reviews */}
      <FrameSection n={5} labelledBy="reviews-heading" aside={<span className="label-mono">From renters</span>}>
        <h2 id="reviews-heading" className="sr-only">
          What renters say
        </h2>
        <Reveal>
          <ReviewsBlock />
        </Reveal>
      </FrameSection>

      {/* FRAME 06 — final CTA */}
      <section className="film-section border-b border-border bg-surface">
        <div className="film-container grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <FrameLabel n={6} />
          <div>
            <h2 className="max-w-4xl font-serif text-display-l text-foreground">
              Call action. <em className="text-primary">We&apos;ll have it rolling.</em>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <FilmButton asChild size="lg" variant="whatsapp">
                <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Book on WhatsApp
                </a>
              </FilmButton>
              <FilmButton asChild size="lg" variant="secondary">
                <Link href="/rental-equipment">
                  Browse gear <Arrow />
                </Link>
              </FilmButton>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 07 — FAQ */}
      <FrameSection n={7} labelledBy="faq-heading">
        <h2 id="faq-heading" className="mb-8 font-serif text-display-m text-foreground">
          Questions, <em className="text-primary">answered</em>
        </h2>
        <FilmAccordion items={homeFaqs} className="max-w-4xl" />
      </FrameSection>

      <HomeSeoAccordion
        frame={8}
        title="Bangalore camera rental built for creators, photographers, and production teams"
        intro="The homepage now works as an authority page for camera rental Bangalore by combining product discovery, trust signals, and long-form commercial content that supports the strongest keyword clusters."
        sections={buildMainCitySections()}
        faqs={[]}
        links={[
          {
            href: "/camera-rental-bangalore",
            label: "Camera Rental Bangalore",
            description: "Explore the dedicated city landing page built for high-intent demand.",
          },
          {
            href: "/rentals/sony-camera-rental-bangalore",
            label: "Sony Camera Rentals",
            description: "Popular creator and filmmaker kits with strong commercial intent.",
          },
          {
            href: "/rental-equipment",
            label: "Rental Equipment",
            description: "Browse the complete inventory across all categories.",
          },
        ]}
      />
    </>
  )
}
