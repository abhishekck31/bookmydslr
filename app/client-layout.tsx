"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { CartGlowProvider } from "@/components/cart-glow-provider"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <CartGlowProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                    <Toaster />
                </div>
            </CartGlowProvider>
        </CartProvider>
    )
}
