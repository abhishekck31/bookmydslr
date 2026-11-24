import { fetchProducts } from "@/lib/api"
import { LandingPageTemplate } from "@/components/seo/landing-page-template"
import { bangaloreLocationPages } from "@/data/seo/landing-pages"
import { JsonLd } from "@/components/seo/json-ld"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema"
import { buildMainCityFaqs, buildMainCitySections, pickProducts } from "@/lib/seo/page-content"

export const revalidate = 300

const pageTitle = "Camera Rental Bangalore | Book My DSLR"
const pageDescription =
  "Rent DSLR, mirrorless, cinema cameras, lenses, drones, and filmmaking gear in Bangalore with fast pickup from Kalyan Nagar."

const faqs = buildMainCityFaqs()

export const metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/camera-rental-bangalore",
  keywords: [
    "camera rental Bangalore",
    "camera on rent Bangalore",
    "camera rental near me",
    "photography equipment rental Bangalore",
    "camera gear rental Bangalore",
  ],
})

export default async function CameraRentalBangalorePage() {
  const products = await fetchProducts()
  const featuredProducts = pickProducts(products, undefined, 8)

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: pageTitle,
            description: pageDescription,
            path: "/camera-rental-bangalore",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Camera Rental Bangalore", path: "/camera-rental-bangalore" },
          ]),
          buildLocalBusinessSchema("/camera-rental-bangalore"),
        ]}
      />

      <LandingPageTemplate
        eyebrow="Rentals · Bangalore"
        titleEmphasis="Bangalore"
        heroMarker="Kalyan Nagar · 560043"
        title="Camera Rental in Bangalore for Shoots That Need Real Gear Fast"
        description={pageDescription}
        bullets={[
          "DSLR, mirrorless, cinema cameras, drones, and accessories",
          "Strong local coverage around Kalyan Nagar, Hennur, Whitefield, HSR Layout, and more",
          "Built for photographers, filmmakers, creators, production teams, and students",
        ]}
        products={featuredProducts}
        contentTitle="The commercial-intent hub for camera rental Bangalore"
        contentIntro="This city page is designed to rank for broad Bangalore rental demand while sending visitors into more specific brand, category, and neighborhood pages that match their booking intent."
        sections={buildMainCitySections()}
        faqs={faqs}
        nearby={bangaloreLocationPages.map((p) => ({ href: `/camera-rental-bangalore/${p.slug}`, label: p.name }))}
        internalLinks={[
          { href: "/rentals/dslr-camera-rental-bangalore", label: "DSLR Rental Bangalore", description: "Budget and professional DSLR rental options." },
          { href: "/rentals/mirrorless-camera-rental-bangalore", label: "Mirrorless Camera Rentals", description: "Creator and hybrid camera options for modern shoots." },
          { href: "/rentals/lens-rental-bangalore", label: "Lens Rental Bangalore", description: "Match bodies with portrait, zoom, and wide-angle glass." },
          { href: "/camera-rental-bangalore/kalyan-nagar", label: "Kalyan Nagar Rentals", description: "Local-intent page closest to the studio." },
        ]}
      />
    </>
  )
}
