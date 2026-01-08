import { prisma } from "@/lib/prisma"
import { LensesClient } from "@/components/lenses-client"

export default async function LensesPage() {
  // Fetch lenses from DB
  const lenses = await prisma.product.findMany({
    where: {
      category: {
        name: 'Lenses'
      }
    },
    include: {
      category: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  // Fetch global settings
  const globalSettings = await prisma.globalSettings.findUnique({
    where: { id: 'singleton' }
  })

  // Map to client format
  const mappedLenses = lenses.map(l => ({
    id: l.id,
    name: l.name,
    brand: l.brand,
    type: l.type,
    mount: (l.specs as any)?.mount || null,
    price: l.price,
    image: l.image,
    description: l.description,
    isAvailable: l.isAvailable,
    rating: 4.9,
    reviews: 32
  }))

  return <LensesClient initialLenses={mappedLenses} globalSettings={globalSettings} />
}
