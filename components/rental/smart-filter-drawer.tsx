"use client"

import { useState, useEffect } from "react"
import { X, SlidersHorizontal, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterState {
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
}

const CAMERA_TYPES = ["DSLR", "Mirrorless", "Action Camera", "Cinema Camera"]
const MOUNTS = ["EF", "RF", "E-Mount", "Z-Mount", "MFT", "L-Mount"]
const AVAILABILITY_OPTIONS = ["Available Today", "Available Tomorrow", "This Week"]

export function SmartFilterDrawer({
    isOpen,
    onClose,
    onApply,
    availableBrands = ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "DJI"],
    resultCount = 0,
}: SmartFilterDrawerProps) {
    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        priceRange: [0, 10000],
        cameraTypes: [],
        mounts: [],
        availability: [],
    })

    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([0, 10000])

    // Handle body scroll lock when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const toggleArrayFilter = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: (prev[key] as string[]).includes(value)
                ? (prev[key] as string[]).filter(v => v !== value)
                : [...(prev[key] as string[]), value]
        }))
    }

    const clearAllFilters = () => {
        setFilters({
            brands: [],
            priceRange: [0, 10000],
            cameraTypes: [],
            mounts: [],
            availability: [],
        })
        setLocalPriceRange([0, 10000])
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
        (localPriceRange[0] > 0 || localPriceRange[1] < 10000 ? 1 : 0)

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-out",
                    // Mobile: Bottom Sheet
                    "bottom-0 left-0 right-0 rounded-t-3xl max-h-[85vh]",
                    // Desktop: Right Sidebar
                    "md:top-0 md:right-0 md:bottom-0 md:left-auto md:rounded-none md:max-h-full md:w-[400px]"
                )}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="h-5 w-5 text-gray-700" />
                            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                            {activeFilterCount > 0 && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>

                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Filter Content - Scrollable */}
                <div className="overflow-y-auto max-h-[calc(85vh-180px)] md:max-h-[calc(100vh-180px)] px-6 py-4 space-y-6">

                    {/* Brand Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Brand
                        </h3>
                        <div className="space-y-2">
                            {availableBrands.map((brand) => (
                                <label
                                    key={brand}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                            filters.brands.includes(brand)
                                                ? "bg-amber-400 border-amber-400"
                                                : "border-gray-300 group-hover:border-amber-300"
                                        )}
                                    >
                                        {filters.brands.includes(brand) && (
                                            <Check className="h-3 w-3 text-black" strokeWidth={3} />
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={filters.brands.includes(brand)}
                                        onChange={() => toggleArrayFilter('brands', brand)}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Price per Day
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Min</label>
                                    <input
                                        type="number"
                                        value={localPriceRange[0]}
                                        onChange={(e) => setLocalPriceRange([Number(e.target.value), localPriceRange[1]])}
                                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none"
                                    />
                                </div>
                                <div className="text-gray-400 mt-5">—</div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Max</label>
                                    <input
                                        type="number"
                                        value={localPriceRange[1]}
                                        onChange={(e) => setLocalPriceRange([localPriceRange[0], Number(e.target.value)])}
                                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none"
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                step="100"
                                value={localPriceRange[1]}
                                onChange={(e) => setLocalPriceRange([localPriceRange[0], Number(e.target.value)])}
                                className="w-full accent-amber-400"
                            />
                        </div>
                    </div>

                    {/* Camera Type */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Camera Type
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {CAMERA_TYPES.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => toggleArrayFilter('cameraTypes', type)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        filters.cameraTypes.includes(type)
                                            ? "bg-amber-400 text-black"
                                            : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mount Type */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Mount Type
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {MOUNTS.map((mount) => (
                                <button
                                    key={mount}
                                    onClick={() => toggleArrayFilter('mounts', mount)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        filters.mounts.includes(mount)
                                            ? "bg-amber-400 text-black"
                                            : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                                    )}
                                >
                                    {mount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Availability
                        </h3>
                        <div className="space-y-2">
                            {AVAILABILITY_OPTIONS.map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                            filters.availability.includes(option)
                                                ? "bg-amber-400 border-amber-400"
                                                : "border-gray-300 group-hover:border-amber-300"
                                        )}
                                    >
                                        {filters.availability.includes(option) && (
                                            <Check className="h-3 w-3 text-black" strokeWidth={3} />
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={filters.availability.includes(option)}
                                        onChange={() => toggleArrayFilter('availability', option)}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer - Apply Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleApply}
                            className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-bold py-3.5 rounded-full transition-colors"
                        >
                            Apply Filters
                            {resultCount > 0 && (
                                <span className="ml-2 opacity-80">({resultCount} found)</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// Filter Trigger Button Component
interface FilterButtonProps {
    onClick: () => void
    activeCount?: number
}

export function FilterButton({ onClick, activeCount = 0 }: FilterButtonProps) {
    return (
        <button
            onClick={onClick}
            className="relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border-2 border-gray-200 rounded-full font-medium text-sm md:text-base text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all"
        >
            <SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" />
            <span>Filters</span>
            {activeCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
                    {activeCount}
                </span>
            )}
        </button>
    )
}
