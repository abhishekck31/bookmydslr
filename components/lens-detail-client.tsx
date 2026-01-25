"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart, type CartItem } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/types"

interface LensDetailClientProps {
    lens: Product
    relatedLenses: Product[]
}

export function LensDetailClient({ lens, relatedLenses }: LensDetailClientProps) {
    const [rentalDays, setRentalDays] = useState(3)
    const { addItem } = useCart()
    const { toast } = useToast()

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: lens.id.toString(),
            name: lens.name,
            price: lens.price,
            image: lens.image || "/placeholder.svg?height=200&width=200",
            days: rentalDays,
            category: "lenses",
            brand: lens.brand,
        }

        addItem(cartItem)
        toast({
            title: "Added to cart",
            description: `${lens.name} has been added to your cart for ${rentalDays} days.`,
        })
    }

    const handleWhatsAppInquiry = () => {
        // Format WhatsApp message
        const message = `Hi, I'm interested in renting the ${lens.name} for ${rentalDays} days. Is it available?`
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/919972122462?text=${encodedMessage}`
        window.open(whatsappUrl, "_blank")
    }

    return (
        <div className="container py-10">
            <Link href="/lenses" className="flex items-center text-muted-foreground mb-6 hover:text-primary">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to lenses
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px]">
                        <Image
                            src={lens.image || "/placeholder.svg?height=400&width=400"}
                            alt={lens.name}
                            width={400}
                            height={400}
                            className="object-contain max-h-full"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{lens.name}</h1>
                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < (lens.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                        />
                                    ))}
                            </div>
                            <span className="ml-2 text-muted-foreground">{lens.reviews || 0} reviews</span>
                        </div>
                        <p className="text-2xl font-bold mt-4">₹{lens.price}/day</p>
                    </div>

                    <p className="text-gray-700">{lens.description}</p>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="rental-days" className="block text-sm font-medium mb-1">
                                    Rental Duration
                                </label>
                                <select
                                    id="rental-days"
                                    className="w-full border rounded-md p-2"
                                    value={rentalDays}
                                    onChange={(e) => setRentalDays(Number.parseInt(e.target.value, 10))}
                                >
                                    <option value="1">1 Day</option>
                                    <option value="2">2 Days</option>
                                    <option value="3">3 Days</option>
                                    <option value="7">1 Week</option>
                                    <option value="14">2 Weeks</option>
                                    <option value="30">1 Month</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="pickup-date" className="block text-sm font-medium mb-1">
                                    Pickup Date
                                </label>
                                <input
                                    type="date"
                                    id="pickup-date"
                                    className="w-full border rounded-md p-2"
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>

                        <Button className="w-full text-lg py-6" size="lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>

                        <Button variant="outline" className="w-full" onClick={handleWhatsAppInquiry}>
                            Inquire via WhatsApp
                        </Button>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Availability</h3>
                        <p className={`font-medium ${lens.isAvailable ? "text-green-600" : "text-red-600"}`}>
                            {lens.isAvailable ? "In Stock" : "Currently Unavailable"}
                        </p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="specs" className="mt-12">
                <TabsList className="w-full border-b justify-start rounded-none h-auto p-0">
                    <TabsTrigger
                        value="specs"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
                    >
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="features"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
                    >
                        Features
                    </TabsTrigger>
                    <TabsTrigger
                        value="rental"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
                    >
                        Rental Terms
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="pt-6">
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                            {lens.specs ?
                                Object.entries(lens.specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b pb-2">
                                        <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        <span>{value as any}</span>
                                    </div>
                                )) : <p>No specifications available.</p>}
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="features" className="pt-6">
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            {lens.features &&
                                lens.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                        </ul>
                    </Card>
                </TabsContent>
                <TabsContent value="rental" className="pt-6">
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Rental Terms & Conditions</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Security Deposit</h4>
                                <p>A refundable security deposit of ₹{Math.round(lens.price * 2)} is required at the time of pickup.</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">ID Requirements</h4>
                                <p>
                                    Two valid government-issued photo IDs (Aadhar, Passport, Driving License) are required for rental.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Cancellation Policy</h4>
                                <p>
                                    Free cancellation up to 24 hours before pickup. Cancellations within 24 hours will incur a 50% fee.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Damage Protection</h4>
                                <p>Optional damage protection is available for 10% of the rental cost, covering accidental damage.</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Late Returns</h4>
                                <p>Late returns will be charged at 1.5x the daily rate for each additional day.</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedLenses
                        .map((item) => (
                            <Link href={`/lenses/${item.id}`} key={item.id} className="group">
                                <div className="border rounded-lg overflow-hidden bg-white p-4 h-full flex flex-col transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-center justify-center h-48 mb-4">
                                        <Image
                                            src={item.image || "/placeholder.svg?height=200&width=200"}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            className="object-contain max-h-full"
                                        />
                                    </div>
                                    <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 flex-grow line-clamp-2">{item.description}</p>
                                    <p className="font-bold mt-2">₹{item.price}/day</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
