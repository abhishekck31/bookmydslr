import {
  LocationLandingPageConfig,
  MarketingLandingPageConfig,
  SeoNarrativeSection,
} from "@/lib/seo/types"

function buildIntentSections(config: {
  primaryKeyword: string
  keywordVariants: string[]
  gear: string[]
  audience: string[]
  locations: string[]
}): SeoNarrativeSection[] {
  const keywordList = config.keywordVariants.join(", ")
  const gearList = config.gear.join(", ")
  const audienceList = config.audience.join(", ")
  const locationList = config.locations.join(", ")

  return [
    {
      title: `Why ${config.primaryKeyword} converts so strongly`,
      paragraphs: [
        `Searches for ${config.primaryKeyword} are bottom-funnel because users are usually planning a shoot, comparing availability, or checking whether a rental house can deliver quickly enough for their project. This page is built around that intent. Instead of generic brand storytelling, it focuses on booking speed, rental flexibility, relevant categories, and the kinds of kits that photographers, filmmakers, and creators actually need. That makes the content more useful for visitors and more relevant for search engines evaluating commercial intent.`,
        `The page also supports the head term with semantically related phrases like ${keywordList}. That helps Book My DSLR compete for adjacent queries without repeating the same keyword unnaturally. Strong rental SEO pages do more than say "rent a camera"; they explain which gear is suitable, who the service is built for, how pickup or delivery works, and why the equipment is trustworthy enough for paid work. That is the purpose of this landing page.`,
      ],
      bullets: [
        `Primary search target: ${config.primaryKeyword}`,
        `Supporting semantic phrases: ${keywordList}`,
        "Core conversion signals: availability, local fulfillment, clear next steps",
      ],
    },
    {
      title: "Recommended gear categories and booking patterns",
      paragraphs: [
        `People looking for this service are rarely searching for one universal product. A student filmmaker may only need a body, one lens, and a tripod. A wedding team may need dual cameras, a 24-70mm, a 70-200mm, flashes, batteries, memory cards, and a backup option. A creator may prioritize autofocus, portability, and one good audio setup. That is why these pages stay closely connected to bookable inventory such as ${gearList}.`,
        `The strongest commercial pages help visitors self-segment quickly. Some renters are price-sensitive and need a practical one-day kit. Others need dependable premium gear because they are shooting for paying clients. By mapping the page content to ${audienceList}, Book My DSLR can rank for broader demand while still answering the more specific questions that make people convert.`,
      ],
      bullets: [
        "Creator kits: lightweight, simple, fast to deploy",
        "Wedding kits: backup bodies, zooms, flashes, batteries",
        "Production kits: camera, lenses, audio, stabilization, and support gear",
      ],
    },
    {
      title: "How local service quality affects SEO and conversions",
      paragraphs: [
        `Camera rental is a local service even when the search term sounds product-focused. Renters want to know whether the pickup point is practical, whether delivery is possible, how late support is available, and whether a team will respond when a shoot changes last minute. That is why these pages mention Bangalore-specific service strength across ${locationList}. Local detail is not filler. It helps search engines connect the page to map and neighborhood intent, and it helps users trust that the business can genuinely fulfill the booking.`,
        `This is also why the internal linking structure matters. Broad pages lead into city pages, location pages, brand pages, and category pages so users can narrow from discovery to intent with fewer clicks. The result is stronger crawl depth, better topical clustering, and a smoother path to inquiry. For a high-intent business like camera rentals, those structural improvements support rankings and revenue together.`,
      ],
      bullets: [
        "Local relevance increases click-through rate on commercial searches",
        "Internal links move users from broad intent to exact-match landing pages",
        "Address, service hours, and neighborhood mentions strengthen trust",
      ],
    },
    {
      title: "What makes a rental page rank and still help real customers",
      paragraphs: [
        `High-performing SEO pages for rentals need to balance discoverability with usefulness. Thin pages that only repeat a phrase like camera rental Bangalore do not help a renter decide what to book, and product grids without context often fail to rank for broader searches. The best-performing structure is a hybrid page: product inventory near the top for ready-to-book users, followed by long-form content that answers the questions people ask before contacting the business.`,
        `That is the model used here. The content explains who the page is for, what kinds of shoots it supports, how to think about gear selection, why local fulfillment matters, and which related pages answer more specific questions. This turns the landing page into a long-term acquisition asset instead of a thin SEO placeholder. For a growth target like ranking across high-intent rental keywords in Bangalore, this content model is essential.`,
      ],
      bullets: [
        "Long-form copy improves semantic depth and topical authority",
        "Product modules capture users who are already ready to book",
        "FAQ blocks support rich results and reduce inquiry friction",
      ],
    },
  ]
}

function buildIntentFaqs(config: {
  primaryKeyword: string
  gearLabel: string
}): MarketingLandingPageConfig["faqs"] {
  return [
    {
      question: `How quickly can I book ${config.primaryKeyword}?`,
      answer:
        "Most renters can shortlist gear, confirm availability, and complete the booking process quickly once shoot dates are fixed. For urgent Bangalore shoots, the fastest path is to review the listed inventory, contact the team with dates, and confirm pickup or delivery from the Kalyan Nagar location.",
    },
    {
      question: `What kind of ${config.gearLabel} is available for rent?`,
      answer:
        "Book My DSLR focuses on real production-ready gear such as DSLR bodies, mirrorless cameras, cinema cameras, professional lenses, drones, gimbals, tripods, lighting accessories, microphones, and support equipment. The exact product mix can change, which is why these landing pages are paired with live inventory modules.",
    },
    {
      question: "Do you offer one-day and multi-day rental plans?",
      answer:
        "Yes. Daily rentals are important for price-led searches and urgent one-day shoots, while multi-day plans are commonly needed for weddings, ad films, documentaries, and corporate productions. Flexible rental duration is a major conversion factor for commercial-intent searchers.",
    },
    {
      question: "Can students and first-time creators rent equipment?",
      answer:
        "Yes. Student filmmakers, photographers, YouTubers, and first-time renters are a key audience for these pages. The content is written to help newer renters choose the right setup without overbooking, while still offering enough depth for experienced professionals.",
    },
    {
      question: "Why is this page optimized for commercial search intent?",
      answer:
        "Because it mirrors what real renters need before booking: category clarity, local service confidence, product relevance, pricing context, FAQs, and strong internal links to the next-best page. That alignment is what helps SEO and conversion performance work together.",
    },
  ]
}

export const marketingLandingPages: MarketingLandingPageConfig[] = [
  {
    slug: "dslr-camera-rental-bangalore",
    title: "DSLR Camera Rental Bangalore | Book My DSLR",
    description: "Rent DSLR cameras in Bangalore with flexible daily plans, verified gear, and fast pickup from Kalyan Nagar.",
    h1: "DSLR Camera Rental in Bangalore",
    intro: "Find reliable DSLR camera rentals for weddings, events, creator shoots, photography practice, and college projects across Bangalore.",
    primaryKeyword: "DSLR camera rental Bangalore",
    keywordVariants: ["DSLR rental Bangalore", "cheap DSLR rental Bangalore", "camera on rent Bangalore"],
    heroBullets: [
      "Daily DSLR rentals for weddings, college shoots, and events",
      "Canon and Nikon DSLR bodies with lens add-ons",
      "Pickup from Kalyan Nagar and service across Bangalore",
    ],
    filter: {
      categoryIncludes: ["camera"],
      nameIncludes: ["canon", "nikon", "dslr", "eos", "d3", "d5", "d7", "1200", "1500", "700d", "80d"],
    },
    sections: buildIntentSections({
      primaryKeyword: "DSLR camera rental Bangalore",
      keywordVariants: ["DSLR rental Bangalore", "cheap DSLR rental Bangalore", "camera on rent Bangalore"],
      gear: ["entry-level DSLR bodies", "mid-range DSLR kits", "portrait lenses", "tripods"],
      audience: ["students", "wedding photographers", "event shooters", "new creators"],
      locations: ["Kalyan Nagar", "Hennur", "Koramangala", "Indiranagar"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "DSLR camera rental Bangalore", gearLabel: "DSLR cameras and accessories" }),
    internalLinks: [
      { href: "/cameras", label: "All Cameras", description: "Browse the broader camera rental inventory." },
      { href: "/rentals/cheap-dslr-rental-bangalore", label: "Budget DSLR Rentals", description: "Lower-cost DSLR options for one-day shoots and students." },
      { href: "/rentals/lens-rental-bangalore", label: "Lens Rental Bangalore", description: "Pair DSLR bodies with the right portrait, telephoto, or wide lens." },
    ],
  },
  {
    slug: "mirrorless-camera-rental-bangalore",
    title: "Mirrorless Camera Rental Bangalore | Book My DSLR",
    description: "Rent mirrorless cameras in Bangalore for YouTube, weddings, reels, and commercial shoots with fast support.",
    h1: "Mirrorless Camera Rental in Bangalore",
    intro: "Explore mirrorless camera rentals for content creation, YouTube, weddings, interviews, and brand campaigns in Bangalore.",
    primaryKeyword: "mirrorless camera rental Bangalore",
    keywordVariants: ["camera rental Bangalore", "camera on rent Bangalore", "professional camera rental Bangalore"],
    heroBullets: [
      "Mirrorless camera bodies from Sony, Canon, and Nikon",
      "Ideal for creators, videographers, and hybrid shooters",
      "Fast booking support from Bangalore's northeast corridor",
    ],
    filter: {
      categoryIncludes: ["camera"],
      nameIncludes: ["sony", "alpha", "canon eos r", "m50", "z50", "mirrorless", "r10", "m200"],
    },
    sections: buildIntentSections({
      primaryKeyword: "mirrorless camera rental Bangalore",
      keywordVariants: ["camera rental Bangalore", "professional camera rental Bangalore", "camera on rent Bangalore"],
      gear: ["creator mirrorless bodies", "fast zoom lenses", "gimbals", "wireless audio"],
      audience: ["YouTubers", "wedding filmmakers", "brand teams", "course creators"],
      locations: ["Kalyan Nagar", "Hennur", "Whitefield", "HSR Layout"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "mirrorless camera rental Bangalore", gearLabel: "mirrorless camera kits" }),
    internalLinks: [
      { href: "/cameras", label: "Browse Camera Inventory", description: "See all camera bodies available to rent." },
      { href: "/rentals/sony-camera-rental-bangalore", label: "Sony Camera Rentals", description: "Popular mirrorless kits for creators and filmmakers." },
      { href: "/accessories", label: "Accessories and Audio", description: "Add gimbals, lights, mics, batteries, and support gear." },
    ],
  },
  {
    slug: "sony-camera-rental-bangalore",
    title: "Sony Camera Rental Bangalore | Book My DSLR",
    description: "Rent Sony mirrorless and video cameras in Bangalore for weddings, YouTube, ads, and commercial productions.",
    h1: "Sony Camera Rental in Bangalore",
    intro: "Access popular Sony camera bodies and creator-friendly kits for photography, filmmaking, interviews, and online content.",
    primaryKeyword: "Sony camera rental Bangalore",
    keywordVariants: ["Sony mirrorless camera rental Bangalore", "camera rental Bangalore", "professional camera rental Bangalore"],
    heroBullets: [
      "Sony Alpha and hybrid creator camera rentals",
      "Reliable autofocus, low-light performance, and video-ready kits",
      "Strong fit for YouTubers, agencies, and wedding teams",
    ],
    filter: {
      brandIncludes: ["sony"],
      categoryIncludes: ["camera"],
    },
    sections: buildIntentSections({
      primaryKeyword: "Sony camera rental Bangalore",
      keywordVariants: ["Sony mirrorless camera rental Bangalore", "camera rental Bangalore", "professional camera rental Bangalore"],
      gear: ["Sony Alpha bodies", "portrait lenses", "creator zooms", "stabilization support"],
      audience: ["YouTubers", "reels creators", "wedding filmmakers", "commercial teams"],
      locations: ["Kalyan Nagar", "Indiranagar", "Koramangala", "Whitefield"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "Sony camera rental Bangalore", gearLabel: "Sony camera bodies and accessories" }),
    internalLinks: [
      { href: "/cameras", label: "Sony and Other Cameras", description: "Compare Sony bodies with other available camera options." },
      { href: "/rentals/mirrorless-camera-rental-bangalore", label: "Mirrorless Camera Rentals", description: "Explore broader creator and hybrid camera choices." },
      { href: "/rentals/lens-rental-bangalore", label: "Sony Lens Rentals", description: "Add portrait, wide, or telephoto glass to your camera booking." },
    ],
  },
  {
    slug: "canon-camera-rental-bangalore",
    title: "Canon Camera Rental Bangalore | Book My DSLR",
    description: "Rent Canon cameras in Bangalore for portraits, events, YouTube, and commercial shoots with flexible daily rentals.",
    h1: "Canon Camera Rental in Bangalore",
    intro: "Choose Canon camera rentals for photography, video, wedding coverage, interviews, and creator-led productions in Bangalore.",
    primaryKeyword: "Canon camera rental Bangalore",
    keywordVariants: ["Canon DSLR rental Bangalore", "camera on rent Bangalore", "professional camera rental Bangalore"],
    heroBullets: [
      "Canon DSLR and mirrorless camera rental options",
      "Strong fit for portrait, wedding, and event photographers",
      "Daily pricing and quick support for Bangalore shoots",
    ],
    filter: {
      brandIncludes: ["canon"],
      categoryIncludes: ["camera"],
    },
    sections: buildIntentSections({
      primaryKeyword: "Canon camera rental Bangalore",
      keywordVariants: ["Canon DSLR rental Bangalore", "camera on rent Bangalore", "professional camera rental Bangalore"],
      gear: ["Canon DSLR bodies", "Canon mirrorless cameras", "EF and RF lens options", "flash support"],
      audience: ["portrait photographers", "wedding teams", "event shooters", "students"],
      locations: ["Kalyan Nagar", "Hennur", "Jayanagar", "Electronic City"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "Canon camera rental Bangalore", gearLabel: "Canon camera kits" }),
    internalLinks: [
      { href: "/cameras", label: "All Camera Rentals", description: "Compare Canon bodies with Sony, Nikon, and other available gear." },
      { href: "/rentals/dslr-camera-rental-bangalore", label: "DSLR Camera Rental Bangalore", description: "Browse DSLR-focused camera rentals." },
      { href: "/rentals/lens-rental-bangalore", label: "Canon Lens Rental Bangalore", description: "Add portrait zooms, primes, and event lenses." },
    ],
  },
  {
    slug: "lens-rental-bangalore",
    title: "Lens Rental Bangalore | Book My DSLR",
    description: "Rent camera lenses in Bangalore for portraits, weddings, wildlife, creator shoots, and filmmaking projects.",
    h1: "Lens Rental in Bangalore",
    intro: "Book the right lens for portraits, weddings, interviews, travel films, product shoots, and commercial productions without buying expensive glass.",
    primaryKeyword: "lens rental Bangalore",
    keywordVariants: ["camera lens rental Bangalore", "Canon lens rental Bangalore", "Sony lens rental Bangalore"],
    heroBullets: [
      "Wide, portrait, telephoto, and creator lens options",
      "Pair lenses with Canon, Sony, Nikon, and cinema camera rentals",
      "Ideal for weddings, portraits, interviews, and product shoots",
    ],
    filter: {
      categoryIncludes: ["lens"],
    },
    sections: buildIntentSections({
      primaryKeyword: "lens rental Bangalore",
      keywordVariants: ["camera lens rental Bangalore", "Canon lens rental Bangalore", "Sony lens rental Bangalore"],
      gear: ["portrait primes", "24-70mm zooms", "70-200mm telephoto lenses", "wide-angle options"],
      audience: ["wedding photographers", "commercial shooters", "creators", "students"],
      locations: ["Kalyan Nagar", "Hennur", "Koramangala", "Marathahalli"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "lens rental Bangalore", gearLabel: "camera lenses" }),
    internalLinks: [
      { href: "/lenses", label: "Browse All Lenses", description: "See the current lens catalog and compare daily prices." },
      { href: "/cameras", label: "Camera Body Rentals", description: "Match your lens choice with a compatible camera body." },
      { href: "/rentals/professional-camera-rental-bangalore", label: "Professional Camera Rentals", description: "Ideal for commercial and wedding packages." },
    ],
  },
  {
    slug: "filmmaking-equipment-rental-bangalore",
    title: "Filmmaking Equipment Rental Bangalore | Book My DSLR",
    description: "Rent filmmaking equipment in Bangalore including cinema cameras, lenses, gimbals, drones, lights, and audio gear.",
    h1: "Filmmaking Equipment Rental in Bangalore",
    intro: "Build full production kits for short films, ads, interviews, documentaries, corporate shoots, music videos, and branded content.",
    primaryKeyword: "filmmaking equipment rental Bangalore",
    keywordVariants: ["cinema camera rental Bangalore", "video equipment rental Bangalore", "professional camera rental Bangalore"],
    heroBullets: [
      "Cinema cameras, creator video kits, lights, audio, and support gear",
      "Best-fit page for DOPs, directors, production managers, and agencies",
      "Fast commercial rental support for Bangalore shoots",
    ],
    filter: {
      categoryIncludes: ["camera", "gimbal", "drone", "tripod", "flash", "mic", "light", "accessories"],
    },
    sections: buildIntentSections({
      primaryKeyword: "filmmaking equipment rental Bangalore",
      keywordVariants: ["cinema camera rental Bangalore", "video equipment rental Bangalore", "professional camera rental Bangalore"],
      gear: ["cinema and hybrid cameras", "lenses", "gimbals", "audio gear", "lighting", "support equipment"],
      audience: ["DOPs", "production houses", "agencies", "indie filmmakers"],
      locations: ["Kalyan Nagar", "Koramangala", "HSR Layout", "Electronic City"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "filmmaking equipment rental Bangalore", gearLabel: "filmmaking gear and support equipment" }),
    internalLinks: [
      { href: "/rental-equipment", label: "Complete Rental Inventory", description: "Browse all filmmaking categories in one place." },
      { href: "/accessories", label: "Accessories and Support Gear", description: "Gimbals, batteries, lights, mics, and other production essentials." },
      { href: "/camera-rental-bangalore", label: "Camera Rental Bangalore", description: "Move from production intent to bookable camera gear." },
    ],
  },
  {
    slug: "professional-camera-rental-bangalore",
    title: "Professional Camera Rental Bangalore | Book My DSLR",
    description: "Rent professional cameras in Bangalore for weddings, commercial shoots, events, and creator productions.",
    h1: "Professional Camera Rental in Bangalore",
    intro: "Book dependable camera gear for paid client work, production jobs, high-pressure events, and premium creator shoots.",
    primaryKeyword: "professional camera rental Bangalore",
    keywordVariants: ["camera rental Bangalore", "camera on rent Bangalore", "best camera rental Bangalore"],
    heroBullets: [
      "Built for photographers, agencies, wedding teams, and production crews",
      "Premium cameras, lenses, and dependable support gear",
      "Designed for commercial-intent searchers who need confidence fast",
    ],
    filter: {
      categoryIncludes: ["camera"],
    },
    sections: buildIntentSections({
      primaryKeyword: "professional camera rental Bangalore",
      keywordVariants: ["camera rental Bangalore", "camera on rent Bangalore", "best camera rental Bangalore"],
      gear: ["professional camera bodies", "event-ready lenses", "backup batteries", "lighting and support kits"],
      audience: ["freelancers", "agencies", "wedding teams", "event professionals"],
      locations: ["Kalyan Nagar", "Indiranagar", "Whitefield", "JP Nagar"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "professional camera rental Bangalore", gearLabel: "professional camera systems" }),
    internalLinks: [
      { href: "/cameras", label: "Camera Rentals", description: "See camera bodies suited for paid assignments." },
      { href: "/rentals/lens-rental-bangalore", label: "Lens Rentals", description: "Build a complete pro kit with the right glass." },
      { href: "/services", label: "Production Services", description: "Explore adjacent production support and services." },
    ],
  },
  {
    slug: "cheap-dslr-rental-bangalore",
    title: "Cheap DSLR Rental Bangalore | Book My DSLR",
    description: "Affordable DSLR rentals in Bangalore for students, practice shoots, events, and short projects.",
    h1: "Cheap DSLR Rental in Bangalore",
    intro: "Get budget-friendly DSLR rentals without compromising on reliability, availability, or fast support for short shoots.",
    primaryKeyword: "cheap DSLR rental Bangalore",
    keywordVariants: ["budget DSLR rental Bangalore", "DSLR rental Bangalore", "camera on rent Bangalore"],
    heroBullets: [
      "Affordable DSLR options for one-day and weekend rentals",
      "Great fit for students, beginners, and short-format projects",
      "Budget pricing without losing access to real camera brands",
    ],
    filter: {
      categoryIncludes: ["camera"],
      nameIncludes: ["canon", "nikon", "1200", "1300", "1500", "3300", "3400", "5200", "5300", "5600"],
    },
    sections: buildIntentSections({
      primaryKeyword: "cheap DSLR rental Bangalore",
      keywordVariants: ["budget DSLR rental Bangalore", "DSLR rental Bangalore", "camera on rent Bangalore"],
      gear: ["entry-level DSLR bodies", "starter lenses", "tripods", "basic accessories"],
      audience: ["students", "beginners", "practice shooters", "one-day renters"],
      locations: ["Kalyan Nagar", "Hennur", "BTM Layout", "Hebbal"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "cheap DSLR rental Bangalore", gearLabel: "budget DSLR kits" }),
    internalLinks: [
      { href: "/rentals/dslr-camera-rental-bangalore", label: "DSLR Camera Rental Bangalore", description: "See the full DSLR-focused landing page." },
      { href: "/cameras", label: "Browse Camera Inventory", description: "Compare entry-level and premium camera options." },
      { href: "/how-it-works", label: "How the Rental Process Works", description: "Understand verification, pickup, and return steps." },
    ],
  },
  {
    slug: "photography-equipment-rental-bangalore",
    title: "Photography Equipment Rental Bangalore | Book My DSLR",
    description: "Rent photography equipment in Bangalore including cameras, lenses, flashes, lights, tripods, and accessories.",
    h1: "Photography Equipment Rental in Bangalore",
    intro: "Access complete photography kits for portraits, ecommerce, weddings, events, food shoots, and creator-led productions.",
    primaryKeyword: "photography equipment rental Bangalore",
    keywordVariants: ["camera rental Bangalore", "lens rental Bangalore", "photography gear rental Bangalore"],
    heroBullets: [
      "Complete photography kits for portraits, products, and weddings",
      "Cameras, lenses, lights, flashes, tripods, and support gear",
      "Strong commercial page for photographers planning real shoots",
    ],
    filter: {
      categoryIncludes: ["camera", "lens", "flash", "tripod", "reflector", "battery", "light"],
    },
    sections: buildIntentSections({
      primaryKeyword: "photography equipment rental Bangalore",
      keywordVariants: ["camera rental Bangalore", "lens rental Bangalore", "photography gear rental Bangalore"],
      gear: ["camera bodies", "lenses", "flashes", "lights", "tripods", "reflectors"],
      audience: ["portrait photographers", "ecommerce teams", "wedding photographers", "brand creators"],
      locations: ["Kalyan Nagar", "Koramangala", "Indiranagar", "Jayanagar"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "photography equipment rental Bangalore", gearLabel: "photography equipment" }),
    internalLinks: [
      { href: "/rental-equipment", label: "All Rental Equipment", description: "Browse the full photography and video equipment catalog." },
      { href: "/lenses", label: "Lens Collection", description: "Find portrait, telephoto, and wide-angle lenses." },
      { href: "/accessories", label: "Lighting and Accessories", description: "Explore flashes, batteries, support gear, and lighting tools." },
    ],
  },
  {
    slug: "camera-gear-rental-india",
    title: "Camera Gear Rental India | Book My DSLR",
    description: "Explore camera gear rental for creators and production teams in India, anchored by a strong Bangalore rental base.",
    h1: "Camera Gear Rental in India",
    intro: "This page expands Book My DSLR beyond city-level intent and supports national queries around camera, lens, and production gear rental.",
    primaryKeyword: "camera gear rental India",
    keywordVariants: ["camera rental India", "camera on rent India", "video equipment rental India"],
    heroBullets: [
      "National-intent page anchored by strong Bangalore fulfillment",
      "Useful for creators planning shoots while traveling to Bangalore",
      "Supports broader discovery beyond city-only search terms",
    ],
    filter: {
      categoryIncludes: ["camera", "lens", "gimbal", "drone", "tripod", "flash", "mic"],
    },
    sections: buildIntentSections({
      primaryKeyword: "camera gear rental India",
      keywordVariants: ["camera rental India", "camera on rent India", "video equipment rental India"],
      gear: ["cameras", "lenses", "audio gear", "drones", "lighting", "support accessories"],
      audience: ["traveling creators", "brands", "production managers", "outstation teams"],
      locations: ["Bangalore", "Kalyan Nagar", "Hennur", "Whitefield"],
    }),
    faqs: buildIntentFaqs({ primaryKeyword: "camera gear rental India", gearLabel: "camera gear" }),
    internalLinks: [
      { href: "/camera-rental-bangalore", label: "Bangalore Camera Rental", description: "The main city landing page with the strongest local booking intent." },
      { href: "/rentals/filmmaking-equipment-rental-bangalore", label: "Filmmaking Equipment Rental", description: "Commercial production gear for teams landing in Bangalore." },
      { href: "/contact", label: "Contact for Outstation Shoots", description: "Reach out when you need a custom rental plan or delivery discussion." },
    ],
  },
]

export const bangaloreLocationPages: LocationLandingPageConfig[] = [
  { slug: "kalyan-nagar", name: "Kalyan Nagar", nearbyAreas: ["Hennur", "HRBR Layout", "Banaswadi"], landmarks: ["Hennur Main Road", "Outer Ring Road access"], serviceAngle: "pickup-first demand close to the studio", audience: ["creators", "photographers", "event shooters"] },
  { slug: "hennur", name: "Hennur", nearbyAreas: ["Kalyan Nagar", "Thanisandra", "Hebbal"], landmarks: ["Hennur Main Road", "airport corridor access"], serviceAngle: "fast pickup and delivery for northeast Bangalore", audience: ["wedding teams", "creators", "families shooting events"] },
  { slug: "koramangala", name: "Koramangala", nearbyAreas: ["BTM Layout", "HSR Layout", "Adugodi"], landmarks: ["startup offices", "creator studios"], serviceAngle: "creator and agency demand for content, ads, and podcasts", audience: ["brand teams", "startups", "YouTubers"] },
  { slug: "indiranagar", name: "Indiranagar", nearbyAreas: ["Domlur", "Ulsoor", "Old Airport Road"], landmarks: ["commercial studios", "retail brand hubs"], serviceAngle: "premium creator and event demand", audience: ["agencies", "fashion creators", "wedding photographers"] },
  { slug: "whitefield", name: "Whitefield", nearbyAreas: ["Brookefield", "Marathahalli", "Varthur"], landmarks: ["IT parks", "corporate campuses"], serviceAngle: "corporate shoots and event coverage", audience: ["corporate teams", "event agencies", "commercial videographers"] },
  { slug: "hsr-layout", name: "HSR Layout", nearbyAreas: ["Koramangala", "BTM Layout", "Electronic City"], landmarks: ["creator studios", "startup offices"], serviceAngle: "creator-led and startup-led video demand", audience: ["podcasters", "course creators", "brand marketers"] },
  { slug: "jayanagar", name: "Jayanagar", nearbyAreas: ["JP Nagar", "Basavanagudi", "Banashankari"], landmarks: ["residential shoots", "wedding venues"], serviceAngle: "portrait, family, and wedding photography demand", audience: ["wedding photographers", "portrait teams", "families"] },
  { slug: "electronic-city", name: "Electronic City", nearbyAreas: ["HSR Layout", "BTM Layout", "Bommasandra"], landmarks: ["tech parks", "industrial campuses"], serviceAngle: "corporate AV and training video demand", audience: ["production houses", "corporate teams", "documentary crews"] },
  { slug: "hebbal", name: "Hebbal", nearbyAreas: ["Hennur", "Manyata", "Nagawara"], landmarks: ["airport access", "north Bangalore offices"], serviceAngle: "fast response for north Bangalore shoots", audience: ["event teams", "creators", "outstation clients"] },
  { slug: "marathahalli", name: "Marathahalli", nearbyAreas: ["Whitefield", "Bellandur", "Brookefield"], landmarks: ["tech corridor", "outer ring road"], serviceAngle: "commercial, ecommerce, and team content shoots", audience: ["brands", "freelancers", "event videographers"] },
  { slug: "btm-layout", name: "BTM Layout", nearbyAreas: ["Koramangala", "HSR Layout", "Jayanagar"], landmarks: ["student housing", "college projects"], serviceAngle: "student, indie film, and budget camera rental demand", audience: ["students", "short-film crews", "new creators"] },
  { slug: "jp-nagar", name: "JP Nagar", nearbyAreas: ["Jayanagar", "Banashankari", "Bannerghatta Road"], landmarks: ["wedding venues", "family events"], serviceAngle: "wedding and portrait use cases with quick planning cycles", audience: ["wedding teams", "family photographers", "portrait shooters"] },
]
