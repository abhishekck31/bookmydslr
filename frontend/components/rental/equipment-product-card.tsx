"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, CheckCircle2, XCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Product } from "@/types"
import { cn } from "@/lib/utils"

interface EquipmentProductCardProps {
  product: Product
  index?: number
}

export function EquipmentProductCard({ product, index = 0 }: EquipmentProductCardProps) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.isAvailable) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
      days: 1,
      category: product.category?.name ?? "Equipment",
      brand: product.brand,
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.24) }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
      >
        <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100/80 p-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />

          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur-sm">
              {product.brand}
            </span>
          </div>

          <div className="absolute right-3 top-3">
            {product.isAvailable ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                <CheckCircle2 className="h-3 w-3" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-400 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                <XCircle className="h-3 w-3" />
                Booked
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="mb-1 text-xs font-medium text-amber-600">
            {product.category?.name ?? "Equipment"}
          </p>
          <h3 className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-slate-900 group-hover:text-amber-600 md:text-base">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Daily rate
              </p>
              <p className="text-xl font-bold text-slate-900 md:text-2xl">
                ₹{product.price}
                <span className="text-sm font-medium text-slate-500"> /day</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.isAvailable}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all",
                product.isAvailable
                  ? "bg-amber-500 text-white shadow-md hover:bg-amber-600 hover:shadow-lg active:scale-95"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
              aria-label={product.isAvailable ? `Add ${product.name} to cart` : `${product.name} unavailable`}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
