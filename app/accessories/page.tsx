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
import { Star, Filter, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { accessories } from "@/data/accessories"

export default function AccessoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000])
  const [sortBy, setSortBy] = useState("featured")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Extract unique brands and types
  const brands = Array.from(new Set(accessories.map((accessory) => accessory.brand)))
  const types = Array.from(new Set(accessories.map((accessory) => accessory.type)))
  const categories = Array.from(new Set(accessories.map((item) => item.category).filter(Boolean)))

  // Filter accessories based on selected filters
  const filteredAccessories = accessories.filter((accessory) => {
    // Search term filter
    if (searchTerm && !accessory.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Brand filter
    if (
      selectedBrands.length > 0 &&
      (!accessory.brand || !selectedBrands.includes(accessory.brand))
    ) {
      return false
    }

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(accessory.type)) {
      return false
    }

    // Price filter
    if (accessory.price < priceRange[0] || accessory.price > priceRange[1]) {
      return false
    }

    // Availability filter
    if (showOnlyAvailable && !accessory.available) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(accessory.category)) {
      return false
    }

    return true
  })

  // Sort accessories
  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return ((b as any).rating ?? 0) - ((a as any).rating ?? 0)
      case "newest":
        return (((b as any).isNew ?? false) ? 1 : 0) - (((a as any).isNew ?? false) ? 1 : 0)
      default:
        return (((b as any).featured ?? false) ? 1 : 0) - (((a as any).featured ?? false) ? 1 : 0)
    }
  })

  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Handle type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [category]
    );
    setSelectedTypes([]);
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBrands([])
    setSelectedTypes([])
    setPriceRange([0, 6000])
    setShowOnlyAvailable(false)
    setSortBy("featured")
    setSelectedCategories([])
  }

  // Check if any filter is applied
  const isFilterApplied =
    searchTerm !== "" ||
    selectedBrands.length > 0 ||
    selectedTypes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 6000 ||
    showOnlyAvailable ||
    sortBy !== "featured" ||
    selectedCategories.length > 0

  console.log("Selected categories:", selectedCategories);
  console.log("Selected types:", selectedTypes);
  console.log("Filtered accessories:", filteredAccessories.map(a => a.name));

  return (
    <div className="container py-8">
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
                    placeholder="Search accessories..."
                    className="pl-8 border-amber-200 focus-visible:ring-amber-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-sm font-medium py-2">Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-brand-${brand ?? "unknown"}`}
                            checked={brand ? selectedBrands.includes(brand) : false}
                            onCheckedChange={() => brand && toggleBrand(brand)}
                            className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="accessory-type">
                  <AccordionTrigger className="text-sm font-medium py-2">Accessory Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {types.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => toggleType(type)}
                            className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price-range">
                  <AccordionTrigger className="text-sm font-medium py-2">Price Range (per day)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={6000}
                        step={100}
                        onValueChange={value => setPriceRange(value as [number, number])}
                        className="[&>span]:bg-amber-500"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">₹{priceRange[0]}</span>
                        <span className="text-sm">₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="availability">
                  <AccordionTrigger className="text-sm font-medium py-2">Availability</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="category">
                  <AccordionTrigger className="text-sm font-medium py-2">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Accessories Collection</h1>
              <p className="text-gray-600">Find the perfect accessories for your next shoot</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center md:hidden w-full sm:w-auto border-amber-200">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {isFilterApplied && (
                      <Badge className="ml-2 bg-amber-500 text-white">
                        {selectedBrands.length +
                          selectedTypes.length +
                          (showOnlyAvailable ? 1 : 0) +
                          (searchTerm ? 1 : 0) +
                          selectedCategories.length}
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
                          placeholder="Search accessories..."
                          className="pl-8 border-amber-200 focus-visible:ring-amber-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Brand</h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              checked={brand ? selectedBrands.includes(brand) : false}
                              id={`mobile-brand-${brand ?? "unknown"}`}
                              onCheckedChange={() => brand && toggleBrand(brand)}
                              className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label htmlFor={`mobile-brand-${brand}`} className="text-sm font-normal cursor-pointer">
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Accessory Type</h3>
                      <div className="space-y-2">
                        {types.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-type-${type}`}
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={() => toggleType(type)}
                              className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label htmlFor={`mobile-type-${type}`} className="text-sm font-normal cursor-pointer">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Price Range (per day)</h3>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={6000}
                          step={100}
                          onValueChange={value => setPriceRange(value as [number, number])}
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

                    <div>
                      <h3 className="text-sm font-medium mb-2">Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label htmlFor={`mobile-category-${category}`} className="text-sm font-normal cursor-pointer">
                              {category}
                            </Label>
                          </div>
                        ))}
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

              {selectedTypes.map((type) => (
                <Badge key={type} variant="outline" className="flex items-center gap-1 border-amber-200">
                  Type: {type}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleType(type)} />
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 6000) && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPriceRange([0, 6000])} />
                </Badge>
              )}

              {showOnlyAvailable && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Available Only
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setShowOnlyAvailable(false)} />
                </Badge>
              )}

              {selectedCategories.map((category) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1 border-amber-200">
                  Category: {category}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleCategory(category)} />
                </Badge>
              ))}

              {sortBy !== "featured" && (
                <Badge variant="outline" className="flex items-center gap-1 border-amber-200">
                  Sort: {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSortBy("featured")} />
                </Badge>
              )}
            </div>
          )}

          {/* Accessories Grid */}
          {sortedAccessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAccessories.map((accessory, index) => (
                <motion.div
                  key={accessory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/accessories/${accessory.id}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg group">
                      <div className="relative h-48">
                        <Image
                          src={accessory.image || "/placeholder.svg"}
                          alt={accessory.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {(accessory as any).isNew && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400">
                            New
                          </Badge>
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
                                  className={`h-4 w-4 ${i < ((accessory as any).rating ?? 0) ? "fill-amber-500 text-amber-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({(accessory as any).reviews ?? 0})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{accessory.price}/day</p>
                          <Badge
                            variant={accessory.available ? "outline" : "secondary"}
                            className={accessory.available ? "border-green-500 text-green-500" : ""}
                          >
                            {accessory.available ? "Available" : "Rented Out"}
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
              <h3 className="text-lg font-medium mb-2">No accessories found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {sortedAccessories.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled className="border-amber-200">
                  &lt;
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black border-amber-500"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 hover:border-amber-500 hover:text-amber-500"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 hover:border-amber-500 hover:text-amber-500"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-200 hover:border-amber-500 hover:text-amber-500"
                >
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
