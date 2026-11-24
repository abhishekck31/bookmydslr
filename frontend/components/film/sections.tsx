import Link from "next/link"
import type { Product } from "@/types"
import { CATEGORY_GROUPS, groupCounts } from "@/lib/film"
import { cn } from "@/lib/utils"
import { Stars } from "./primitives"

/* ---------------------------------------------------------------- */
/* Category strip — 8 columns desktop, 2-col list on mobile          */
/* ---------------------------------------------------------------- */

export function CategoryStrip({ products, className }: { products: Product[]; className?: string }) {
  const counts = groupCounts(products)
  return (
    <ul className={cn("grid grid-cols-2 border-l border-t border-border lg:grid-cols-8", className)}>
      {CATEGORY_GROUPS.map((g) => (
        <li key={g.key} className="border-b border-r border-border">
          <Link
            href={g.href}
            className="group flex h-[60px] items-center justify-between gap-2 px-4 transition-colors hover:bg-surface-2 lg:h-auto lg:flex-col lg:items-start lg:justify-between lg:gap-8 lg:p-5"
          >
            <span className="label-mono order-2 text-primary lg:order-1">{g.code}</span>
            <span className="order-1 lg:order-2">
              <span className="block font-serif text-[22px] leading-none text-foreground lg:text-[30px]">{g.name}</span>
              <span className="label-mono mt-2 hidden text-muted-foreground lg:block">
                {counts[g.key] ?? 0} {counts[g.key] === 1 ? "item" : "items"}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ---------------------------------------------------------------- */
/* How it works — three steps with italic amber numerals             */
/* ---------------------------------------------------------------- */

export const RENTAL_STEPS = [
  {
    title: "Pick your gear",
    body: "Browse cameras, lenses and support kit. Add what you need to the cart with your shoot dates.",
  },
  {
    title: "Confirm on WhatsApp",
    body: "Send the booking in one tap. We confirm availability, deposit and timings — typically within 2 hours.",
  },
  {
    title: "Pick up or get it delivered",
    body: "Collect from Kalyan Nagar or have it delivered across Bangalore. Return when the shoot wraps.",
  },
]

export function StepsGrid({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-px bg-border md:grid-cols-3", className)}>
      {RENTAL_STEPS.map((step, i) => (
        <li key={step.title} className="bg-surface p-6 md:p-8">
          <span aria-hidden className="block font-serif text-[64px] italic leading-none text-primary md:text-[88px]">
            {i + 1}
          </span>
          <h3 className="mt-4 font-serif text-display-s text-foreground">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------------------------------------------------------------- */
/* Reviews                                                           */
/* ---------------------------------------------------------------- */

export type Review = { name: string; role: string; text: string; rating?: number }

export const REVIEWS: Review[] = [
  {
    name: "Rahul Sharma",
    role: "Wedding photographer",
    text: "Excellent service! The camera was in perfect condition and the pickup process was super smooth. Best rental service in Bangalore.",
  },
  {
    name: "Priya Nair",
    role: "Content creator",
    text: "I've been renting from Book My DSLR for months. Equipment is always well-maintained and prices are unbeatable for professional gear.",
  },
  {
    name: "Amit Kumar",
    role: "Cinematographer",
    text: "Great collection of lenses and cameras. The team is very helpful and delivery is always on time. Highly recommend for film shoots!",
  },
]

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col bg-background p-6">
      <Stars rating={review.rating ?? 5} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">“{review.text}”</blockquote>
      <figcaption className="mt-6 text-sm text-muted-foreground">
        <span className="text-foreground">{review.name}</span> · {review.role}
      </figcaption>
    </figure>
  )
}

export function ReviewsBlock({ reviews = REVIEWS }: { reviews?: Review[] }) {
  const [lead, ...rest] = reviews
  return (
    <div>
      <blockquote className="max-w-4xl font-serif text-display-s text-foreground md:text-[44px] md:leading-[1.1]">
        “{lead.text}”
        <footer className="mt-5 font-sans text-sm text-muted-foreground">
          <span className="text-foreground">{lead.name}</span> · {lead.role}
        </footer>
      </blockquote>
      <div className="contact-sheet mt-10 md:grid-cols-2">
        {rest.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </div>
  )
}
