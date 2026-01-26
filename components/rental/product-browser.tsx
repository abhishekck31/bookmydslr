"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Product, Category } from "@/types"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductListingCard } from "@/components/rental/product-listing-card"
import { Filter, X, ChevronDown, SlidersHorizontal, ArrowUpDown, ChevronUp, Home, Grid, ShoppingCart } from "lucide-react"
import Image from "next/image"

// --- Inlined Mobile Nav Component ---
interface ProductMobileNavProps {
    onHomeClick: () => void
    onCategoriesClick: () => void
    onFiltersClick: () => void
    onCartClick: () => void
    filterCount: number
    cartCount?: number
}

function ProductMobileNav({
    onHomeClick,
    onCategoriesClick,
    onFiltersClick,
    onCartClick,
    filterCount,
    cartCount = 0
}: ProductMobileNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                <button
                    onClick={onHomeClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <Home className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>

                <button
                    onClick={onCategoriesClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <Grid className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Categories</span>
                </button>

                <button
                    onClick={onFiltersClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all relative"
                >
                    <div className="relative">
                        <SlidersHorizontal className="w-5 h-5" />
                        {filterCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-white">
                                {filterCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Filters</span>
                </button>

                <button
                    onClick={onCartClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-sm ring-1 ring-white">
                            {cartCount > 0 ? cartCount : "!"}
                        </span>
                    </div>
                    <span className="text-[10px] font-medium">Cart</span>
                </button>
            </div>
        </div>
    )
}

// --- Components ---

interface CategoryPillGridProps {
    categories: Category[]
    activeCategory: string
    onSelectCategory: (slug: string) => void
}

function CategoryPillGrid({ categories, activeCategory, onSelectCategory }: CategoryPillGridProps) {
    return (
        <div className="w-full bg-white pb-6 pt-4">
            <div className="container">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => onSelectCategory("all")}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
                            activeCategory === "all"
                                ? "bg-amber-400 border-amber-400 text-black shadow-md ring-2 ring-amber-100"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                        )}
                    >
                        All Products
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.slug)}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border flex items-center gap-2",
                                activeCategory === category.slug
                                    ? "bg-amber-400 border-amber-400 text-black shadow-md ring-2 ring-amber-100"
                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                            )}
                        >
                            {category.image && (
                                <div className="w-5 h-5 relative rounded-full overflow-hidden bg-gray-200 shrink-0">
                                    <Image src={category.image} alt="" fill className="object-cover" />
                                </div>
                            )}
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

interface InlineFilterBarProps {
    availableBrands: string[]
    selectedBrands: string[]
    priceRange: [number, number]
    maxPrice: number
    sortOption: string
    onBrandChange: (brand: string) => void
    onPriceChange: (value: [number, number]) => void
    onSortChange: (sort: string) => void
    filteredCount: number
}

function InlineFilterBar({
    availableBrands,
    selectedBrands,
    priceRange,
    maxPrice,
    sortOption,
    onBrandChange,
    onPriceChange,
    onSortChange,
    filteredCount,
}: InlineFilterBarProps) {
    return (
        <div className="sticky top-0 z-30 w-full border-y bg-white/80 backdrop-blur-md transition-all shadow-sm">
            <div className="container flex h-16 items-center justify-between gap-4">

                {/* Filters Row */}
                <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar">
                    {/* Brand Dropdown - Always visible or collapse if too many? Keep logic simple */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-9 border-dashed rounded-full px-4 flex-shrink-0">
                                Brand
                                {selectedBrands.length > 0 && (
                                    <span className="ml-1 rounded bg-gray-200 px-1 text-xs font-bold">
                                        {selectedBrands.length}
                                    </span>
                                )}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                            <div className="p-4 max-h-[300px] overflow-y-auto space-y-2">
                                {availableBrands.length === 0 ? (
                                    <p className="text-sm text-gray-500">No brands available</p>
                                ) : availableBrands.map((brand) => (
                                    <div key={brand} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`filter-brand-${brand}`}
                                            checked={selectedBrands.includes(brand)}
                                            onCheckedChange={() => onBrandChange(brand)}
                                        />
                                        <label
                                            htmlFor={`filter-brand-${brand}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Price Dropdown */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-9 border-dashed rounded-full px-4 flex-shrink-0">
                                Price
                                {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                                    <span className="ml-1 rounded bg-gray-200 px-1 text-xs font-bold">
                                        •
                                    </span>
                                )}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-6" align="start">
                            <div className="space-y-4">
                                <h4 className="font-medium leading-none">Price Range (Daily)</h4>
                                <Slider
                                    defaultValue={[0, maxPrice]}
                                    value={[priceRange[0], priceRange[1]]}
                                    max={maxPrice}
                                    step={50}
                                    min={0}
                                    onValueChange={(val) => onPriceChange(val as [number, number])}
                                />
                                <div className="flex items-center justify-between">
                                    <span className="rounded border px-2 py-1 text-sm bg-gray-50">₹{priceRange[0]}</span>
                                    <span className="text-xs text-muted-foreground">to</span>
                                    <span className="rounded border px-2 py-1 text-sm bg-gray-50">₹{priceRange[1]}</span>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />

                    {/* Active Filters as Chips can also go here or active count? */}
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-auto sm:ml-0">
                        {filteredCount} results
                    </span>

                    {/* Sort - Pushed to right */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 hover:bg-gray-100 rounded-full px-3 ml-auto flex-shrink-0">
                                <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                Sort
                                <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem onClick={() => onSortChange("featured")}>
                                Featured
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange("price_asc")}>
                                Price: Low to High
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange("price_desc")}>
                                Price: High to Low
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

interface FilterChipsProps {
    activeCategory: string
    selectedBrands: string[]
    priceRange: [number, number]
    maxPrice: number
    onRemoveBrand: (brand: string) => void
    onResetPrice: () => void
    onResetCategory: () => void
    onClearAll: () => void
}

function FilterChips({
    activeCategory,
    selectedBrands,
    priceRange,
    maxPrice,
    onRemoveBrand,
    onResetPrice,
    onResetCategory,
    onClearAll
}: FilterChipsProps) {
    const hasCategoryFilter = activeCategory !== "all"
    const hasPriceFilter = priceRange[0] > 0 || priceRange[1] < maxPrice
    const hasFilters = hasCategoryFilter || selectedBrands.length > 0 || hasPriceFilter

    if (!hasFilters) return null

    return (
        <div className="container py-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 mr-2 uppercase tracking-wide">Active Filters:</span>

                {hasCategoryFilter && (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                        Category: {activeCategory}
                        <button onClick={onResetCategory} className="ml-2 hover:bg-amber-200 rounded-full p-0.5">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                )}

                {selectedBrands.map(brand => (
                    <span key={brand} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm">
                        {brand}
                        <button onClick={() => onRemoveBrand(brand)} className="ml-2 hover:bg-gray-100 rounded-full p-0.5">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}

                {hasPriceFilter && (
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm">
                        Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                        <button onClick={onResetPrice} className="ml-2 hover:bg-gray-100 rounded-full p-0.5">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearAll}
                    className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
                >
                    Clear All
                </Button>
            </div>
        </div>
    )
}


// --- Main Container ---

interface ProductBrowserProps {
    initialProducts: Product[]
    categories: Category[]
}

function ProductBrowserContent({ initialProducts, categories }: ProductBrowserProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // --- State ---
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)

    const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all")
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        searchParams.get("brands")?.split(",") || []
    )
    const [sortOption, setSortOption] = useState("featured")

    // Calculate global max price for slider initialization
    const globalMaxPrice = useMemo(() => {
        if (initialProducts.length === 0) return 10000; // default fallback
        return Math.max(...initialProducts.map(p => p.price))
    }, [initialProducts])

    // Price range state
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get("minPrice")) || 0,
        Number(searchParams.get("maxPrice")) || globalMaxPrice
    ])

    // --- Filtering & Sorting Logic ---
    const categoryScopedBrands = useMemo(() => {
        let products = initialProducts
        if (activeCategory !== "all") {
            products = products.filter(p => p.category?.slug === activeCategory)
        }
        const brands = new Set<string>()
        products.forEach(p => p.brand && brands.add(p.brand))
        return Array.from(brands).sort()
    }, [initialProducts, activeCategory])

    const filteredProducts = useMemo(() => {
        let result = initialProducts.filter((product) => {
            // 1. Category Filter
            if (activeCategory !== "all") {
                if (product.category?.slug !== activeCategory) return false
            }

            // 2. Brand Filter
            if (selectedBrands.length > 0) {
                if (!selectedBrands.includes(product.brand)) return false
            }

            // 3. Price Filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false
            }

            return true
        })

        // Sort Logic
        if (sortOption === "price_asc") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortOption === "price_desc") {
            result.sort((a, b) => b.price - a.price)
        } else if (sortOption === "featured") {
            // "Mixture of DSLR cams" - Prioritize Cameras, then Lenses, then others
            result.sort((a, b) => {
                const getScore = (p: Product) => {
                    const name = p.name.toLowerCase()
                    const cat = p.category?.name.toLowerCase() || ""

                    // Tier 1: Core Cameras (DSLR, Mirrorless, Cinema)
                    if (
                        cat.includes("camera") ||
                        cat.includes("dslr") ||
                        cat.includes("mirrorless") ||
                        cat.includes("cinema")
                    ) return 100

                    // Tier 2: Action Cameras
                    if (
                        cat.includes("gopro") ||
                        cat.includes("insta360") ||
                        cat.includes("action")
                    ) return 90

                    // Tier 3: Lenses
                    if (cat.includes("lens") || name.includes("lens")) return 80

                    // Tier 4: Drones/Gimbals
                    if (cat.includes("drone") || cat.includes("gimbal")) return 60

                    return 0 // Accessories, Audio, etc.
                }
                return getScore(b) - getScore(a)
            })
        }

        return result
    }, [initialProducts, activeCategory, selectedBrands, priceRange, sortOption])


    // --- Handlers ---

    const handleCategoryChange = (slug: string) => {
        setActiveCategory(slug)
        setIsCategorySheetOpen(false) // Close sheet
        updateUrl({ category: slug === "all" ? null : slug })
    }

    const handleBrandChange = (brand: string) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand]

        setSelectedBrands(newBrands)
        updateUrl({ brands: newBrands.length > 0 ? newBrands.join(",") : null })
    }

    const handlePriceChange = (val: [number, number]) => {
        setPriceRange(val)
        updateUrl({
            minPrice: val[0] > 0 ? val[0] : null,
            maxPrice: val[1] < globalMaxPrice ? val[1] : null
        })
    }

    const handleSortChange = (sort: string) => {
        setSortOption(sort)
    }

    const handleClearAll = () => {
        setActiveCategory("all")
        setSelectedBrands([])
        setPriceRange([0, globalMaxPrice])
        router.push("/rental-equipment", { scroll: false })
    }

    const updateUrl = (updates: Record<string, any>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })
        router.push(`/rental-equipment?${params.toString()}`, { scroll: false })
    }

    // Bottom Nav Handlers
    const handleMobileHomeClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleMobileCartClick = () => {
        window.open(`https://wa.me/919972122462?text=I'm interested in renting equipment`, '_blank')
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20"> {/* pb-20 for bottom nav space */}
            {/* 1. Category Pill Grid (Hidden on Mobile, shown in sheet) */}
            <div className="hidden md:block">
                <CategoryPillGrid
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={handleCategoryChange}
                />
            </div>

            {/* 2. Inline Filter Bar (Sticky) */}
            <InlineFilterBar
                availableBrands={categoryScopedBrands}
                selectedBrands={selectedBrands}
                priceRange={priceRange}
                maxPrice={globalMaxPrice}
                sortOption={sortOption}
                onBrandChange={handleBrandChange}
                onPriceChange={handlePriceChange}
                onSortChange={handleSortChange}
                filteredCount={filteredProducts.length}
            />

            {/* 3. Active Filter Chips */}
            <FilterChips
                activeCategory={activeCategory}
                selectedBrands={selectedBrands}
                priceRange={priceRange}
                maxPrice={globalMaxPrice}
                onRemoveBrand={(b) => handleBrandChange(b)}
                onResetPrice={() => handlePriceChange([0, globalMaxPrice])}
                onResetCategory={() => handleCategoryChange("all")}
                onClearAll={handleClearAll}
            />

            {/* Mobile Bottom Navigation */}
            <ProductMobileNav
                onHomeClick={handleMobileHomeClick}
                onCategoriesClick={() => setIsCategorySheetOpen(true)}
                onFiltersClick={() => setIsMobileFiltersOpen(true)}
                onCartClick={handleMobileCartClick}
                filterCount={(selectedBrands.length > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < globalMaxPrice ? 1 : 0)}
            />

            {/* Category Sheet (Mobile) */}
            <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
                <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl px-4">
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-left">Select Category</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto pb-safe h-full">
                        <div className="flex flex-wrap gap-3 pb-20">
                            <button
                                onClick={() => handleCategoryChange("all")}
                                className={cn(
                                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border w-full text-left flex items-center gap-3",
                                    activeCategory === "all"
                                        ? "bg-amber-50 border-amber-400 text-amber-900"
                                        : "bg-white border-gray-100 text-gray-700"
                                )}
                            >
                                <span className={cn("w-3 h-3 rounded-full", activeCategory === "all" ? "bg-amber-500" : "bg-gray-300")} />
                                All Products
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.slug)}
                                    className={cn(
                                        "px-2 py-2 rounded-xl text-sm font-medium transition-all duration-200 border flex flex-col items-center justify-center gap-2 aspect-square w-[calc(33.33%-0.5rem)]",
                                        activeCategory === category.slug
                                            ? "bg-amber-50 border-amber-400 text-black shadow-sm"
                                            : "bg-gray-50 border-gray-100 text-gray-600"
                                    )}
                                >
                                    {category.image ? (
                                        <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200 shrink-0">
                                            <Image src={category.image} alt="" fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                                    )}
                                    <span className="text-center text-xs leading-tight line-clamp-2">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Filter Sheet (Mobile) */}
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                    <SheetHeader>
                        <SheetTitle className="text-left">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 overflow-y-auto h-full pb-20 space-y-8">
                        {/* Mobile Price */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Price Range</h4>
                            <Slider
                                defaultValue={[0, globalMaxPrice]}
                                value={[priceRange[0], priceRange[1]]}
                                max={globalMaxPrice}
                                step={50}
                                min={0}
                                onValueChange={(val) => handlePriceChange(val as [number, number])}
                            />
                            <div className="flex justify-between text-sm">
                                <span>₹{priceRange[0]}</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>

                        {/* Mobile Brands */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Brands</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {categoryScopedBrands.map((brand) => (
                                    <div key={brand} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`mobile-brand-${brand}`}
                                            checked={selectedBrands.includes(brand)}
                                            onCheckedChange={() => handleBrandChange(brand)}
                                        />
                                        <label htmlFor={`mobile-brand-${brand}`} className="text-sm">{brand}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Sort */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Sort By</h4>
                            <div className="flex flex-wrap gap-2">
                                {[{ l: 'Featured', v: 'featured' }, { l: 'Price: Low to High', v: 'price_asc' }, { l: 'Price: High to Low', v: 'price_desc' }].map((opt) => (
                                    <button
                                        key={opt.v}
                                        onClick={() => handleSortChange(opt.v)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm border",
                                            sortOption === opt.v ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"
                                        )}
                                    >
                                        {opt.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button onClick={() => setIsMobileFiltersOpen(false)} className="w-full bg-black text-white h-12 text-base">
                                Show {filteredProducts.length} Results
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* 4. Product Grid */}
            <div className="container py-8 flex-1">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed">
                        <Filter className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No products match</h3>
                        <p className="text-gray-500 mt-2 text-center max-w-md px-4">
                            Try removing some filters to see more results.
                        </p>
                        <Button
                            onClick={handleClearAll}
                            variant="link"
                            className="mt-4 text-amber-600 font-bold"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductListingCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export function ProductBrowser(props: ProductBrowserProps) {
    return (
        <Suspense fallback={<div className="h-screen bg-gray-50 animate-pulse" />}>
            <ProductBrowserContent {...props} />
        </Suspense>
    )
}
