import { fetchAPI } from "@/lib/api"
import { Product, GlobalSettings } from "@/types"
import { CamerasClient } from "@/components/cameras-client"

export const dynamic = 'force-dynamic'

export default async function CamerasPage() {
  const products = await fetchAPI<Product[]>('/products') || []
  const cameras = products.filter(p => p.category?.name.toLowerCase().includes("camera"))
  const settings = await fetchAPI<GlobalSettings>('/settings/global')

  return <CamerasClient initialCameras={cameras} globalSettings={settings} />
}
