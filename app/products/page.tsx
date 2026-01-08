"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, ChevronDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { cameras } from "@/data/cameras"
import { lenses } from "@/data/lenses"
import { accessories } from "@/data/accessories"
import { ProductCard } from "@/components/product-card"

// --- Helper Data & Types ---
const allProducts = [
  ...cameras,
  ...lenses,
  ...accessories,
]

const categories = Array.from(
  new Set(allProducts.map((item) => item.category).filter((cat) => !!cat && cat.trim() !== ""))
)

const brands = Array.from(
  new Set(allProducts.filter((product) => "brand" in product).map((product: any) => product.brand))
)

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9 // Increased density slightly for better overview

  // --- Filtering Logic ---
  const filteredProducts = allProducts.filter((product) => {
    // Search
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

    // Brand
    if (
      selectedBrands.length > 0 &&
      (!product.brand || !selectedBrands.includes(product.brand))
    ) return false

    // Category
    if (selectedCategories.length > 0) {
      if (selectedCategories.includes("All Products")) return true
      if (!selectedCategories.includes(product.category)) return false
    }

    // Price
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false

    return true
  })

  // --- Sorting Logic ---
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "rating": return ("rating" in b ? b.rating : 0) - ("rating" in a ? a.rating : 0)
      case "newest": return ("isNew" in a && a.isNew ? -1 : 0) - ("isNew" in b && b.isNew ? -1 : 0)
      default: return ("featured" in a && a.featured ? -1 : 0) - ("featured" in b && b.featured ? -1 : 0)
    }
  })

  // --- Pagination Logic ---
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedBrands, selectedCategories, priceRange, sortBy])

  // --- Handlers ---
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setSortBy("featured")
  }

  const isFilterApplied =
    searchTerm !== "" ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    sortBy !== "featured"

  return (
    <main className="min-h-screen bg-gray-50/50">

      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm/50">
        <div className="container-premium py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Equipment Catalog</h1>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
                Explore our curated collection of professional-grade cameras, lenses, and production gear.
                Maintained to factory standards.
              </p>
            </div>

            {/* Desktop Sort & Search */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search gear..."
                  className="pl-9 bg-gray-50 border-transparent hover:bg-gray-100 focus:bg-white focus:border-amber-200 focus:ring-2 focus:ring-amber-500/20 transition-all rounded-full h-10 text-sm"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 rounded-full border-gray-200 hover:border-amber-300 hover:bg-amber-50 px-4 gap-2 text-sm font-medium text-gray-700">
                    Sort by <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-1">
                  <DropdownMenuItem onClick={() => setSortBy("featured")} className="text-sm cursor-pointer">Featured</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")} className="text-sm cursor-pointer">Newest Arrivals</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")} className="text-sm cursor-pointer">Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")} className="text-sm cursor-pointer">Price: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Active Filters Row */}
          {isFilterApplied && (
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-dashed border-gray-200 animate-in fade-in slide-in-from-top-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Active:</span>
              {selectedCategories.map(c => (
                <Badge key={c} variant="secondary" className="bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-100 gap-1 rounded-md px-2 py-1 font-medium">
                  {c} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(c)} />
                </Badge>
              ))}
              {selectedBrands.map(b => (
                <Badge key={b} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 gap-1 rounded-md px-2 py-1 font-medium">
                  {b} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(b)} />
                </Badge>
              ))}
              {priceRange[1] < 5000 && (
                <Badge variant="outline" className="bg-white gap-1 rounded-md px-2 py-1 font-medium">
                  Up to ₹{priceRange[1]} <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 5000])} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-red-500 hover:bg-red-50 hover:text-red-600 ml-auto h-7 px-2">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="container-premium py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Desktop Filters Sidebar (Minimalist) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 sticky top-48 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center group">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded-sm border-gray-300 text-amber-600 focus:ring-amber-500/20 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 transition-all"
                      />
                      <Label htmlFor={`cat-${category}`} className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer transition-colors font-medium">
                        {category}
                      </Label>
                      <span className="ml-auto text-xs text-gray-400">
                        {allProducts.filter(p => p.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200/60" />

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center group">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                        className="h-4 w-4 rounded-sm border-gray-300 text-amber-600 focus:ring-amber-500/20 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 transition-all"
                      />
                      <Label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer transition-colors font-medium">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200/60" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Daily Rate</h3>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    ₹{priceRange[0]} - ₹{priceRange[1] === 5000 ? '5000+' : priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile Controls */}
            <div className="lg:hidden flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 h-10 rounded-lg border-gray-200 bg-white"
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-10 px-4 border-gray-200 bg-white">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-left">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((c) => (
                          <div key={c} className="flex items-center gap-2">
                            <Checkbox id={`m-cat-${c}`} checked={selectedCategories.includes(c)} onCheckedChange={() => toggleCategory(c)} />
                            <Label htmlFor={`m-cat-${c}`}>{c}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Brands</h4>
                      <div className="space-y-2">
                        {brands.map((b) => (
                          <div key={b} className="flex items-center gap-2">
                            <Checkbox id={`m-brand-${b}`} checked={selectedBrands.includes(b)} onCheckedChange={() => toggleBrand(b)} />
                            <Label htmlFor={`m-brand-${b}`}>{b}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full mt-8 bg-amber-600 hover:bg-amber-700 text-white" onClick={() => document.querySelector<HTMLElement>('[data-radix-collection-item]')?.click()}>
                      View Results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product: any, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      key={`${product.id}-${idx}`}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                  <p className="text-gray-500 max-w-sm mt-2">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="mt-6 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
                    Clear all filters
                  </Button>
                </div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 pb-8">
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>

                  <span className="text-xs font-semibold px-2 text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
