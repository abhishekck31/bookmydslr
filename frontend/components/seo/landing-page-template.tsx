import Link from "next/link"
import { Product } from "@/types"
import { SeoContent } from "@/components/seo/seo-content"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"
import { Arrow, FilmButton, FrameLabel, FrameSection, WhatsAppIcon } from "@/components/film/primitives"
import { ContactSheet, FilmProductCard } from "@/components/film/product-card"
import { ReviewsBlock, StepsGrid } from "@/components/film/sections"
import { Reveal } from "@/components/film/reveal"
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/film"

interface LandingPageTemplateProps {
  title: string
  /** Part of the title to set in amber italics, e.g. the area name. */
  titleEmphasis?: string
  /** Mono marker next to "FRAME 01", e.g. "NEAR DOMLUR · ULSOOR". */
  heroMarker?: string
  description: string
  bullets: string[]
  products: Product[]
  eyebrow?: string
  contentTitle: string
  contentIntro: string
  sections: SeoNarrativeSection[]
  faqs: FAQItem[]
  internalLinks: InternalLink[]
  /** Extra links shown as chips under the content (e.g. nearby areas). */
  nearby?: { href: string; label: string }[]
}

function Emphasised({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis || !text.includes(emphasis)) return <>{text}</>
  const [before, ...after] = text.split(emphasis)
  return (
    <>
      {before}
      <em className="text-primary">{emphasis}</em>
      {after.join(emphasis)}
    </>
  )
}

export function LandingPageTemplate({
  title,
  titleEmphasis,
  heroMarker,
  description,
  bullets,
  products,
  eyebrow,
  contentTitle,
  contentIntro,
  sections,
  faqs,
  internalLinks,
  nearby = [],
}: LandingPageTemplateProps) {
  return (
    <>
      {/* FRAME 01 — hero */}
      <section className="border-b border-border">
        <div className="film-container grid gap-8 py-12 md:py-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <FrameLabel n={1}>{heroMarker ? <span className="label-mono text-primary">{heroMarker}</span> : null}</FrameLabel>
          <div>
            {eyebrow ? <p className="label-mono mb-4 text-muted-foreground">{eyebrow}</p> : null}
            <h1 className="max-w-5xl font-serif text-display-l text-foreground">
              <Emphasised text={title} emphasis={titleEmphasis} />
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body">{description}</p>
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
            {bullets.length ? (
              <ul className="mt-10 grid border-t border-border md:grid-cols-3">
                {bullets.map((bullet, i) => (
                  <li key={bullet} className="flex gap-3 border-b border-border py-4 pr-6 text-[15px] text-body md:border-b-0">
                    <span className="label-mono pt-1 text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {/* FRAME 02 — popular gear */}
      {products.length ? (
        <FrameSection n={2} aside={<span className="label-mono">{products.length} frames</span>}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-display-m text-foreground">
              Popular <em className="text-primary">gear</em>
            </h2>
            <FilmButton asChild variant="ghost">
              <Link href="/rental-equipment">
                See all gear <Arrow />
              </Link>
            </FilmButton>
          </div>
          <ContactSheet>
            {products.map((product) => (
              <FilmProductCard key={product.id} product={product} />
            ))}
          </ContactSheet>
        </FrameSection>
      ) : null}

      {/* FRAME 03 — how it works */}
      <FrameSection n={3} band>
        <h2 className="mb-8 font-serif text-display-m text-foreground">
          How it <em className="text-primary">works</em>
        </h2>
        <Reveal>
          <StepsGrid />
        </Reveal>
      </FrameSection>

      {/* FRAME 04 — reviews */}
      <FrameSection n={4} aside={<span className="label-mono">From renters</span>}>
        <Reveal>
          <ReviewsBlock />
        </Reveal>
      </FrameSection>

      {/* FRAME 05 — long read + FAQ */}
      <SeoContent
        frame={5}
        eyebrow="The long read"
        title={contentTitle}
        intro={contentIntro}
        sections={sections}
        faqs={faqs}
        links={internalLinks}
      />

      {nearby.length ? (
        <section className="border-t border-border bg-surface py-10">
          <div className="film-container grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
            <p className="label-mono text-muted-foreground">Nearby areas</p>
            <ul className="flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="inline-flex h-11 items-center rounded-full border border-border-strong px-4 text-sm text-body transition-colors hover:border-primary hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
