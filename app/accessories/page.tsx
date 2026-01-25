import { fetchAPI } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { AccessoriesClient } from "@/components/accessories-client"

export const dynamic = 'force-dynamic'

export default async function AccessoriesPage() {
  const products = await fetchAPI<Product[]>('/products') || []
  const accessories = products.filter(p => !p.category?.name.toLowerCase().includes("camera"))
  const settings = await fetchAPI<GlobalSettings>('/settings/global')

  return <AccessoriesClient initialAccessories={accessories as any} globalSettings={settings} />
}
