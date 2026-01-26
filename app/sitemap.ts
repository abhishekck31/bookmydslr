import { MetadataRoute } from 'next'
import { fetchCategories, fetchProducts } from '@/lib/api'

// SEO Landing Pages for Bangalore Locations
const locations = [
  "koramangala", "indiranagar", "whitefield", "jayanagar", "hsr-layout",
  "marathahalli", "btm-layout", "malleshwaram", "rajajinagar", "banashankari",
  "hebbal", "yelachenahalli", "electronic-city", "mg-road", "ulsoor",
  "basavanagudi", "frazer-town", "kalyan-nagar", "kr-puram", "rt-nagar"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bookmydslr.com";

  // 1. Static Pages
  const staticPages = [
    "",
    "/rental-equipment",
    "/services",
    "/about",
    "/contact",
    "/terms"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Fetch Dynamic Data
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts()
  ]);

  // 3. Category Pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/rental-equipment?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Product Pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(), // Ideally this would be product.updatedAt if available
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 5. Location Pages (SEO)
  const locationPages = locations.map((loc) => ({
    url: `${baseUrl}/camera-rental-bangalore/${loc}`, // Updated to likely SEO URL pattern if known, or keep generic
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...locationPages
  ];
}