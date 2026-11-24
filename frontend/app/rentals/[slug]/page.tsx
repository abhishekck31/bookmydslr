import { notFound } from "next/navigation"
import { fetchProducts } from "@/lib/api"
import { LandingPageTemplate } from "@/components/seo/landing-page-template"
import { JsonLd } from "@/components/seo/json-ld"
import { marketingLandingPages } from "@/data/seo/landing-pages"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
} from "@/lib/seo/schema"
import { pickProducts } from "@/lib/seo/page-content"

export const revalidate = 300

export async function generateStaticParams() {
  return marketingLandingPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = marketingLandingPages.find((item) => item.slug === slug)

  if (!page) {
    return buildMetadata({
      title: "Rental Pages | Book My DSLR",
      description: "Browse SEO landing pages for Book My DSLR rental categories.",
      path: "/rentals",
      noIndex: true,
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/rentals/${page.slug}`,
    keywords: [page.primaryKeyword, ...page.keywordVariants],
  })
}

export default async function MarketingRentalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = marketingLandingPages.find((item) => item.slug === slug)

  if (!page) {
    notFound()
  }

  const products = await fetchProducts()
  const featuredProducts = pickProducts(products, page.filter, 8)

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: page.title,
            description: page.description,
            path: `/rentals/${page.slug}`,
          }),
          buildFaqSchema(page.faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rentals", path: "/rental-equipment" },
            { name: page.h1, path: `/rentals/${page.slug}` },
          ]),
        ]}
      />

      <LandingPageTemplate
        eyebrow="Rentals · Bangalore"
        title={page.h1}
        description={page.description}
        bullets={page.heroBullets}
        products={featuredProducts}
        contentTitle={page.h1}
        contentIntro={page.intro}
        sections={page.sections}
        faqs={page.faqs}
        internalLinks={page.internalLinks}
      />
    </>
  )
}
