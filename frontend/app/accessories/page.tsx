import { fetchCategories, fetchProducts } from "@/lib/api"
import { ProductBrowser } from "@/components/film/product-browser"
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
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])
  const accessories = products.filter((product) => {
    const categoryName = product.category?.name.toLowerCase() ?? ""
    return !categoryName.includes("camera") && !categoryName.includes("lens")
  })


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
      <ProductBrowser
        products={accessories}
        categories={categories}
        title="Accessories to rent"
        titleEmphasis="Accessories"
        intro="Gimbals, drones, lights, mics, tripods, monitors and power — everything that turns a body into a working kit."
        breadcrumb={[{ href: "/", label: "Home" }, { href: "/accessories", label: "Accessories" }]}
      />
      <SeoContent
        eyebrow="The long read"
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
