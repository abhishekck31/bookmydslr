import { FAQItem } from "@/lib/seo/types"
import { FilmAccordion } from "@/components/film/faq"

interface FAQSectionProps {
  title?: string
  intro?: string
  faqs: FAQItem[]
}

export function FAQSection({ title = "Questions, answered", intro, faqs }: FAQSectionProps) {
  return (
    <div>
      <h2 className="font-serif text-display-m text-foreground">{title}</h2>
      {intro ? <p className="mt-3 max-w-measure text-base text-muted-foreground">{intro}</p> : null}
      <FilmAccordion className="mt-8" items={faqs} />
    </div>
  )
}
