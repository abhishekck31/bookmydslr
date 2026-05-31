"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SeoContent } from "@/components/seo/seo-content"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"

interface HomeSeoAccordionProps {
  title: string
  intro: string
  sections: SeoNarrativeSection[]
  faqs: FAQItem[]
  links: InternalLink[]
  triggerLabel?: string
}

export function HomeSeoAccordion({
  title,
  intro,
  sections,
  faqs,
  links,
  triggerLabel = "Premium Camera Rental in Bangalore",
}: HomeSeoAccordionProps) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container-premium">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="seo-content"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-[#eef6fc] px-0"
          >
            <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold text-slate-900 hover:no-underline md:text-lg">
              {triggerLabel}
            </AccordionTrigger>
            <AccordionContent className="border-t border-slate-200/80 bg-white px-0 pb-0">
              <SeoContent
                title={title}
                intro={intro}
                sections={sections}
                faqs={faqs}
                links={links}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
