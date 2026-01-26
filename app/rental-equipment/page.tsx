import { fetchCategories, fetchProducts } from "@/lib/api"
import { RentalEquipmentListing } from "@/components/rental/rental-equipment-listing"

export const dynamic = 'force-dynamic'

export default async function RentalEquipmentPage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])

  return (
    <RentalEquipmentListing
      initialProducts={products}
      categories={categories}
    />
  )
}
