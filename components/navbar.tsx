"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { useCartGlow } from "@/components/cart-glow-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { WHATSAPP_NUMBER } from "@/config/constants"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()
  const { showCartGlow } = useCartGlow()

  const mainRoutes = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMaintenanceDialogOpen(true)
    setIsMenuOpen(false) // Close mobile menu if open
  }

  const handleMaintenanceWhatsApp = () => {
    const message = `Hello, I'm interested in your products. Could you please provide more details?`
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, "_blank")
  }

  const handleDialogClose = (open: boolean) => {
    setIsMaintenanceDialogOpen(open)
    // Navigate to products page when dialog is closed
    if (!open) {
      router.push("/products")
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 md:sticky",
        isScrolled ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md" : "bg-white",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
            <Image src="/images/logo.png" alt="Book My DSLR" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-300">
            Book My DSLR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {mainRoutes.map((route) => {
            if (route.name === "Products") {
              return (
                <button
                  key={route.path}
                  onClick={handleProductsClick}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-amber-500 cursor-pointer",
                    pathname === route.path
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300 font-semibold"
                      : "text-foreground",
                  )}
                >
                  {route.name}
                </button>
              )
            }
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-500",
                  pathname === route.path
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300 font-semibold"
                    : "text-foreground",
                )}
              >
                {route.name}
              </Link>
            )
          })}

          <Link href="/terms" className="text-sm font-medium transition-colors hover:text-amber-500">
            Terms & Conditions
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "transition-all duration-500",
                showCartGlow && "animate-pulse shadow-lg shadow-amber-500/50 bg-amber-50"
              )}
            >
              <ShoppingCart className={cn(
                "h-5 w-5 transition-all duration-500",
                showCartGlow && "text-amber-600"
              )} />
              <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart" className="relative mr-2">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "transition-all duration-500",
                showCartGlow && "animate-pulse shadow-lg shadow-amber-500/50 bg-amber-50"
              )}
            >
              <ShoppingCart className={cn(
                "h-5 w-5 transition-all duration-500",
                showCartGlow && "text-amber-600"
              )} />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4">
              <Link
                href="/terms"
                className="text-sm font-medium transition-colors hover:text-amber-500 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Terms & Conditions
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Maintenance Dialog */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Maintenance Notice</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Images of some products are missing as our platform is on maintenance. 
              Please contact us via WhatsApp for more details.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center pt-4">
            <Button 
              onClick={handleMaintenanceWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
