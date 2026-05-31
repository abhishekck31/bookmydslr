"use client"

import { useState, useEffect } from "react"
import { X, SlidersHorizontal, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

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
  onApply: (filters: FilterState) => void
  availableBrands?: string[]
  resultCount?: number
  maxPrice?: number
  initialFilters?: FilterState
}

const CAMERA_TYPES = ["DSLR", "Mirrorless", "Action Camera", "Cinema Camera"]
const MOUNTS = ["EF", "RF", "E-Mount", "Z-Mount", "MFT", "L-Mount"]
const AVAILABILITY_OPTIONS = ["Available Today"]

export function SmartFilterDrawer({
  isOpen,
  onClose,
  onApply,
  availableBrands = [],
  resultCount = 0,
  maxPrice = 10000,
  initialFilters,
}: SmartFilterDrawerProps) {
  const defaultFilters: FilterState = {
    brands: [],
    priceRange: [0, maxPrice],
    cameraTypes: [],
    mounts: [],
    availability: [],
  }

  const [filters, setFilters] = useState<FilterState>(initialFilters ?? defaultFilters)
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange ?? [0, maxPrice]
  )

  useEffect(() => {
    if (isOpen && initialFilters) {
      setFilters(initialFilters)
      setLocalPriceRange(initialFilters.priceRange)
    }
  }, [isOpen, initialFilters])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }))
  }

  const clearAllFilters = () => {
    setFilters(defaultFilters)
    setLocalPriceRange([0, maxPrice])
  }

  const handleApply = () => {
    onApply({ ...filters, priceRange: localPriceRange })
    onClose()
  }

  const activeFilterCount =
    filters.brands.length +
    filters.cameraTypes.length +
    filters.mounts.length +
    filters.availability.length +
    (localPriceRange[0] > 0 || localPriceRange[1] < maxPrice ? 1 : 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className={cn(
              "fixed z-50 flex flex-col bg-white shadow-2xl",
              "bottom-0 left-0 right-0 max-h-[88vh] rounded-t-3xl",
              "md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-full md:w-[420px] md:rounded-none md:rounded-l-3xl"
            )}
          >
            <div className="shrink-0 border-b border-slate-100 px-6 py-5">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
                    <SlidersHorizontal className="h-4 w-4 text-amber-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Brand
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableBrands.map((brand) => {
                    const selected = filters.brands.includes(brand)
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleArrayFilter("brands", brand)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-all",
                          selected
                            ? "bg-amber-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                        )}
                      >
                        {brand}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price per day (₹)
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={maxPrice}
                    value={localPriceRange[0]}
                    onChange={(e) =>
                      setLocalPriceRange([Number(e.target.value), localPriceRange[1]])
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                  <span className="text-slate-400">—</span>
                  <input
                    type="number"
                    min={0}
                    max={maxPrice}
                    value={localPriceRange[1]}
                    onChange={(e) =>
                      setLocalPriceRange([localPriceRange[0], Number(e.target.value)])
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={localPriceRange[1]}
                  onChange={(e) =>
                    setLocalPriceRange([localPriceRange[0], Number(e.target.value)])
                  }
                  className="mt-4 w-full accent-amber-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Up to ₹{localPriceRange[1].toLocaleString("en-IN")} / day
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Camera type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CAMERA_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleArrayFilter("cameraTypes", type)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        filters.cameraTypes.includes(type)
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-amber-50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mount
                </h3>
                <div className="flex flex-wrap gap-2">
                  {MOUNTS.map((mount) => (
                    <button
                      key={mount}
                      type="button"
                      onClick={() => toggleArrayFilter("mounts", mount)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        filters.mounts.includes(mount)
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-amber-50"
                      )}
                    >
                      {mount}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Availability
                </h3>
                <div className="space-y-2">
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 hover:bg-slate-50"
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all",
                          filters.availability.includes(option)
                            ? "border-amber-500 bg-amber-500"
                            : "border-slate-300"
                        )}
                      >
                        {filters.availability.includes(option) && (
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={filters.availability.includes(option)}
                        onChange={() => toggleArrayFilter("availability", option)}
                      />
                      <span className="text-sm font-medium text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 p-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleApply}
                className="w-full rounded-full bg-amber-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-600"
              >
                Show {resultCount} {resultCount === 1 ? "item" : "items"}
              </motion.button>
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
      className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-amber-300"
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
