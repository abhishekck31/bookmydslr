import { fetchAPI } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { LensesClient } from "@/components/lenses-client"

export const dynamic = 'force-dynamic'

export default async function LensesPage() {
  const products = await fetchAPI<Product[]>('/products') || []
  const lenses = products.filter(p => p.category?.name.toLowerCase().includes("lens"))
  const settings = await fetchAPI<GlobalSettings>('/settings/global')

  return <LensesClient initialLenses={lenses as any} globalSettings={settings} />
}
