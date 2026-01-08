import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CategoryProductsClient } from "@/components/category-products-client"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params

  // Map slugs to DB categories or types
  // This helps maintain compatibility with existing URLs
  let whereClause: any = {}
  let categoryTitle = "Products"

  switch (slug) {
    case "camera":
      whereClause = { type: "DSLR" }
      categoryTitle = "DSLR Cameras"
      break
    case "mirrorless":
      whereClause = { type: "Mirrorless" }
      categoryTitle = "Mirrorless Cameras"
      break
    case "action-camera":
      whereClause = {
        category: {
          slug: "action-camera"
        }
      }
      categoryTitle = "Action Cameras"
      break
    case "canon-lenses":
    case "camera-lens":
      whereClause = {
        category: {
          slug: "camera-lens"
        }
      }
      categoryTitle = "Camera Lenses"
      break
    case "gimbal":
      whereClause = {
        category: {
          slug: "gimbal"
        }
      }
      categoryTitle = "Gimbals"
      break
    default:
      // Try to find by slug directly
      const category = await prisma.category.findUnique({
        where: { slug }
      })
      if (category) {
        whereClause = { categoryId: category.id }
        categoryTitle = category.name
      } else {
        // Fallback or 404
        return notFound()
      }
  }

  const products = await prisma.product.findMany({
    where: {
      ...whereClause,
      isAvailable: true
    },
    include: {
      category: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  return (
    <CategoryProductsClient
      products={products as any}
      categoryTitle={categoryTitle}
      globalSettings={globalSettings}
    />
  )
}
