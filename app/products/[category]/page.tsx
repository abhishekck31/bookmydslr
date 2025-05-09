"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star, Filter, Search, X, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { cameras } from "@/data/cameras"
import { lenses } from "@/data/lenses"
import { accessories } from "@/data/accessories"
import { useParams } from "next/navigation"

// Combine all products
const allProducts = [
  ...cameras.map((item) => ({ ...item, category: "Camera" })),
  ...lenses.map((item) => ({ ...item, category: "Lens" })),
  ...accessories.map((item) => ({ ...item, category: "Accessory" })),
]

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("featured")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

  // Get category display name
  const getCategoryDisplayName = () => {
    switch (category) {
      case "camera":
        return "DSLR Cameras"
      case "mirrorless":
        return "Mirrorless Cameras"
      case "action-camera":
        return "Action Cameras"
      case "canon-lenses":
        return "Camera Lenses"
      case "gimbal":
        return "Gimbals"
      case "tripod":
        return "Tripods"
      case "mic-recorder":
        return "Microphones"
      case "flash-light":
        return "Lighting"
      case "battery":
        return "Batteries"
      default:
        return "Products"
    }
  }

  // Filter products based on category
  const filterProductsByCategory = () => {
    let filteredProducts = [...allProducts]

    switch (category) {
      case "camera":
        filteredProducts = filteredProducts.filter((p) => p.type === "DSLR")
        break
      case "mirrorless":
        filteredProducts = filteredProducts.filter((p) => p.type === "Mirrorless")
        break
      case "action-camera":
        filteredProducts = filteredProducts.filter((p) => p.type === "Action Camera")
        break
      case "canon-lenses":
        filteredProducts = filteredProducts.filter((p) => p.category === "Lens")
        break
      case "gimbal":
        filteredProducts = filteredProducts.filter((p) => p.type === "Gimbal")
        break
      case "tripod":
        filteredProducts = filteredProducts.filter((p) => p.type === "Tripod")
        break
      case "mic-recorder":
        filteredProducts = filteredProducts.filter((p) => p.type === "Microphone" || p.type === "Recorder")
        break
      case "flash-light":
        filteredProducts = filteredProducts.filter((p) => p.type === "Light" || p.type === "Flash" || p.type === "LED Light" || p.type === "Light Modifier")
        break
      case "battery":
        filteredProducts = filteredProducts.filter((p) => p.type === "Battery")
        break
      default:
        break
    }

    return filteredProducts
  }

  const categoryProducts = filterProductsByCategory()

  // Extract unique brands
  const brands = Array.from(new Set(categoryProducts.map((product) => product.brand)))

  // Filter products based on selected filters
  const filteredProducts = categoryProducts.filter((product) => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Availability filter
    if (showOnlyAvailable && !product.available) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      default:
        return a.featured ? -1 : b.featured ? 1 : 0
    }
  })

  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBrands([])
    setPriceRange([0, 3000])
    setShowOnlyAvailable(false)
    setSortBy("featured")
  }

  // Check if any filter is applied
  const isFilterApplied =
    searchTerm !== "" ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 3000 ||
    showOnlyAvailable ||
    sortBy !== "featured"

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/products" className="flex items-center text-amber-500 hover:text-amber-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Products
        </Link>
        <h1 className="text-3xl font-bold">{getCategoryDisplayName()}</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {isFilterApplied && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-amber-500 hover:text-amber-600"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="search-desktop" className="text-sm font-medium mb-1.5 block">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    id="search-desktop"
                    placeholder="Search products..."
                    className="pl-8 border-amber-200 focus-visible:ring-amber-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {brands.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                          className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium mb-2">Price Range (per day)</h3>
                <div className="space-y-4 pt-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={3000}
                    step={100}
                    onValueChange={setPriceRange}
                    className="[&>span]:bg-amber-500"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₹{priceRange[0]}</span>
                    <span className="text-sm">₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Availability</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available-now"
                    checked={showOnlyAvailable}
                    onCheckedChange={(checked) => setShowOnlyAvailable(checked === true)}
                    className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <Label htmlFor="available-now" className="text-sm font-normal cursor-pointer">
                    Available Now
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-gray-600">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center md:hidden w-full sm:w-auto border-amber-200">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {isFilterApplied && (
                      <Badge className="ml-2 bg-amber-500 text-white">
                        {selectedBrands.length + (showOnlyAvailable ? 1 : 0) + (searchTerm ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <Label htmlFor="search-mobile" className="text-sm font-medium mb-1.5 block">
                        Search
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          type="search"
                          id="search-mobile"
                          placeholder="Search products..."
                          className="pl-8 border-amber-200 focus-visible:ring-amber-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {brands.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Brand</h3>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                                className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                              />
                              <Label htmlFor={`mobile-brand-${brand}`} className="text-sm font-normal cursor-pointer">
                                {brand}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium mb-2">Price Range (per day)</h3>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={3000}
                          step={100}
                          onValueChange={setPriceRange}
                          className="[&>span]:bg-amber-500"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">₹{priceRange[0]}</span>
                          <span className="text-sm">₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Availability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-available-now"
                          checked={showOnlyAvailable}
                          onCheckedChange={(checked) => setShowOnlyAvailable(checked === true)}
                          className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <Label htmlFor="mobile-available-now" className="text-sm font-normal cursor-pointer">
                          Available Now
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
                        onClick={() =>
                          document.querySelector<HTMLButtonElement>("[data-radix-collection-item]")?.click()
                        }
                      >
                        Apply Filters
                      </Button>
                      {isFilterApplied && (
                        <Button
                          variant="outline"
                          className="flex-1 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                          onClick={clearFilters}
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] border-amber-200 focus:ring-amber-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applied Filters */}
          {isFilterApplied && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Search: {searchTerm}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}

              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="outline" className="flex items-center gap-1 border-amber-200">
                  Brand: {brand}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleBrand(brand)} />
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 3000) && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceRange([0, 3000])} />
                </Badge>
              )}

              {showOnlyAvailable && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Available Only
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setShowOnlyAvailable(false)} />
                </Badge>
              )}

              {sortBy !== "featured" && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Sort: {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSortBy("featured")} />
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={`${product.category}-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/${product.category.toLowerCase()}s/${product.id}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg group">
                      <div className="relative h-48">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400">
                            New
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < product.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{product.price}/day</p>
                          <Badge
                            variant={product.available ? "outline" : "secondary"}
                            className={product.available ? "border-green-500 text-green-500" : ""}
                          >
                            {product.available ? "Available" : "Rented Out"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
