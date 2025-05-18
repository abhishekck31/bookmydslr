"use client"

import { useState, useEffect } from "react"
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
import { cameras } from "@/data/cameras"
import { lenses } from "@/data/lenses"
import { accessories } from "@/data/accessories"

// Combine all products WITHOUT overriding the category!
const allProducts = [
  ...cameras,
  ...lenses,
  ...accessories,
]

// Get all unique categories from your products, filtering out empty ones
const categories = Array.from(
  new Set(allProducts.map((item) => item.category).filter((cat) => !!cat && cat.trim() !== ""))
)

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  // Extract unique brands and categories
  const brands = Array.from(
    new Set(allProducts.filter((product) => "brand" in product).map((product: any) => product.brand))
  )

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Brand filter
    if (
      selectedBrands.length > 0 &&
      (!("brand" in product) || !selectedBrands.includes(product.brand))
    ) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0) {
      if (selectedCategories.includes("All Products")) {
        // If "All Products" is selected, show all products
        return true
      }

      if (!selectedCategories.includes(product.category)) {
        return false
      }
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return ("rating" in b ? b.rating : 0) - ("rating" in a ? a.rating : 0)
      case "newest":
        return ("isNew" in a && a.isNew ? -1 : 0) - ("isNew" in b && b.isNew ? -1 : 0)
      default:
        return ("featured" in a && a.featured ? -1 : 0) - ("featured" in b && b.featured ? -1 : 0)
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedBrands, selectedCategories, priceRange, sortBy])
  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 3000])
    setSortBy("featured")
  }

  // Check if any filter is applied
  const isFilterApplied =
    searchTerm !== "" ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 3000 ||
    sortBy !== "featured"

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6 bg-white rounded-xl shadow p-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {isFilterApplied && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-amber-500 hover:text-amber-600 font-semibold px-0"
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

              <hr className="my-4 border-gray-200" />

              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">Category</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-3 py-1">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="w-5 h-5 text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor={`category-${category}`} className="text-base font-normal cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-3 py-1">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                        className="w-5 h-5 text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-base font-normal cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">Price Range (per day)</h3>
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">All Products</h1>
              <p className="text-gray-600">Find the perfect equipment for your next shoot</p>
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
                        {selectedBrands.length + selectedCategories.length + (searchTerm ? 1 : 0)}
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

                    <div>
                      <h3 className="text-sm font-medium mb-2">Category</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="text-amber-500 border-amber-200 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label
                              htmlFor={`mobile-category-${category}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

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

              {selectedCategories.map((category) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1 border-amber-200">
                  Category: {category}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleCategory(category)} />
                </Badge>
              ))}

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
              {paginatedProducts.map((product: any, index) => (
                <motion.div
                  key={`${product.category}-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.id}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg group">
                      <div className="flex justify-center items-center w-60 h-40 mx-auto bg-white rounded-lg overflow-hidden">
                        <Image
                          src={String((product as any).image ?? "/placeholder.svg")}
                          alt={product.name}
                          width={220}
                          height={150}
                          className="object-contain rounded-lg"
                        />
                        {("isNew" in product && product.isNew) as React.ReactNode && (
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
                                  className={`h-4 w-4 ${i < ("rating" in product ? product.rating : 0) ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            {("reviews" in product ? `(${product.reviews})` : "")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-amber-600">₹{product.price}/day</p>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            {String((product as any).category ?? "")}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-200"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>
                {/* Custom Pagination Logic: show max 10, with ellipsis */}
                {(() => {
                  const maxVisible = 10;
                  let pages = [];
                  if (totalPages <= maxVisible) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage <= 6) {
                      pages = [1,2,3,4,5,6,7,'...',totalPages];
                    } else if (currentPage >= totalPages - 5) {
                      pages = [1,'...',totalPages-6,totalPages-5,totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
                    } else {
                      pages = [1,'...',currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2,'...',totalPages];
                    }
                  }
                  return pages.map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return (
                        <span key={"ellipsis-"+idx} className="px-2 text-gray-400">...</span>
                      );
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        className={
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-amber-500 to-yellow-300 text-black border-amber-500"
                            : "border-amber-200 hover:border-amber-500 hover:text-amber-500"
                        }
                        onClick={() => setCurrentPage(pageNum as number)}
                      >
                        {pageNum}
                      </Button>
                    );
                  });
                })()}
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-200"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
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
