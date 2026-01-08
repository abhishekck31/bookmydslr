import { notFound } from "next/navigation"
import { accessories } from "@/data/accessories"
import { AccessoryDetailClient } from "@/components/accessory-detail-client"

export default async function AccessoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  // Find the accessory by ID (string comparison since accessory IDs might be strings)
  const accessory = accessories.find((a) => a.id.toString() === resolvedParams.id)

  // If accessory not found, show 404
  if (!accessory) {
    notFound()
  }

  return <AccessoryDetailClient accessory={accessory} />
}
