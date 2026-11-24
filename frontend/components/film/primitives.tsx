import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { formatINR } from "@/lib/film"

/* ---------------------------------------------------------------- */
/* FilmEdge — sprocket strip with edge markings                      */
/* ---------------------------------------------------------------- */

export function FilmEdge({
  left = "KODAK 5219 ▸ 24",
  right = "BLR — 560043",
  className,
}: {
  left?: string
  right?: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex h-4 items-center overflow-hidden border-b border-border bg-background md:h-[22px]",
        className,
      )}
    >
      <div className="sprockets absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 md:h-[10px]" />
      <span className="label-mono relative ml-[var(--gutter)] hidden bg-background px-2 text-[10px] text-primary md:inline">
        {left}
      </span>
      <span className="label-mono relative ml-auto mr-[var(--gutter)] hidden bg-background px-2 text-[10px] text-primary md:inline">
        {right}
      </span>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* FrameLabel — "FRAME 02" section marker                            */
/* ---------------------------------------------------------------- */

export function FrameLabel({
  n,
  children,
  className,
}: {
  n: number | string
  children?: React.ReactNode
  className?: string
}) {
  const num = typeof n === "number" ? String(n).padStart(2, "0") : n
  return (
    <div className={cn("label-mono text-muted-foreground", className)}>
      <span>Frame {num}</span>
      {children ? <div className="mt-3 normal-case tracking-normal">{children}</div> : null}
    </div>
  )
}

/**
 * Section with the 200px FrameLabel column on desktop. On mobile the label
 * sits above the content.
 */
export function FrameSection({
  n,
  aside,
  children,
  className,
  band = false,
  id,
  labelledBy,
}: {
  n: number
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
  band?: boolean
  id?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("film-section border-b border-border", band && "bg-surface", className)}
    >
      <div className="film-container grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <FrameLabel n={n}>{aside}</FrameLabel>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Buttons                                                           */
/* ---------------------------------------------------------------- */

export const filmButton = cva(
  "push-arrow inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border border-border-strong bg-transparent text-foreground hover:bg-surface-2",
        whatsapp: "bg-whatsapp text-primary-foreground hover:bg-whatsapp/90",
        ghost: "px-0 text-primary underline-offset-4 hover:underline",
        invert: "bg-foreground text-background hover:bg-foreground/90",
      },
      size: {
        sm: "h-11 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-[52px] px-7 text-base md:h-[60px] md:px-8",
      },
    },
    compoundVariants: [{ variant: "ghost", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
)

export interface FilmButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filmButton> {
  asChild?: boolean
}

export const FilmButton = React.forwardRef<HTMLButtonElement, FilmButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} className={cn(filmButton({ variant, size }), className)} {...props} />
  },
)
FilmButton.displayName = "FilmButton"

export function Arrow() {
  return (
    <span aria-hidden className="arrow">
      →
    </span>
  )
}

/* ---------------------------------------------------------------- */
/* Price + discount                                                  */
/* ---------------------------------------------------------------- */

export function PriceTag({
  price,
  originalPrice,
  size = "md",
  className,
}: {
  price: number
  originalPrice?: number
  size?: "md" | "lg"
  className?: string
}) {
  const discounted = originalPrice !== undefined && originalPrice > price
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span
        className={cn(
          "price text-primary",
          size === "lg" ? "text-[28px] md:text-4xl" : "text-lg md:text-[26px]",
        )}
      >
        {formatINR(price)}
      </span>
      <span className="text-sm text-muted-foreground">/day</span>
      {discounted ? (
        <s className="price text-sm font-medium text-subtle">
          <span className="sr-only">was </span>
          {formatINR(originalPrice)}
        </s>
      ) : null}
    </p>
  )
}

export function DiscountBadge({
  percentOff,
  originalPrice,
  className,
}: {
  percentOff: number
  originalPrice: number
  className?: string
}) {
  return (
    <span className={cn("label-mono inline-block bg-primary px-2 py-1 text-primary-foreground", className)}>
      <span aria-hidden>{percentOff}% off</span>
      <span className="sr-only">
        {percentOff} percent off, was {formatINR(originalPrice)}
      </span>
    </span>
  )
}

export function Availability({ available, className }: { available: boolean; className?: string }) {
  return available ? (
    <span className={cn("label-mono text-[10px] text-success", className)}>● Available</span>
  ) : (
    <span className={cn("label-mono text-[10px] text-danger", className)}>○ Booked</span>
  )
}

/* ---------------------------------------------------------------- */
/* Stars                                                             */
/* ---------------------------------------------------------------- */

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn("text-[13px] tracking-[0.15em] text-primary", className)}>
      {"★".repeat(rating)}
      <span className="text-subtle">{"★".repeat(5 - rating)}</span>
    </span>
  )
}

/* ---------------------------------------------------------------- */
/* Empty state with viewfinder corners                               */
/* ---------------------------------------------------------------- */

export function EmptyState({
  title,
  emphasis = "frame",
  description,
  action,
  className,
}: {
  title?: React.ReactNode
  emphasis?: string
  description: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "viewfinder flex flex-col items-center border border-dashed border-border-strong px-6 py-16 text-center md:py-24",
        className,
      )}
    >
      <p className="font-serif text-display-s text-foreground">
        {title ?? (
          <>
            Nothing in <em className="text-primary">{emphasis}</em> yet.
          </>
        )}
      </p>
      <p className="mt-3 max-w-md text-[15px] text-muted-foreground">{description}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Icons                                                             */
/* ---------------------------------------------------------------- */

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-[18px] w-[18px]", className)} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.65l6.04-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.05" />
    </svg>
  )
}
