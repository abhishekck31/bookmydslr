import { fetchCategories, fetchProducts } from "@/lib/api"
import { ProductBrowser } from "@/components/rental/product-browser"


export const dynamic = 'force-dynamic'

export default async function RentalEquipmentPage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])

  return (
    <>
      <ProductBrowser initialProducts={products} categories={categories} />
    </>
  )
}
