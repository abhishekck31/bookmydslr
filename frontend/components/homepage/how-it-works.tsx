import { Search, CalendarCheck, Truck, RotateCcw } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Select Gear",
    description: "Browse our inventory and pick the perfect camera or lens for your shoot.",
  },
  {
    icon: CalendarCheck,
    title: "Choose Dates",
    description: "Select your rental period. Availability is confirmed instantly.",
  },
  {
    icon: Truck,
    title: "Quick Delivery",
    description: "Pickup from Kalyan Nagar or get safe doorstep delivery across Bangalore.",
  },
  {
    icon: RotateCcw,
    title: "Easy Return",
    description: "Return the gear when you're done. Simple, hassle-free process.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f0f1f8] py-16 md:py-20">
      <div className="container-premium">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200/80">
                <step.icon className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
