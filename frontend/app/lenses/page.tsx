import { fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { LensesClient } from "@/components/lenses-client"
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

const faqs = buildCollectionFaqs("Lens Collection")

export const metadata = buildMetadata({
  title: "Lens Rental Bangalore | Lens Collection",
  description:
    "Browse camera lens rentals in Bangalore for portraits, weddings, wildlife, interviews, and filmmaking projects.",
  path: "/lenses",
  keywords: ["lens rental Bangalore", "camera lens rental Bangalore", "Canon lens rental Bangalore"],
})

export default async function LensesPage() {
  const products = await fetchProducts()
  const lenses = products.filter(p => p.category?.name?.toLowerCase().includes("lens"))
  const settings = await fetchGlobalSettings()

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Lens Rental Bangalore | Lens Collection",
            description:
              "Browse lens rentals in Bangalore for portraits, weddings, wildlife, and filmmaking projects.",
            path: "/lenses",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lenses", path: "/lenses" },
          ]),
        ]}
      />
      <LensesClient initialLenses={lenses as any} globalSettings={settings} />
      <SeoContent
        eyebrow="Lens Category"
        title="Lens rentals in Bangalore for photo and video teams"
        intro="This lens collection page is structured to rank for high-intent lens rental searches while helping users quickly compare the inventory they need for portraits, events, and productions."
        sections={buildCollectionSections({
          title: "Lens Collection",
          categoryLabel: "lens rental Bangalore",
          audience: "wedding teams, portrait photographers, creators, and filmmakers",
        })}
        faqs={faqs}
        links={buildCategoryLinks({ id: "lens", name: "Lenses", slug: "lenses" })}
      />
    </>
  )
}
