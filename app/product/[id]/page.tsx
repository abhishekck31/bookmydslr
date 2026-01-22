import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductClient } from "@/components/product-client"

// Helper function to add timeout to queries
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Query timeout after ${timeoutMs}ms`)), timeoutMs)
    ),
  ])
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    // Fetch all data in parallel to reduce connection pool usage
    const [product, globalSettings] = await Promise.all([
      withTimeout(
        prisma.product.findUnique({
          where: { id },
          include: {
            category: true
          }
        }),
        8000
      ),
      withTimeout(
        prisma.globalSettings.findUnique({
          where: { id: 'singleton' }
        }),
        5000
      )
    ])

    if (!product) {
      notFound()
    }

    // Fetch related products after we have the product
    const relatedProducts = await withTimeout(
      prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
          isAvailable: true
        },
        take: 4,
        include: {
          category: true
        }
      }),
      8000
    )

    return (
      <ProductClient
        product={product as any}
        relatedProducts={relatedProducts as any}
        globalSettings={globalSettings}
      />
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    // Return a more user-friendly error or retry
    throw error
  }
}
