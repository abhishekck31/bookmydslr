export interface FAQItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface SeoNarrativeSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface InternalLink {
  href: string
  label: string
  description: string
}

export interface ProductFilterRule {
  brandIncludes?: string[]
  categoryIncludes?: string[]
  nameIncludes?: string[]
}

export interface MarketingLandingPageConfig {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  primaryKeyword: string
  keywordVariants: string[]
  heroBullets: string[]
  filter?: ProductFilterRule
  sections: SeoNarrativeSection[]
  faqs: FAQItem[]
  internalLinks: InternalLink[]
}

export interface BlogTopic {
  slug: string
  title: string
  primaryKeyword: string
  intent: "transactional" | "informational" | "local" | "comparison"
  targetPage: string
  summary: string
}
