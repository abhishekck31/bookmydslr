"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, SlidersHorizontal, X } from "lucide-react"
import { lenses } from "@/data/lenses"
import { motion } from "framer-motion"

export default function LensesPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedMounts, setSelectedMounts] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState("featured")

  // Extract unique values for filter options
  const brands = Array.from(new Set(lenses.map((lens) => lens.brand)))
  const types = Array.from(new Set(lenses.map((lens) => lens.type)))
  const mounts = Array.from(new Set(lenses.map((lens) => lens.mount)))
  const maxPrice = Math.max(...lenses.map((lens) => lens.price))

  // Set initial price range
  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  // Filter lenses based on selected filters
  const filteredLenses = lenses.filter((lens) => {
    // Search query filter
    if (searchQuery && !lens.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(lens.brand)) {
      return false
    }

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(lens.type)) {
      return false
    }

    // Mount filter
    if (selectedMounts.length > 0 && !selectedMounts.includes(lens.mount)) {
      return false
    }

    // Price range filter
    if (lens.price < priceRange[0] || lens.price > priceRange[1]) {
      return false
    }

    // Availability filter
    if (showOnlyAvailable && !lens.available) {
      return false
    }

    return true
  })

  // Sort lenses based on selected sort option
  const sortedLenses = [...filteredLenses].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      case "rating":
        return b.rating - a.rating
      default:
        return a.featured ? -1 : b.featured ? 1 : 0
    }
  })

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Toggle type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Toggle mount selection
  const toggleMount = (mount: string) => {
    setSelectedMounts((prev) => (prev.includes(mount) ? prev.filter((m) => m !== mount) : [...prev, mount]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrands([])
    setSelectedTypes([])
    setSelectedMounts([])
    setPriceRange([0, maxPrice])
    setShowOnlyAvailable(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Camera Lenses</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search lenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={`flex items-center gap-2 ${showFilters ? "border-amber-500 text-amber-500" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </Button>
          <select
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedBrands.length > 0 ||
        selectedTypes.length > 0 ||
        selectedMounts.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < maxPrice ||
        showOnlyAvailable) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="px-3 py-1">
              {brand}
              <button className="ml-2" onClick={() => toggleBrand(brand)}>
                <X size={14} />
              </button>
            </Badge>
          ))}
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="px-3 py-1">
              {type}
              <button className="ml-2" onClick={() => toggleType(type)}>
                <X size={14} />
              </button>
            </Badge>
          ))}
          {selectedMounts.map((mount) => (
            <Badge key={mount} variant="secondary" className="px-3 py-1">
              {mount}
              <button className="ml-2" onClick={() => toggleMount(mount)}>
                <X size={14} />
              </button>
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="px-3 py-1">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Badge>
          )}
          {showOnlyAvailable && (
            <Badge variant="secondary" className="px-3 py-1">
              Available Only
              <button className="ml-2" onClick={() => setShowOnlyAvailable(false)}>
                <X size={14} />
              </button>
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
            Clear All
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-gray-50 p-4 rounded-lg"
          >
            <div className="space-y-6">
              {/* Brand Filter */}
              <div>
                <h3 className="font-medium mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-medium mb-2">Type</h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mount Filter */}
              <div>
                <h3 className="font-medium mb-2">Mount</h3>
                <div className="space-y-2">
                  {mounts.map((mount) => (
                    <div key={mount} className="flex items-center">
                      <Checkbox
                        id={`mount-${mount}`}
                        checked={selectedMounts.includes(mount)}
                        onCheckedChange={() => toggleMount(mount)}
                      />
                      <label htmlFor={`mount-${mount}`} className="ml-2 text-sm cursor-pointer">
                        {mount}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={maxPrice}
                    step={100}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center">
                <Checkbox
                  id="availability"
                  checked={showOnlyAvailable}
                  onCheckedChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
                />
                <label htmlFor="availability" className="ml-2 text-sm cursor-pointer">
                  Show only available items
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lenses Grid */}
        <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
          {sortedLenses.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No lenses found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLenses.map((lens) => (
                <Link key={lens.id} href={`/lenses/${lens.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48">
                      <Image
                        src={lens.image || "/placeholder.svg"}
                        alt={lens.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      {lens.isNew && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                          New
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                        {lens.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lens.description}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < lens.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({lens.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-amber-600">₹{lens.price}/day</p>
                        <Badge
                          variant={lens.available ? "outline" : "secondary"}
                          className={lens.available ? "border-green-500 text-green-500" : ""}
                        >
                          {lens.available ? "Available" : "Rented Out"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
