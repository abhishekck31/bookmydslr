// "use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Import data
import { cameras } from "@/data/cameras"
import { lenses } from "@/data/lenses"
import { accessories } from "@/data/accessories"
export const metadata = {
  title: "Book My DSLR - Camera & Lens Rental in Bangalore | Koramangala, Indiranagar, Whitefield & More",
  description: "Rent cameras, lenses, and accessories in Bangalore. Fast delivery to Koramangala, Indiranagar, Whitefield, Jayanagar, HSR Layout, and all major Bangalore locations.",
  keywords: [
    "camera rental Bangalore",
    "lens rental Bangalore",
    "DSLR rental",
    "Koramangala",
    "Indiranagar",
    "Whitefield",
    "Jayanagar",
    "HSR Layout",
    "Marathahalli",
    "BTM",
    "Malleshwaram",
    "Rajajinagar"
  ],
  openGraph: {
    title: "Book My DSLR - Camera & Lens Rental in Bangalore",
    description: "Rent cameras, lenses, and accessories in all Bangalore locations. Fast delivery and best prices.",
    url: "https://yourdomain.com/",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book My DSLR Bangalore"
      }
    ]
  }
}
export default function HomePage() {
  // Get featured items
  const featuredCameras = cameras.filter((camera) => "featured" in camera && camera.featured).slice(0, 4)
  const featuredLenses = lenses.filter((lens) => "featured" in lens && lens.featured).slice(0, 4)
  const featuredAccessories = accessories.filter((accessory) => "featured" in accessory && accessory.featured).slice(0, 4)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-500 to-yellow-300 py-16 md:py-24">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Rent Professional Camera Equipment
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get access to high-quality cameras, lenses, and accessories without the high cost of ownership.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                  <Link href="/products">Browse Equipment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white text-amber-600 hover:bg-gray-100">
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/heroimg.png"
                alt="Professional camera equipment"
                width={500}
                height={320}
                className="mx-auto rounded-2xl h-52 object-cover"
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Equipment</h2>
            <p className="text-gray-600">Our most popular photography gear for rent</p>
          </div>

          <Tabs defaultValue="cameras" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="cameras" className="flex-1">
                Cameras
              </TabsTrigger>
              <TabsTrigger value="lenses" className="flex-1">
                Lenses
              </TabsTrigger>
              <TabsTrigger value="accessories" className="flex-1">
                Accessories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cameras" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCameras.map((camera: any) => (
                  <Link href={`/product/${camera.id}`} key={camera.id} className="group">
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative h-48">
                        <Image
                          src={camera.image || "/placeholder.svg?height=200&width=200"}
                          alt={camera.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        <>
                          {("isNew" in camera && camera.isNew && (
                            <Badge className="absolute top-2 right-2 bg-amber-500 text-white">New</Badge>
                          )) as React.ReactNode}
                        </>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                          {camera.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(Math.random() * 5) + 1 ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({camera.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{camera.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{camera.price}/day</p>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            {camera.brand}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                >
                  <Link href="/products" className="flex items-center">
                    View All Cameras <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="lenses" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredLenses.map((lens: any) => (
                  <Link href={`/product/${lens.id}`} key={lens.id} className="group">
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative h-48">
                        <Image
                          src={lens.image || "/placeholder.svg?height=200&width=200"}
                          alt={lens.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {"isNew" in lens && lens.isNew && <Badge className="absolute top-2 right-2 bg-amber-500 text-white">New</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                          {lens.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(Math.random() * 5) + 1 ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({lens.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lens.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{lens.price}/day</p>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            {lens.brand}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                >
                  <Link href="/products" className="flex items-center">
                    View All Lenses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="accessories" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAccessories.map((accessory: any) => (
                  <Link href={`/product/${accessory.id}`} key={accessory.id} className="group">
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative h-48">
                        <Image
                          src={accessory.image || "/placeholder.svg?height=200&width=200"}
                          alt={accessory.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {"isNew" in accessory && accessory.isNew && (
                          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">New</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                          {accessory.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(Math.random() * 5) + 1 ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({accessory.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{accessory.price}/day</p>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            {accessory.type}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                >
                  <Link href="/products" className="flex items-center">
                    View All Accessories <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600">Renting equipment with Book My DSLR is quick and easy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Select</h3>
              <p className="text-gray-600">Browse our collection and select the equipment that fits your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">Choose your rental dates and complete the payment securely</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Equipment</h3>
              <p className="text-gray-600">Get your equipment delivered to your doorstep or pick it up</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Return</h3>
              <p className="text-gray-600">Return the equipment when your rental period is over</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-300">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Photography Journey?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get access to professional equipment without the high cost of ownership
          </p>
          <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
            <Link href="/products">Browse Equipment Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
