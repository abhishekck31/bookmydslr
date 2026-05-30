"use client"

import { useState, useMemo } from "react"
import { Product, Category } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    Search,
    X,
    SlidersHorizontal
} from "lucide-react"
import { SmartFilterDrawer } from "./smart-filter-drawer"
import { PremiumCategoryNav } from "./premium-category-nav"


interface RentalEquipmentListingProps {
    initialProducts: Product[]
    categories: Category[]
}

export function RentalEquipmentListing({ initialProducts, categories }: RentalEquipmentListingProps) {
    // State
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
    const [filters, setFilters] = useState({
        brands: [] as string[],
        priceRange: [0, 10000] as [number, number],
        cameraTypes: [] as string[],
        mounts: [] as string[],
        availability: [] as string[]
    })

    // Filter products by search + category + filters
    const filteredProducts = useMemo(() => {
        let result = initialProducts

        // 1. Search filter (NAME or BRAND or CATEGORY)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category?.name.toLowerCase().includes(query)
            )
        }

        // 2. Category filter
        if (activeCategory) {
            result = result.filter(p => p.category?.slug === activeCategory)
        }

        // 3. Brand filter
        if (filters.brands.length > 0) {
            result = result.filter(p => filters.brands.includes(p.brand))
        }

        // 4. Price filter
        result = result.filter(p =>
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        )

        // 5. Availability filter
        if (filters.availability.length > 0) {
            if (filters.availability.includes("Available Today")) {
                result = result.filter(p => p.isAvailable)
            }
        }

        return result
    }, [initialProducts, searchQuery, activeCategory, filters])

    // Get available brands from current results
    const availableBrands = useMemo(() => {
        const brands = new Set<string>()
        filteredProducts.forEach(p => p.brand && brands.add(p.brand))
        return Array.from(brands).sort()
    }, [filteredProducts])

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters)
    }

    const activeFilterCount =
        filters.brands.length +
        filters.cameraTypes.length +
        filters.mounts.length +
        filters.availability.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0)

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* 1️⃣ SEARCH-FIRST HEADER (STICKY, TOP PRIORITY) */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="w-full max-w-[1320px] mx-auto px-4 py-3">
                    <div className="relative">
                        {/* Search Icon */}
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        {/* Search Input */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search rental equipment (camera, lens, gimbal, brand…)"
                            className="w-full h-12 pl-12 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50/50 text-base text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                        />

                        {/* Clear Button */}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-4 w-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 2️⃣ PREMIUM CATEGORY NAVIGATION - ALL ACCESSIBLE */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
                <PremiumCategoryNav
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1320px] mx-auto px-4 py-4 md:py-6">
                {/* Results Header + Filter Button */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {activeCategory
                                ? categories.find(c => c.slug === activeCategory)?.name || "Rental Equipment"
                                : "Rental Equipment"}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
                        </p>
                    </div>

                    {/* 3️⃣ FILTERS BUTTON (CLEAN & MODERN) */}
                    <button
                        onClick={() => setIsFilterDrawerOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all relative"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="hidden sm:inline">Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* 4️⃣ PRODUCT GRID - EXACTLY 4 COLUMNS ON DESKTOP */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                No equipment found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search or filters
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("")
                                    setActiveCategory(null)
                                    setFilters({
                                        brands: [],
                                        priceRange: [0, 10000],
                                        cameraTypes: [],
                                        mounts: [],
                                        availability: []
                                    })
                                }}
                                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-[1320px] mx-auto pb-24">
                        {filteredProducts.map((product) => (
                            <RentalProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Smart Filter Drawer */}
            <SmartFilterDrawer
                isOpen={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                onApply={handleApplyFilters}
                availableBrands={availableBrands}
                resultCount={filteredProducts.length}
            />
        </div>
    )
}

// 5️⃣ RENTAL-FOCUSED PRODUCT CARD
interface RentalProductCardProps {
    product: Product
}

function RentalProductCard({ product }: RentalProductCardProps) {
    const rating = product.rating || 4.5
    const reviewCount = product.reviews || 0

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="flex flex-col h-full rounded-2xl border-2 border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1">
                {/* Image */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Availability Badge - PROMINENT */}
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                        {product.isAvailable ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 rounded-full shadow-lg">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-white">Available</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 rounded-full shadow-lg">
                                <X className="h-3 w-3 text-white" />
                                <span className="text-xs font-bold text-white">Booked</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-2 md:p-4">
                    {/* Brand (muted) */}
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {product.brand}
                    </p>

                    {/* Equipment Name */}
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2 min-h-[2rem] md:min-h-[2.5rem] group-hover:text-amber-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1 mb-3">
                            <span className="text-amber-500 text-sm">⭐</span>
                            <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({reviewCount})</span>
                        </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* ₹ Price / day - VERY PROMINENT */}
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl md:text-3xl font-bold text-gray-900">₹{product.price}</span>
                            <span className="text-sm text-gray-500 font-medium">/day</span>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // Rent now logic
                            }}
                            disabled={!product.isAvailable}
                            className={cn(
                                "w-full py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-200",
                                product.isAvailable
                                    ? "bg-amber-400 text-black hover:bg-amber-500 hover:shadow-lg active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {product.isAvailable ? "Rent Now" : "Not Available"}
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // View details (or just let Link handle it)
                            }}
                            className="w-full py-2 md:py-3 rounded-xl border-2 border-gray-200 font-bold text-xs md:text-sm text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all hidden md:block"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
