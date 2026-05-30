import { FAQItem } from "@/lib/seo/types"

interface FAQSectionProps {
  title?: string
  intro?: string
  faqs: FAQItem[]
}

export function FAQSection({
  title = "Frequently Asked Questions",
  intro,
  faqs,
}: FAQSectionProps) {
  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 md:p-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
        {intro ? <p className="mt-3 text-base leading-7 text-slate-600">{intro}</p> : null}
      </div>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 open:border-amber-300 open:bg-amber-50/50"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
