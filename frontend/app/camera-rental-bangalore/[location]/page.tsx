import { notFound } from "next/navigation"
import { fetchDurationTiers, fetchProducts } from "@/lib/api"
import { JsonLd } from "@/components/seo/json-ld"
import { LocalityPage } from "@/components/seo/locality-page"
import {
  PUBLISHED_LOCALITIES,
  findPublishedLocality,
  localityPath,
  validateLocalities,
} from "@/data/seo/localities"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalityPageSchema,
  buildProductListSchema,
} from "@/lib/seo/schema"
import {
  buildLocalityFaqs,
  focusGroups,
  localityKeywords,
  localityMetaDescription,
  localitySeoTitle,
  summariseInventory,
} from "@/lib/seo/locality-content"

export const revalidate = 300
/** Drafts and unknown slugs 404 instead of rendering on demand. */
export const dynamicParams = false

export async function generateStaticParams() {
  const problems = validateLocalities()
  if (problems.length) {
    throw new Error(`Locality dataset is invalid:\n- ${problems.join("\n- ")}`)
  }
  return PUBLISHED_LOCALITIES.map((l) => ({ location: l.slug }))
}

type Params = { params: Promise<{ location: string }> }

export async function generateMetadata({ params }: Params) {
  const { location } = await params
  const l = findPublishedLocality(location)
  if (!l) return {}

  const products = await fetchProducts()
  return buildMetadata({
    title: localitySeoTitle(l),
    description: localityMetaDescription(l, products.length ? summariseInventory(products) : null),
    path: localityPath(l),
    keywords: localityKeywords(l),
  })
}

export default async function CameraRentalLocalityPage({ params }: Params) {
  const { location } = await params
  const l = findPublishedLocality(location)
  if (!l) notFound()

  const [products, tiers] = await Promise.all([fetchProducts(), fetchDurationTiers()])
  const facts = summariseInventory(products)
  const faqs = buildLocalityFaqs(l, facts, tiers)
  const path = localityPath(l)
  const shown = focusGroups(l, facts).flatMap((g) => g.products.slice(0, 4))

  return (
    <>
      <JsonLd
        data={[
          buildLocalityPageSchema({
            name: localitySeoTitle(l),
            description: localityMetaDescription(l, facts),
            path,
            areaName: l.name,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Camera Rental Bangalore", path: "/camera-rental-bangalore" },
            { name: l.name, path },
          ]),
          buildFaqSchema(faqs),
          buildProductListSchema(shown),
        ]}
      />
      <LocalityPage locality={l} facts={facts} faqs={faqs} tiers={tiers} />
    </>
  )
}
