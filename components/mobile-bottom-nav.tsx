"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Grid3x3, Search, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    href: string
    icon: React.ComponentType<any>
    label: string
    onClick?: () => void
}

export function MobileBottomNav() {
    const pathname = usePathname()
    const [showSearchModal, setShowSearchModal] = useState(false)

    const navItems: NavItem[] = [
        {
            name: "home",
            href: "/",
            icon: Home,
            label: "Home"
        },
        {
            name: "categories",
            href: "/rental-equipment",
            icon: Grid3x3,
            label: "Categories"
        },
        {
            name: "search",
            href: "#",
            icon: Search,
            label: "Search",
            onClick: () => {
                // Trigger search functionality
                const searchInput = document.getElementById('plp-search-input') as HTMLInputElement
                if (searchInput) {
                    searchInput.focus()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                    setShowSearchModal(true)
                }
            }
        },
        {
            name: "cart",
            href: "/cart",
            icon: ShoppingCart,
            label: "Cart"
        },
        {
            name: "account",
            href: "/account",
            icon: User,
            label: "Account"
        }
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg safe-area-pb">
            <div className="flex items-center justify-around py-2 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && item.href !== "#" && pathname?.startsWith(item.href))

                    if (item.onClick) {
                        // Render as button
                        return (
                            <button
                                key={item.name}
                                onClick={(e) => {
                                    e.preventDefault()
                                    item.onClick?.()
                                }}
                                type="button"
                                className={cn(
                                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative",
                                    isActive
                                        ? 'text-amber-600'
                                        : 'text-gray-500 active:text-gray-700'
                                )}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-500 rounded-full"
                                        initial={false}
                                        animate={true}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}

                                <item.icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </button>
                        )
                    }

                    // Render as Link
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative",
                                isActive
                                    ? 'text-amber-600'
                                    : 'text-gray-500 active:text-gray-700'
                            )}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-500 rounded-full"
                                    initial={false}
                                    animate={true}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            <item.icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
