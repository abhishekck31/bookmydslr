"use client"

import { Home, Grid, SlidersHorizontal, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductMobileNavProps {
    onHomeClick: () => void
    onCategoriesClick: () => void
    onFiltersClick: () => void
    onCartClick: () => void
    filterCount: number
    cartCount?: number
}

export function ProductMobileNav({
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

                {/* Home */}
                <button
                    onClick={onHomeClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <Home className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>

                {/* Categories */}
                <button
                    onClick={onCategoriesClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <Grid className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Categories</span>
                </button>

                {/* Filters */}
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

                {/* Cart / WhatsApp */}
                <button
                    onClick={onCartClick}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 active:scale-95 transition-all"
                >
                    <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {/* 
                          Using a red dot or number if cart count provided. 
                          Mocking cart count if not passed or using prop.
                        */}
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
