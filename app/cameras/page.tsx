import { prisma } from "@/lib/prisma"
import { CamerasClient } from "@/components/cameras-client"

export const dynamic = 'force-dynamic'

export default async function CamerasPage() {
  // Fetch cameras from DB
  const cameras = await prisma.product.findMany({
    where: {
      category: {
        name: {
          contains: 'Camera'
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
  const mappedCameras = cameras.map(camera => ({
    id: camera.id,
    name: camera.name,
    brand: camera.brand,
    type: camera.type,
    price: camera.price,
    image: camera.image,
    description: camera.description,
    isAvailable: camera.isAvailable,
    rating: 4.8, // Mock as these aren't in core DB schema yet
    reviews: 24,
    isNew: false
  }))

  return <CamerasClient initialCameras={mappedCameras} globalSettings={globalSettings} />
}
