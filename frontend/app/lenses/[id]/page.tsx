import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { LensDetailClient } from "@/components/lens-detail-client"
import { buildMetadata } from "@/lib/seo/metadata"

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const lens = await fetchProduct(resolvedParams.id)

  if (!lens) {
    return buildMetadata({
      title: "Lens Detail | Book My DSLR",
      description: "Lens detail page not found.",
      path: `/product/${resolvedParams.id}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${lens.name} Rental Bangalore | Book My DSLR`,
    description: `${lens.name} is available on the canonical product page at Book My DSLR.`,
    path: `/product/${lens.id}`,
    noIndex: true,
  })
}

export default async function LensDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  // Fetch lens from API
  const lens = await fetchProduct(resolvedParams.id)

  // If lens not found, show 404
  if (!lens) {
    notFound()
  }

  // Fetch related products (e.g. other lenses)
  const allProducts = await fetchProducts()

  // Simple "related" logic: same category if available
  const relatedLenses = allProducts
    .filter(p => p.id !== lens.id && p.category?.id === lens.category?.id)
    .slice(0, 4)

  // Fallback to random products if needed, but assuming lenses category exists
  const finalRelated = relatedLenses.length > 0 ? relatedLenses : allProducts.filter(p => p.id !== lens.id).slice(0, 4)

  return <LensDetailClient lens={lens} relatedLenses={finalRelated} />
}
