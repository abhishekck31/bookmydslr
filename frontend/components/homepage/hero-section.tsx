import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-white">
      <div className="container-premium py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Professional Gear, Delivered to Your Doorstep
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">
              Access premium DSLR, mirrorless, and cinema cameras in Bangalore. Fast pickup
              from Kalyan Nagar or doorstep delivery across the city.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-amber-500 px-8 text-base font-semibold text-white hover:bg-amber-600"
              >
                <Link href="/rental-equipment">Browse Equipment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-slate-300 px-8 text-base font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Link href="/how-it-works">How it Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">5,000+</p>
                <p className="text-sm text-slate-500">Happy Clients</p>
              </div>
              <div className="h-10 w-px bg-slate-200" aria-hidden />
              <div>
                <p className="text-2xl font-bold text-slate-900">350+</p>
                <p className="text-sm text-slate-500">Pieces of Gear</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl lg:aspect-square">
            <Image
              src="/images/hero-cinema-camera.png"
              alt="Professional cinema camera available for rent"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
