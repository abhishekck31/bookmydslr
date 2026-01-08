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
        category?: string | null
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const displayPrice = product.discountedPrice !== undefined ? product.discountedPrice : product.price
    const isDiscounted = product.discountedPrice !== undefined && product.discountedPrice < product.price

    return (
        <Link href={`/product/${product.id}`} className="group block h-full">
            <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white rounded-xl group-hover:-translate-y-1">
                <div className="relative h-64 bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                        <Image
                            src={product.image || "/placeholder.svg?height=400&width=400"}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {isDiscounted && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border-0">
                            Sale
                        </Badge>
                    )}

                    {product.isNew && !isDiscounted && (
                        <Badge className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border-0">
                            New
                        </Badge>
                    )}

                    {product.brand && (
                        <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 font-medium border-0 text-[10px] shadow-sm px-2 py-0.5">
                            {product.brand}
                        </Badge>
                    )}
                </div>

                <CardContent className="p-5">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-gray-900">{product.rating || "4.8"}</span>
                        <span className="text-xs text-gray-400">({product.reviews || 24})</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8 leading-relaxed">
                        {product.description || "Professional grade equipment for your photography needs."}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">Daily Rate</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-gray-900">₹{displayPrice}</span>
                                {isDiscounted && (
                                    <span className="text-[10px] text-gray-400 line-through">₹{product.price}</span>
                                )}
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
