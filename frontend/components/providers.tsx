"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import { CartProvider } from "@/components/cart-provider"
import { CartGlowProvider } from "@/components/cart-glow-provider"
import { Toaster } from "@/components/ui/toaster"
import { FilmHeader } from "@/components/film/header"
import { MobileStickyBar } from "@/components/film/mobile-sticky-bar"
import { DurationTiersProvider } from "@/components/film/duration-tiers"
import type { DurationTier } from "@/lib/film"

/** Pages that render their own mobile sticky bar. */
const OWN_STICKY_BAR = [/^\/product\//, /^\/cart/]

export function Providers({
  children,
  footer,
  durationTiers,
}: {
  children: React.ReactNode
  footer: React.ReactNode
  durationTiers: DurationTier[]
}) {
  const pathname = usePathname() ?? "/"
  const isAdmin = pathname.startsWith("/admin")

  return (
    <DurationTiersProvider tiers={durationTiers}>
    <CartProvider>
      <CartGlowProvider>
        {isAdmin ? (
          <div className="theme-light min-h-screen">{children}</div>
        ) : (
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              Skip to content
            </a>
            <FilmHeader />
            <main id="main" className="flex-grow">
              {children}
            </main>
            {footer}
            {!OWN_STICKY_BAR.some((re) => re.test(pathname)) && <MobileStickyBar />}
          </div>
        )}
        <Toaster />
      </CartGlowProvider>
    </CartProvider>
    </DurationTiersProvider>
  )
}
