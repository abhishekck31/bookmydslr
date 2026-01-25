import { MetadataRoute } from 'next'

const locations = [
  "koramangala", "indiranagar", "whitefield", "jayanagar", "hsr-layout",
  "marathahalli", "btm-layout", "malleshwaram", "rajajinagar", "banashankari",
  "hebbal", "yelachenahalli", "electronic-city", "mg-road", "ulsoor",
  "basavanagudi", "frazer-town", "kalyan-nagar", "kr-puram", "rt-nagar"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bookmydslr.com"; // Make sure this is your correct domain

  const staticPages = [
    "", "/rental-equipment", "/cameras", "/lenses", "/accessories", "/about", "/contact", "/terms", "/privacy"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const locationPages = locations.map((loc) => ({
    url: `${baseUrl}/bangalore/${loc}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...locationPages];
}