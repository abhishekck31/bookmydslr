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
import { ProductCard } from "./product-card"

interface Accessory {
    id: string
    name: string
    brand: string | null
    type: string | null
    price: number
    image: string | null
    description: string
    isAvailable: boolean
    rating?: number
    reviews?: number
    isNew?: boolean
    category?: string
}

interface AccessoriesClientProps {
    initialAccessories: Accessory[]
    globalSettings: {
        discountPercent: number
        isDiscountActive: boolean
    } | null
}

export function AccessoriesClient({ initialAccessories, globalSettings }: AccessoriesClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 6000])
    const [sortBy, setSortBy] = useState("featured")
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    // Extract unique values
    const brands = Array.from(new Set(initialAccessories.map((a) => a.brand).filter(Boolean))) as string[]
    const types = Array.from(new Set(initialAccessories.map((a) => a.type).filter(Boolean))) as string[]
    const categories = Array.from(new Set(initialAccessories.map((a) => a.category).filter(Boolean))) as string[]

    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    const filteredAccessories = initialAccessories.filter((acc) => {
        if (searchTerm && !acc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
        if (selectedBrands.length > 0 && acc.brand && !selectedBrands.includes(acc.brand)) return false
        if (selectedTypes.length > 0 && acc.type && !selectedTypes.includes(acc.type)) return false
        if (selectedCategories.length > 0 && acc.category && !selectedCategories.includes(acc.category)) return false

        const price = getDiscountedPrice(acc.price)
        if (price < priceRange[0] || price > priceRange[1]) return false

        if (showOnlyAvailable && !acc.isAvailable) return false

        return true
    })

    const sortedAccessories = [...filteredAccessories].sort((a, b) => {
        const priceA = getDiscountedPrice(a.price)
        const priceB = getDiscountedPrice(b.price)
        switch (sortBy) {
            case "price-low": return priceA - priceB
            case "price-high": return priceB - priceA
            default: return 0
        }
    })

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }

    const toggleType = (type: string) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    }

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedBrands([])
        setSelectedTypes([])
        setSelectedCategories([])
        setPriceRange([0, 6000])
        setShowOnlyAvailable(false)
        setSortBy("featured")
    }

    const isFilterApplied = searchTerm !== "" || selectedBrands.length > 0 || selectedTypes.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 6000 || showOnlyAvailable || sortBy !== "featured"

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Filters - Desktop */}
                <div className="hidden md:block w-64 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            {isFilterApplied && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-amber-500 hover:text-amber-600">
                                    Clear All
                                </Button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="search-desktop" className="text-sm font-medium mb-1.5 block">Search</Label>
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
                                                        id={`brand-${brand}`}
                                                        checked={selectedBrands.includes(brand)}
                                                        onCheckedChange={() => toggleBrand(brand)}
                                                    />
                                                    <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">{brand}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="type">
                                    <AccordionTrigger className="text-sm font-medium py-2">Type</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2 pt-1">
                                            {types.map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`type-${type}`}
                                                        checked={selectedTypes.includes(type)}
                                                        onCheckedChange={() => toggleType(type)}
                                                    />
                                                    <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">{type}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="price">
                                    <AccordionTrigger className="text-sm font-medium py-2">Price Range</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 pt-2">
                                            <Slider value={priceRange} min={0} max={6000} step={50} onValueChange={setPriceRange} />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">₹{priceRange[0]}</span>
                                                <span className="text-sm">₹{priceRange[1]}</span>
                                            </div>
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
                            <p className="text-gray-600">Premium add-ons for your gear</p>
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px] border-amber-200">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {sortedAccessories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedAccessories.map((acc, index) => (
                                <motion.div key={acc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                    <ProductCard product={{
                                        ...acc,
                                        discountedPrice: getDiscountedPrice(acc.price) !== acc.price ? getDiscountedPrice(acc.price) : undefined
                                    }} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium mb-2">No accessories found</h3>
                            <Button onClick={clearFilters} className="bg-amber-500 text-white">Clear All Filters</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
