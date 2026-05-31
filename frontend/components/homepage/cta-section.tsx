import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-amber-500 py-16 md:py-20">
      <div className="container-premium text-center">
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          Ready to capture your next masterpiece?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-amber-50 md:text-lg">
          Join thousands of photographers and filmmakers who trust Book My DSLR for
          professional gear in Bangalore.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 h-12 rounded-full bg-slate-900 px-10 text-base font-semibold text-white hover:bg-slate-800"
        >
          <Link href="/rental-equipment">Start Renting Now</Link>
        </Button>
      </div>
    </section>
  )
}
