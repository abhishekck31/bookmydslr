import { HeroSection } from "@/components/homepage/hero-section"
import { FeaturedGearSection } from "@/components/homepage/featured-gear-section"
import { WhyUs } from "@/components/homepage/why-us"
import { HowItWorks } from "@/components/homepage/how-it-works"
import { ReviewSection } from "@/components/homepage/review-section"
import { CTASection } from "@/components/homepage/cta-section"
import { HomeSeoAccordion } from "@/components/homepage/home-seo-accordion"
import { fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { buildMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema"
import { buildMainCityFaqs, buildMainCitySections } from "@/lib/seo/page-content"

export const revalidate = 300

const homeFaqs = buildMainCityFaqs()

export const metadata = buildMetadata({
  title: "Camera Rental Bangalore | Book My DSLR",
  description:
    "Rent DSLR, mirrorless, lenses, drones, and filmmaking gear in Bangalore. Fast pickup from Kalyan Nagar and city-wide support.",
  path: "/",
  keywords: [
    "camera rental Bangalore",
    "DSLR rental Bangalore",
    "mirrorless camera rental Bangalore",
    "lens rental Bangalore",
    "filmmaking equipment rental Bangalore",
  ],
})

export default async function HomePage() {
  const [products, globalSettings] = await Promise.all([
    fetchProducts(),
    fetchGlobalSettings(),
  ])

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Rental Bangalore | Book My DSLR",
            description:
              "Rent DSLR, mirrorless, lenses, drones, and filmmaking gear in Bangalore with fast pickup and delivery support.",
            path: "/",
          }),
          buildFaqSchema(homeFaqs),
          buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
          buildLocalBusinessSchema("/"),
        ]}
      />

      <main className="min-h-screen bg-white">
        <HeroSection />
        <FeaturedGearSection products={products} globalSettings={globalSettings} />
        <HowItWorks />
        <WhyUs />
        <ReviewSection />
        <CTASection />
        <HomeSeoAccordion
          title="Bangalore camera rental built for creators, photographers, and production teams"
          intro="The homepage now works as an authority page for camera rental Bangalore by combining product discovery, trust signals, and long-form commercial content that supports the strongest keyword clusters."
          sections={buildMainCitySections()}
          faqs={homeFaqs}
          links={[
            {
              href: "/camera-rental-bangalore",
              label: "Camera Rental Bangalore",
              description: "Explore the dedicated city landing page built for high-intent demand.",
            },
            {
              href: "/rentals/sony-camera-rental-bangalore",
              label: "Sony Camera Rentals",
              description: "Popular creator and filmmaker kits with strong commercial intent.",
            },
            {
              href: "/rental-equipment",
              label: "Rental Equipment",
              description: "Browse the complete inventory across all categories.",
            },
          ]}
        />
      </main>
    </>
  )
}
