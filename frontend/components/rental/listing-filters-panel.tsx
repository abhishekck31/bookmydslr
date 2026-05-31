"use client"

import { Category } from "@/types"
import { cn } from "@/lib/utils"
import { RotateCcw } from "lucide-react"
import { FilterState } from "./smart-filter-drawer"

interface ListingFiltersPanelProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
  categoryCounts: Record<string, number>
  totalCount: number
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableBrands: string[]
  maxPrice: number
  onClearAll: () => void
  className?: string
}

export function ListingFiltersPanel({
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  filters,
  onFiltersChange,
  availableBrands,
  maxPrice,
  onClearAll,
  className,
}: ListingFiltersPanelProps) {
  const toggleBrand = (brand: string) => {
    onFiltersChange({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    })
  }

  const toggleAvailability = () => {
    const has = filters.availability.includes("Available Today")
    onFiltersChange({
      ...filters,
      availability: has ? [] : ["Available Today"],
    })
  }

  const hasActiveFilters =
    activeCategory !== null ||
    filters.brands.length > 0 ||
    filters.availability.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Category
        </h3>
        <ul className="space-y-0.5">
          <li>
            <button
              type="button"
              onClick={() => onCategoryChange(null)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                activeCategory === null
                  ? "bg-amber-50 font-semibold text-amber-800 ring-1 ring-amber-200/80"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span>All Equipment</span>
              <span className="text-xs text-slate-400">{totalCount}</span>
            </button>
          </li>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug
            const count = categoryCounts[cat.slug] ?? 0
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onCategoryChange(isActive ? null : cat.slug)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-amber-50 font-semibold text-amber-800 ring-1 ring-amber-200/80"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className="line-clamp-1 pr-2">{cat.name}</span>
                  <span className="shrink-0 text-xs text-slate-400">{count}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="h-px bg-slate-100" />

      {/* Brands */}
      {availableBrands.length > 0 && (
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Brand
          </h3>
          <ul className="max-h-48 space-y-1 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const checked = filters.brands.includes(brand)
              return (
                <li key={brand}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400/30"
                    />
                    <span className="text-sm text-slate-700">{brand}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <div className="h-px bg-slate-100" />

      {/* Price */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Price / day (₹)
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={100}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full accent-amber-500"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>₹{filters.priceRange[0].toLocaleString("en-IN")}</span>
            <span className="font-semibold text-slate-700">
              up to ₹{filters.priceRange[1].toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </section>

      <div className="h-px bg-slate-100" />

      {/* Availability */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Availability
        </h3>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
          <input
            type="checkbox"
            checked={filters.availability.includes("Available Today")}
            onChange={toggleAvailability}
            className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400/30"
          />
          <span className="text-sm text-slate-700">Available today</span>
        </label>
      </section>
    </div>
  )
}
