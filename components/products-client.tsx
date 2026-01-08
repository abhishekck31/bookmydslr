"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, ChevronDown } from "lucide-react"

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
    const productsPerPage = 9

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
        <main className="min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <section className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm/50">
                <div className="container py-6 md:py-8">
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

            <div className="container py-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Desktop Filters Sidebar */}
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
                                            />
                                            <Label htmlFor={`cat-${category}`} className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer transition-colors font-medium">
                                                {category}
                                            </Label>
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
                                <Label className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide block">Price Range</Label>
                                <Slider value={priceRange} min={0} max={5000} step={100} onValueChange={setPriceRange} />
                                <div className="flex justify-between text-xs mt-2 text-gray-500">
                                    <span>₹{priceRange[0]}</span>
                                    <span>₹{priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
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
                                            key={product.id}
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
                                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-dashed border-gray-200">
                                    <p className="text-gray-500 mt-2">No products found matching your filters.</p>
                                    <Button onClick={clearFilters} variant="outline" className="mt-6 border-amber-200 text-amber-700">
                                        Clear all filters
                                    </Button>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="flex items-center px-4 font-medium text-sm">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
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
