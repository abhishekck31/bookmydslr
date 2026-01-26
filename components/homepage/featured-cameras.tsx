"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

// Interface for the component props
interface FeaturedCamerasProps {
    cameras: any[]
    globalSettings: {
        discountPercent: number
        isDiscountActive: boolean
    } | null
}

export function FeaturedCameras({ cameras, globalSettings }: FeaturedCamerasProps) {
    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="max-w-xl space-y-1">
                        <span className="text-amber-600 font-bold text-xs tracking-wider uppercase">
                            Trending Gear
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Cameras</h2>
                        <p className="text-gray-500 font-medium">
                            Top-rated equipment chosen by professional photographers.
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="hidden md:flex text-gray-900 hover:text-amber-600 hover:bg-transparent p-0 font-medium">
                        <Link href="/rental-equipment" className="flex items-center gap-2">
                            View All Equipment <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {cameras.map((camera, index) => {
                        const discountedPrice = getDiscountedPrice(camera.price)
                        const productData = {
                            ...camera,
                            discountedPrice: discountedPrice !== camera.price ? discountedPrice : undefined
                        }

                        return (
                            <motion.div
                                key={camera.id || index}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                                }}
                            >
                                <ProductCard product={productData} />
                            </motion.div>
                        )
                    })}
                </motion.div>

                <div className="mt-10 text-center md:hidden">
                    <Button asChild variant="outline" className="w-full border-gray-200 text-gray-900 font-medium">
                        <Link href="/rental-equipment">
                            View All Equipment
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
