import Link from "next/link"
import { PUBLISHED_LOCALITIES, REGION_ORDER, localityPath } from "@/data/seo/localities"

/** Hub-page list of published locality pages, grouped by region. */
export function LocalityDirectory() {
  const regions = REGION_ORDER.map((r) => ({
    region: r,
    items: PUBLISHED_LOCALITIES.filter((l) => l.region === r).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length)

  return (
    <section aria-labelledby="areas-heading" className="border-b border-border bg-surface py-14 md:py-20">
      <div className="film-container grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <p className="label-mono text-muted-foreground">Areas we serve</p>
        <div>
          <h2 id="areas-heading" className="font-serif text-display-m text-foreground">
            Camera rental across <em className="text-primary">Bangalore</em>
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-body">
            All gear is handed over from our pickup point in Kalyan Nagar, with delivery across the city from ₹200 depending on
            distance. Pick your area for local details.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((g) => (
              <div key={g.region}>
                <h3 className="label-mono mb-3 text-primary">{g.region} Bangalore</h3>
                <ul className="space-y-2">
                  {g.items.map((l) => (
                    <li key={l.slug}>
                      <Link href={localityPath(l)} className="text-[16px] text-foreground underline-offset-4 hover:text-primary hover:underline">
                        Camera rental in {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
