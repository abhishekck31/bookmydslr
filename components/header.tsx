"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Cameras", href: "/products?category=DSLR%20Camera" },
  { name: "Lenses", href: "/products?category=Camera%20Lens" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-gray-200/50 py-3 shadow-sm"
            : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-premium flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="z-50 relative group">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-black transition-colors">
              BookMy<span className="text-amber-500">DSLR</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-600 relative py-1",
                  pathname === link.href ? "text-gray-900" : "text-gray-500"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-amber-600 hover:bg-amber-50 hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative rounded-full text-gray-500 hover:text-amber-600 hover:bg-amber-50"
            >
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-amber-500 text-white text-[10px]">
                  0
                </Badge>
              </Link>
            </Button>

            <Button asChild size="sm" className="hidden lg:flex bg-gray-900 text-white rounded-full px-5 hover:bg-gray-800 shadow-sm">
              <Link href="/contact">Book Now</Link>
            </Button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden z-50 p-2 -mr-2 text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 flex flex-col"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-semibold text-gray-900 hover:text-amber-600 flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-10 space-y-4">
              <Button className="w-full h-12 text-lg bg-black text-white rounded-full">
                Book Now
              </Button>
              <p className="text-center text-sm text-gray-500">
                Need help? Call <a href="tel:+919972122462" className="text-amber-600 font-semibold">+91 99721 22462</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}