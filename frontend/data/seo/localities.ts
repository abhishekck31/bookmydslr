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
export type Proximity = "pickup" | "adjacent" | "city" | "outskirts"

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

  /* Batch 2 */
  {
    name: "Lingarajapuram",
    slug: "lingarajapuram",
    published: true,
    region: "North-East",
    proximity: "city",
    nearby: ["Kammanahalli", "Hennur", "Banaswadi", "Cooke Town"],
    about:
      "Lingarajapuram is a residential neighbourhood in North-East Bangalore, close to Kammanahalli and Hennur Road and a short drive from our Kalyan Nagar pickup point.",
  },
  {
    name: "Ramamurthy Nagar",
    slug: "ramamurthy-nagar",
    published: true,
    region: "East",
    proximity: "city",
    nearby: ["Banaswadi", "Horamavu", "KR Puram", "Kasturi Nagar"],
    about:
      "Ramamurthy Nagar is a residential area in East Bangalore along the Outer Ring Road, between Banaswadi, Horamavu and KR Puram.",
  },
  {
    name: "Thanisandra",
    slug: "thanisandra",
    published: true,
    region: "North-East",
    proximity: "city",
    nearby: ["Hennur", "Nagavara", "Hegde Nagar", "Jakkur"],
    about:
      "Thanisandra is a growing residential area in North-East Bangalore along Thanisandra Main Road, between Hennur, Nagavara and Jakkur.",
  },
  {
    name: "Nagavara",
    slug: "nagavara",
    published: true,
    region: "North",
    proximity: "city",
    aliases: ["Manyata Tech Park"],
    nearby: ["HBR Layout", "Hebbal", "Thanisandra", "RT Nagar"],
    about:
      "Nagavara is in North Bangalore around Nagavara Lake on the Outer Ring Road, and is home to Manyata Tech Park. It sits between HBR Layout and Hebbal.",
  },
  {
    name: "RT Nagar",
    slug: "rt-nagar",
    published: true,
    region: "North",
    proximity: "city",
    aliases: ["R T Nagar"],
    nearby: ["Hebbal", "Ganganagar", "Sanjay Nagar", "Nagavara"],
    about:
      "RT Nagar is an established residential area in North Bangalore, south of Hebbal and next to Ganganagar and Sanjay Nagar.",
  },
  {
    name: "Sahakara Nagar",
    slug: "sahakara-nagar",
    published: true,
    region: "North",
    proximity: "city",
    nearby: ["Hebbal", "Kodigehalli", "Amruthahalli", "Byatarayanapura"],
    about:
      "Sahakara Nagar is a residential area in North Bangalore off Bellary Road, between Hebbal and Yelahanka, near Kodigehalli and Amruthahalli.",
  },
  {
    name: "Yelahanka",
    slug: "yelahanka",
    published: true,
    region: "North",
    proximity: "city",
    nearby: ["Yelahanka New Town", "Yelahanka Satellite Town", "Jakkur", "Kogilu"],
    about:
      "Yelahanka is a large North Bangalore suburb on the way to the airport, home to the Yelahanka Air Force Station, with the planned Yelahanka New Town next to the old town.",
    focus: ["cameras", "lenses", "drones", "audio"],
  },
  {
    name: "Frazer Town",
    slug: "frazer-town",
    published: true,
    region: "Central",
    proximity: "city",
    nearby: ["Cooke Town", "Benson Town", "Shivajinagar", "Cox Town"],
    about:
      "Frazer Town is a historic neighbourhood just north-east of central Bangalore, known for Mosque Road, next to Cooke Town, Cox Town and Benson Town.",
  },
  {
    name: "Ulsoor",
    slug: "ulsoor",
    published: true,
    region: "Central",
    proximity: "city",
    aliases: ["Halasuru"],
    nearby: ["Indiranagar", "MG Road", "Murphy Town"],
    about:
      "Ulsoor (Halasuru) is one of central Bangalore's oldest neighbourhoods, built around Ulsoor Lake, between MG Road and Indiranagar.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "Domlur",
    slug: "domlur",
    published: true,
    region: "East",
    proximity: "city",
    nearby: ["Indiranagar", "Old Airport Road", "Ejipura", "HAL"],
    about:
      "Domlur is a compact East Bangalore neighbourhood on Old Airport Road, between Indiranagar, Ejipura and the HAL area.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "CV Raman Nagar",
    slug: "cv-raman-nagar",
    published: true,
    region: "East",
    proximity: "city",
    aliases: ["Bagmane Tech Park"],
    nearby: ["Indiranagar", "Kaggadasapura", "New Thippasandra", "Old Madras Road"],
    about:
      "CV Raman Nagar is in East Bangalore, north-east of Indiranagar, and includes Bagmane Tech Park and the DRDO township.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "KR Puram",
    slug: "kr-puram",
    published: true,
    region: "East",
    proximity: "city",
    nearby: ["Ramamurthy Nagar", "Mahadevapura", "Tin Factory", "Hoodi"],
    about:
      "KR Puram (Krishnarajapuram) is in East Bangalore on Old Madras Road, with a major railway station, next to Ramamurthy Nagar, Tin Factory and Mahadevapura.",
  },
  {
    name: "Bellandur",
    slug: "bellandur",
    published: true,
    region: "South-East",
    proximity: "city",
    nearby: ["Marathahalli", "HSR Layout", "Sarjapur Road", "Kadubeesanahalli", "Agara"],
    about:
      "Bellandur is in South-East Bangalore around Bellandur Lake, on the Outer Ring Road tech corridor between HSR Layout, Marathahalli and Sarjapur Road.",
    focus: ["cameras", "lenses", "lighting", "audio"],
  },
  {
    name: "Basavanagudi",
    slug: "basavanagudi",
    published: true,
    region: "South",
    proximity: "city",
    nearby: ["Jayanagar", "Chamarajpet", "Banashankari"],
    about:
      "Basavanagudi is one of South Bangalore's oldest neighbourhoods, known for the Bull Temple and Gandhi Bazaar, next to Jayanagar and Chamarajpet.",
  },
  {
    name: "Banashankari",
    slug: "banashankari",
    published: true,
    region: "South",
    proximity: "city",
    nearby: ["Jayanagar", "JP Nagar", "Basavanagudi", "Kumaraswamy Layout"],
    about:
      "Banashankari is a large South Bangalore area, named after the Banashankari temple and laid out in stages, next to Jayanagar, JP Nagar and Kumaraswamy Layout.",
  },
  {
    name: "Bannerghatta Road",
    slug: "bannerghatta-road",
    published: true,
    region: "South",
    proximity: "city",
    nearby: ["JP Nagar", "Arekere", "Hulimavu", "Bilekahalli"],
    about:
      "Bannerghatta Road runs south from Dairy Circle towards Bannerghatta National Park, lined with residential areas such as Bilekahalli, Arekere and Hulimavu.",
  },
  {
    name: "Rajajinagar",
    slug: "rajajinagar",
    published: true,
    region: "West",
    proximity: "city",
    nearby: ["Basaveshwaranagar", "Mahalakshmipuram", "Vijayanagar", "Yeshwanthpur"],
    about:
      "Rajajinagar is a planned residential area in West Bangalore laid out in blocks, between Yeshwanthpur, Basaveshwaranagar and Vijayanagar.",
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

/* ---------------------------------------------------------------- */
/* Batch 3 — the rest of the master list                             */
/* name | region | kind | nearby;nearby;...                          */
/* kind: n neighbourhood, r road/corridor, c commercial area,        */
/*       t town on the outskirts (delivery on request)               */
/* ---------------------------------------------------------------- */

const BATCH_3_ROWS = `
Adugodi|South-East|n|Koramangala;Wilson Garden;Ejipura;Madiwala
Agara|South-East|n|HSR Layout;Bellandur;Koramangala
Agrahara Layout|North|n|Jakkur;Yelahanka;Amruthahalli
Akshayanagar|South|n|Hulimavu;Begur;Bannerghatta Road
Allalasandra|North|n|Yelahanka;Jakkur;Agrahara Layout
Ambalipura|South-East|n|Bellandur;Sarjapur Road;Kasavanahalli
Amruthahalli|North|n|Sahakara Nagar;Jakkur;Kodigehalli;Byatarayanapura
Anjanapura|South|n|Kanakapura Road;Talaghattapura;Konanakunte
Arekere|South|n|Bannerghatta Road;Hulimavu;Bilekahalli;Puttenahalli
Arkavathy Layout|North-East|n|Thanisandra;Jakkur;Rachenahalli
Attibele|South|t|Chandapura;Bommasandra;Electronic City
Attiguppe|West|n|Vijayanagar;Chandra Layout;Mysore Road
Austin Town|Central|n|Richmond Town;Langford Town;Ejipura
Bagalur|North-East|t|Byrathi;Kothanur;Devanahalli
Balagere|East|n|Varthur;Panathur;Whitefield
Banashankari 6th Stage|South|n|Banashankari;Uttarahalli;Talaghattapura;Kengeri
Bannerghatta|South|t|Bannerghatta Road;Gottigere;Jigani
Basapura|South|n|Electronic City;Hosa Road;Begur
Basaveshwaranagar|West|n|Rajajinagar;Vijayanagar;Kamakshipalya;Nagarbhavi
Begur|South|n|Bommanahalli;Hulimavu;Electronic City;Akshayanagar
Benson Town|Central|n|Frazer Town;Jayamahal;Shivajinagar
Bharathi Nagar|Central|n|Shivajinagar;Frazer Town;Ulsoor
Bhoopasandra|North|n|Sanjay Nagar;RT Nagar;Hebbal
Bidadi|West|t|Kengeri;Mysore Road;Kumbalgodu
Bilekahalli|South|n|Bannerghatta Road;Arekere;BTM Layout;JP Nagar
Bommanahalli|South-East|n|HSR Layout;Begur;Garvebhavi Palya;Hosa Road
Bommasandra|South|n|Electronic City;Chandapura;Hosa Road;Jigani
Brookefield|East|n|Whitefield;Kundalahalli;Marathahalli
Brigade Road|Central|r|MG Road;Richmond Town;Central Business District
Budigere|East|t|Old Madras Road;Hoskote;KR Puram
Byatarayanapura|North|n|Sahakara Nagar;Kodigehalli;Amruthahalli
Byrathi|North-East|n|Kothanur;Hennur;Bagalur
Carmelaram|South-East|n|Sarjapur Road;Doddakannelli;Ambalipura
Central Business District|Central|c|MG Road;Brigade Road;Lavelle Road
Chamarajpet|Central|n|Basavanagudi;KR Market;Cottonpet
Chandra Layout|West|n|Vijayanagar;Attiguppe;Nagarbhavi
Chandapura|South|t|Bommasandra;Attibele;Electronic City
Channasandra|East|n|Kadugodi;Whitefield;Hope Farm
Chikkabanavara|North|n|Jalahalli West;Hesaraghatta Road;Dasarahalli
Chikkalasandra|South|n|Uttarahalli;Padmanabhanagar;Subramanyapura;Banashankari
Chikkajala|North|t|Yelahanka;Devanahalli;Bagalur
Chikkathoguru|South|n|Electronic City;Neeladri Nagar;Begur
Choodasandra|South-East|n|Kasavanahalli;Hosa Road;Sarjapur Road
Cooke Town|North-East|n|Frazer Town;Cox Town;Banaswadi
Cottonpet|Central|n|KR Market;Chamarajpet;Magadi Road
Cox Town|North-East|n|Frazer Town;Cooke Town;Ulsoor
Dasanapura|North|t|Nelamangala;Dasarahalli;Chikkabanavara
Dasarahalli|North|n|Jalahalli;Peenya;Chikkabanavara
Deepanjali Nagar|West|n|Mysore Road;Attiguppe;Nayandahalli
Devanahalli|North|t|Chikkajala;Yelahanka;Bagalur
Devarachikkanahalli|South|n|Bommanahalli;Begur;Hulimavu
Doddaballapur|North|t|Yelahanka;Rajankunte;Devanahalli
Doddakallasandra|South|n|Konanakunte;Kanakapura Road;Talaghattapura
Doddakannelli|South-East|n|Sarjapur Road;Carmelaram;Bellandur
Doddakammanahalli|South|n|Bannerghatta Road;Gottigere;Akshayanagar
Doddanekkundi|East|n|Marathahalli;Mahadevapura;Kundalahalli
Dommasandra|South-East|t|Sarjapur;Varthur;Sarjapur Road
Dollar Colony|North|n|Sanjay Nagar;New BEL Road;RT Nagar
Ejipura|South-East|n|Koramangala;Domlur;Austin Town
Ganganagar|North|n|RT Nagar;Sanjay Nagar;Mathikere
Garvebhavi Palya|South-East|n|Bommanahalli;HSR Layout;Kudlu Gate
Gottigere|South|n|Bannerghatta Road;Hulimavu;Bannerghatta
Gunjur|East|n|Varthur;Balagere;Panathur
Hagadur|East|n|Whitefield;Channasandra;Kadugodi
HAL|East|n|Indiranagar;Domlur;Old Airport Road;Vimanapura
Hebbal Kempapura|North|n|Hebbal;Nagavara;Sahakara Nagar
Hegde Nagar|North-East|n|Thanisandra;Jakkur;Rachenahalli
Herohalli|West|n|Magadi Road;Sunkadakatte;Nagarbhavi
Hesaraghatta|North|t|Hesaraghatta Road;Chikkabanavara;Vidyaranyapura
Hesaraghatta Road|North|r|Jalahalli West;Chikkabanavara;Hesaraghatta
Hoodi|East|n|Whitefield;KR Puram;Mahadevapura
Hope Farm|East|n|Whitefield;Kadugodi;Channasandra
Hulimavu|South|n|Bannerghatta Road;Arekere;Akshayanagar;Begur
Hosa Road|South|n|Electronic City;Kudlu Gate;Basapura
Hoskote|East|t|KR Puram;Old Madras Road;Budigere
Infantry Road|Central|r|Shivajinagar;Vasanth Nagar;Central Business District
Jakkur|North|n|Yelahanka;Thanisandra;Amruthahalli;Hegde Nagar
Jalahalli|North|n|Jalahalli East;Jalahalli West;Dasarahalli
Jalahalli East|North|n|Jalahalli;Vidyaranyapura;Mathikere
Jalahalli West|North|n|Jalahalli;Chikkabanavara;Hesaraghatta Road
Jayamahal|Central|n|Benson Town;Vasanth Nagar;Palace Road
Jeevan Bima Nagar|East|n|Indiranagar;HAL;CV Raman Nagar;New Thippasandra
Jigani|South|t|Bommasandra;Electronic City;Bannerghatta
Jnana Bharathi|West|n|Nagarbhavi;Ullal;Mysore Road
Kadubeesanahalli|East|n|Bellandur;Marathahalli;Panathur
Kadugodi|East|n|Whitefield;Channasandra;Hope Farm
Kaggadasapura|East|n|CV Raman Nagar;Vimanapura;New Thippasandra
Kamakshipalya|West|n|Basaveshwaranagar;Magadi Road;Vijayanagar
Kanakapura Road|South|r|JP Nagar;Konanakunte;Talaghattapura;Banashankari
Kannamangala|East|n|Whitefield;Kadugodi;Channasandra
Kasavanahalli|South-East|n|Sarjapur Road;Choodasandra;Bellandur
Kasturi Nagar|East|n|Ramamurthy Nagar;Tin Factory;Old Madras Road
Kathriguppe|South|n|Banashankari;Padmanabhanagar;Srinagar
Kengeri|West|n|Kengeri Satellite Town;Mysore Road;Ullal;Bidadi
Kengeri Satellite Town|West|n|Kengeri;Ullal;Mysore Road
Kodichikkanahalli|South|n|Bommanahalli;Devarachikkanahalli;Begur
Kodigehalli|North|n|Sahakara Nagar;Amruthahalli;Vidyaranyapura
Kogilu|North|n|Yelahanka;Jakkur;Yelahanka New Town
Konanakunte|South|n|Kanakapura Road;JP Nagar;Doddakallasandra;Talaghattapura
Kothanur|North-East|n|Hennur;Byrathi;Thanisandra
KR Market|Central|c|Chamarajpet;Cottonpet;Basavanagudi
Kudlu|South-East|n|Kudlu Gate;HSR Layout;Singasandra
Kudlu Gate|South-East|n|Kudlu;Garvebhavi Palya;Singasandra;Hosa Road
Kumaraswamy Layout|South|n|Banashankari;Padmanabhanagar;Uttarahalli;Yelachenahalli
Kumbalgodu|West|t|Kengeri;Mysore Road;Bidadi
Kundalahalli|East|n|Brookefield;Marathahalli;Whitefield
Laggere|West|n|Peenya;Nandini Layout;Rajajinagar
Langford Town|Central|n|Richmond Town;Shantinagar;Austin Town
Lavelle Road|Central|r|MG Road;Central Business District;Richmond Town
Madiwala|South-East|n|BTM Layout;Koramangala;Adugodi
Magadi Road|West|r|Kamakshipalya;Herohalli;Sunkadakatte;Cottonpet
Mahadevapura|East|n|KR Puram;Hoodi;Doddanekkundi
Mahalakshmi Layout|West|n|Rajajinagar;Nandini Layout;Mahalakshmipuram
Mahalakshmipuram|West|n|Rajajinagar;Basaveshwaranagar;Mahalakshmi Layout
Mathikere|North|n|Yeshwanthpur;New BEL Road;Jalahalli East
MG Road|Central|r|Brigade Road;Ulsoor;Central Business District
Millers Road|Central|r|Vasanth Nagar;Benson Town;Jayamahal
Moodalapalya|West|n|Nagarbhavi;Chandra Layout;Vijayanagar
Munnekollal|East|n|Marathahalli;Kundalahalli;Doddanekkundi
Murphy Town|Central|n|Ulsoor;Indiranagar;Cox Town
Mysore Road|West|r|Nayandahalli;Kengeri;Deepanjali Nagar;Jnana Bharathi
Nagarbhavi|West|n|Moodalapalya;Chandra Layout;Jnana Bharathi
Nagarbhavi 2nd Stage|West|n|Nagarbhavi;Ullal;Jnana Bharathi
Nagasandra|North|n|Peenya;Dasarahalli;Jalahalli West
Nallurhalli|East|n|Whitefield;Brookefield;Kundalahalli
Nandini Layout|West|n|Laggere;Mahalakshmi Layout;Peenya
Nayandahalli|West|n|Mysore Road;Deepanjali Nagar;Rajarajeshwari Nagar
Nelamangala|North|t|Dasanapura;Nagasandra;Dasarahalli
Neeladri Nagar|South|n|Electronic City;Chikkathoguru;Hosa Road
New BEL Road|North|r|Mathikere;Sanjay Nagar;Dollar Colony
New Thippasandra|East|n|CV Raman Nagar;HAL;Jeevan Bima Nagar;Indiranagar
Old Airport Road|East|r|Domlur;HAL;Marathahalli;Indiranagar
Old Madras Road|East|r|KR Puram;Kasturi Nagar;CV Raman Nagar;Hoskote
OMBR Layout|North-East|n|Banaswadi;Ramamurthy Nagar;Horamavu
Padmanabhanagar|South|n|Banashankari;Kumaraswamy Layout;Kathriguppe
Palace Road|Central|r|Vasanth Nagar;Sadashivanagar;Seshadripuram
Panathur|East|n|Kadubeesanahalli;Varthur;Balagere;Bellandur
Parappana Agrahara|South|n|Electronic City;Hosa Road;Singasandra
Peenya|North|n|Jalahalli;Dasarahalli;Laggere
Puttenahalli|South|n|JP Nagar;Bilekahalli;Arekere
Rachenahalli|North-East|n|Thanisandra;Jakkur;Hegde Nagar
Rajankunte|North|t|Yelahanka;Doddaballapur;Yelahanka Satellite Town
Rajarajeshwari Nagar|West|n|Kengeri;Mysore Road;Nayandahalli
Richmond Town|Central|n|Langford Town;Shantinagar;Brigade Road;Austin Town
RPC Layout|West|n|Vijayanagar;Attiguppe;Chandra Layout
Sadashivanagar|North|n|Palace Road;Sanjay Nagar;Mathikere
Sadahalli|North|t|Devanahalli;Chikkajala;Yelahanka
Sampigehalli|North-East|n|Thanisandra;Jakkur;Hegde Nagar
Sanjay Nagar|North|n|RT Nagar;New BEL Road;Ganganagar;Dollar Colony
Sarjapur|South-East|t|Sarjapur Road;Dommasandra;Carmelaram
Sarjapur Road|South-East|r|Bellandur;Kasavanahalli;Doddakannelli;Carmelaram
Sarakki|South|n|JP Nagar;Banashankari;Kanakapura Road
Seshadripuram|Central|n|Palace Road;Sadashivanagar;Vasanth Nagar
Shantinagar|Central|n|Richmond Town;Wilson Garden;Langford Town
Shivajinagar|Central|n|Frazer Town;Infantry Road;Bharathi Nagar;Vasanth Nagar
Singasandra|South-East|n|Kudlu Gate;Hosa Road;Bommanahalli
Somasundarapalya|South-East|n|HSR Layout;Kasavanahalli;Kudlu
Srinagar|South|n|Banashankari;Kathriguppe;Basavanagudi
Subramanyapura|South|n|Uttarahalli;Chikkalasandra;Talaghattapura
Sunkadakatte|West|n|Herohalli;Magadi Road;Nagarbhavi
Talaghattapura|South|n|Kanakapura Road;Konanakunte;Subramanyapura
Thubarahalli|East|n|Whitefield;Kundalahalli;Varthur
Tin Factory|East|n|KR Puram;Kasturi Nagar;Ramamurthy Nagar
Ullal|West|n|Kengeri Satellite Town;Nagarbhavi 2nd Stage;Jnana Bharathi
Uttarahalli|South|n|Subramanyapura;Kumaraswamy Layout;Chikkalasandra;Banashankari 6th Stage
Varthur|East|n|Whitefield;Balagere;Gunjur;Panathur
Vasanth Nagar|Central|n|Palace Road;Millers Road;Shivajinagar;Infantry Road
Vasanthapura|South|n|Uttarahalli;Subramanyapura;Kanakapura Road
Vajarahalli|South|n|Kanakapura Road;Talaghattapura;Anjanapura
Vidyaranyapura|North|n|Jalahalli East;Kodigehalli;Amruthahalli
Vijayanagar|West|n|Attiguppe;Basaveshwaranagar;Chandra Layout;RPC Layout
Vimanapura|East|n|HAL;Kaggadasapura;Old Airport Road
Wilson Garden|South|n|Shantinagar;Adugodi;Langford Town
Yelahanka New Town|North|n|Yelahanka;Yelahanka Satellite Town;Kogilu
Yelahanka Satellite Town|North|n|Yelahanka;Yelahanka New Town;Rajankunte
Yelachenahalli|South|n|Kumaraswamy Layout;JP Nagar;Kanakapura Road;Konanakunte
Yeshwanthpur|North|n|Mathikere;Rajajinagar;Peenya
`

/** Master-list names shared by several different places in Bangalore — kept as drafts rather than guessed. */
export const HELD_BACK = ["Avalahalli", "Ramakrishna Nagar", "Seegehalli", "Thavarekere", "Vishwaneedam"]

const OUTSKIRT_SIDE: Record<Region, string> = {
  North: "northern",
  "North-East": "north-eastern",
  East: "eastern",
  "South-East": "south-eastern",
  South: "southern",
  West: "western",
  Central: "central",
}

function batch3About(name: string, region: Region, kind: string, nearby: string[]): string {
  const near = nearby.length > 1 ? `${nearby.slice(0, -1).join(", ")} and ${nearby[nearby.length - 1]}` : nearby[0]
  switch (kind) {
    case "r":
      return `${name} is a road and the area around it in ${region} Bangalore. This page covers shoots along and around ${name}, near ${near}.`
    case "c":
      return `${name} is a busy commercial area in ${region} Bangalore, near ${near}.`
    case "t":
      return `${name} is on the ${OUTSKIRT_SIDE[region]} outskirts of Bangalore, beyond ${near}. Delivery this far out is arranged on request.`
    default:
      return `${name} is a neighbourhood in ${region} Bangalore, close to ${near}.`
  }
}

const BATCH_3: Locality[] = BATCH_3_ROWS.trim()
  .split("\n")
  .map((line) => line.trim().split("|"))
  .map(([name, region, kind, nearby]) => {
    const near = nearby.split(";").map((n) => n.trim())
    return {
      name,
      slug: slugifyLocality(name),
      published: true,
      region: region as Region,
      proximity: kind === "t" ? ("outskirts" as const) : ("city" as const),
      nearby: near,
      about: batch3About(name, region as Region, kind, near),
    }
  })

const ALL_PUBLISHED = [...PUBLISHED, ...BATCH_3]
const publishedNames = new Set(ALL_PUBLISHED.map((l) => l.name))

export const LOCALITIES: Locality[] = [
  ...ALL_PUBLISHED,
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
