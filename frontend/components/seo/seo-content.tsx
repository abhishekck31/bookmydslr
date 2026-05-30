import Link from "next/link"
import { FAQSection } from "@/components/seo/faq-section"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"

interface SeoContentProps {
  eyebrow?: string
  title: string
  intro: string
  sections: SeoNarrativeSection[]
  faqs?: FAQItem[]
  links?: InternalLink[]
}

export function SeoContent({
  eyebrow,
  title,
  intro,
  sections,
  faqs = [],
  links = [],
}: SeoContentProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-premium space-y-12">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">{eyebrow}</p>
          ) : null}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{intro}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-10">
                <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
                <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700 md:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-xl border border-white bg-white px-4 py-3">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            {links.length ? (
              <div className="rounded-[2rem] border border-gray-200 bg-slate-950 p-6 text-white md:p-8">
                <h3 className="text-xl font-bold">Popular Rental Paths</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Strengthen topic authority and guide shoppers to the right rental page quickly.
                </p>
                <div className="mt-6 space-y-3">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-300 hover:bg-white/10"
                    >
                      <span className="block text-sm font-bold text-white">{link.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-300">{link.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900">Why this content exists</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                These sections are designed to capture commercial-intent search terms, answer pre-booking objections,
                and increase semantic relevance for camera rental, lens rental, and filmmaking gear searches in
                Bangalore.
              </p>
            </div>
          </aside>
        </div>

        {faqs.length ? <FAQSection faqs={faqs} /> : null}
      </div>
    </section>
  )
}
