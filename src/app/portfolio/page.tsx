import type { Metadata } from "next"
import { getProjects } from "@/actions/portfolio"
import PortfolioPage from "./PageClient"
import type { ProjectData } from "@/data/portfolio"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our portfolio of successful web development, design, and branding projects. See how we've helped businesses achieve their digital goals.",
  openGraph: {
    title: "Portfolio | NSH Media",
    description: "Browse our portfolio of successful web development, design, and branding projects. See how we've helped businesses achieve their digital goals.",
    url: "https://nshmedia.com/portfolio",
    images: [{ url: "/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | NSH Media",
    description: "Browse our portfolio of successful web development, design, and branding projects. See how we've helped businesses achieve their digital goals.",
    images: ["/og-default.svg"],
  },
  alternates: {
    canonical: "https://nshmedia.com/portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function Page() {
  const projects = await getProjects()
  const jsonProjects = (projects || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    client: p.client,
    industry: p.industry,
    overview: p.overview,
    challenge: p.challenge,
    solution: p.solution,
    technologies: p.technologies,
    results: p.results,
    testimonial: p.testimonial,
    category: p.category,
    liveUrl: p.liveUrl,
  })) as unknown as ProjectData[]

  return <PortfolioPage projects={jsonProjects} />
}
