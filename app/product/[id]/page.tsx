import { fetchProduct, fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { notFound } from "next/navigation"
import { ProductClient } from "@/components/product-client"

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const product = await fetchProduct(id)

    if (!product) {
      notFound()
    }

    const allProducts = await fetchProducts()
    const relatedProducts = allProducts
      .filter(p => p.category?.id === product.category?.id && p.id !== id)
      .slice(0, 4);

    const globalSettings = await fetchGlobalSettings()

    return (
      <ProductClient
        product={product as any}
        relatedProducts={relatedProducts as any}
        globalSettings={globalSettings}
      />
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}
