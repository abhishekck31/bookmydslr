import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Wedding Photographer",
    initials: "RS",
    color: "bg-amber-500",
    text: "Excellent service! The camera was in perfect condition and the pickup process was super smooth. Best rental service in Bangalore.",
  },
  {
    name: "Priya Nair",
    role: "Content Creator",
    initials: "PN",
    color: "bg-indigo-500",
    text: "I've been renting from Book My DSLR for months. Equipment is always well-maintained and prices are unbeatable for professional gear.",
  },
  {
    name: "Amit Kumar",
    role: "Cinematographer",
    initials: "AK",
    color: "bg-emerald-500",
    text: "Great collection of lenses and cameras. The team is very helpful and delivery is always on time. Highly recommend for film shoots!",
  },
]

export function ReviewSection() {
  return (
    <section className="bg-[#f0f1f8] py-16 md:py-20">
      <div className="container-premium">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          What Creators Say
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${item.color}`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
