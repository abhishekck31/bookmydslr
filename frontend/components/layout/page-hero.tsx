"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface PageHeroProps {
  badge: string
  title: string
  highlight?: string
  description: string
  icon?: LucideIcon
}

export function PageHero({ badge, title, highlight, description, icon: Icon }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200/60 bg-white">
      <div className="container-premium py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {badge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}
