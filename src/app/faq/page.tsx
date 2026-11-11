import type { Metadata } from "next"
import { getFAQs } from "@/actions/faqs"
import FAQPage from "./PageClient"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
  openGraph: {
    title: "FAQ | NSH Media",
    description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
    url: "https://nshmedia.com/faq",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | NSH Media",
    description: "Frequently asked questions about our digital services, process, pricing, and how we help businesses grow online.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
}

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

  return <FAQPage faqsByCategory={grouped} categories={categories} />
}
