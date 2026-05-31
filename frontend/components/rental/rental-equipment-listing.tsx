"use client"

import { useState, useMemo, useEffect } from "react"
import { Product, Category } from "@/types"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import { SmartFilterDrawer } from "./smart-filter-drawer"
import { PremiumCategoryNav } from "./premium-category-nav"
import { EquipmentProductCard } from "./equipment-product-card"

interface RentalEquipmentListingProps {
  initialProducts: Product[]
  categories: Category[]
}

type SortOption = "recommended" | "price-asc" | "price-desc" | "name-az"

interface FilterState {
  brands: string[]
  priceRange: [number, number]
  cameraTypes: string[]
  mounts: string[]
  availability: string[]
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A–Z" },
]

export function RentalEquipmentListing({
  initialProducts,
  categories,
}: RentalEquipmentListingProps) {
  const maxPrice = useMemo(
    () => Math.max(...initialProducts.map((p) => p.price), 5000),
    [initialProducts]
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, maxPrice],
    cameraTypes: [],
    mounts: [],
    availability: [],
  })

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], Math.max(prev.priceRange[1], maxPrice)],
    }))
  }, [maxPrice])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 250)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category?.name.toLowerCase().includes(query)
      )
    }

    if (activeCategory) {
      result = result.filter((p) => p.category?.slug === activeCategory)
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand))
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    if (filters.availability.includes("Available Today")) {
      result = result.filter((p) => p.isAvailable)
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable))
        break
    }

    return result
  }, [initialProducts, debouncedSearch, activeCategory, filters, sortBy])

  const availableBrands = useMemo(() => {
    const brands = new Set<string>()
    initialProducts.forEach((p) => p.brand && brands.add(p.brand))
    return Array.from(brands).sort()
  }, [initialProducts])

  const activeFilterCount =
    filters.brands.length +
    filters.cameraTypes.length +
    filters.mounts.length +
    filters.availability.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0)

  const activeCategoryName =
    activeCategory
      ? categories.find((c) => c.slug === activeCategory)?.name
      : null

  const clearAll = () => {
    setSearchQuery("")
    setDebouncedSearch("")
    setActiveCategory(null)
    setSortBy("recommended")
    setFilters({
      brands: [],
      priceRange: [0, maxPrice],
      cameraTypes: [],
      mounts: [],
      availability: [],
    })
  }

  const removeBrandFilter = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brand),
    }))
  }

  return (
    <div className="min-h-screen bg-[#f0f1f8]">
      {/* Hero */}
      <section className="border-b border-slate-200/60 bg-white">
        <div className="container-premium py-8 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60">
                <Sparkles className="h-3.5 w-3.5" />
                Premium rental inventory
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {activeCategoryName ?? "Rental Equipment"}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
                Browse cameras, lenses, audio, lighting, and filmmaking gear. Pick your
                dates and rent with fast Bangalore delivery.
              </p>
            </div>
            <div className="flex gap-6 rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70">
              <div>
                <p className="text-2xl font-bold text-slate-900">{initialProducts.length}</p>
                <p className="text-xs text-slate-500">Total items</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-emerald-600">
                  {initialProducts.filter((p) => p.isAvailable).length}
                </p>
                <p className="text-xs text-slate-500">Available now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky toolbar */}
      <div className="sticky top-[4.25rem] z-30 border-b border-slate-200/60 bg-[#f0f1f8]/95 backdrop-blur-xl sm:top-[4.75rem] md:top-20">
        <div className="container-premium space-y-3 py-3 md:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cameras, lenses, brands…"
                className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-12 appearance-none rounded-full border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:border-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterDrawerOpen(true)}
                className="relative flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-700"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          <PremiumCategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Active filter chips */}
          {(activeFilterCount > 0 || debouncedSearch || activeCategory) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap items-center gap-2"
            >
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                  &ldquo;{debouncedSearch}&rdquo;
                  <button type="button" onClick={() => setSearchQuery("")} aria-label="Remove search">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeCategoryName && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
                  {activeCategoryName}
                  <button type="button" onClick={() => setActiveCategory(null)} aria-label="Clear category">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.brands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                >
                  {brand}
                  <button type="button" onClick={() => removeBrandFilter(brand)} aria-label={`Remove ${brand}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <RotateCcw className="h-3 w-3" />
                Clear all
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="container-premium py-6 md:py-10">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No equipment found</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                Try a different search term, category, or adjust your filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeCategory}-${debouncedSearch}-${sortBy}`}
              layout
              className="grid grid-cols-2 gap-4 pb-8 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredProducts.map((product, index) => (
                <EquipmentProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SmartFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onApply={setFilters}
        availableBrands={availableBrands}
        resultCount={filteredProducts.length}
        maxPrice={maxPrice}
        initialFilters={filters}
      />
    </div>
  )
}
