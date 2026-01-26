"use client"

import { useState, useRef, useEffect } from "react"
import { Category } from "@/types"
import { cn } from "@/lib/utils"
import {
    Camera,
    Focus,
    Clapperboard,
    Mic,
    Lightbulb,
    Video,
    Battery,
    Zap,
    Settings,
    ChevronDown,
    Check
} from "lucide-react"

interface PremiumCategoryNavProps {
    categories: Category[]
    activeCategory: string | null
    onSelectCategory: (slug: string | null) => void
}

// Icon mapping
const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase()
    if (lower.includes("dslr") || lower.includes("mirrorless")) return Camera
    if (lower.includes("lens")) return Focus
    if (lower.includes("gimbal")) return Clapperboard
    if (lower.includes("audio") || lower.includes("mic")) return Mic
    if (lower.includes("light")) return Lightbulb
    if (lower.includes("action") || lower.includes("gopro") || lower.includes("drone")) return Video
    if (lower.includes("battery")) return Battery
    if (lower.includes("flash")) return Zap
    return Settings
}

export function PremiumCategoryNav({ categories, activeCategory, onSelectCategory }: PremiumCategoryNavProps) {
    const [showMore, setShowMore] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [showLeftGradient, setShowLeftGradient] = useState(false)
    const [showRightGradient, setShowRightGradient] = useState(false)

    const DESKTOP_VISIBLE_LIMIT = 8
    const hasOverflow = categories.length > DESKTOP_VISIBLE_LIMIT
    const visibleCategories = hasOverflow ? categories.slice(0, DESKTOP_VISIBLE_LIMIT) : categories
    const moreCategories = hasOverflow ? categories.slice(DESKTOP_VISIBLE_LIMIT) : []

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const updateGradients = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container
            setShowLeftGradient(scrollLeft > 10)
            setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10)
        }

        updateGradients()
        container.addEventListener('scroll', updateGradients)
        window.addEventListener('resize', updateGradients)

        return () => {
            container.removeEventListener('scroll', updateGradients)
            window.removeEventListener('resize', updateGradients)
        }
    }, [categories])

    const CategoryButton = ({ category }: { category: Category }) => {
        const Icon = getCategoryIcon(category.name)
        const isActive = activeCategory === category.slug

        return (
            <button
                onClick={() => onSelectCategory(isActive ? null : category.slug)}
                className={cn(
                    "flex flex-col items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border-2 transition-all duration-200 min-w-[72px] shrink-0 relative",
                    isActive
                        ? "border-amber-400 bg-amber-50 text-amber-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                )}
            >
                <Icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-amber-500" : "text-gray-500"
                )} />
                <span className={cn(
                    "text-[10px] text-center leading-tight max-w-full px-0.5",
                    isActive ? "font-bold" : "font-medium"
                )}>
                    {category.name}
                </span>
                {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-400" />
                )}
            </button>
        )
    }

    return (
        <div className="w-full max-w-[1320px] mx-auto">
            {/* Desktop */}
            <div className="hidden md:block px-4">
                <div className="flex gap-1.5 py-2 items-center">
                    {visibleCategories.map((category) => (
                        <CategoryButton key={category.id} category={category} />
                    ))}

                    {hasOverflow && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="flex flex-col items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all min-w-[72px]"
                            >
                                <Settings className="h-4 w-4 text-gray-500" />
                                <div className="flex items-center gap-0.5">
                                    <span className="text-[10px] font-medium">More</span>
                                    <span className="text-[9px] text-gray-400">({moreCategories.length})</span>
                                    <ChevronDown className={cn(
                                        "h-2.5 w-2.5 transition-transform",
                                        showMore && "rotate-180"
                                    )} />
                                </div>
                            </button>

                            {showMore && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)} />
                                    <div className="absolute top-full right-0 mt-2 w-[380px] bg-white border border-gray-200 rounded-xl shadow-2xl z-50">
                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xs font-bold text-gray-900">More Categories</h3>
                                                <button onClick={() => setShowMore(false)} className="text-[10px] text-gray-500 hover:text-gray-700">
                                                    Close
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-1.5 max-h-[280px] overflow-y-auto">
                                                {moreCategories.map((category) => {
                                                    const Icon = getCategoryIcon(category.name)
                                                    const isActive = activeCategory === category.slug

                                                    return (
                                                        <button
                                                            key={category.id}
                                                            onClick={() => {
                                                                onSelectCategory(isActive ? null : category.slug)
                                                                setShowMore(false)
                                                            }}
                                                            className={cn(
                                                                "flex items-center gap-2 px-2.5 py-2 rounded-lg border-2 transition-all text-left",
                                                                isActive
                                                                    ? "border-amber-400 bg-amber-50 text-amber-600"
                                                                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            <Icon className={cn(
                                                                "h-3.5 w-3.5 shrink-0",
                                                                isActive ? "text-amber-500" : "text-gray-500"
                                                            )} />
                                                            <span className={cn(
                                                                "text-[11px] line-clamp-2 flex-1",
                                                                isActive ? "font-bold" : "font-medium"
                                                            )}>
                                                                {category.name}
                                                            </span>
                                                            {isActive && <Check className="h-3 w-3 text-amber-500 shrink-0" />}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden relative">
                {showLeftGradient && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                )}
                {showRightGradient && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                )}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {categories.map((category) => (
                        <div key={category.id} className="snap-start">
                            <CategoryButton category={category} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    )
}
