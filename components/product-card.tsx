"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"

interface ProductCardProps {
    product: {
        id: string
        name: string
        price: number
        discountedPrice?: number
        image: string | null
        brand?: string | null
        rating?: number
        reviews?: number
        description?: string | null
        isNew?: boolean
        featured?: boolean
        category?: string | { name: string } | null
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const displayPrice = product.discountedPrice !== undefined ? product.discountedPrice : product.price
    const isDiscounted = product.discountedPrice !== undefined && product.discountedPrice < product.price

    return (
        <Link href={`/product/${product.id}`} className="group block h-full">
            <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white rounded-xl group-hover:-translate-y-1">
                {/* Product Image - Optimized for Mobile Grid */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                        <Image
                            src={product.image || "/placeholder.svg?height=200&width=200"}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105 max-w-full max-h-full"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                    </div>

                    {/* Category Tag */}
                    {product.category && (
                        <Badge variant="secondary" className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 font-medium border-0 text-[10px] shadow-sm px-2 py-0.5 rounded-full">
                            {typeof product.category === 'string' ? product.category : product.category.name}
                        </Badge>
                    )}

                    {product.isNew && (
                        <Badge className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border-0 rounded-full">
                            New
                        </Badge>
                    )}

                    {product.brand && (
                        <Badge variant="secondary" className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 font-medium border-0 text-[10px] shadow-sm px-2 py-0.5 rounded-full">
                            {product.brand}
                        </Badge>
                    )}
                </div>

                <CardContent className="p-4">
                    {/* Product Name */}
                    <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                        {product.name}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">Daily Rate</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-gray-900">₹{displayPrice}</span>
                                {isDiscounted && (
                                    <span className="text-[10px] text-gray-400 line-through">₹{product.price}</span>
                                )}
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300 touch-manipulation">
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
