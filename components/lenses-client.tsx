"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"

interface Lens {
    id: string
    name: string
    brand: string | null
    type: string | null
    mount: string | null
    price: number
    image: string | null
    description: string
    isAvailable: boolean
    rating?: number
    reviews?: number
}

interface LensesClientProps {
    initialLenses: Lens[]
    globalSettings: {
        discountPercent: number
        isDiscountActive: boolean
    } | null
}

export function LensesClient({ initialLenses, globalSettings }: LensesClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [sortBy, setSortBy] = useState("featured")

    const brands = Array.from(new Set(initialLenses.map((l) => l.brand).filter(Boolean))) as string[]
    const types = Array.from(new Set(initialLenses.map((l) => l.type).filter(Boolean))) as string[]

    const getDiscountedPrice = (price: number) => {
        if (globalSettings?.isDiscountActive && globalSettings.discountPercent > 0) {
            return Math.round(price * (1 - globalSettings.discountPercent / 100))
        }
        return price
    }

    const filteredLenses = initialLenses.filter((lens) => {
        if (searchTerm && !lens.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
        if (selectedBrands.length > 0 && lens.brand && !selectedBrands.includes(lens.brand)) return false
        if (selectedTypes.length > 0 && lens.type && !selectedTypes.includes(lens.type)) return false

        const price = getDiscountedPrice(lens.price)
        if (price < priceRange[0] || price > priceRange[1]) return false

        return true
    })

    const sortedLenses = [...filteredLenses].sort((a, b) => {
        const priceA = getDiscountedPrice(a.price)
        const priceB = getDiscountedPrice(b.price)
        switch (sortBy) {
            case "price-low": return priceA - priceB
            case "price-high": return priceB - priceA
            default: return 0
        }
    })

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Filters */}
                <div className="hidden md:block w-64 space-y-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <div className="space-y-4">
                        <Input placeholder="Search lenses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="brand">
                                <AccordionTrigger>Brand</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {brands.map(brand => (
                                            <div key={brand} className="flex items-center space-x-2">
                                                <Checkbox id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onCheckedChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])} />
                                                <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Lenses Collection</h1>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedLenses.map((lens, index) => (
                            <motion.div key={lens.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                <ProductCard product={{
                                    ...lens,
                                    discountedPrice: getDiscountedPrice(lens.price) !== lens.price ? getDiscountedPrice(lens.price) : undefined
                                }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
