import { Category, Product } from "@/types"
import {
  FAQItem,
  InternalLink,
  LocationLandingPageConfig,
  ProductFilterRule,
  SeoNarrativeSection,
} from "@/lib/seo/types"

function includesAny(value: string | undefined, candidates: string[] = []) {
  if (!value) return false
  const lowerValue = value.toLowerCase()
  return candidates.some((candidate) => lowerValue.includes(candidate.toLowerCase()))
}

export function matchesProductFilter(product: Product, filter?: ProductFilterRule) {
  if (!filter) return true

  const matchesBrand = !filter.brandIncludes?.length || includesAny(product.brand, filter.brandIncludes)
  const matchesCategory =
    !filter.categoryIncludes?.length || includesAny(product.category?.name, filter.categoryIncludes)
  const matchesName = !filter.nameIncludes?.length || includesAny(product.name, filter.nameIncludes)

  return matchesBrand && matchesCategory && matchesName
}

export function pickProducts(products: Product[], filter?: ProductFilterRule, limit = 8) {
  const filtered = products.filter((product) => matchesProductFilter(product, filter))

  return filtered
    .sort((a, b) => {
      if (a.isAvailable !== b.isAvailable) {
        return a.isAvailable ? -1 : 1
      }

      return a.price - b.price
    })
    .slice(0, limit)
}

export function buildMainCitySections(): SeoNarrativeSection[] {
  return [
    {
      title: "Why camera rental demand in Bangalore is so commercial",
      paragraphs: [
        "People searching for camera rental Bangalore are usually not browsing casually. They are getting ready for a wedding, product shoot, event coverage assignment, YouTube recording day, podcast session, brand campaign, documentary, or college film project. That is why this page is built around real booking intent. It explains which categories matter, how local service works, and how Book My DSLR helps creators book equipment without the cost and risk of buying gear that may only be needed for a few days.",
        "Commercial-intent local SEO works best when the page mirrors the questions a renter asks before calling: Which camera should I book? Can I also rent lenses, drones, lights, and support gear? How fast can I pick up? Do you cover my location in Bangalore? Is the inventory suitable for paid work? By answering those questions directly, this city page becomes both a landing page for search engines and a practical buying guide for photographers, filmmakers, content creators, and production teams.",
      ],
      bullets: [
        "Primary intent: rent camera gear now, not just research",
        "Top audiences: wedding teams, creators, ad-film crews, students, corporate AV teams",
        "Core categories: cameras, lenses, drones, gimbals, lighting, audio, accessories",
      ],
    },
    {
      title: "What people usually need before they book",
      paragraphs: [
        "Some renters know the exact model they want, but many start with a use case. A creator may need a mirrorless body for reels and YouTube. A wedding photographer may need two dependable cameras with a fast zoom pair. A filmmaker may need a broader production kit that includes camera, glass, gimbal, audio, tripod, and lighting support. Bangalore demand is especially diverse because the city mixes startup content work, commercial production, wedding coverage, and a large creator economy. This page helps bridge that gap between search intent and the right inventory path.",
        "That is also why internal links matter. Instead of forcing every visitor into one generic product grid, the site now routes users toward exact-match landing pages for DSLR rental Bangalore, mirrorless camera rental Bangalore, Sony camera rental Bangalore, Canon camera rental Bangalore, lens rental Bangalore, filmmaking equipment rental Bangalore, and neighborhood pages around Kalyan Nagar, Hennur, and other Bangalore demand clusters. Better internal linking improves crawlability, semantic depth, and the conversion journey at the same time.",
      ],
      bullets: [
        "Brand-specific demand: Sony, Canon, Nikon, DJI",
        "Use-case demand: weddings, podcasts, branded content, interviews, short films",
        "Local-intent demand: nearby rental, same-day pickup, quick delivery",
      ],
    },
    {
      title: "Why local trust signals matter for rankings and bookings",
      paragraphs: [
        "For a rental business, proximity and trust are inseparable. Searchers want confidence that the business is real, reachable, and close enough to support an actual production deadline. That is why Book My DSLR needs clear NAP consistency, strong local landing pages, accurate business hours, and content that reflects service across Bangalore neighborhoods. The stronger these local signals are, the easier it becomes to rank for terms like camera rental near me, DSLR rental near me, camera rental Kalyan Nagar Bangalore, and camera rental Hennur Bangalore.",
        "Trust signals also increase conversion once a visitor lands on the page. Transparent location details, visible contact paths, frequently asked questions, and product-first modules all reduce the hesitation that often stops local service pages from converting. SEO does not end at rankings. The page needs to reassure users that the business is responsive, inventory is real, and the booking path is practical for a shoot that may be happening the same day or the next morning.",
      ],
      bullets: [
        "Location trust: address, phone, opening hours, neighborhood relevance",
        "Conversion trust: product modules, FAQs, schema, and internal links",
        "SEO trust: semantically rich local copy plus crawlable page architecture",
      ],
    },
    {
      title: "How this page supports long-term organic growth",
      paragraphs: [
        "This is not meant to be a thin hero page with one paragraph and a CTA. It is the anchor page for Bangalore demand and should accumulate the strongest backlinks, internal links, branded searches, and local authority signals on the site. From here, supporting pages can rank for narrower commercial terms while the main city page continues to capture broader demand. That structure is important if the goal is to rank across dozens of high-intent keywords rather than just a single vanity term.",
        "As the site publishes more blog content, earns backlinks from photography communities, and tightens local business consistency, this city page becomes the hub that distributes authority to all the adjacent pages. That includes location pages, brand pages, category pages, and high-value product pages. The result is a search architecture that can scale toward larger traffic goals while keeping the strongest intent anchored around rental conversion pages.",
      ],
      bullets: [
        "Hub page for Bangalore city-level rental demand",
        "Distributes authority to local, brand, and category landing pages",
        "Supports long-term growth across commercial and local keyword clusters",
      ],
    },
  ]
}

export function buildMainCityFaqs(): FAQItem[] {
  return [
    {
      question: "Which camera categories can I rent in Bangalore?",
      answer:
        "Book My DSLR supports Bangalore renters across DSLR cameras, mirrorless cameras, cinema-oriented video kits, lenses, drones, gimbals, tripods, microphones, lights, flashes, batteries, and other filmmaking accessories. The live inventory modules on the page are designed to bring users close to bookable gear instead of forcing them to guess what might be available.",
    },
    {
      question: "Is Book My DSLR only for professionals?",
      answer:
        "No. The site serves photographers, filmmakers, students, YouTubers, podcasters, wedding teams, agencies, and first-time creators. The commercial pages are written so experienced professionals can move quickly, while newer renters can still understand which gear path fits their shoot.",
    },
    {
      question: "Do you support camera rental near Kalyan Nagar and Hennur?",
      answer:
        "Yes. Kalyan Nagar and Hennur are core local-intent areas for the business, and the site now includes dedicated location landing pages to strengthen local search relevance around those neighborhoods and nearby Bangalore zones.",
    },
    {
      question: "Why is this page longer than a normal category page?",
      answer:
        "Because broad commercial keywords like camera rental Bangalore require more topical depth than a simple product grid. The page needs inventory, local relevance, semantic breadth, FAQs, and internal links to compete for high-intent search demand and help visitors choose the right next step.",
    },
  ]
}

export function buildLocationSections(page: LocationLandingPageConfig): SeoNarrativeSection[] {
  const nearby = page.nearbyAreas.join(", ")
  const landmarks = page.landmarks.join(", ")
  const audience = page.audience.join(", ")

  return [
    {
      title: `Why ${page.name} needs its own local camera rental page`,
      paragraphs: [
        `${page.name} generates a different kind of rental intent than a city-wide page. Searchers here often want something close, practical, and fast. They may be looking for camera rental near me, DSLR rental near me, or a neighborhood-specific result they can trust before a time-sensitive shoot. This page exists to meet that local intent directly and connect it to Book My DSLR's Bangalore inventory and fulfillment model.`,
        `The service angle for ${page.name} is especially relevant because this area overlaps with ${page.serviceAngle}. Nearby demand often flows in from ${nearby}, while landmarks like ${landmarks} shape how people plan pickup, delivery, and shoot logistics. Local SEO works best when pages reflect those real-world patterns rather than generic city copy.`,
      ],
      bullets: [
        `Primary local audience: ${audience}`,
        `Nearby search areas: ${nearby}`,
        `Contextual landmarks: ${landmarks}`,
      ],
    },
    {
      title: "How local landing pages improve conversions",
      paragraphs: [
        `A neighborhood landing page reduces friction because it answers the user's most immediate concern: can this rental service support my location without hassle? For local service businesses, that clarity often matters more than long brand narratives. Users in ${page.name} want to know whether the business is realistic for their schedule, whether support will be quick, and whether they can move from search to rental without multiple back-and-forth steps.`,
        `This page supports that conversion path by combining locally relevant copy with product inventory, FAQs, schema, and internal links to category pages. That helps search engines understand the page is truly location-specific while also helping users move deeper into the site if they need a DSLR page, Sony page, lens page, or the broader Bangalore city page.`,
      ],
      bullets: [
        "Closer location match usually improves click-through and lead quality",
        "Neighborhood pages strengthen map relevance and topical depth",
        "Internal links route the user into the exact gear category they need",
      ],
    },
    {
      title: `Who typically rents camera gear around ${page.name}`,
      paragraphs: [
        `The most common search demand around ${page.name} comes from ${audience}. Some need one-day rentals for events, while others need multiple days for creator content, commercial production, or client projects. This means the page must serve both urgency and clarity: enough detail to help the renter decide, but not so much friction that they abandon the process before reaching the inventory or contact stage.`,
        `Because this page sits inside a broader Bangalore SEO cluster, it also helps the site rank for many variations of the same local query. Instead of relying on a single city page to carry every neighborhood phrase, Book My DSLR can build stronger local authority with pages that reflect how renters actually search across Bangalore.`,
      ],
      bullets: [
        "Local-event and wedding demand",
        "Creator and studio demand",
        "Student and first-time renter demand",
      ],
    },
  ]
}

export function buildLocationFaqs(page: LocationLandingPageConfig): FAQItem[] {
  return [
    {
      question: `Do you support camera rental near ${page.name}?`,
      answer:
        `Yes. This page is designed specifically for users searching in and around ${page.name}. It supports local-intent queries while keeping visitors close to the same live rental catalog used across the main Bangalore site.`,
    },
    {
      question: `Which nearby areas does this page cover beyond ${page.name}?`,
      answer:
        `The page is also relevant for nearby demand from ${page.nearbyAreas.join(", ")}. That helps capture hyperlocal searches where users still expect practical Bangalore pickup and delivery support.`,
    },
    {
      question: "What kind of shoots usually drive local rentals here?",
      answer:
        `Common demand around this area includes ${page.audience.join(", ")}, along with event coverage, creator shoots, and project-based rentals where buying gear makes less sense than short-term access.`,
    },
    {
      question: "Why not just use the city page for all areas?",
      answer:
        "Because neighborhood-specific pages often perform better for local-intent searches and provide more relevant context for the user. They also strengthen the site’s internal linking structure and local SEO footprint across Bangalore.",
    },
  ]
}

export function buildCollectionSections({
  title,
  categoryLabel,
  audience,
}: {
  title: string
  categoryLabel: string
  audience: string
}): SeoNarrativeSection[] {
  return [
    {
      title: `How ${title.toLowerCase()} supports commercial-intent SEO`,
      paragraphs: [
        `${title} pages do more than display products. They help search engines connect the site with purchase-ready users looking for ${categoryLabel} in Bangalore. That means the page needs keyword relevance, category depth, supportive semantic language, and enough explanatory content to answer what kind of shoots the inventory is suitable for.`,
        `This collection is especially important for ${audience}. Some visitors arrive with an exact model in mind. Others are still comparing categories and need context before they book. The long-form content beneath the collection helps the page rank for broader queries while the product grid serves people who are already ready to move forward.`,
      ],
      bullets: [
        `Primary category intent: ${categoryLabel}`,
        `Primary audience: ${audience}`,
        "Supporting value: category depth, FAQs, and internal links",
      ],
    },
    {
      title: "Why these category pages need more than just a grid",
      paragraphs: [
        "Search engines increasingly reward pages that demonstrate genuine topical understanding. A thin grid does not explain use cases, local service expectations, or how a renter should choose between options. Adding structured commercial copy, FAQs, and supporting links helps the category page rank for more variants while also improving engagement and conversion quality.",
        "For a rental business, this matters even more because one product category often leads to another. A camera booking may also require a lens, tripod, gimbal, mic, flash, or lighting accessory. The page structure should anticipate that behavior and create clean internal pathways deeper into the catalog.",
      ],
      bullets: [
        "Category pages attract both search engines and ready-to-book users",
        "Supporting content expands relevance beyond one exact keyword",
        "Cross-links encourage higher-value multi-item rentals",
      ],
    },
  ]
}

export function buildCollectionFaqs(categoryLabel: string): FAQItem[] {
  return [
    {
      question: `What kind of ${categoryLabel.toLowerCase()} can I rent here?`,
      answer:
        `This collection is designed to surface the most relevant ${categoryLabel.toLowerCase()} currently available on the site, while also helping visitors move into adjacent categories when they need a more complete kit.`,
    },
    {
      question: "Is this page optimized only for SEO or for actual booking intent too?",
      answer:
        "Both. The goal is to combine real inventory, strong category relevance, and practical answers so the page ranks for high-intent searches and still helps visitors make a booking decision.",
    },
    {
      question: "Can I pair products from this category with other gear?",
      answer:
        "Yes. The internal linking structure is deliberately built to guide users into related pages for cameras, lenses, accessories, and broader rental equipment so they can assemble a complete shoot-ready setup.",
    },
  ]
}

export function buildProductSections(product: Product): SeoNarrativeSection[] {
  const category = product.category?.name ?? "camera gear"

  return [
    {
      title: `Why rent ${product.name} instead of buying it`,
      paragraphs: [
        `Many users reach a product page like this because they already know the model or because they are comparing whether to rent or buy. For shoots with limited frequency, short production timelines, or one-off client requirements, renting ${product.name} is often the smarter commercial decision. It reduces upfront cost, keeps capital flexible, and gives photographers or filmmakers access to project-specific gear without a long-term ownership burden.`,
        `That matters even more in Bangalore’s creator and production economy, where different jobs demand different setups. A wedding assignment, product shoot, interview day, or branded content piece may justify this exact model for a few days but not as a permanent purchase. That makes a product page like this valuable for both SEO and conversion, especially when it includes the model name, category, pricing context, and related gear paths.`,
      ],
      bullets: [
        `Product: ${product.name}`,
        `Category: ${category}`,
        `Brand: ${product.brand || "Available brand"}`,
      ],
    },
    {
      title: `How ${product.name} fits real shoot scenarios`,
      paragraphs: [
        `${product.name} is best understood in the context of the jobs it helps complete. Product pages rank better and convert better when they describe who the gear is suitable for, what kinds of productions it supports, and how it fits into a broader rental kit. That is why this page is not limited to a title and price. It is positioned as a commercial landing page for renters comparing options before reaching out or adding the item to cart.`,
        `The most effective product pages also connect visitors to adjacent pages that help complete the booking. A camera body leads naturally into lens rental, support gear, batteries, and location pages. A lens page may lead into compatible camera bodies. A gimbal or accessory page may lead into creator kits and filmmaking equipment pages. Those internal links strengthen the product’s SEO value while making the browsing path more useful.`,
      ],
      bullets: [
        "Commercial use cases: events, branded content, creator shoots, short productions",
        "Category-based internal links help users complete the rental kit",
        "Long-form product copy improves topical depth beyond a basic catalog entry",
      ],
    },
  ]
}

export function buildProductFaqs(product: Product): FAQItem[] {
  return [
    {
      question: `Can I rent ${product.name} for a one-day shoot?`,
      answer:
        "Yes. Product pages are built to support both one-day and multi-day demand, depending on the rental plan you confirm with the team. One-day demand is especially common for creator shoots, events, and urgent commercial assignments.",
    },
    {
      question: `What else should I rent with ${product.name}?`,
      answer:
        "That depends on the shoot, but related products often include compatible lenses, batteries, memory cards, tripods, gimbals, microphones, flashes, or lighting gear. Product pages should guide users toward a fuller rental kit rather than treating each item as isolated.",
    },
    {
      question: "Why does this product page include long-form content?",
      answer:
        "Because model-specific searches are often high-intent. Adding contextual content, FAQs, structured data, and related links helps the page rank for product-led searches while still giving renters the information they need before booking.",
    },
  ]
}

export function buildCategoryLinks(category?: Category): InternalLink[] {
  const label = category?.name ?? "Rental Equipment"

  return [
    { href: "/camera-rental-bangalore", label: "Camera Rental Bangalore", description: "The main city landing page for high-intent rental searches." },
    { href: "/rental-equipment", label: "All Rental Equipment", description: `Go beyond ${label} and browse the full inventory.` },
    { href: "/contact", label: "Need a Custom Kit?", description: "Reach out for help building a project-specific rental setup." },
  ]
}
