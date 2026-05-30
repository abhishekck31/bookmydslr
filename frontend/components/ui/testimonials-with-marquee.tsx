"use client"

import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { motion } from "framer-motion"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  // Ensure we have enough copies to fill screen and loop seamlessly
  // Duplicating the list X times ensures we always have content while scrolling
  const tripledTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0 rounded-[3rem] mx-2 md:mx-4 my-4 shadow-sm border border-gray-100",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Marquee Container */}
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex flex-nowrap gap-4 py-4"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 60, // slower for readability
              }}
              style={{ width: "max-content" }}
            >
              {/* We use 2 sets of the 'tripled' list to ensure enough width for -50% translation */}
              {/* Actually, just putting 2 sets of a sufficiently long list is enough. */}
              {/* Set 1 */}
              <div className="flex gap-4 shrink-0">
                {tripledTestimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set1-${i}`}
                    {...testimonial}
                  />
                ))}
              </div>
              {/* Set 2 (Identical Clone for loop) */}
              <div className="flex gap-4 shrink-0">
                {tripledTestimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`set2-${i}`}
                    {...testimonial}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}
