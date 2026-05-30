import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { JsonLd } from "@/components/seo/json-ld"
import { buildMetadata } from "@/lib/seo/metadata"
import { buildLocalBusinessSchema, buildOrganizationSchema } from "@/lib/seo/schema"
import { primaryKeywords } from "@/lib/seo/site"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Camera Rental Bangalore | Book My DSLR",
    description:
      "Rent DSLR, mirrorless, cinema cameras, lenses, drones, and filmmaking gear in Bangalore with fast pickup and delivery.",
    path: "/",
    keywords: [...primaryKeywords],
  }),
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
    <html lang="en-IN" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <JsonLd data={[buildOrganizationSchema(), buildLocalBusinessSchema()]} />
        {/* Main Content */}
        <div className="min-h-screen pt-16 pb-20 md:pt-0 md:pb-0">
          <Providers>
            {/* Mobile Bottom Navigation Only */}
            <div className="md:hidden">
              <MobileBottomNav />
            </div>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
