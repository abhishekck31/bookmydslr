"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Video, Aperture } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Product } from "@/types"
import { cn } from "@/lib/utils"

const BRAND_FILTERS = ["All Brands", "Canon", "Sony", "Nikon", "Panasonic", "RED"] as const

interface FeaturedGearSectionProps {
  products: Product[]
  globalSettings: {
    discountPercent: number
    isDiscountActive: boolean
  } | null
}

function getDiscountedPrice(
  price: number,
  globalSettings: FeaturedGearSectionProps["globalSettings"]
) {
  if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
    return Math.round(price * (1 - globalSettings.discountPercent / 100))
  }
  return price
}

function getProductTag(product: Product, index: number): string | null {
  if (index === 0) return "Popular"
  if (product.discountPercentage && product.discountPercentage > 0) return "Deal"
  if (index === 1) return "New"
  return null
}

function getSpecLine(product: Product): string {
  const category = product.category?.name ?? "Equipment"
  const snippet = product.description?.replace(/\s+/g, " ").trim().slice(0, 48)
  return snippet ? `${category} · ${snippet}…` : category
}

function FeaturedProductCard({
  product,
  price,
  tag,
}: {
  product: Product
  price: number
  tag: string | null
}) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.image || "/placeholder.svg",
      days: 1,
      category: product.category?.name ?? "Equipment",
      brand: product.brand,
    })
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square bg-slate-50 p-4">
        {tag ? (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold",
              tag === "Popular"
                ? "bg-slate-900 text-white"
                : tag === "New"
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
            )}
          >
            {tag}
          </span>
        ) : null}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-amber-600">
          {product.name}
        </h3>

        <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
            <Video className="h-3 w-3" />
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
            <Aperture className="h-3 w-3" />
            {product.category?.name ?? "Gear"}
          </span>
        </div>

        <p className="mb-4 line-clamp-1 text-xs text-slate-400">{getSpecLine(product)}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">₹{price}</span>
            <span className="text-sm text-slate-500"> / day</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition-colors hover:bg-amber-600"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export function FeaturedGearSection({ products, globalSettings }: FeaturedGearSectionProps) {
  const [activeBrand, setActiveBrand] = useState<string>("All Brands")

  const productsWithImages = useMemo(
    () => products.filter((p) => p.image && p.isAvailable !== false),
    [products]
  )

  const filtered = useMemo(() => {
    if (activeBrand === "All Brands") return productsWithImages
    return productsWithImages.filter((p) =>
      p.brand?.toLowerCase().includes(activeBrand.toLowerCase())
    )
  }, [productsWithImages, activeBrand])

  const displayProducts = filtered.slice(0, 4)

  const fallbackProducts =
    displayProducts.length >= 4
      ? displayProducts
      : productsWithImages.slice(0, 4)

  const gridProducts = displayProducts.length > 0 ? displayProducts : fallbackProducts

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-premium">
        <div className="mb-6 flex flex-wrap gap-2">
          {BRAND_FILTERS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setActiveBrand(brand)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeBrand === brand
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Featured Gear</h2>
          <Link
            href="/rental-equipment"
            className="text-sm font-semibold text-amber-600 hover:text-amber-700"
          >
            View All Inventory →
          </Link>
        </div>

        {gridProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {gridProducts.map((product, index) => {
              const price = getDiscountedPrice(product.price, globalSettings)
              return (
                <FeaturedProductCard
                  key={product.id}
                  product={product}
                  price={price}
                  tag={getProductTag(product, index)}
                />
              )
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-slate-500">
            No equipment found for this brand.{" "}
            <Link href="/rental-equipment" className="font-semibold text-amber-600">
              Browse all inventory
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
