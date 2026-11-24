import { notFound } from "next/navigation"
import { fetchProducts } from "@/lib/api"
import { LandingPageTemplate } from "@/components/seo/landing-page-template"
import { JsonLd } from "@/components/seo/json-ld"
import { bangaloreLocationPages } from "@/data/seo/landing-pages"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from "@/lib/seo/schema"
import { buildLocationFaqs, buildLocationSections, pickProducts } from "@/lib/seo/page-content"

export const revalidate = 300

export async function generateStaticParams() {
  return bangaloreLocationPages.map((page) => ({ location: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location } = await params
  const page = bangaloreLocationPages.find((item) => item.slug === location)

  if (!page) {
    return buildMetadata({
      title: "Camera Rental Bangalore | Book My DSLR",
      description: "Browse camera rental landing pages for Bangalore neighborhoods.",
      path: "/camera-rental-bangalore",
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `Camera Rental ${page.name} Bangalore | Book My DSLR`,
    description: `Rent cameras, lenses, and filmmaking gear near ${page.name}, Bangalore with fast support from Book My DSLR.`,
    path: `/camera-rental-bangalore/${page.slug}`,
    keywords: [
      `camera rental ${page.name} Bangalore`,
      `DSLR rental ${page.name}`,
      `camera rental near ${page.name}`,
      "camera rental Bangalore",
    ],
  })
}

export default async function CameraRentalLocationPage({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location } = await params
  const page = bangaloreLocationPages.find((item) => item.slug === location)

  if (!page) {
    notFound()
  }

  const products = await fetchProducts()
  const featuredProducts = pickProducts(products, undefined, 8)
  const faqs = buildLocationFaqs(page)
  const title = `Camera rental in ${page.name}, Bangalore`
  const nearbyNames = new Set(page.nearbyAreas.map((n) => n.toLowerCase()))
  const nearbyLinks = bangaloreLocationPages
    .filter((p) => p.slug !== page.slug)
    .sort((a, b) => Number(nearbyNames.has(b.name.toLowerCase())) - Number(nearbyNames.has(a.name.toLowerCase())))
    .map((p) => ({ href: `/camera-rental-bangalore/${p.slug}`, label: p.name }))
  const description = `Rent cameras, lenses, and filmmaking equipment near ${page.name}, Bangalore with quick access from Book My DSLR.`

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: title,
            description,
            path: `/camera-rental-bangalore/${page.slug}`,
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Camera Rental Bangalore", path: "/camera-rental-bangalore" },
            { name: page.name, path: `/camera-rental-bangalore/${page.slug}` },
          ]),
          buildLocalBusinessSchema(`/camera-rental-bangalore/${page.slug}`),
        ]}
      />

      <LandingPageTemplate
        eyebrow="Camera rental · Bangalore"
        title={title}
        titleEmphasis={page.name}
        heroMarker={`Near ${page.nearbyAreas.join(" · ")}`}
        description={description}
        bullets={[
          `Pickup from Kalyan Nagar or delivery to ${page.name}`,
          `Also serving ${page.nearbyAreas.join(", ")}`,
          `Close to ${page.landmarks.join(" and ")}`,
        ]}
        nearby={nearbyLinks}
        products={featuredProducts}
        contentTitle={`Local camera rental intent around ${page.name}`}
        contentIntro={`This page helps Book My DSLR rank for neighborhood-level searches while giving renters in ${page.name} a direct path to the live Bangalore inventory.`}
        sections={buildLocationSections(page)}
        faqs={faqs}
        internalLinks={[
          { href: "/camera-rental-bangalore", label: "Bangalore Camera Rental", description: "Return to the main city landing page." },
          { href: "/rentals/dslr-camera-rental-bangalore", label: "DSLR Rentals", description: "Browse DSLR options for local events, shoots, and projects." },
          { href: "/rentals/lens-rental-bangalore", label: "Lens Rental Bangalore", description: "Pair local camera rentals with the right glass." },
          { href: "/contact", label: "Talk to the Team", description: "Use the local page as a fast path into inquiry and support." },
        ]}
      />
    </>
  )
}
