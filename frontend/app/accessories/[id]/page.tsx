import { permanentRedirect } from "next/navigation"

// Legacy detail URL — the canonical product page lives at /product/[id].
export default async function LegacyDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  permanentRedirect(`/product/${id}`)
}
