"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PLPHeader } from "@/components/rental/plp-header"
import { CategoryRail } from "@/components/rental/category-rail"
import { SmartFilterDrawer, FilterButton } from "@/components/rental/smart-filter-drawer"
import { PremiumProductCard } from "@/components/rental/premium-product-card"
import { Product, Category } from "@/types"

interface CategoryPageClientProps {
  category: Category
  categories: Category[]
  initialProducts: Product[]
  brands: string[]
}

export function CategoryPageClient({
  category,
  categories,
  initialProducts,
  brands,
}: CategoryPageClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const handleApplyFilters = (filters: any) => {
    let filtered = [...initialProducts]

    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand))
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    if (filters.cameraTypes.length > 0) {
      filtered = filtered.filter((p) =>
        filters.cameraTypes.some(
          (type: string) =>
            p.name.toLowerCase().includes(type.toLowerCase()) ||
            p.type?.toLowerCase().includes(type.toLowerCase())
        )
      )
    }

    if (filters.availability.length > 0 && filters.availability.includes("Available Today")) {
      filtered = filtered.filter((p) => p.isAvailable)
    }

    setFilteredProducts(filtered)

    const count =
      filters.brands.length +
      filters.cameraTypes.length +
      filters.mounts.length +
      filters.availability.length +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0)
    setActiveFilterCount(count)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PLPHeader cartItemCount={0} />
      <CategoryRail categories={categories} activeSlug={category.slug} />

      <div className="w-full max-w-[1320px] mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/rental-equipment" className="hover:text-amber-600 transition-colors">
            Equipment
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-gray-900">{category.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-sm md:text-base text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>

          <FilterButton onClick={() => setIsFilterOpen(true)} activeCount={activeFilterCount} />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1320px] mx-auto">
            {filteredProducts.map((product) => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-gray-500">0</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or browse other categories</p>
              <Link
                href="/rental-equipment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full transition-colors"
              >
                View All Equipment
              </Link>
            </div>
          </div>
        )}
      </div>

      <SmartFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        availableBrands={brands}
        resultCount={filteredProducts.length}
      />

      <div className="h-20 md:hidden" />
    </div>
  )
}
