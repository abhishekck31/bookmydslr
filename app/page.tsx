import { HeroSection } from "@/components/homepage/hero-section"
import { FeaturedCameras } from "@/components/homepage/featured-cameras"
import { WhyUs } from "@/components/homepage/why-us"
import { HowItWorks } from "@/components/homepage/how-it-works"
import { CTASection } from "@/components/homepage/cta-section"
import { prisma } from "@/lib/prisma"

// Metadata is kept intact as requested
export const metadata = {
  title: "Book My DSLR - Camera & Lens Rental in Bangalore | Kalyan Nagar, Hennur & More",
  description: "Rent cameras, lenses, and accessories in Bangalore. Located in Kalyan Nagar/Hennur. Fast delivery across the city.",
  keywords: [
    "camera rental Bangalore",
    "lens rental Bangalore",
    "DSLR rental",
    "Kalyan Nagar",
    "Hennur",
    "Kammanahalli",
    "Indiranagar",
    "HSR Layout",
    "Whitefield"
  ],
  openGraph: {
    title: "Book My DSLR - Camera & Lens Rental in Bangalore",
    description: "Rent cameras, lenses, and accessories in all Bangalore locations. Fast delivery and best prices.",
    url: "https://yourdomain.com/",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book My DSLR Bangalore"
      }
    ]
  }
}

export default async function HomePage() {
  // Fetch featured cameras from DB
  const cameras = await prisma.product.findMany({
    where: {
      isAvailable: true,
      // We can use a specific category or just a "featured" flag if we had one
      // For now, let's just get the latest 4 cameras
      category: {
        name: {
          contains: 'Camera',
          mode: 'insensitive'
        }
      }
    },
    take: 4,
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      category: true
    }
  })

  // Fetch global settings
  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedCameras cameras={cameras} globalSettings={globalSettings} />
      <HowItWorks />
      <WhyUs />
      <CTASection />
    </main>
  )
}