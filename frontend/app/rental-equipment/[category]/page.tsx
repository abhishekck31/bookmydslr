import { notFound } from "next/navigation"
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
import {
  buildCategoryLinks,
  buildCollectionFaqs,
  buildCollectionSections,
} from "@/lib/seo/page-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  const categories = await fetchCategories()
  const category = categories.find((item) => item.slug === categorySlug)

  if (!category) {
    return buildMetadata({
      title: "Rental Equipment | Book My DSLR",
      description: "Browse rental equipment categories.",
      path: "/rental-equipment",
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${category.name} Rental Bangalore | Book My DSLR`,
    description: `Rent ${category.name.toLowerCase()} in Bangalore with fast support, flexible plans, and verified gear from Book My DSLR.`,
    path: `/rental-equipment/${category.slug}`,
    keywords: [
      `${category.name} rental Bangalore`,
      `${category.name.toLowerCase()} on rent Bangalore`,
      "camera rental Bangalore",
    ],
  })
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const resolvedParams = await params
  const categorySlug = resolvedParams.category
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])
  const category = categories.find((item) => item.slug === categorySlug)

  if (!category) {
    return notFound()
  }

  const categoryProducts = products.filter((product) => product.category?.slug === categorySlug)
  const faqs = buildCollectionFaqs(category.name)

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: `${category.name} Rental Bangalore | Book My DSLR`,
            description: `Rent ${category.name.toLowerCase()} in Bangalore with live inventory and local support.`,
            path: `/rental-equipment/${category.slug}`,
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rental Equipment", path: "/rental-equipment" },
            { name: category.name, path: `/rental-equipment/${category.slug}` },
          ]),
        ]}
      />

      <ProductBrowser
        products={categoryProducts}
        categories={categories}
        currentCategorySlug={category.slug}
        title={category.name}
        intro={`${categoryProducts.length} ${categoryProducts.length === 1 ? "item" : "items"} in ${category.name}, rented by the day with pickup from Kalyan Nagar or delivery across Bangalore.`}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/rental-equipment", label: "All gear" },
          { href: `/rental-equipment/${category.slug}`, label: category.name },
        ]}
      />

      <SeoContent
        eyebrow="The long read"
        title={`${category.name} rentals in Bangalore`}
        intro={`This category page is optimized to help Book My DSLR rank for ${category.name.toLowerCase()} rental searches in Bangalore while still giving ready-to-book users direct access to inventory.`}
        sections={buildCollectionSections({
          title: category.name,
          categoryLabel: `${category.name.toLowerCase()} rental Bangalore`,
          audience: "photographers, filmmakers, creators, and production teams",
        })}
        faqs={faqs}
        links={buildCategoryLinks(category)}
      />
    </>
  )
}
