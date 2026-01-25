import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { LensDetailClient } from "@/components/lens-detail-client"

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
