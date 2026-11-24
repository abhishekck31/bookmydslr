import { MetadataRoute } from "next"
import { fetchCategories, fetchProducts } from "@/lib/api"
import { marketingLandingPages } from "@/data/seo/landing-pages"
import { PUBLISHED_LOCALITIES, localityPath } from "@/data/seo/localities"
import { siteConfig } from "@/lib/seo/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/camera-rental-bangalore",
    "/rental-equipment",
    "/cameras",
    "/lenses",
    "/accessories",
    "/services",
    "/about",
    "/contact",
    "/how-it-works",
    "/blog",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/camera-rental-bangalore" ? 0.95 : 0.8,
  }))

  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])

  const categoryPages = categories.map((category) => ({
    url: `${siteConfig.url}/rental-equipment/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const productPages = products.map((product) => ({
    url: `${siteConfig.url}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  const marketingPages = marketingLandingPages.map((page) => ({
    url: `${siteConfig.url}/rentals/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  // Drafts are never listed.
  const locationPages = PUBLISHED_LOCALITIES.map((l) => ({
    url: `${siteConfig.url}${localityPath(l)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...marketingPages,
    ...locationPages,
  ]
}
