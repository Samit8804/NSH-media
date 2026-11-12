import type { Metadata } from "next"
import { getTestimonials } from "@/actions/testimonials"
import { getFeaturedProjects } from "@/actions/portfolio"
import { getFAQs } from "@/actions/faqs"
import { getServices } from "@/actions/services"
import HomePage from "./PageClient"
import type { Testimonial } from "@/components/home/TestimonialsSection"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { faqPageSchema, webPageSchema } from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  absoluteTitle: `${SITE_NAME} | Web Design, Web Development & E-Commerce`,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "web design services",
    "web development services",
    "e-commerce development",
    "custom website design",
    "business website development",
    "NSH Media Services",
  ],
})

export const dynamic = "force-dynamic"

export default async function Page() {
  const [testimonials, featuredProjects, faqs, services] = await Promise.all([
    getTestimonials(),
    getFeaturedProjects(),
    getFAQs(),
    getServices(),
  ])

  const jsonTestimonials: Testimonial[] = (testimonials || []).map((t, i) => ({
    quote: t.content,
    name: t.name,
    role: t.role || "Client",
    company: t.company,
    rating: t.rating ?? 5,
    initials: t.name.split(" ").map((n) => n[0]).join("").slice(0, 2),
    gradient: [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-green-600",
      "from-purple-500 to-pink-600",
    ][i % 3],
  }))

  const jsonFeaturedProjects = (featuredProjects || []).map((p) => ({
    title: p.title,
    category: p.category,
    tech: p.technologies ?? [],
    slug: p.slug,
  }))

  const jsonFaqs = (faqs || [])
    .filter((f) => f.published)
    .map((f) => ({ question: f.question, answer: f.answer }))

  const jsonServices = (services || [])
    .filter((s) => s.published)
    .map((s) => ({
      title: s.title,
      description: s.description,
      fullDescription: s.description,
      icon: s.icon,
      slug: s.slug,
    }))

  const structuredData = [
    webPageSchema({
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
      path: "/",
    }),
    ...(jsonFaqs.length ? [faqPageSchema(jsonFaqs)] : []),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <HomePage
        testimonials={jsonTestimonials}
        featuredProjects={jsonFeaturedProjects}
        faqs={jsonFaqs}
        services={jsonServices}
      />
    </>
  )
}
