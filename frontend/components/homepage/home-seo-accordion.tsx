"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { SeoContent } from "@/components/seo/seo-content"
import { FAQItem, InternalLink, SeoNarrativeSection } from "@/lib/seo/types"

interface HomeSeoAccordionProps {
  title: string
  intro: string
  sections: SeoNarrativeSection[]
  faqs: FAQItem[]
  links: InternalLink[]
  triggerLabel?: string
  frame?: number
}

/** Long-form SEO content, collapsed by default and kept understated. */
export function HomeSeoAccordion({
  title,
  intro,
  sections,
  faqs,
  links,
  triggerLabel = "Camera rental in Bangalore — the long read",
  frame,
}: HomeSeoAccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible>
      <AccordionPrimitive.Item value="seo" className="border-t border-border">
        <AccordionPrimitive.Header asChild>
          <div className="film-container">
            <AccordionPrimitive.Trigger className="group flex min-h-[72px] w-full items-center justify-between gap-6 text-left">
              <span className="font-serif text-[20px] text-muted-foreground transition-colors group-hover:text-foreground md:text-[24px]">
                {triggerLabel}
              </span>
              <span aria-hidden className="font-mono text-lg text-primary transition-transform duration-200 group-data-[state=open]:rotate-45">
                +
              </span>
            </AccordionPrimitive.Trigger>
          </div>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content forceMount className="data-[state=closed]:hidden">
          <SeoContent title={title} intro={intro} sections={sections} faqs={faqs} links={links} frame={frame} />
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  )
}
