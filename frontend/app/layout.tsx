import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { FilmFooter } from "@/components/film/footer"
import { fetchDurationTiers } from "@/lib/api"
import { JsonLd } from "@/components/seo/json-ld"
import { buildMetadata } from "@/lib/seo/metadata"
import { buildLocalBusinessSchema, buildOrganizationSchema } from "@/lib/seo/schema"
import { primaryKeywords } from "@/lib/seo/site"

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
})

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
})

export const viewport = {
  themeColor: "#FAF7F2",
}

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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WQFJD2LQ"
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} font-sans`} suppressHydrationWarning>
        <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${GA_ID ? `gtag('config','${GA_ID}');` : ""}`}
        </Script>
        {GA_ID ? (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        ) : null}
        <JsonLd data={[buildOrganizationSchema(), buildLocalBusinessSchema()]} />
        <Providers footer={<FilmFooter />} durationTiers={await fetchDurationTiers()}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
