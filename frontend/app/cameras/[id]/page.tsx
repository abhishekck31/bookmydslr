import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { CameraDetailClient } from "@/components/camera-detail-client"
import { buildMetadata } from "@/lib/seo/metadata"

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const camera = await fetchProduct(resolvedParams.id)

  if (!camera) {
    return buildMetadata({
      title: "Camera Detail | Book My DSLR",
      description: "Camera detail page not found.",
      path: `/product/${resolvedParams.id}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${camera.name} Rental Bangalore | Book My DSLR`,
    description: `${camera.name} is available on the canonical product page at Book My DSLR.`,
    path: `/product/${camera.id}`,
    noIndex: true,
  })
}

export default async function CameraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  // Fetch camera from API
  const camera = await fetchProduct(resolvedParams.id)

  // If camera not found, show 404
  if (!camera) {
    notFound()
  }

  // Fetch related products (e.g. other cameras)
  const allProducts = await fetchProducts()

  // Simple "related" logic: same category if available
  const relatedCameras = allProducts
    .filter(p => p.id !== camera.id && p.category?.id === camera.category?.id)
    .slice(0, 4)

  // Fallback
  const finalRelated = relatedCameras.length > 0 ? relatedCameras : allProducts.filter(p => p.id !== camera.id).slice(0, 4)

  return <CameraDetailClient camera={camera} relatedCameras={finalRelated} />
}
