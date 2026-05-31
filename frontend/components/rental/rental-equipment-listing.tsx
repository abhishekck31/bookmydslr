"use client"

import { useState, useMemo, useEffect } from "react"
import { Product, Category } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
} from "lucide-react"
import { SmartFilterDrawer } from "./smart-filter-drawer"
import { ListingFiltersPanel } from "./listing-filters-panel"
import { EquipmentProductCard } from "./equipment-product-card"
import type { FilterState } from "./smart-filter-drawer"

interface RentalEquipmentListingProps {
  initialProducts: Product[]
  categories: Category[]
}

type SortOption = "recommended" | "price-asc" | "price-desc" | "name-az"

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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    initialProducts.forEach((p) => {
      const slug = p.category?.slug
      if (slug) counts[slug] = (counts[slug] ?? 0) + 1
    })
    return counts
  }, [initialProducts])

  const activeCategoryName =
    activeCategory ? categories.find((c) => c.slug === activeCategory)?.name : null

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

  const filterPanelProps = {
    categories,
    activeCategory,
    onCategoryChange: setActiveCategory,
    categoryCounts,
    totalCount: initialProducts.length,
    filters,
    onFiltersChange: setFilters,
    availableBrands,
    maxPrice,
    onClearAll: clearAll,
  }

  return (
    <div className="min-h-screen bg-[#f0f1f8]">
      {/* Hero */}
      <section className="border-b border-slate-200/60 bg-white">
        <div className="container-premium py-8 md:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60">
                <Sparkles className="h-3.5 w-3.5" />
                Premium rental inventory
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {activeCategoryName ?? "Rental Equipment"}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
                Browse cameras, lenses, audio, lighting, and filmmaking gear in Bangalore.
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

      <div className="container-premium py-6 md:py-8">
        {/* Search + sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cameras, lenses, brands…"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm text-slate-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-amber-400 sm:w-auto"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Sidebar + products */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <ListingFiltersPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Product area */}
          <div className="min-w-0 flex-1">
            <p className="mb-4 text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"
                >
                  <Search className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                  <h3 className="text-lg font-bold text-slate-900">No equipment found</h3>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search.</p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-5 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
                  >
                    Reset filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${activeCategory}-${debouncedSearch}-${sortBy}`}
                  layout
                  className="grid grid-cols-2 gap-4 pb-8 md:gap-5 xl:grid-cols-3"
                >
                  {filteredProducts.map((product, index) => (
                    <EquipmentProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <SmartFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onApply={() => setIsFilterDrawerOpen(false)}
        availableBrands={availableBrands}
        resultCount={filteredProducts.length}
        maxPrice={maxPrice}
        initialFilters={filters}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categoryCounts={categoryCounts}
        totalCount={initialProducts.length}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAll}
      />
    </div>
  )
}
