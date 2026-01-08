"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ShoppingCart, Star, Calendar, Check, ShieldCheck, Truck, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import { ProductCard } from "@/components/product-card"

interface Product {
    id: string
    name: string
    brand: string | null
    type: string | null
    price: number
    image: string | null
    description: string
    isAvailable: boolean
    category: { name: string }
    specs?: any
    features?: any
    technicalDetails?: any
    gallery?: string[]
}

interface ProductClientProps {
    product: Product
    relatedProducts: any[]
    globalSettings: {
        discountPercent: number
        isDiscountActive: boolean
    } | null
}

export function ProductClient({ product, relatedProducts, globalSettings }: ProductClientProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { addItem } = useCart()
    const { triggerCartGlow } = useCartGlow()

    const [pickupDate, setPickupDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0])
    const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0])
    const [rentalDays, setRentalDays] = useState(3)
    const [activeImage, setActiveImage] = useState<string | null>(product.image)

    useEffect(() => {
        if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate)
            const returnD = new Date(returnDate)
            const diffTime = returnD.getTime() - pickup.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            setRentalDays(Math.max(1, diffDays))
        }
    }, [pickupDate, returnDate])

    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    const handleAddToCart = () => {
        const discountedPrice = getDiscountedPrice(product.price)
        addItem({
            id: product.id,
            name: product.name,
            price: discountedPrice,
            image: product.image || "/placeholder.svg",
            days: rentalDays,
            category: product.category.name.toLowerCase() + "s",
        })

        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart for ${rentalDays} days.`,
        })

        triggerCartGlow()
    }

    const handleWhatsAppInquiry = () => {
        const message = `Hi, I'm interested in renting the ${product.name} for ${rentalDays} days. Is it available?`
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/919972122462?text=${encodedMessage}`
        window.open(whatsappUrl, "_blank")
    }

    const discountedDailyPrice = getDiscountedPrice(product.price)
    const finalTotal = Math.round(discountedDailyPrice * rentalDays)

    return (
        <main className="min-h-screen bg-white pb-20">
            <div className="border-b border-gray-100 bg-gray-50/30 sticky top-16 z-20 backdrop-blur-sm">
                <div className="container py-4">
                    <button onClick={() => router.back()} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors group">
                        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
                        Back
                    </button>
                </div>
            </div>

            <div className="container py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left: Imagery */}
                    <div className="space-y-6 lg:sticky lg:top-32">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8 shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                                    <Image src={activeImage || "/placeholder.svg"} alt={product.name} fill className="object-contain" priority />
                                </motion.div>
                            </AnimatePresence>
                            {globalSettings?.isDiscountActive && (
                                <Badge className="absolute top-4 right-4 bg-red-500">-{globalSettings.discountPercent}% OFF</Badge>
                            )}
                        </div>
                        {/* More imagery USP etc (simplified for now to match structure) */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl gap-2">
                                <ShieldCheck className="h-6 w-6 text-amber-600" />
                                <span className="text-[10px] uppercase font-bold text-gray-500">Insured</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl gap-2">
                                <Truck className="h-6 w-6 text-amber-600" />
                                <span className="text-[10px] uppercase font-bold text-gray-500">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl gap-2">
                                <Clock className="h-6 w-6 text-amber-600" />
                                <span className="text-[10px] uppercase font-bold text-gray-500">24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div>
                        <div className="mb-2 text-amber-600 uppercase tracking-widest text-xs font-bold">
                            {product.brand} • {product.category.name}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        {/* Compact features for Accessories */}
                        {product.category.name !== 'Cameras' && product.features && Array.isArray(product.features) && product.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.features.map((feature: string, idx: number) => (
                                    <span key={idx} className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 italic">
                                        • {feature}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                        {/* Key Features for Cameras */}
                        {product.category.name === 'Cameras' && product.features && Array.isArray(product.features) && product.features.length > 0 && (
                            <div className="mb-8 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-amber-500 pl-3">Key Features</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                    {product.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-600 group">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="text-sm font-medium leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-white border boundary-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-end border-b pb-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Daily Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-gray-900">₹{discountedDailyPrice}</span>
                                        {globalSettings?.isDiscountActive && (
                                            <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                                        )}
                                        <span className="text-sm text-gray-500">/ day</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Pickup</label>
                                    <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Return</label>
                                    <input type="date" value={returnDate} min={pickupDate} onChange={e => setReturnDate(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-sm" />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Duration:</span>
                                <span className="font-bold">{rentalDays} Days</span>
                            </div>

                            <div className="flex gap-3">
                                <Button size="lg" onClick={handleAddToCart} className="flex-1 h-14 bg-gray-900 hover:bg-black rounded-full font-bold">
                                    Rent for ₹{finalTotal}
                                </Button>
                                <Button size="lg" variant="outline" onClick={handleWhatsAppInquiry} className="h-14 px-6 rounded-full font-bold">
                                    WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="mt-20 pt-16 border-t">
                    <h2 className="text-2xl font-bold mb-8">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
