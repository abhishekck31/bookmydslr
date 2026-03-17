import { fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { CamerasClient } from "@/components/cameras-client"
import { JsonLd } from "@/components/seo/json-ld"
import { SeoContent } from "@/components/seo/seo-content"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
} from "@/lib/seo/schema"
import { buildCategoryLinks, buildCollectionFaqs, buildCollectionSections } from "@/lib/seo/page-content"

export const revalidate = 300

const faqs = buildCollectionFaqs("Camera Collection")

export const metadata = buildMetadata({
  title: "Camera Rental Bangalore | Camera Collection",
  description:
    "Browse DSLR and mirrorless camera rentals in Bangalore with verified gear, flexible plans, and fast support.",
  path: "/cameras",
  keywords: ["camera rental Bangalore", "DSLR rental Bangalore", "mirrorless camera rental Bangalore"],
})

export default async function CamerasPage() {
  const products = await fetchProducts()
  const cameras = products.filter(p => p.category?.name?.toLowerCase().includes("camera"))
  const settings = await fetchGlobalSettings()

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Rental Bangalore | Camera Collection",
            description:
              "Browse DSLR and mirrorless camera rentals in Bangalore with verified gear and flexible plans.",
            path: "/cameras",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cameras", path: "/cameras" },
          ]),
        ]}
      />
      <CamerasClient initialCameras={cameras} globalSettings={settings} />
      <SeoContent
        eyebrow="Camera Category"
        title="Camera rentals in Bangalore for creators and professionals"
        intro="The camera collection page now supports both browse intent and high-intent search demand for DSLR and mirrorless camera rental in Bangalore."
        sections={buildCollectionSections({
          title: "Camera Collection",
          categoryLabel: "camera rental Bangalore",
          audience: "creators, wedding teams, photographers, filmmakers, and students",
        })}
        faqs={faqs}
        links={buildCategoryLinks({ id: "camera", name: "Cameras", slug: "cameras" })}
      />
    </>
  )
}
