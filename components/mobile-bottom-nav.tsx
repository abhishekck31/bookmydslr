"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Package, Wrench, Phone } from "lucide-react"

interface NavItem {
    name: string
    href: string
    icon: React.ComponentType<any>
    label: string
}

const navItems: NavItem[] = [
    {
        name: "home",
        href: "/",
        icon: Home,
        label: "Home"
    },
    {
        name: "products",
        href: "/rental-equipment",
        icon: Package,
        label: "Products"
    },
    {
        name: "services",
        href: "/services",
        icon: Wrench,
        label: "Services"
    },
    {
        name: "contact",
        href: "/contact",
        icon: Phone,
        label: "Contact"
    }
]

export function MobileBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="flex items-center justify-around py-2 px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname?.startsWith(item.href))

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 relative ${isActive
                                    ? 'text-amber-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
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
