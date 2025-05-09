import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { rentalEquipment } from "@/data/rental-equipment"

// Get unique categories from rental equipment
const getCategories = () => {
  const categories = [...new Set(rentalEquipment.map((item) => item.category))]
  return categories.sort()
}

export default function RentalEquipmentPage() {
  const categories = getCategories()

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Rental Equipment</h1>
      <p className="text-muted-foreground mb-8">
        Browse our extensive collection of professional photography and videography equipment available for rent
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          // Get equipment for this category
          const categoryEquipment = rentalEquipment.filter((item) => item.category === category)

          // Get unique subcategories for this category
          const subcategories = [...new Set(categoryEquipment.map((item) => item.subcategory))]

          return (
            <div key={category} className="border rounded-lg p-6 bg-white shadow-sm">
              <Link href={`/rental-equipment/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <h2 className="text-xl font-bold mb-4 hover:text-primary transition-colors flex items-center justify-between">
                  {category}
                  <ChevronRight className="h-5 w-5" />
                </h2>
              </Link>

              <div className="space-y-4">
                {subcategories.map((subcategory) => {
                  // Get equipment for this subcategory
                  const subcategoryEquipment = categoryEquipment.filter((item) => item.subcategory === subcategory)

                  return (
                    <div key={subcategory}>
                      <h3 className="font-medium text-lg mb-2">{subcategory}</h3>
                      <div className="space-y-3">
                        {subcategoryEquipment.slice(0, 3).map((item) => (
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
                            {item.isNew && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
                                New
                              </span>
                            )}
                          </Link>
                        ))}

                        {subcategoryEquipment.length > 3 && (
                          <Link
                            href={`/rental-equipment/${category.toLowerCase().replace(/\s+/g, "-")}?subcategory=${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-primary hover:underline flex items-center"
                          >
                            View all {subcategoryEquipment.length} {subcategory} items
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href={`/rental-equipment/${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="block mt-4 text-sm text-primary hover:underline flex items-center"
              >
                View all {categoryEquipment.length} {category} items
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
