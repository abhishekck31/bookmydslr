import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { fetchCategories, fetchProducts } from "@/lib/api"
import { Product, Category } from "@/types"
import { notFound } from "next/navigation"
import { CategoryTabs } from "@/components/rental/category-tabs"
import { ProductListingCard } from "@/components/rental/product-listing-card"


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
  const categories = await fetchCategories()
  const category = categories.find(c => c.slug === categorySlug)

  if (!category) {
    return notFound()
  }

  // Fetch products
  const products = await fetchProducts()
  let list = products.filter(p => p.category?.slug === categorySlug)

  if (resolvedSearchParams.subcategory) {
    const subcategoryName = resolvedSearchParams.subcategory.replace(/-/g, " ")
    list = list.filter(p => p.brand.toLowerCase().includes(subcategoryName.toLowerCase()))
  }

  const mappedProducts = list

  // Get unique brands
  const brands = Array.from(new Set(list.map(p => p.brand).filter(Boolean))) as string[]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Navigation / Breadcrumbs Area */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container py-4">
          <CategoryTabs categories={categories} activeSlug={categorySlug} />
        </div>
      </div>

      <div className="container py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/rental-equipment" className="hover:text-primary">Equipment</Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="font-semibold text-gray-900">{category.name}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {category.name}
            <span className="text-muted-foreground font-normal text-lg ml-3">
              {resolvedSearchParams.subcategory ? `/ ${resolvedSearchParams.subcategory.replace(/-/g, " ")}` : "> Equipment"}
            </span>
          </h1>
        </div>

        {/* Subcategory Filter Pills (Keep existing logic if brands exist) */}
        {brands.length > 0 && !resolvedSearchParams.subcategory && (
          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Filter by Brand</h3>
            <div className="flex flex-wrap gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/rental-equipment/${categorySlug}?subcategory=${brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-5 py-2 rounded-full bg-white border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-all font-medium text-sm shadow-sm"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mappedProducts.map((item: any) => (
            <ProductListingCard key={item.id} product={item} />
          ))}
        </div>

        {mappedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link href="/rental-equipment" className="text-primary hover:underline mt-2 inline-block">
              View all equipment
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}
