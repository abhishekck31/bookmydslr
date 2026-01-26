import { HeroSection } from "@/components/homepage/hero-section"
import { FeaturedCameras } from "@/components/homepage/featured-cameras"
import { WhyUs } from "@/components/homepage/why-us"
import { HowItWorks } from "@/components/homepage/how-it-works"
import { ReviewSection } from "@/components/homepage/review-section"
import { CTASection } from "@/components/homepage/cta-section"
import { LensScrollLoader } from "@/components/LensScrollLoader"

export const metadata = {
  title: "Book My DSLR - Camera & Lens Rental in Bangalore | Kalyan Nagar, Hennur & More",
  description: "Rent cameras, lenses, and accessories in Bangalore. Located in Kalyan Nagar/Hennur. Fast delivery across the city.",
}

import { fetchProducts, fetchGlobalSettings, fetchCategories } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { QuickSelectGrid } from "@/components/homepage/quick-select-grid"

export default async function HomePage() {
  const [products, categories, globalSettings] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchGlobalSettings()
  ])

  const cameras = products
    .filter(p => p.category?.name.toLowerCase().includes("camera"))
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <LensScrollLoader />
      <QuickSelectGrid categories={categories} products={products} />
      <FeaturedCameras cameras={cameras} globalSettings={globalSettings} />
      <HowItWorks />
      <WhyUs />
      <ReviewSection />
      <CTASection />
    </main>
  )
}
