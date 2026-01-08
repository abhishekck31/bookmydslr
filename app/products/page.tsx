import { prisma } from "@/lib/prisma"
import { ProductsClient } from "@/components/products-client"

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  // Fetch all products across all categories
  const products = await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  // Fetch unique categories and brands for filters
  const categories = Array.from(new Set(products.map(p => p.category.name).filter(Boolean))) as string[]
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[]

  // Fetch global settings
  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      brands={brands}
      globalSettings={globalSettings}
    />
  )
}
