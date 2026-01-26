import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                BookMy<span className="text-amber-500">DSLR</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Bangalore's premium camera rental service. We empower creators with professional gear at accessible prices.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/bookmydslr" },
                { Icon: Instagram, href: "https://www.instagram.com/book_my__dslr?igsh=MTQ3MDVwcjA2NmZpOA==" },
                { Icon: Twitter, href: "https://x.com/bookmydslr" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {['Home', 'Cameras', 'Lenses', 'Services', 'About'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">Support</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              {['Contact Us', 'Rental Agreement', 'Terms', 'Privacy', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-amber-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">Get in Touch</h3>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <ul className="space-y-5 text-gray-300 text-sm">
                <li className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-gray-400">
                    2nd Floor, No- 212/1, Hennur Main Road,<br />Kalyan Nagar, Bangalore 560043
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="font-mono text-white tracking-wide">+91 99721 22462</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">bookmydslr@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Book My DSLR. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
