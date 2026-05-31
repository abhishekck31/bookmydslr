"use client"

import { X, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Category } from "@/types"
import { ListingFiltersPanel } from "./listing-filters-panel"

export interface FilterState {
  brands: string[]
  priceRange: [number, number]
  cameraTypes: string[]
  mounts: string[]
  availability: string[]
}

interface SmartFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  availableBrands?: string[]
  resultCount?: number
  maxPrice?: number
  initialFilters?: FilterState
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
  categoryCounts: Record<string, number>
  totalCount: number
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearAll: () => void
}

export function SmartFilterDrawer({
  isOpen,
  onClose,
  onApply,
  resultCount = 0,
  maxPrice = 10000,
  availableBrands = [],
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  filters,
  onFiltersChange,
  onClearAll,
}: SmartFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className={cn(
              "fixed z-50 flex flex-col bg-white shadow-2xl lg:hidden",
              "inset-y-0 right-0 w-full max-w-sm"
            )}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-5 scrollbar-thin">
              <ListingFiltersPanel
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
                categoryCounts={categoryCounts}
                totalCount={totalCount}
                filters={filters}
                onFiltersChange={onFiltersChange}
                availableBrands={availableBrands}
                maxPrice={maxPrice}
                onClearAll={onClearAll}
              />
            </div>

            <div className="shrink-0 border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={onApply}
                className="w-full rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-white hover:bg-amber-600"
              >
                Show {resultCount} {resultCount === 1 ? "item" : "items"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function FilterButton({
  onClick,
  activeCount = 0,
}: {
  onClick: () => void
  activeCount?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-amber-300"
    >
      <SlidersHorizontal className="h-4 w-4" />
      Filters
      {activeCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
          {activeCount}
        </span>
      )}
    </button>
  )
}
