import { fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { AccessoriesClient } from "@/components/accessories-client"
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

const faqs = buildCollectionFaqs("Accessories Collection")

export const metadata = buildMetadata({
  title: "Camera Accessories Rental Bangalore | Book My DSLR",
  description:
    "Rent gimbals, drones, lights, mics, tripods, flashes, batteries, and camera accessories in Bangalore.",
  path: "/accessories",
  keywords: [
    "camera accessories rental Bangalore",
    "filmmaking accessories rental Bangalore",
    "photography equipment rental Bangalore",
  ],
})

export default async function AccessoriesPage() {
  const products = await fetchProducts()
  const accessories = products.filter((product) => {
    const categoryName = product.category?.name.toLowerCase() ?? ""
    return !categoryName.includes("camera") && !categoryName.includes("lens")
  })

  const settings = await fetchGlobalSettings()

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Accessories Rental Bangalore | Book My DSLR",
            description:
              "Rent gimbals, drones, lights, mics, tripods, flashes, batteries, and camera accessories in Bangalore.",
            path: "/accessories",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Accessories", path: "/accessories" },
          ]),
        ]}
      />
      <AccessoriesClient initialAccessories={accessories as any} globalSettings={settings} />
      <SeoContent
        eyebrow="Accessory Category"
        title="Accessory rentals in Bangalore for complete shoot-ready kits"
        intro="Accessories often decide whether a rental booking is complete enough for the shoot. This page is optimized to rank for support-gear searches while encouraging higher-value bundled rentals."
        sections={buildCollectionSections({
          title: "Accessories Collection",
          categoryLabel: "camera accessories rental Bangalore",
          audience: "creators, photographers, production teams, and event crews",
        })}
        faqs={faqs}
        links={buildCategoryLinks({ id: "accessories", name: "Accessories", slug: "accessories" })}
      />
    </>
  )
}
