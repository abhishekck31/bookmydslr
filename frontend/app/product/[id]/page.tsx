import { fetchProduct, fetchProducts, fetchGlobalSettings } from "@/lib/api"
import { notFound } from "next/navigation"
import { ProductClient } from "@/components/product-client"
import { JsonLd } from "@/components/seo/json-ld"
import { SeoContent } from "@/components/seo/seo-content"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildProductSchema,
} from "@/lib/seo/schema"
import { buildCategoryLinks, buildProductFaqs, buildProductSections } from "@/lib/seo/page-content"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await fetchProduct(id)

  if (!product) {
    return buildMetadata({
      title: "Product Rental | Book My DSLR",
      description: "Product page not found.",
      path: `/product/${id}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: `${product.name} Rental Bangalore | Book My DSLR`,
    description: `${product.name} available for rent in Bangalore. View pricing, availability, related gear, and booking support from Book My DSLR.`,
    path: `/product/${product.id}`,
    keywords: [
      `${product.name} rental Bangalore`,
      `${product.brand} ${product.category?.name ?? "camera"} rental Bangalore`,
      "camera rental Bangalore",
    ],
  })
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const product = await fetchProduct(id)

    if (!product) {
      notFound()
    }

    const allProducts = await fetchProducts()
    const relatedProducts = allProducts
      .filter(p => p.category?.id === product.category?.id && p.id !== id)
      .slice(0, 4);

    const globalSettings = await fetchGlobalSettings()
    const faqs = buildProductFaqs(product)

    return (
      <>
        <JsonLd
          data={[
            buildProductSchema(product, `/product/${product.id}`),
            buildFaqSchema(faqs),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Rental Equipment", path: "/rental-equipment" },
              { name: product.category?.name ?? "Product", path: `/rental-equipment/${product.category?.slug ?? ""}` },
              { name: product.name, path: `/product/${product.id}` },
            ]),
          ]}
        />
        <ProductClient
          product={product as any}
          relatedProducts={relatedProducts as any}
          globalSettings={globalSettings}
        />
        <SeoContent
          eyebrow="Product SEO"
          title={`${product.name} rental in Bangalore`}
          intro={`${product.name} now has a richer product landing page so it can rank for model-specific rental searches while still helping users choose the right add-ons and next steps.`}
          sections={buildProductSections(product)}
          faqs={faqs}
          links={buildCategoryLinks(product.category)}
        />
      </>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}
