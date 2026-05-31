import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-white">
      <div className="container-premium">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block text-xl font-bold">
              Book My <span className="text-amber-500">DSLR</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Bangalore&apos;s premium camera rental service. We empower creators with
              professional gear at accessible prices.
            </p>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Book My DSLR. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Equipment
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/cameras" className="hover:text-amber-400">
                  Cameras
                </Link>
              </li>
              <li>
                <Link href="/lenses" className="hover:text-amber-400">
                  Lenses
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-amber-400">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/rental-equipment" className="hover:text-amber-400">
                  All Equipment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-amber-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support &amp; Contact
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>
                  2nd Floor, No- 212/1, Hennur Main Road,
                  <br />
                  Kalyan Nagar, Bangalore 560043
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                <a href="tel:+919972122462" className="hover:text-white">
                  +91 99721 22462
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                <a href="mailto:bookmydslr@gmail.com" className="hover:text-white">
                  bookmydslr@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/bookmydslr" },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/book_my__dslr?igsh=MTQ3MDVwcjA2NmZpOA==",
                },
                { Icon: Twitter, href: "https://x.com/bookmydslr" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-amber-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
