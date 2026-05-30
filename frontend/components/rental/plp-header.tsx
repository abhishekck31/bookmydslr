"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Product, Category } from "@/types"

interface PLPHeaderProps {
    cartItemCount?: number
}

interface SearchSuggestion {
    type: 'product' | 'category' | 'brand'
    name: string
    slug?: string
    id?: string
}

export function PLPHeader({ cartItemCount = 0 }: PLPHeaderProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
    const router = useRouter()

    // Keyboard shortcut for search (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                document.getElementById('plp-search-input')?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Fetch search suggestions (mock for now - replace with API call)
    useEffect(() => {
        if (searchQuery.length > 1) {
            // Mock suggestions - replace with actual API call
            const mockSuggestions: SearchSuggestion[] = [
                { type: 'product', name: 'Canon EOS R5', id: '1' },
                { type: 'category', name: 'DSLR Cameras', slug: 'dslr-cameras' },
                { type: 'brand', name: 'Canon' },
            ]
            setSuggestions(mockSuggestions.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setSuggestions([])
        }
    }, [searchQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
            setIsSearchFocused(false)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="w-full max-w-[1320px] mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 md:h-10 md:w-10">
                                <Image
                                    src="/logo.png"
                                    alt="Book My DSLR"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="hidden md:block text-lg font-bold text-gray-900">
                                Book My DSLR
                            </span>
                        </div>
                    </Link>

                    {/* Search Bar - Dominant Central Element */}
                    <form
                        onSubmit={handleSearch}
                        className="relative flex-1 max-w-2xl"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            <input
                                id="plp-search-input"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                placeholder="Search camera, lens, gimbal, brand…"
                                className="w-full h-10 md:h-12 pl-10 md:pl-12 pr-4 rounded-full border-2 border-gray-200 bg-gray-50/50 text-sm md:text-base text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                            />

                            {/* Keyboard Shortcut Hint */}
                            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 text-xs text-gray-400">
                                <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono">⌘K</kbd>
                            </div>
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {isSearchFocused && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                                {suggestions.map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            if (suggestion.type === 'product' && suggestion.id) {
                                                router.push(`/product/${suggestion.id}`)
                                            } else if (suggestion.type === 'category' && suggestion.slug) {
                                                router.push(`/rental-equipment/${suggestion.slug}`)
                                            } else {
                                                setSearchQuery(suggestion.name)
                                            }
                                            setIsSearchFocused(false)
                                        }}
                                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-50 transition-colors text-left"
                                    >
                                        <div className="flex-shrink-0">
                                            {suggestion.type === 'product' && <Search className="h-4 w-4 text-gray-400" />}
                                            {suggestion.type === 'category' && <Search className="h-4 w-4 text-amber-500" />}
                                            {suggestion.type === 'brand' && <Search className="h-4 w-4 text-blue-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className="relative flex-shrink-0 group"
                    >
                        <div className="relative p-2 md:p-2.5 rounded-full border-2 border-gray-200 bg-white transition-all duration-200 hover:border-amber-400 hover:bg-amber-50">
                            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
                                    {cartItemCount > 9 ? '9+' : cartItemCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
