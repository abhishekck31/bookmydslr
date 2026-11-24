import { Product } from "@/types"
import { absoluteUrl } from "@/lib/seo/metadata"
import { siteConfig } from "@/lib/seo/site"
import { BreadcrumbItem, FAQItem } from "@/lib/seo/types"
import { PUBLISHED_LOCALITIES, localityPath } from "@/data/seo/localities"

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

/** The one physical location (Kalyan Nagar). Every page refers to this same entity. */
export const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildLocalBusinessSchema(_pagePath = "/") {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store", "ProfessionalService"],
    "@id": LOCAL_BUSINESS_ID,
    name: siteConfig.name,
    image: absoluteUrl(siteConfig.defaultOgImage),
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    priceRange: "INR 300-10000",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    openingHours: siteConfig.businessHours,
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      ...PUBLISHED_LOCALITIES.map((l) => ({ "@type": "Place", name: `${l.name}, Bangalore`, url: absoluteUrl(localityPath(l)) })),
    ],
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

/** A locality page: a WebPage about renting in that area, provided by the single business. */
export function buildLocalityPageSchema({
  name,
  description,
  path,
  areaName,
}: {
  name: string
  description: string
  path: string
  areaName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name },
    about: {
      "@type": "Service",
      name: `Camera and equipment rental in ${areaName}, Bangalore`,
      serviceType: "Camera rental",
      provider: { "@id": LOCAL_BUSINESS_ID },
      areaServed: { "@type": "Place", name: `${areaName}, Bangalore` },
    },
  }
}

/** Real products shown on a page, as an ItemList pointing at each product page. */
export function buildProductListSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/product/${p.id}`),
      name: p.name,
    })),
  }
}
