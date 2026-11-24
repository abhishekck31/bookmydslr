import Link from "next/link"
import { FAQSection } from "@/components/seo/faq-section"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"
import { FrameLabel } from "@/components/film/primitives"

interface SeoContentProps {
  eyebrow?: string
  title: string
  intro: string
  sections: SeoNarrativeSection[]
  faqs?: FAQItem[]
  links?: InternalLink[]
  /** Frame number for the section marker. */
  frame?: number
}

/** Long-form SEO copy laid out as a readable article with FAQ and related links. */
export function SeoContent({ eyebrow, title, intro, sections, faqs = [], links = [], frame = 9 }: SeoContentProps) {
  return (
    <section className="film-section border-t border-border">
      <div className="film-container grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <FrameLabel n={frame}>{eyebrow ? <span className="label-mono text-muted-foreground">{eyebrow}</span> : null}</FrameLabel>

        <div className="min-w-0">
          <h2 className="max-w-4xl font-serif text-display-m text-foreground">{title}</h2>

          <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)] xl:gap-16">
            <article className="article">
              <p>{intro}</p>
              {sections.map((section) => (
                <div key={section.title} className="mt-12">
                  <h3 className="font-serif text-[28px] leading-tight text-foreground md:text-[34px]">{section.title}</h3>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-6 border-t border-border">
                      {section.bullets.map((bullet, i) => (
                        <li key={bullet} className="flex gap-4 border-b border-border py-3 text-[15px]">
                          <span className="label-mono pt-1 text-primary">{String(i + 1).padStart(2, "0")}</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </article>

            {links.length ? (
              <aside aria-label="Related pages" className="xl:sticky xl:top-28 xl:self-start">
                <p className="label-mono mb-4 text-muted-foreground">Related reels</p>
                <ul className="border-t border-border">
                  {links.map((link) => (
                    <li key={link.href} className="border-b border-border">
                      <Link href={link.href} className="group block py-4">
                        <span className="block font-serif text-[22px] text-foreground group-hover:text-primary">
                          {link.label} <span aria-hidden className="text-primary">→</span>
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{link.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          {faqs.length ? (
            <div className="mt-16 max-w-4xl">
              <FAQSection faqs={faqs} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
