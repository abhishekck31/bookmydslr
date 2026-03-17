import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { AccessoryDetailClient } from "@/components/accessory-detail-client"
import { buildMetadata } from "@/lib/seo/metadata"

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const accessory = await fetchProduct(resolvedParams.id)

  if (!accessory) {
    return buildMetadata({
      title: "Accessory Detail | Book My DSLR",
      description: "Accessory detail page not found.",
      path: `/product/${resolvedParams.id}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${accessory.name} Rental Bangalore | Book My DSLR`,
    description: `${accessory.name} is available on the canonical product page at Book My DSLR.`,
    path: `/product/${accessory.id}`,
    noIndex: true,
  })
}

export default async function AccessoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  // Fetch accessory from API
  const accessory = await fetchProduct(resolvedParams.id)

  // If accessory not found, show 404
  if (!accessory) {
    notFound()
  }

  // Fetch related products (e.g. other accessories)
  // Assuming 'accessories' is generally products that are not cameras/lenses or specifically categorized.
  // For now, let's fetch all products and filter out the current one.
  const allProducts = await fetchProducts()

  // Simple "related" logic: same category if available, or just random others
  const relatedProducts = allProducts
    .filter(p => p.id !== accessory.id && p.category?.id === accessory.category?.id)
    .slice(0, 4)

  // If no related products in same category, just take any 4 others
  const finalRelated = relatedProducts.length > 0 ? relatedProducts : allProducts.filter(p => p.id !== accessory.id).slice(0, 4)

  return <AccessoryDetailClient accessory={accessory} relatedProducts={finalRelated} />
}
