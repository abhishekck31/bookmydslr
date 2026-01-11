import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { MobileTopBar } from "@/components/mobile-top-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Book My DSLR - Premium Camera Rentals in Bangalore",
  description: "Rent premium cameras, lenses, and accessories at affordable prices. Top-rated DSLR and Mirrorless camera rental service in Bangalore.",
  keywords: ["camera rental", "dslr rental", "lens rental", "bangalore", "canon", "nikon", "sony", "photography equipment"],
  openGraph: {
    title: "Book My DSLR - Premium Camera Rentals",
    description: "Rent premium cameras, lenses, and accessories at affordable prices in Bangalore.",
    type: "website",
    locale: "en_IN",
    siteName: "Book My DSLR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book My DSLR - Premium Camera Rentals",
    description: "Rent premium cameras, lenses, and accessories at affordable prices.",
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon_io/favicon.ico',
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* Main Content */}
        <main className="min-h-screen pt-16 pb-20 md:pt-0 md:pb-0">
          <Providers>
            {/* Mobile Bottom Navigation Only */}
            <div className="md:hidden">
              <MobileBottomNav />
            </div>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}
