"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import { cn } from "@/lib/utils"
import { getPricing, productFrameCode, whatsappLink } from "@/lib/film"
import { Availability, DiscountBadge, PriceTag } from "./primitives"

export function FilmProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product
  priority?: boolean
  className?: string
}) {
  const { addItem } = useCart()
  const { triggerCartGlow } = useCartGlow()
  const pricing = getPricing(product)
  const href = `/product/${product.id}`
  const keySpec = product.category?.name

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: pricing.price,
      image: product.image || "/placeholder.svg",
      days: 1,
      category: product.category?.name ?? "Equipment",
      brand: product.brand,
    })
    triggerCartGlow()
  }

  return (
    <article className={cn("lift group relative flex h-full flex-col bg-background p-3 md:p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="label-mono text-[10px] text-muted-foreground">▸ {productFrameCode(product)}</span>
        <Availability available={product.isAvailable} />
      </div>

      <Link href={href} className="relative block bg-tile" tabIndex={-1} aria-hidden>
        <div
          className={cn(
            "relative h-[120px] p-3 md:h-[250px] md:p-6",
            !product.isAvailable && "opacity-60",
          )}
        >
          <div className="relative h-full w-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 22vw"
              className="object-contain"
            />
          </div>
        </div>
        {pricing.percentOff && pricing.originalPrice ? (
          <DiscountBadge
            percentOff={pricing.percentOff}
            originalPrice={pricing.originalPrice}
            className="absolute bottom-0 left-0"
          />
        ) : null}
      </Link>

      <div className="mt-3 flex flex-1 flex-col md:mt-4">
        <p className="truncate text-xs text-muted-foreground md:text-[13px]">
          {product.brand}
          {keySpec ? <span aria-hidden> · </span> : null}
          {keySpec}
        </p>
        <h3 className="mt-1 line-clamp-2 font-serif text-title text-foreground">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto pt-3 md:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border-strong pt-3">
            <PriceTag price={pricing.price} originalPrice={pricing.originalPrice} />
            {product.isAvailable ? (
              <button
                type="button"
                onClick={handleAdd}
                className="relative z-10 h-11 rounded-full border border-border-strong px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label={`Add ${product.name} to cart`}
              >
                Add
              </button>
            ) : (
              <a
                href={whatsappLink(`Hi Book My DSLR, please notify me when ${product.name} is available.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex h-11 items-center rounded-full border border-border-strong px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Notify me on WhatsApp when ${product.name} is available`}
              >
                Notify me
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ContactSheet({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("contact-sheet grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>{children}</div>
}

export function ProductSheetSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("contact-sheet grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)} aria-busy aria-label="Loading gear">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 bg-background p-3 md:p-4">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-[120px] md:h-[250px]" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-5 w-4/5" />
          <div className="skeleton mt-2 h-8 w-full" />
        </div>
      ))}
    </div>
  )
}
