import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"

interface ProductListingCardProps {
    product: Product
}

export function ProductListingCard({ product }: ProductListingCardProps) {
    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-amber-400 hover:shadow-lg">
            {/* Image Area */}
            <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50/50">
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
                {/* Simple badge if needed */}
                {!product.isAvailable && (
                    <span className="absolute top-2 right-2 rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col">
                <h3 className="mb-1 text-lg font-medium text-gray-900 group-hover:text-amber-600">
                    {product.name}
                </h3>

                {/* Spacer to push price down */}
                <div className="flex-1"></div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-xl font-bold text-gray-900">
                            ₹{product.price} <span className="text-sm font-normal text-gray-500">/day</span>
                        </p>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-600">
                        View
                    </span>
                </div>

                {/* Hover Action - Or just always visible buttons as per design? Design shows 'Add to Cart' pill on one card, maybe on hover or featured? 
            Let's make a clear CTA button that feels premium.
        */}
                <div className="mt-4 flex gap-2">
                    <Link
                        href={`/product/${product.id}`}
                        className="flex-1 rounded-full bg-amber-400 py-2.5 text-center text-sm font-bold text-black transition-colors hover:bg-amber-500"
                    >
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    )
}
