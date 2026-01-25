import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { CameraDetailClient } from "@/components/camera-detail-client"

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
