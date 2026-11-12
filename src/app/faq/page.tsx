import type { Metadata } from "next"
import { getFAQs } from "@/actions/faqs"
import FAQPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import {
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Development FAQs",
  description:
    "Answers to common questions about working with NSH Media Services: timelines, process, pricing, technologies, and post-launch support.",
  path: "/faq",
  keywords: [
    "website design FAQ",
    "web development questions",
    "website project timeline",
    "website cost FAQ",
  ],
})

export const dynamic = "force-dynamic"

interface Faq {
  question: string
  answer: string
  category: string
}

export default async function Page() {
  const faqs = await getFAQs()
  const jsonFaqs: Faq[] = (faqs || []).map((f) => ({
    question: f.question,
    answer: f.answer,
    category: f.category || "General",
  }))

  const grouped: Record<string, Faq[]> = {}
  const categories: string[] = ["General"]
  for (const faq of jsonFaqs) {
    const cat = faq.category || "General"
    if (!grouped[cat]) {
      grouped[cat] = []
      if (!categories.includes(cat)) categories.push(cat)
    }
    grouped[cat].push(faq)
  }

  const description =
    "Answers to common questions about working with NSH Media Services."
  const structuredData = [
    webPageSchema({
      title: "Website Design & Development FAQs",
      description,
      path: "/faq",
      type: "WebPage",
    }),
    faqPageSchema(
      jsonFaqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    ),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "FAQ", url: "/faq" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <FAQPage faqsByCategory={grouped} categories={categories} />
    </>
  )
}
