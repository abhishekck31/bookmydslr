import { Product } from "@/types"
import { ProductCard } from "@/components/product-card"
import { SeoContent } from "@/components/seo/seo-content"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"

interface LandingPageTemplateProps {
  title: string
  description: string
  bullets: string[]
  products: Product[]
  eyebrow?: string
  contentTitle: string
  contentIntro: string
  sections: SeoNarrativeSection[]
  faqs: FAQItem[]
  internalLinks: InternalLink[]
}

export function LandingPageTemplate({
  title,
  description,
  bullets,
  products,
  eyebrow,
  contentTitle,
  contentIntro,
  sections,
  faqs,
  internalLinks,
}: LandingPageTemplateProps) {
  return (
    <>
      <section className="bg-slate-950 pb-16 pt-24 text-white">
        <div className="container-premium grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            {eyebrow ? (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-300">{eyebrow}</p>
            ) : null}
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold text-white">Fast rental support</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Book My DSLR helps photographers, filmmakers, YouTubers, wedding teams, and production crews rent the
              right gear quickly with pickup from Kalyan Nagar and service coverage across Bangalore.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <p>Same-day pickup and city delivery options</p>
              <p>Verified gear from Canon, Sony, Nikon, DJI, and more</p>
              <p>Flexible rental plans for one-day shoots and multi-day productions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-premium">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Popular gear on this page</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                These products reinforce commercial relevance and help users move straight from search intent to booking.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <SeoContent
        eyebrow={eyebrow}
        title={contentTitle}
        intro={contentIntro}
        sections={sections}
        faqs={faqs}
        links={internalLinks}
      />
    </>
  )
}
