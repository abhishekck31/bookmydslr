import type { LucideIcon } from "lucide-react"
import { FrameLabel } from "@/components/film/primitives"

interface PageHeroProps {
  badge: string
  title: string
  highlight?: string
  description: string
  /** Kept for API compatibility; the film style uses mono labels instead of icons. */
  icon?: LucideIcon
}

export function PageHero({ badge, title, highlight, description }: PageHeroProps) {
  return (
    <section className="border-b border-border">
      <div className="film-container grid gap-6 py-12 md:py-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <FrameLabel n={1}>
          <span className="label-mono text-primary">{badge}</span>
        </FrameLabel>
        <div className="max-w-4xl">
          <h1 className="font-serif text-display-l text-foreground">
            {title}
            {highlight ? (
              <>
                {" "}
                <em className="text-primary">{highlight}</em>
              </>
            ) : null}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-body md:text-[17px]">{description}</p>
        </div>
      </div>
    </section>
  )
}
