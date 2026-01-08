import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductClient } from "@/components/product-client"

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Fetch product from DB
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true
    }
  })

  if (!product) {
    notFound()
  }

  // Fetch global settings for discounts
  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  // Fetch related products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isAvailable: true
    },
    take: 4,
    include: {
      category: true
    }
  })

  return (
    <ProductClient
      product={product as any}
      relatedProducts={relatedProducts as any}
      globalSettings={globalSettings}
    />
  )
}
