import { NextResponse } from "next/server"

const locations = [
  "koramangala",
  "indiranagar",
  "whitefield",
  "jayanagar",
  "hsr-layout",
  "marathahalli",
  "btm-layout",
  "malleshwaram",
  "rajajinagar",
  "banashankari",
  "hebbal",
  "yelachenahalli",
  "electronic-city",
  "mg-road",
  "ulsoor",
  "basavanagudi",
  "frazer-town",
  "kalyan-nagar",
  "kr-puram",
  "rt-nagar"
]

export async function GET() {
  const baseUrl = "https://yourdomain.com"
  const staticPages = [
    "",
    "/products",
    "/about",
    "/contact",
    "/terms",
    "/privacy"
  ]
  const locationPages = locations.map(
    (loc) => `/bangalore/${loc}`
  )

  const allPages = [...staticPages, ...locationPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
  </url>
`
  )
  .join("")}
</urlset>
`
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  })
}