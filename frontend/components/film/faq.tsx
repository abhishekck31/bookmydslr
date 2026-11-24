"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"

export type FaqEntry = { question: string; answer: React.ReactNode }

/** Hairline-row accordion with a mono "+" that turns into "×". */
export function FilmAccordion({
  items,
  className,
  questionClassName,
  type = "single",
}: {
  items: FaqEntry[]
  className?: string
  questionClassName?: string
  type?: "single" | "multiple"
}) {
  const rows = items.map((item, i) => (
    <AccordionPrimitive.Item key={i} value={`item-${i}`} className="border-b border-border">
      <AccordionPrimitive.Header asChild>
        <h3>
          <AccordionPrimitive.Trigger
            className={cn(
              "group flex min-h-[64px] w-full items-center justify-between gap-6 py-4 text-left font-serif text-[19px] leading-snug text-body transition-colors hover:text-foreground data-[state=open]:text-foreground md:text-[22px]",
              questionClassName,
            )}
          >
            <span>{item.question}</span>
            <span
              aria-hidden
              className="font-mono text-lg text-primary transition-transform duration-200 group-data-[state=open]:rotate-45"
            >
              +
            </span>
          </AccordionPrimitive.Trigger>
        </h3>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="max-w-measure pb-6 text-[15px] leading-relaxed text-muted-foreground md:text-base">{item.answer}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ))

  return type === "multiple" ? (
    <AccordionPrimitive.Root type="multiple" className={cn("border-t border-border", className)}>
      {rows}
    </AccordionPrimitive.Root>
  ) : (
    <AccordionPrimitive.Root type="single" collapsible className={cn("border-t border-border", className)}>
      {rows}
    </AccordionPrimitive.Root>
  )
}
