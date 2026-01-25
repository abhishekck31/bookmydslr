import { fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { AccessoriesClient } from "@/components/accessories-client"

export const dynamic = 'force-dynamic'

export default async function AccessoriesPage() {
  const products = await fetchProducts()
  // Filter for accessories. Assuming non-camera items are accessories for now, 
  // or use a specific category slug if known.
  // The original logic was: !p.category?.name.toLowerCase().includes("camera")
  const accessories = products.filter(p => !p.category?.name.toLowerCase().includes("camera"))

  const settings = await fetchGlobalSettings()

  return <AccessoriesClient initialAccessories={accessories as any} globalSettings={settings} />
}
