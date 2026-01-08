import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function RentalEquipmentPage() {
  // Fetch all categories and some products for preview
  const categories = await prisma.category.findMany({
    include: {
      products: {
        take: 3,
        orderBy: {
          updatedAt: 'desc'
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Rental Equipment</h1>
      <p className="text-muted-foreground mb-8">
        Browse our extensive collection of professional photography and videography equipment available for rent
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          // Group products by 'brand' (using it as a subcategory substitute for now)
          const brands = Array.from(new Set(category.products.map(p => p.brand).filter(Boolean))) as string[]

          return (
            <div key={category.id} className="border rounded-lg p-6 bg-white shadow-sm">
              <Link href={`/rental-equipment/${category.slug}`}>
                <h2 className="text-xl font-bold mb-4 hover:text-primary transition-colors flex items-center justify-between">
                  {category.name}
                  <ChevronRight className="h-5 w-5" />
                </h2>
              </Link>

              <div className="space-y-4">
                {brands.length > 0 ? brands.slice(0, 3).map((brand) => {
                  const brandProducts = category.products.filter(p => p.brand === brand)

                  return (
                    <div key={brand}>
                      <h3 className="font-medium text-lg mb-2">{brand}</h3>
                      <div className="space-y-3">
                        {brandProducts.map((item) => (
                          <Link
                            href={`/product/${item.id}`}
                            key={item.id}
                            className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">₹{item.price}/day</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }) : (
                  <div className="space-y-3">
                    {category.products.map((item) => (
                      <Link
                        href={`/product/${item.id}`}
                        key={item.id}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">₹{item.price}/day</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/rental-equipment/${category.slug}`}
                className="block mt-4 text-sm text-primary hover:underline flex items-center"
              >
                View all items in {category.name}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
