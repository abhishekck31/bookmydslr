import { Product } from "@/types"
import { absoluteUrl } from "@/lib/seo/metadata"
import { siteConfig } from "@/lib/seo/site"
import { BreadcrumbItem, FAQItem } from "@/lib/seo/types"

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.defaultOgImage),
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    sameAs: [...siteConfig.social],
  }
}

export function buildLocalBusinessSchema(pagePath = "/") {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store", "ProfessionalService"],
    "@id": `${absoluteUrl(pagePath)}#localbusiness`,
    name: siteConfig.name,
    image: absoluteUrl(siteConfig.defaultOgImage),
    url: absoluteUrl(pagePath),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    priceRange: "INR 300-10000",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    openingHours: siteConfig.businessHours,
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [...siteConfig.social],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.aggregateRating.ratingValue,
      reviewCount: siteConfig.aggregateRating.reviewCount,
    },
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildFaqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: absoluteUrl("/"),
  }
}

export function buildProductSchema(product: Product, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : undefined,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    category: product.category?.name,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(path),
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      itemCondition: "https://schema.org/UsedCondition",
      eligibleRegion: {
        "@type": "Country",
        name: "India",
      },
    },
    aggregateRating:
      product.rating && product.reviews
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          }
        : undefined,
  }
}
