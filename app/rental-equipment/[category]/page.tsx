import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { rentalEquipment } from "@/data/rental-equipment"

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ subcategory?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  // Convert URL-friendly category back to original format
  const categoryParam = resolvedParams.category.replace(/-/g, " ")

  // Find all equipment in this category
  const categoryEquipment = rentalEquipment.filter(
    (item) => item.category.toLowerCase() === categoryParam.toLowerCase(),
  )

  if (categoryEquipment.length === 0) {
    return (
      <div className="container py-10">
        <Link href="/rental-equipment" className="flex items-center text-muted-foreground mb-6 hover:text-primary">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all equipment
        </Link>
        <h1 className="text-3xl font-bold mb-8">Category not found</h1>
        <p>Sorry, we couldn't find any equipment in this category.</p>
      </div>
    )
  }

  // Get unique subcategories
  const subcategories = [...new Set(categoryEquipment.map((item) => item.subcategory))]

  // Filter by subcategory if provided
  let filteredEquipment = categoryEquipment
  let selectedSubcategory = ""

  if (resolvedSearchParams.subcategory) {
    selectedSubcategory = resolvedSearchParams.subcategory.replace(/-/g, " ")
    filteredEquipment = categoryEquipment.filter(
      (item) => item.subcategory.toLowerCase() === selectedSubcategory.toLowerCase(),
    )
  }

  return (
    <div className="container py-10">
      <Link href="/rental-equipment" className="flex items-center text-muted-foreground mb-6 hover:text-primary">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all equipment
      </Link>

      <h1 className="text-3xl font-bold mb-2">
        {categoryEquipment[0].category}
        {selectedSubcategory && ` - ${selectedSubcategory}`}
      </h1>
      <p className="text-muted-foreground mb-8">{filteredEquipment.length} items available for rent</p>

      {!selectedSubcategory && (
        <div className="flex flex-wrap gap-2 mb-8">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory}
              href={`/rental-equipment/${resolvedParams.category}?subcategory=${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
            >
              {subcategory}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEquipment.map((item) => (
          <Link href={`/product/${item.id}`} key={item.id} className="group">
            <div className="border rounded-lg overflow-hidden bg-white p-4 h-full flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="relative">
                {item.isNew && (
                  <span className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                <div className="flex items-center justify-center h-48 mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-full"
                  />
                </div>
              </div>
              <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex-grow">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold">₹{item.price}/day</p>
                <span className={`text-sm ${item.available ? "text-green-600" : "text-red-600"}`}>
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
