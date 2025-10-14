"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ShoppingCart, Star, Calendar, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"

// Import all product data
import { cameras } from "@/data/cameras"
import { lenses } from "@/data/lenses"
import { accessories } from "@/data/accessories"

// Combine all products for easy lookup
const allProducts = [
  ...cameras.map((camera) => ({ ...camera, productType: "camera" })),
  ...lenses.map((lens) => ({ ...lens, productType: "lens" })),
  ...accessories.map((accessory) => ({ ...accessory, productType: "accessory" })),
]

// Add this type at the top of your file
type Product = {
  productType: string
  id: number | string
  name: string
  brand?: string
  price: number
  description: string
  type: string
  image: string
  available: boolean
  rating?: number
  reviews?: number
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { triggerCartGlow } = useCartGlow()

  const [pickupDate, setPickupDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0])
  const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0])
  const [rentalDays, setRentalDays] = useState(3)

  // Calculate rental days based on date difference
  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate)
      const returnD = new Date(returnDate)
      const diffTime = returnD.getTime() - pickup.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setRentalDays(Math.max(1, diffDays))
    }
  }, [pickupDate, returnDate])

  // Find the product by ID (try both string and number comparison)
  const productId = params.id
  const product = allProducts.find((p) => p.id.toString() === productId || p.id === Number.parseInt(productId)) as Product

  // If product not found, redirect to products page instead of showing 404
  if (!product) {
    // Instead of showing 404, redirect to products page
    router.push("/products")
    return null
  }

  const handleAddToCart = () => {
    const productId = typeof product.id === "string" ? Number.parseInt(product.id.replace(/\D/g, "")) : product.id;
    
    addItem({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg?height=200&width=200",
      days: rentalDays,
      category: product.productType + "s",
    })

    // Save selected dates to localStorage
    const dates = {
      pickup: pickupDate,
      return: returnDate
    };
    localStorage.setItem(`rental-dates-${productId}`, JSON.stringify(dates));

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart for ${rentalDays} days.`,
    })

    // Trigger cart glow effect
    triggerCartGlow()
  }

  const handleWhatsAppInquiry = () => {
    // Format WhatsApp message
    const message = `Hi, I'm interested in renting the ${product.name} for ${rentalDays} days from ${pickupDate} to ${returnDate}. Is it available?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919972122462?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  // Get related products (same type or brand, but not the current one)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.productType === product.productType || p.brand === product.brand))
    .slice(0, 4)

  return (
    <div className="container py-10">
      <Link href="/products" className="flex items-center text-muted-foreground mb-6 hover:text-amber-500">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px]">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain max-h-full"
            />
          </div>
          {product.gallery && (
            <div className="grid grid-cols-5 gap-2">
              {product.gallery.slice(0, 5).map((img, i) => (
                <div key={i} className="border rounded-md overflow-hidden bg-white p-1">
                  <Image
                    src={img || "/placeholder.svg?height=100&width=100"}
                    alt={`${product.name} view ${i + 1}`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < (product.rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="ml-2 text-muted-foreground">{product.reviews || 0} reviews</span>
            </div>
            <p className="text-2xl font-bold mt-4 text-amber-600">₹{product.price}/day</p>
          </div>

          <p className="text-gray-700">{product.fullDescription || product.description}</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickup-date" className="block text-sm font-medium mb-1">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    id="pickup-date"
                    className="w-full border rounded-md p-2 pl-10"
                    min={new Date().toISOString().split("T")[0]}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="return-date" className="block text-sm font-medium mb-1">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    id="return-date"
                    className="w-full border rounded-md p-2 pl-10"
                    min={pickupDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              {rentalDays >= 3 && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                  <p className="text-green-800 font-medium text-sm">
                    {rentalDays >= 10 ? (
                      "🎉 For bookings of 10+ days, we have exclusive rates! Get in touch with us directly on WhatsApp to unlock your special discount"
                    ) : rentalDays >= 7 ? (
                      "🎉 Book for 7 to 9 days and save 25%!"
                    ) : (
                      "🎉 Book for 3 to 6 days and save 20%!"
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <p className="font-medium mb-2">Total Rental Cost:</p>
              {rentalDays >= 3 ? (
                <div className="space-y-1">
                  {rentalDays >= 10 ? (
                    <div>
                      <p className="text-lg text-gray-500 line-through">₹{product.price * rentalDays}</p>
                      <p className="text-sm text-blue-600 font-medium">Contact us for exclusive rates!</p>
                      <p className="text-sm text-gray-500">For {rentalDays} days</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="text-lg text-gray-500 line-through">₹{product.price * rentalDays}</p>
                        <p className="text-xl font-bold text-amber-600">
                          ₹{Math.round(product.price * rentalDays * (rentalDays >= 7 ? 0.75 : 0.8))}
                        </p>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        {rentalDays >= 7 ? "25% discount applied!" : "20% discount applied!"}
                      </p>
                      <p className="text-sm text-gray-500">For {rentalDays} days</p>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xl font-bold text-amber-600">₹{product.price * rentalDays}</p>
                  <p className="text-sm text-gray-500">For {rentalDays} days</p>
                </div>
              )}
            </div>

            <Button
              className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
              onClick={handleWhatsAppInquiry}
            >
              Inquire via WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="specs" className="mt-12">
        <TabsList className="w-full border-b justify-start rounded-none h-auto p-0">
          <TabsTrigger
            value="specs"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 py-3"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 py-3"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="rental"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 py-3"
          >
            Rental Terms
          </TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="pt-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {product.specs &&
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span>{value}</span>
                  </div>
                ))}
              {product.technicalDetails &&
                Object.entries(product.technicalDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="features" className="pt-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features &&
                product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
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
                <p>
                  A refundable security deposit of ₹{Math.round(product.price * 2)} is required at the time of pickup.
                </p>
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
          {relatedProducts.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="group">
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
                <h3 className="font-medium group-hover:text-amber-500 transition-colors">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex-grow line-clamp-2">{item.description}</p>
                <p className="font-bold mt-2 text-amber-600">₹{item.price}/day</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
