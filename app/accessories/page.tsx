import { prisma } from "@/lib/prisma"
import { AccessoriesClient } from "@/components/accessories-client"

export const dynamic = 'force-dynamic'

export default async function AccessoriesPage() {
  // Fetch accessories from DB
  // We fetch everything that's NOT in the 'Cameras' category
  const accessories = await prisma.product.findMany({
    where: {
      NOT: {
        category: {
          name: 'Cameras'
        }
      }
    },
    include: {
      category: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  // Fetch global settings for discounts
  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  // Map Prisma products to the format expected by the client component
  const mappedAccessories = accessories.map(acc => ({
    id: acc.id,
    name: acc.name,
    brand: acc.brand,
    type: acc.type,
    price: acc.price,
    image: acc.image,
    description: acc.description,
    isAvailable: acc.isAvailable,
    category: acc.category?.name,
    rating: 4.8,
    reviews: 12,
    isNew: false
  }))

  return <AccessoriesClient initialAccessories={mappedAccessories} globalSettings={globalSettings} />
}
