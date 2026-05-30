import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/camera-rental-bangalore",
          "/rentals/",
          "/rental-equipment",
          "/cameras",
          "/lenses",
          "/accessories",
          "/about",
          "/services",
          "/contact",
          "/how-it-works",
          "/blog",
        ],
        disallow: [
          "/admin/",
          "/cart",
          "/login",
          "/register",
          "/test-animation",
          "/data-management-guide",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
