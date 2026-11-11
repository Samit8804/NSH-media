import type { Metadata } from "next"
import { getTestimonials } from "@/actions/testimonials"
import { getFeaturedProjects } from "@/actions/portfolio"
import { getFAQs } from "@/actions/faqs"
import { getServices } from "@/actions/services"
import HomePage from "./PageClient"
import type { Testimonial } from "@/components/home/TestimonialsSection"

export const metadata: Metadata = {
  title: "NSH Media - Building Digital Experiences That Drive Growth",
  description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
  keywords: ["web development", "UI/UX design", "SEO", "branding", "AI automation", "digital agency"],
  openGraph: {
    title: "NSH Media - Building Digital Experiences That Drive Growth",
    description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
    url: "https://nshmedia.com",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSH Media - Building Digital Experiences That Drive Growth",
    description: "NSH Media is a premium digital agency delivering web development, UI/UX design, SEO optimization, branding, and AI automation services that drive growth.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com",
  },
  robots: {
    index: true,
    follow: true,
  },
}

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

  return (
    <HomePage
      testimonials={jsonTestimonials}
      featuredProjects={jsonFeaturedProjects}
      faqs={jsonFaqs}
      services={jsonServices}
    />
  )
}
