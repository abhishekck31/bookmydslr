"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const mainRoutes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/rental-equipment" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Terms & Conditions", path: "/terms", shortName: "Terms" },
]

function isActiveRoute(pathname: string, path: string) {
  if (path === "/") return pathname === "/"
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { showCartGlow } = useCartGlow()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 md:pt-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "container-premium mx-auto flex items-center justify-between gap-3 rounded-full border border-slate-200/80 bg-white/85 px-3 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 sm:px-4",
            isScrolled && "border-slate-200 bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-transform hover:scale-[1.02]"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-50 ring-1 ring-slate-200/80">
              <Image src="/images/logo.png" alt="Book My DSLR" fill className="object-contain p-0.5" />
            </div>
            <span className="hidden text-sm font-bold text-slate-900 sm:inline lg:text-base">
              Book My{" "}
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                DSLR
              </span>
            </span>
          </Link>

          {/* Desktop capsule nav */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-slate-100/90 p-1 no-scrollbar">
              {mainRoutes.map((route) => {
                const active = isActiveRoute(pathname, route.path)
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors xl:px-3.5 xl:text-sm",
                      active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200/60"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 hidden xl:inline">{route.name}</span>
                    <span className="relative z-10 xl:hidden">
                      {"shortName" in route && route.shortName ? route.shortName : route.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link href="/cart" className="relative hidden sm:block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-600",
                  showCartGlow && "animate-pulse bg-amber-50 text-amber-600 shadow-lg shadow-amber-500/30"
                )}
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                <span className="sr-only">Cart</span>
                {itemCount > 0 && (
                  <Badge className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-amber-500 p-0 text-[10px] font-bold text-white">
                    {itemCount}
                  </Badge>
                )}
              </motion.span>
            </Link>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-3 right-3 top-[4.5rem] z-50 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col gap-1 p-3">
                {mainRoutes.map((route, index) => {
                  const active = isActiveRoute(pathname, route.path)
                  return (
                    <motion.div
                      key={route.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={route.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        {route.name}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mainRoutes.length * 0.04, duration: 0.25 }}
                  className="mt-1 border-t border-slate-100 pt-2"
                >
                  <Link
                    href="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      View Cart
                    </span>
                    {itemCount > 0 && (
                      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed floating navbar */}
      <div className="h-[4.25rem] sm:h-[4.75rem] md:h-20" aria-hidden />
    </>
  )
}
