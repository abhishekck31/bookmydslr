"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function MobileTopBar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-100/50 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center"
                    >
                        <span className="text-white font-bold text-sm">B</span>
                    </motion.div>
                    <span className="text-lg font-bold text-gray-900">BookMyDSLR</span>
                </Link>

                {/* T&C Link */}
                <Link 
                    href="/terms" 
                    className="text-xs text-gray-500 hover:text-amber-600 transition-colors font-medium"
                >
                    T&C
                </Link>
            </div>
        </header>
    )
}
