import { ShieldCheck, Headphones, Umbrella, Zap } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description:
      "Every camera and lens is tested and serviced before rental to ensure flawless performance on your shoot.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "Our team understands photography and filmmaking needs — get guidance on the right gear anytime.",
  },
  {
    icon: Umbrella,
    title: "Insured Rentals",
    description:
      "All equipment comes with comprehensive coverage so you can focus on creating, not worrying.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Same-day pickup from Kalyan Nagar or delivery across Bangalore from ₹200, depending on distance.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-premium">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-[#eef2ff] p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                <feature.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
