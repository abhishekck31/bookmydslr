import { fetchCategories, fetchProducts } from "@/lib/api"
import { RentalEquipmentListing } from "@/components/rental/rental-equipment-listing"
import { JsonLd } from "@/components/seo/json-ld"
import { HomeSeoAccordion } from "@/components/homepage/home-seo-accordion"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
} from "@/lib/seo/schema"
import { buildCategoryLinks, buildCollectionFaqs, buildCollectionSections } from "@/lib/seo/page-content"

export const revalidate = 300

const faqs = buildCollectionFaqs("Rental Equipment")

export const metadata = buildMetadata({
  title: "Rental Equipment Bangalore | Book My DSLR",
  description:
    "Browse camera, lens, drone, lighting, audio, and filmmaking equipment rentals in Bangalore from Book My DSLR.",
  path: "/rental-equipment",
  keywords: [
    "rental equipment Bangalore",
    "camera gear rental Bangalore",
    "filmmaking equipment rental Bangalore",
    "photography equipment rental Bangalore",
  ],
})

export default async function RentalEquipmentPage() {
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Rental Equipment Bangalore | Book My DSLR",
            description:
              "Browse camera, lens, drone, lighting, audio, and filmmaking equipment rentals in Bangalore.",
            path: "/rental-equipment",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rental Equipment", path: "/rental-equipment" },
          ]),
        ]}
      />
      <RentalEquipmentListing initialProducts={products} categories={categories} />
      <HomeSeoAccordion
        triggerLabel="Learn more about rental equipment in Bangalore"
        title="Rental equipment in Bangalore for photography, video, and production"
        intro="This inventory hub is designed to rank for broader equipment rental searches while helping visitors filter directly into the categories and products they need."
        sections={buildCollectionSections({
          title: "Rental Equipment",
          categoryLabel: "camera gear rental Bangalore",
          audience: "photographers, filmmakers, creators, event teams, and agencies",
        })}
        faqs={faqs}
        links={buildCategoryLinks()}
      />
    </>
  )
}
