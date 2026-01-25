import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { fetchCategories, fetchProducts } from "@/lib/api"
import { Product, Category } from "@/types"

export const dynamic = 'force-dynamic'

export default async function RentalEquipmentPage() {
  const categoriesList = await fetchCategories()
  const products = await fetchProducts()

  const categories = categoriesList.map((c) => {
    const topProducts = products
      .filter(p => p.category?.slug === c.slug)
      .slice(0, 3)

    return {
      ...c,
      id: c.id,
      products: topProducts
    }
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Rental Equipment</h1>
      <p className="text-muted-foreground mb-8">
        Browse our extensive collection of professional photography and videography equipment available for rent
      </p>

      <div className="grid grid-cols-1 gap-10">
        {categories.map((category) => {
          // Group products by 'brand'
          const brands = Array.from(new Set(category.products.map(p => p.brand).filter(Boolean))) as string[]

          return (
            <div key={category.id} className="border-t pt-8">
              <Link href={`/rental-equipment/${category.slug}`}>
                <h2 className="text-2xl font-bold mb-6 hover:text-amber-600 transition-colors flex items-center">
                  {category.name}
                  <ChevronRight className="h-6 w-6 ml-2" />
                </h2>
              </Link>

              <div className="space-y-8">
                {brands.length > 0 ? brands.slice(0, 3).map((brand) => {
                  const brandProducts = category.products.filter(p => p.brand === brand)

                  return (
                    <div key={brand}>
                      <h3 className="font-semibold text-lg mb-4 text-gray-500 uppercase tracking-wider">{brand}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {brandProducts.map((item) => (
                          <Link
                            href={`/product/${item.id}`}
                            key={item.id}
                            className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                          >
                            <div className="aspect-[4/3] relative w-full bg-gray-50 p-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">{item.name}</h4>
                              <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                                <p className="text-sm font-bold text-gray-900">₹{item.price}<span className="text-xs font-normal text-gray-500">/day</span></p>
                                <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">View</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.products.length > 0 ? category.products.map((item) => (
                      <Link
                        href={`/product/${item.id}`}
                        key={item.id}
                        className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                      >
                        <div className="aspect-[4/3] relative w-full bg-gray-50 p-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">{item.name}</h4>
                          <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-900">₹{item.price}<span className="text-xs font-normal text-gray-500">/day</span></p>
                            <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">View</span>
                          </div>
                        </div>
                      </Link>
                    )) : (
                      <p className="text-sm text-gray-400 italic">No products available in this category.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
