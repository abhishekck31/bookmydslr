/**
 * Bangalore locality landing pages — /camera-rental-bangalore/<slug>.
 *
 * Only `published` entries get a page, a sitemap entry and inbound links.
 * Drafts are the rest of the master list; publish one by giving it a
 * verified `about` text, a region and 3+ nearby areas, then setting
 * `published: true`. `validateLocalities()` fails the build if a
 * published entry is incomplete or duplicates another.
 *
 * Content rules: only general, checkable geography. No invented
 * landmarks, branches, delivery promises, customers or prices — prices
 * come from the live inventory at render time.
 */

export type Region = "North" | "North-East" | "East" | "South-East" | "South" | "West" | "Central"

/**
 * How close the locality is to the Kalyan Nagar pickup point. Drives the
 * delivery copy. Never a promise of timing — the charge is confirmed per
 * booking.
 */
export type Proximity = "pickup" | "adjacent" | "city"

export type InventoryGroupKey = "cameras" | "lenses" | "drones" | "action" | "gimbals" | "lighting" | "audio" | "accessories"

export interface LocalityFaq {
  question: string
  answer: string
}

export interface Locality {
  name: string
  /** Path segment under /camera-rental-bangalore/. */
  slug: string
  published: boolean
  region?: Region
  proximity?: Proximity
  /** Other spellings people search for (shown on the page, used for keywords). */
  aliases?: string[]
  /** Names of genuinely neighbouring localities (must exist in this list). */
  nearby: string[]
  /** 1–3 sentences of verifiable, general geography. */
  about?: string
  /** Inventory groups to lead with, in order. */
  focus?: InventoryGroupKey[]
  /** Extra locality-specific FAQs, on top of the generated ones. */
  faqs?: LocalityFaq[]
}

const DEFAULT_FOCUS: InventoryGroupKey[] = ["cameras", "lenses", "gimbals", "audio"]

/* ---------------------------------------------------------------- */
/* Published                                                         */
/* ---------------------------------------------------------------- */

const PUBLISHED: Locality[] = [
  {
    name: "Kalyan Nagar",
    slug: "kalyan-nagar",
    published: true,
    region: "North-East",
    proximity: "pickup",
    nearby: ["HRBR Layout", "HBR Layout", "Kammanahalli", "Banaswadi", "Hennur", "Horamavu"],
    about:
      "Kalyan Nagar is a residential and commercial area in North-East Bangalore, along Hennur Main Road and the Outer Ring Road. Book My DSLR's pickup point is here, on Hennur Main Road.",
    focus: ["cameras", "lenses", "lighting", "audio"],
    faqs: [
      {
        question: "Can I walk in and collect gear in Kalyan Nagar?",
        answer:
          "Yes — Kalyan Nagar is where our pickup point is. Book on WhatsApp or by phone first so we can keep the gear ready, then collect it at the agreed time.",
      },
    ],
  },
  {
    name: "HRBR Layout",
    slug: "hrbr-layout",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    nearby: ["Kalyan Nagar", "Banaswadi", "Kammanahalli", "HBR Layout"],
    about:
      "HRBR Layout is a residential layout in North-East Bangalore that borders Kalyan Nagar, with Banaswadi and Kammanahalli on its other sides.",
  },
  {
    name: "HBR Layout",
    slug: "hbr-layout",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    nearby: ["Kalyan Nagar", "Hennur", "Nagavara", "HRBR Layout"],
    about:
      "HBR Layout is a residential layout in North-East Bangalore between Kalyan Nagar, Hennur and Nagavara, close to the Outer Ring Road.",
  },
  {
    name: "Kammanahalli",
    slug: "kammanahalli",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    nearby: ["Kalyan Nagar", "HRBR Layout", "Banaswadi", "Lingarajapuram"],
    about:
      "Kammanahalli is a North-East Bangalore neighbourhood known for its busy main road of shops and restaurants, right next to Kalyan Nagar and HRBR Layout.",
  },
  {
    name: "Banaswadi",
    slug: "banaswadi",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    nearby: ["HRBR Layout", "Kammanahalli", "Kalyan Nagar", "Horamavu", "Ramamurthy Nagar"],
    about:
      "Banaswadi is an established North-East Bangalore neighbourhood with its own railway station, bordering HRBR Layout, Kammanahalli and Ramamurthy Nagar.",
  },
  {
    name: "Horamavu",
    slug: "horamavu",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    nearby: ["Kalyan Nagar", "Banaswadi", "Ramamurthy Nagar", "Hennur"],
    about:
      "Horamavu is a fast-growing residential area in North-East Bangalore, just across the Outer Ring Road from Kalyan Nagar and Banaswadi.",
  },
  {
    name: "Hennur",
    slug: "hennur",
    published: true,
    region: "North-East",
    proximity: "adjacent",
    aliases: ["Hennur Road"],
    nearby: ["Kalyan Nagar", "HBR Layout", "Thanisandra", "Kothanur", "Horamavu"],
    about:
      "Hennur stretches along Hennur Main Road in North-East Bangalore, from Kalyan Nagar out towards Kothanur and Bagalur. Our pickup point is on Hennur Main Road.",
  },
  {
    name: "Hebbal",
    slug: "hebbal",
    published: true,
    region: "North",
    proximity: "city",
    nearby: ["Nagavara", "RT Nagar", "Sahakara Nagar", "Hennur"],
    about:
      "Hebbal is in North Bangalore at the junction of Bellary Road — the route to the airport — and the Outer Ring Road, around Hebbal Lake.",
    focus: ["cameras", "lenses", "drones", "audio"],
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    published: true,
    region: "East",
    proximity: "city",
    nearby: ["Domlur", "Ulsoor", "HAL", "CV Raman Nagar", "Old Airport Road"],
    about:
      "Indiranagar is a central-east Bangalore neighbourhood built around 100 Feet Road and 12th Main, next to Domlur, Ulsoor and the HAL area.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    published: true,
    region: "South-East",
    proximity: "city",
    nearby: ["HSR Layout", "BTM Layout", "Ejipura", "Madiwala", "Adugodi"],
    about:
      "Koramangala is a South-East Bangalore neighbourhood laid out in numbered blocks, between HSR Layout, BTM Layout and Ejipura.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    published: true,
    region: "South-East",
    proximity: "city",
    nearby: ["Koramangala", "BTM Layout", "Agara", "Bommanahalli", "Bellandur"],
    about:
      "HSR Layout is a planned South-East Bangalore layout divided into sectors, next to Koramangala, BTM Layout and Agara, with the Outer Ring Road on its east.",
  },
  {
    name: "BTM Layout",
    slug: "btm-layout",
    published: true,
    region: "South",
    proximity: "city",
    nearby: ["Koramangala", "HSR Layout", "Jayanagar", "Madiwala", "JP Nagar"],
    about:
      "BTM Layout is a South Bangalore residential area between Koramangala, Jayanagar, HSR Layout and Madiwala.",
  },
  {
    name: "Jayanagar",
    slug: "jayanagar",
    published: true,
    region: "South",
    proximity: "city",
    nearby: ["JP Nagar", "Basavanagudi", "BTM Layout", "Banashankari"],
    about:
      "Jayanagar is one of South Bangalore's oldest planned neighbourhoods, laid out in blocks with the 4th Block shopping area at its centre, next to Basavanagudi and JP Nagar.",
  },
  {
    name: "JP Nagar",
    slug: "jp-nagar",
    published: true,
    region: "South",
    proximity: "city",
    aliases: [
      "JP Nagar 1st Phase",
      "JP Nagar 2nd Phase",
      "JP Nagar 3rd Phase",
      "JP Nagar 4th Phase",
      "JP Nagar 5th Phase",
      "JP Nagar 6th Phase",
      "JP Nagar 7th Phase",
      "JP Nagar 8th Phase",
      "JP Nagar 9th Phase",
    ],
    nearby: ["Jayanagar", "Banashankari", "BTM Layout", "Bannerghatta Road", "Puttenahalli"],
    about:
      "JP Nagar is a large South Bangalore area divided into nine phases, running from Jayanagar towards Bannerghatta Road and Kanakapura Road. This page covers every phase.",
  },
  {
    name: "Marathahalli",
    slug: "marathahalli",
    published: true,
    region: "East",
    proximity: "city",
    nearby: ["Whitefield", "Brookefield", "Kundalahalli", "Bellandur", "Munnekollal"],
    about:
      "Marathahalli is an East Bangalore hub where the Outer Ring Road meets Old Airport Road, between Bellandur, Brookefield and Whitefield.",
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    published: true,
    region: "East",
    proximity: "city",
    aliases: ["ITPL", "EPIP Zone"],
    nearby: ["Brookefield", "Kadugodi", "Hoodi", "Varthur", "Marathahalli"],
    about:
      "Whitefield is a large East Bangalore suburb and IT hub, home to ITPL and the EPIP Zone, between Marathahalli, Hoodi, Kadugodi and Varthur.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "Electronic City",
    slug: "electronic-city",
    published: true,
    region: "South",
    proximity: "city",
    aliases: ["Electronic City Phase 1", "Electronic City Phase 2"],
    nearby: ["Bommasandra", "Hosa Road", "Bommanahalli", "Begur"],
    about:
      "Electronic City is an IT and industrial hub in South Bangalore along Hosur Road, split into Phase 1 and Phase 2, near Bommasandra and Hosa Road.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
]

/* ---------------------------------------------------------------- */
/* Drafts — the rest of the master list, not yet published           */
/* ---------------------------------------------------------------- */

const DRAFT_NAMES = [
  "Adugodi", "Agara", "Agrahara Layout", "Akshayanagar", "Allalasandra", "Ambalipura", "Amruthahalli",
  "Anjanapura", "Arekere", "Arkavathy Layout", "Attibele", "Attiguppe", "Austin Town", "Avalahalli", "Bagalur",
  "Balagere", "Banashankari", "Banashankari 6th Stage", "Bannerghatta", "Bannerghatta Road", "Basapura",
  "Basavanagudi", "Basaveshwaranagar", "Begur", "Bellandur", "Benson Town", "Bharathi Nagar", "Bhoopasandra",
  "Bidadi", "Bilekahalli", "Bommanahalli", "Bommasandra", "Brookefield", "Brigade Road", "Budigere",
  "Byatarayanapura", "Byrathi", "Carmelaram", "Central Business District", "Chamarajpet", "Chandra Layout",
  "Chandapura", "Channasandra", "Chikkabanavara", "Chikkalasandra", "Chikkajala", "Chikkathoguru",
  "Choodasandra", "Cooke Town", "Cottonpet", "Cox Town", "CV Raman Nagar", "Dasanapura", "Dasarahalli",
  "Deepanjali Nagar", "Devanahalli", "Devarachikkanahalli", "Doddaballapur", "Doddakallasandra",
  "Doddakannelli", "Doddakammanahalli", "Doddanekkundi", "Domlur", "Dommasandra", "Dollar Colony", "Ejipura",
  "Frazer Town", "Ganganagar", "Garvebhavi Palya", "Gottigere", "Gunjur", "Hagadur", "HAL", "Hebbal Kempapura",
  "Hegde Nagar", "Herohalli", "Hesaraghatta", "Hesaraghatta Road", "Hoodi", "Hope Farm", "Hulimavu", "Hosa Road",
  "Hoskote", "Infantry Road", "Jakkur", "Jalahalli", "Jalahalli East", "Jalahalli West", "Jayamahal",
  "Jeevan Bima Nagar", "Jigani", "Jnana Bharathi", "Kadubeesanahalli", "Kadugodi", "Kaggadasapura",
  "Kamakshipalya", "Kanakapura Road", "Kannamangala", "Kasavanahalli", "Kasturi Nagar", "Kathriguppe", "Kengeri",
  "Kengeri Satellite Town", "Kodichikkanahalli", "Kodigehalli", "Kogilu", "Konanakunte", "Kothanur", "KR Market",
  "KR Puram", "Kudlu", "Kudlu Gate", "Kumaraswamy Layout", "Kumbalgodu", "Kundalahalli", "Laggere",
  "Langford Town", "Lavelle Road", "Lingarajapuram", "Madiwala", "Magadi Road", "Mahadevapura",
  "Mahalakshmi Layout", "Mahalakshmipuram", "Mathikere", "MG Road", "Millers Road", "Moodalapalya",
  "Munnekollal", "Murphy Town", "Mysore Road", "Nagarbhavi", "Nagarbhavi 2nd Stage", "Nagavara", "Nagasandra",
  "Nallurhalli", "Nandini Layout", "Nayandahalli", "Nelamangala", "Neeladri Nagar", "New BEL Road",
  "New Thippasandra", "Old Airport Road", "Old Madras Road", "OMBR Layout", "Padmanabhanagar", "Palace Road",
  "Panathur", "Parappana Agrahara", "Peenya", "Puttenahalli", "Rachenahalli", "Rajajinagar", "Rajankunte",
  "Rajarajeshwari Nagar", "Ramamurthy Nagar", "Ramakrishna Nagar", "Richmond Town", "RT Nagar", "RPC Layout",
  "Sadashivanagar", "Sadahalli", "Sahakara Nagar", "Sampigehalli", "Sanjay Nagar", "Sarjapur", "Sarjapur Road",
  "Sarakki", "Seegehalli", "Seshadripuram", "Shantinagar", "Shivajinagar", "Singasandra", "Somasundarapalya",
  "Srinagar", "Subramanyapura", "Sunkadakatte", "Talaghattapura", "Thanisandra", "Thavarekere", "Thubarahalli",
  "Tin Factory", "Ullal", "Ulsoor", "Uttarahalli", "Varthur", "Vasanth Nagar", "Vasanthapura", "Vajarahalli",
  "Vidyaranyapura", "Vijayanagar", "Vimanapura", "Vishwaneedam", "Wilson Garden",
  "Yelahanka", "Yelahanka New Town", "Yelahanka Satellite Town", "Yelachenahalli", "Yeshwanthpur",
]

/**
 * Master-list names folded into another entry instead of getting their
 * own (near-duplicate) page. Tech parks and phases belong to their area.
 */
export const LOCALITY_ALIASES: Record<string, string> = {
  Halasuru: "Ulsoor",
  "Bagalur Cross": "Bagalur",
  "Budigere Cross": "Budigere",
  "Manyata Tech Park": "Nagavara",
  "Bagmane Tech Park": "CV Raman Nagar",
  "Peenya Industrial Area": "Peenya",
  "R T Nagar": "RT Nagar",
  "Hennur Road": "Hennur",
  ITPL: "Whitefield",
  "EPIP Zone": "Whitefield",
  "Electronic City Phase 1": "Electronic City",
  "Electronic City Phase 2": "Electronic City",
  "JP Nagar 1st Phase": "JP Nagar",
  "JP Nagar 2nd Phase": "JP Nagar",
  "JP Nagar 3rd Phase": "JP Nagar",
  "JP Nagar 4th Phase": "JP Nagar",
  "JP Nagar 5th Phase": "JP Nagar",
  "JP Nagar 6th Phase": "JP Nagar",
  "JP Nagar 7th Phase": "JP Nagar",
  "JP Nagar 8th Phase": "JP Nagar",
  "JP Nagar 9th Phase": "JP Nagar",
}

export function slugifyLocality(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const publishedNames = new Set(PUBLISHED.map((l) => l.name))

export const LOCALITIES: Locality[] = [
  ...PUBLISHED,
  ...DRAFT_NAMES.filter((n) => !publishedNames.has(n)).map<Locality>((name) => ({
    name,
    slug: slugifyLocality(name),
    published: false,
    nearby: [],
  })),
]

export const PUBLISHED_LOCALITIES = LOCALITIES.filter((l) => l.published)

export const LOCALITY_BASE_PATH = "/camera-rental-bangalore"

export function localityPath(l: Pick<Locality, "slug">): string {
  return `${LOCALITY_BASE_PATH}/${l.slug}`
}

export function findPublishedLocality(slug: string): Locality | undefined {
  return PUBLISHED_LOCALITIES.find((l) => l.slug === slug)
}

export function findLocalityByName(name: string): Locality | undefined {
  const canonical = LOCALITY_ALIASES[name] ?? name
  return LOCALITIES.find((l) => l.name === canonical)
}

export function localityFocus(l: Locality): InventoryGroupKey[] {
  return l.focus?.length ? l.focus : DEFAULT_FOCUS
}

/** Order used on the hub page. */
export const REGION_ORDER: Region[] = ["North-East", "North", "East", "Central", "South-East", "South", "West"]

/**
 * Returns a list of problems; empty means valid. Called from
 * generateStaticParams so a bad dataset fails the build.
 */
export function validateLocalities(list: Locality[] = LOCALITIES): string[] {
  const problems: string[] = []
  const slugs = new Map<string, string>()
  const names = new Set<string>()

  for (const l of list) {
    if (slugs.has(l.slug)) problems.push(`Duplicate slug "${l.slug}" (${slugs.get(l.slug)} and ${l.name})`)
    slugs.set(l.slug, l.name)
    if (names.has(l.name)) problems.push(`Duplicate name "${l.name}"`)
    names.add(l.name)
    if (l.slug !== slugifyLocality(l.name)) problems.push(`Slug "${l.slug}" should be "${slugifyLocality(l.name)}"`)
  }

  for (const l of list.filter((x) => x.published)) {
    if (!l.region) problems.push(`${l.name}: published without a region`)
    if (!l.proximity) problems.push(`${l.name}: published without a proximity`)
    if (!l.about || l.about.length < 80) problems.push(`${l.name}: published with too little "about" text`)
    if (l.nearby.length < 3) problems.push(`${l.name}: needs at least 3 nearby areas`)
    for (const n of l.nearby) {
      if (n === l.name) problems.push(`${l.name}: lists itself as nearby`)
      if (!findLocalityByName(n)) problems.push(`${l.name}: nearby "${n}" is not in the dataset`)
    }
  }
  return problems
}
