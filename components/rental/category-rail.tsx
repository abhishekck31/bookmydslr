"use client"

import { useState } from "react"
import Link from "next/link"
import { Category } from "@/types"
import { cn } from "@/lib/utils"
import {
    Camera,
    Video,
    Focus,
    Zap,
    Battery,
    Mic,
    Lightbulb,
    Clapperboard,
    Settings,
    ChevronDown
} from "lucide-react"

interface CategoryRailProps {
    categories: Category[]
    activeSlug?: string
}

// Map category names to icons
const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase()

    if (lower.includes("dslr")) return Camera
    if (lower.includes("mirrorless")) return Camera
    if (lower.includes("lens")) return Focus
    if (lower.includes("gimbal")) return Clapperboard
    if (lower.includes("audio") || lower.includes("mic")) return Mic
    if (lower.includes("light")) return Lightbulb
    if (lower.includes("action") || lower.includes("gopro")) return Video
    if (lower.includes("drone")) return Video
    if (lower.includes("battery") || lower.includes("power")) return Battery
    if (lower.includes("flash")) return Zap

    return Settings // Default icon
}

export function CategoryRail({ categories, activeSlug }: CategoryRailProps) {
    const [showMoreDropdown, setShowMoreDropdown] = useState(false)

    // Max 8 categories visible (strict requirement)
    const MAX_VISIBLE = 8
    const visibleCategories = categories.slice(0, MAX_VISIBLE)
    const moreCategories = categories.slice(MAX_VISIBLE)
    const hasMore = moreCategories.length > 0

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="w-full max-w-[1320px] mx-auto px-4">
                {/* Horizontal rail - MAX 8 CATEGORIES */}
                <div className="relative -mb-px">
                    <div className="flex gap-1 md:gap-2 overflow-x-auto no-scrollbar pb-0.5">
                        {visibleCategories.map((category) => {
                            const Icon = getCategoryIcon(category.name)
                            const isActive = category.slug === activeSlug

                            return (
                                <Link
                                    key={category.id}
                                    href={`/rental-equipment/${category.slug}`}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1.5 py-3 px-4 md:px-6 min-w-[80px] md:min-w-[100px] border-b-2 transition-all duration-200 group relative",
                                        isActive
                                            ? "border-amber-400 text-amber-600 bg-amber-50/50"
                                            : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "h-5 w-5 md:h-6 md:w-6 transition-all duration-200",
                                            isActive
                                                ? "text-amber-500"
                                                : "text-gray-500 group-hover:text-gray-700 group-hover:scale-110"
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "text-xs md:text-sm font-medium text-center whitespace-nowrap transition-all duration-200",
                                            isActive
                                                ? "font-bold"
                                                : "group-hover:font-semibold"
                                        )}
                                    >
                                        {category.name}
                                    </span>
                                </Link>
                            )
                        })}

                        {/* "More" Dropdown for remaining categories */}
                        {hasMore && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                                    className="flex flex-col items-center justify-center gap-1.5 py-3 px-4 md:px-6 min-w-[80px] md:min-w-[100px] border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                                >
                                    <Settings className="h-5 w-5 md:h-6 md:w-6" />
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs md:text-sm font-medium">More</span>
                                        <ChevronDown className={cn(
                                            "h-3 w-3 transition-transform",
                                            showMoreDropdown && "rotate-180"
                                        )} />
                                    </div>
                                </button>

                                {/* Dropdown */}
                                {showMoreDropdown && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowMoreDropdown(false)}
                                        />
                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                            {moreCategories.map((category) => {
                                                const Icon = getCategoryIcon(category.name)
                                                const isActive = category.slug === activeSlug

                                                return (
                                                    <Link
                                                        key={category.id}
                                                        href={`/rental-equipment/${category.slug}`}
                                                        onClick={() => setShowMoreDropdown(false)}
                                                        className={cn(
                                                            "flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors",
                                                            isActive && "bg-amber-50 text-amber-600"
                                                        )}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{category.name}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
