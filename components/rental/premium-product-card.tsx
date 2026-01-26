import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"
import { Star, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumProductCardProps {
    product: Product
}

export function PremiumProductCard({ product }: PremiumProductCardProps) {
    const rating = product.rating || 4.5
    const reviewCount = product.reviews || 0
    const isAvailable = product.isAvailable

    return (
        <Link
            href={`/product/${product.id}`}
            className="group block"
        >
            <div className="relative flex flex-col h-full rounded-2xl border-2 border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1">

                {/* Image Container */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Availability Badge */}
                    <div className="absolute top-3 right-3">
                        {isAvailable ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full">
                                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                                <span className="text-xs font-bold text-white">Available</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full">
                                <XCircle className="h-3.5 w-3.5 text-white" />
                                <span className="text-xs font-bold text-white">Booked</span>
                            </div>
                        )}
                    </div>

                    {/* Discount Badge (if applicable) */}
                    {product.discountPercentage && product.discountPercentage > 0 && (
                        <div className="absolute top-3 left-3">
                            <div className="px-3 py-1.5 bg-amber-400 rounded-full">
                                <span className="text-xs font-bold text-black">
                                    {product.discountPercentage}% OFF
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                    {/* Brand */}
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                        {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-amber-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating & Reviews */}
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-bold text-gray-900">
                                    {rating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Price */}
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                ₹{product.price}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">/day</span>
                        </div>

                        {/* Original Price (if discounted) */}
                        {product.basePrice && product.basePrice > product.price && (
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{product.basePrice}
                                </span>
                                <span className="text-xs font-bold text-green-600">
                                    Save ₹{product.basePrice - product.price}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // Add to cart logic
                            }}
                            disabled={!isAvailable}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200",
                                isAvailable
                                    ? "bg-amber-400 text-black hover:bg-amber-500 hover:shadow-lg active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {isAvailable ? "Rent Now" : "Not Available"}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // View details logic (or just let the link handle it)
                            }}
                            className="px-4 py-3 rounded-xl border-2 border-gray-200 font-bold text-sm text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all"
                        >
                            Details
                        </button>
                    </div>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 border-2 border-amber-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
        </Link>
    )
}
