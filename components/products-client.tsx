"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { ProductCard } from "@/components/product-card"

interface ProductsClientProps {
    initialProducts: any[]
    categories: string[]
    brands: string[]
    globalSettings?: any
}

export function ProductsClient({ initialProducts, categories, brands, globalSettings }: ProductsClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [sortBy, setSortBy] = useState("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const productsPerPage = 12

    // Helper to apply discount
    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    // --- Filtering Logic ---
    const filteredProducts = initialProducts.filter((product) => {
        // Search
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

        // Brand
        if (selectedBrands.length > 0 && (!product.brand || !selectedBrands.includes(product.brand))) return false

        // Category
        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(product.category?.name || product.category)) return false
        }

        // Price
        const price = getDiscountedPrice(product.price)
        if (price < priceRange[0] || price > priceRange[1]) return false

        return true
    })

    // --- Sorting Logic ---
    const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const priceA = getDiscountedPrice(a.price)
        const priceB = getDiscountedPrice(b.price)

        switch (sortBy) {
            case "price-low": return priceA - priceB
            case "price-high": return priceB - priceA
            case "rating": return (b.rating || 0) - (a.rating || 0)
            case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            default: return 0
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

    const isFilterApplied = searchTerm !== "" || selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000 || sortBy !== "featured"

    return (
        <main className="min-h-screen bg-white pt-16 md:pt-0">
            {/* Search Bar - Mobile Only */}
            <div className="md:hidden px-4 py-4 bg-white border-b border-gray-100 shadow-sm">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search cameras, lenses, accessories..."
                        className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-500/20 text-base"
                    />
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Horizontal Category Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Button
                        variant={selectedCategories.length === 0 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategories([])}
                        className="whitespace-nowrap rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700 text-sm font-medium"
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleCategory(category)}
                            className={`whitespace-nowrap rounded-full text-sm font-medium transition-all ${
                                selectedCategories.includes(category)
                                    ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
                                    : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700"
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Filter and Sort Controls */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="h-10 rounded-lg border-gray-200">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                    {(selectedBrands.length > 0 || priceRange[1] < 5000) && (
                                        <Badge className="ml-2 h-5 w-5 rounded-full bg-amber-500 text-white text-xs p-0 flex items-center justify-center">
                                            {selectedBrands.length + (priceRange[1] < 5000 ? 1 : 0)}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>
                                <div className="space-y-6 mt-6">
                                    {/* Categories */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-4">Categories</h3>
                                        <div className="space-y-3">
                                            {categories.map((category) => (
                                                <div key={category} className="flex items-center">
                                                    <Checkbox
                                                        id={`cat-${category}`}
                                                        checked={selectedCategories.includes(category)}
                                                        onCheckedChange={() => toggleCategory(category)}
                                                    />
                                                    <Label htmlFor={`cat-${category}`} className="ml-3 text-sm text-gray-700">
                                                        {category}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Brands */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-4">Brands</h3>
                                        <div className="space-y-3">
                                            {brands.map((brand) => (
                                                <div key={brand} className="flex items-center">
                                                    <Checkbox
                                                        id={`brand-${brand}`}
                                                        checked={selectedBrands.includes(brand)}
                                                        onCheckedChange={() => toggleBrand(brand)}
                                                    />
                                                    <Label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-700">
                                                        {brand}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <Label className="text-sm font-bold text-gray-900 mb-4 block">Price Range</Label>
                                        <Slider value={priceRange} min={0} max={5000} step={100} onValueChange={setPriceRange} />
                                        <div className="flex justify-between text-xs mt-2 text-gray-500">
                                            <span>₹{priceRange[0]}</span>
                                            <span>₹{priceRange[1]}</span>
                                        </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="text-sm text-gray-500">
                        {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                    </div>
                </div>
            </div>

            {/* Active Filters Bar */}
            {isFilterApplied && (
                <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider whitespace-nowrap">Active:</span>
                        {selectedCategories.map(c => (
                            <Badge key={c} className="bg-amber-500 text-white hover:bg-amber-600 border-amber-500 gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                                {c} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(c)} />
                            </Badge>
                        ))}
                        {selectedBrands.map(b => (
                            <Badge key={b} className="bg-gray-700 text-white hover:bg-gray-800 border-gray-700 gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                                {b} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(b)} />
                            </Badge>
                        ))}
                        {priceRange[1] < 5000 && (
                            <Badge className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500 gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                                Up to ₹{priceRange[1]} <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 5000])} />
                            </Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-amber-700 hover:bg-amber-100 h-6 px-2 whitespace-nowrap">
                            Clear All
                        </Button>
                    </div>
                </div>
            )}

            {/* Product Grid - Mobile First 2-Column */}
            <div className="px-4 py-6">
                <AnimatePresence mode="popLayout">
                    {paginatedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                            {paginatedProducts.map((product: any, idx) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    key={product.id}
                                    className="touch-manipulation"
                                >
                                    <ProductCard product={{
                                        ...product,
                                        rating: product.rating || 4.8,
                                        reviews: product.reviews || 24,
                                        discountedPrice: getDiscountedPrice(product.price) !== product.price ? getDiscountedPrice(product.price) : undefined
                                    }} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-sm">
                                Try adjusting your filters or search terms to find what you're looking for.
                            </p>
                            <Button onClick={clearFilters} className="bg-amber-500 hover:bg-amber-600">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-10 rounded-lg"
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-4 font-medium text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="h-10 rounded-lg"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
