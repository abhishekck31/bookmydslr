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
import { ProductCard } from "./product-card"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string | null
    brand: string | null
    type: string | null
    isAvailable: boolean
    rating?: number | null
    reviews?: number | null
    isNew?: boolean
    category?: {
        name: string
    }
}

interface CategoryProductsClientProps {
    products: Product[]
    categoryTitle: string
    globalSettings?: any
}

export function CategoryProductsClient({ products, categoryTitle, globalSettings }: CategoryProductsClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [sortBy, setSortBy] = useState("featured")
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

    // Extract unique brands
    const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[]

    // Helper to apply discount
    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    // Filter products based on selected filters
    const filteredProducts = products.filter((p) => {
        if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
        if (selectedBrands.length > 0 && p.brand && !selectedBrands.includes(p.brand)) return false

        const price = getDiscountedPrice(p.price)
        if (price < priceRange[0] || price > priceRange[1]) return false

        if (showOnlyAvailable && !p.isAvailable) return false

        return true
    })

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = getDiscountedPrice(a.price)
        const priceB = getDiscountedPrice(b.price)

        switch (sortBy) {
            case "price-low": return priceA - priceB
            case "price-high": return priceB - priceA
            case "rating": return (b.rating || 0) - (a.rating || 0)
            default: return 0
        }
    })

    const isFilterApplied = searchTerm !== "" || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000 || showOnlyAvailable || sortBy !== "featured"

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedBrands([])
        setPriceRange([0, 5000])
        setShowOnlyAvailable(false)
        setSortBy("featured")
    }

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Link href="/products" className="flex items-center text-amber-500 hover:text-amber-600 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Products
                </Link>
                <h1 className="text-3xl font-bold">{categoryTitle}</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Filters - Desktop */}
                <div className="hidden md:block w-64 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            {isFilterApplied && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-amber-500">
                                    Clear All
                                </Button>
                            )}
                        </div>

                        <div>
                            <Label className="text-sm font-medium mb-1.5 block">Search</Label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {brands.length > 0 && (
                            <div>
                                <Label className="text-sm font-medium mb-2 block">Brand</Label>
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`brand-${brand}`}
                                                checked={selectedBrands.includes(brand)}
                                                onCheckedChange={() =>
                                                    setSelectedBrands(prev =>
                                                        prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                                                    )
                                                }
                                            />
                                            <Label htmlFor={`brand-${brand}`} className="cursor-pointer font-normal">{brand}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <Label className="text-sm font-medium mb-2 block">Price Range</Label>
                            <Slider value={priceRange} min={0} max={5000} step={100} onValueChange={setPriceRange} />
                            <div className="flex justify-between text-xs mt-2">
                                <span>₹{priceRange[0]}</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="available"
                                checked={showOnlyAvailable}
                                onCheckedChange={(checked) => setShowOnlyAvailable(!!checked)}
                            />
                            <Label htmlFor="available" className="cursor-pointer font-normal">Available Only</Label>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-muted-foreground">{sortedProducts.length} items found</p>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="rating">Top Rated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    product={{
                                        ...p,
                                        rating: p.rating || 4.8,
                                        reviews: p.reviews || 24,
                                        discountedPrice: getDiscountedPrice(p.price) !== p.price ? getDiscountedPrice(p.price) : undefined
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border rounded-xl bg-muted/20">
                            <p className="text-muted-foreground">No products found matching your filters.</p>
                            <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear All Filters</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
