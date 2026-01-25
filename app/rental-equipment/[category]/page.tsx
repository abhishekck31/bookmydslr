import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { fetchAPI } from "@/lib/api"
import { Product, Category } from "@/types"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ subcategory?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const categorySlug = resolvedParams.category

  // Fetch categories from API
  const categories = await fetchAPI<Category[]>('/categories') || []
  const category = categories.find(c => c.slug === categorySlug)

  if (!category) {
    return notFound()
  }

  // Fetch products
  const products = await fetchAPI<Product[]>('/products') || []
  let list = products.filter(p => p.category?.slug === categorySlug)

  if (resolvedSearchParams.subcategory) {
    const subcategoryName = resolvedSearchParams.subcategory.replace(/-/g, " ")
    list = list.filter(p => p.brand.toLowerCase().includes(subcategoryName.toLowerCase()))
  }

  const mappedProducts = list

  // Get unique brands
  const brands = Array.from(new Set(list.map(p => p.brand).filter(Boolean))) as string[]

  return (
    <div className="container py-10">
      <Link href="/rental-equipment" className="flex items-center text-muted-foreground mb-6 hover:text-primary">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all equipment
      </Link>

      <h1 className="text-3xl font-bold mb-2">
        {category.name}
        {resolvedSearchParams.subcategory && ` - ${resolvedSearchParams.subcategory.replace(/-/g, " ")}`}
      </h1>
      <p className="text-muted-foreground mb-8">{mappedProducts.length} items available for rent</p>

      {brands.length > 0 && !resolvedSearchParams.subcategory && (
        <div className="flex flex-wrap gap-2 mb-8">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/rental-equipment/${categorySlug}?subcategory=${brand.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
            >
              {brand}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mappedProducts.map((item: any) => (
          <Link href={`/product/${item.id}`} key={item.id} className="group">
            <div className="border rounded-lg overflow-hidden bg-white p-4 h-full flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="relative">
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
              <p className="text-sm text-muted-foreground mt-1 flex-grow line-clamp-2">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-bold">₹{item.price}/day</p>
                <span className={`text-sm ${item.isAvailable ? "text-green-600" : "text-red-600"}`}>
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
