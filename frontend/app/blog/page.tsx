import Link from "next/link"
import { blogTopics } from "@/data/seo/blog-topics"
import { JsonLd } from "@/components/seo/json-ld"
import { SeoContent } from "@/components/seo/seo-content"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
} from "@/lib/seo/schema"

export const revalidate = 300

export const metadata = buildMetadata({
  title: "Camera Rental Blog Strategy | Book My DSLR",
  description:
    "Explore the SEO content roadmap for camera rentals, lenses, filmmaking gear, and creator-focused search demand in Bangalore.",
  path: "/blog",
  keywords: [
    "camera rental blog",
    "DSLR vs mirrorless",
    "camera rental vs buying",
    "best cameras for YouTube",
    "Bangalore photography tips",
  ],
})

const faqs = [
  {
    question: "Why does the blog focus on long-tail commercial-intent topics?",
    answer:
      "Because informational traffic works best when it supports a clear business outcome. These topics are chosen to capture searchers who are researching camera choices, rental decisions, and shoot planning before they move into a rental page.",
  },
  {
    question: "How should blog posts link back into the rental funnel?",
    answer:
      "Each topic is paired with a primary target page so the site can intentionally move readers into brand, category, city, or location landing pages. This internal-linking model helps both SEO and conversion rate.",
  },
  {
    question: "Do all 50 topics need to be published at once?",
    answer:
      "No. The strongest approach is to publish in clusters, starting with the most commercial long-tail terms first. That lets the site build topical authority in stages while focusing resources on topics that are most likely to convert.",
  },
]

const groups = [
  { label: "Transactional", key: "transactional" },
  { label: "Informational", key: "informational" },
  { label: "Comparison", key: "comparison" },
  { label: "Local", key: "local" },
] as const

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema({
            name: "Camera Rental Blog Strategy | Book My DSLR",
            description:
              "The SEO content roadmap for camera rentals, creator gear, and filmmaking demand in Bangalore.",
            path: "/blog",
          }),
          buildFaqSchema(faqs),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <main className="min-h-screen bg-background">
        <section className="bg-surface py-24 text-foreground">
          <div className="film-container max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">SEO Blog Roadmap</p>
            <h1 className="mt-4 text-4xl font-serif font-normal md:text-6xl">
              50 blog topics built to grow camera rental traffic in Bangalore
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              This blog hub now acts as an editorial roadmap for Book My DSLR. It is organized around long-tail queries
              that support commercial pages for camera rentals, lens rentals, local landing pages, and filmmaking gear
              searches.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-none border border-border bg-white/5 p-4 text-sm">50 planned topics aligned to search demand</div>
              <div className="rounded-none border border-border bg-white/5 p-4 text-sm">Every topic points at a commercial target page</div>
              <div className="rounded-none border border-border bg-white/5 p-4 text-sm">Clustered by informational, local, transactional, and comparison intent</div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="film-container space-y-16">
            {groups.map((group) => {
              const items = blogTopics.filter((topic) => topic.intent === group.key)

              return (
                <section key={group.key}>
                  <div className="max-w-3xl">
                    <h2 className="text-3xl font-serif font-normal text-foreground">{group.label} Topics</h2>
                    <p className="mt-3 text-base leading-7 text-body">
                      These topics are designed to expand topical authority while feeding readers into high-intent
                      rental pages with purposeful internal linking.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((topic, index) => (
                      <article
                        key={topic.slug}
                        className="rounded-none border border-border bg-surface p-6 transition hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            {group.label}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        </div>
                        <h3 className="mt-4 text-xl font-bold leading-8 text-foreground">{topic.title}</h3>
                        <p className="mt-3 text-sm font-semibold text-body">Target keyword: {topic.primaryKeyword}</p>
                        <p className="mt-4 text-sm leading-7 text-body">{topic.summary}</p>
                        <div className="mt-6 rounded-none border border-border bg-background p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Internal link target</p>
                          <Link href={topic.targetPage} className="mt-2 inline-block text-sm font-semibold text-primary hover:text-primary">
                            {topic.targetPage}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </section>

        <SeoContent
          eyebrow="Editorial Strategy"
          title="How the blog supports commercial SEO instead of drifting into vanity traffic"
          intro="The blog plan is intentionally tied to rental pages so informational discovery can assist rankings and revenue together. The content below explains how this hub strengthens the broader SEO system."
          sections={[
            {
              title: "Why the content plan starts with search intent",
              paragraphs: [
                "Most camera blogs publish generic tutorials that attract traffic with little commercial value. This roadmap takes the opposite approach. It prioritizes topics where the reader is researching a camera choice, comparing a brand, evaluating rental vs buying, planning a shoot, or looking for a local solution in Bangalore. That means informational content still plays a direct role in conversion by leading users into rental pages that match the use case they are researching.",
                "This structure is especially important for a rental marketplace because buyers often need education before they book. A creator may not search for Sony camera rental Bangalore first; they may start with best camera for YouTube, Sony vs Canon for wedding video, or best lens for low-light videography. The blog content captures that earlier-stage search and intentionally routes it into the correct commercial landing page.",
              ],
              bullets: [
                "Avoids low-value vanity traffic",
                "Connects every article to a booking-oriented page",
                "Builds authority around creator, wedding, and filmmaking intent",
              ],
            },
            {
              title: "How topic clusters strengthen internal linking",
              paragraphs: [
                "The 50 topics are grouped by intent so the site can publish in clusters instead of randomly. That helps search engines understand which pages belong together and which landing pages deserve authority for a given topic. For example, Sony creator articles should reinforce the Sony camera rental landing page, while wedding lens articles should reinforce the lens rental and professional camera rental pages.",
                "Publishing in clusters also makes internal linking more natural. When a new article goes live, it should link to the main rental page, one supporting category page, and one related local page if relevant. Over time that creates a dense topical web rather than isolated content islands. That is the kind of structure needed for sustainable SEO growth.",
              ],
              bullets: [
                "Cluster content by use case, brand, and local intent",
                "Link from each article into one primary and one secondary commercial page",
                "Refresh older articles to keep internal links current as new pages launch",
              ],
            },
          ]}
          faqs={faqs}
          links={[
            { href: "/camera-rental-bangalore", label: "City Landing Page", description: "The main commercial target for broad Bangalore searches." },
            { href: "/rentals/filmmaking-equipment-rental-bangalore", label: "Filmmaking Rentals", description: "Best destination for production-led blog topics." },
            { href: "/rentals/sony-camera-rental-bangalore", label: "Sony Camera Rentals", description: "Natural target for Sony creator and comparison content." },
          ]}
        />
      </main>
    </>
  )
}
