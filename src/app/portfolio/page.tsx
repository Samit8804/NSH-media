import type { Metadata } from "next"
import { getProjects } from "@/actions/portfolio"
import PortfolioPage from "./PageClient"
import type { ProjectData } from "@/data/portfolio"
import JsonLdScript from "@/components/seo/JsonLdScript"
import {
  breadcrumbSchema,
  collectionPageSchema,
  webPageSchema,
} from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: "Web Design & Development Portfolio",
  description:
    "The NSH Media Services portfolio of website design, web development, and e-commerce projects. Published project work appears here as it becomes available.",
  path: "/portfolio",
  keywords: [
    "web design portfolio",
    "web development portfolio",
    "e-commerce website examples",
  ],
})

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

  const description =
    "Website design, web development, and e-commerce projects by NSH Media Services."
  const structuredData = [
    webPageSchema({
      title: "Web Design & Development Portfolio",
      description,
      path: "/portfolio",
      type: "WebPage",
    }),
    collectionPageSchema({
      name: "NSH Media Services portfolio",
      description,
      path: "/portfolio",
      items: jsonProjects.map((project) => ({
        name: project.title,
        url: `/portfolio/${project.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Portfolio", url: "/portfolio" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <PortfolioPage projects={jsonProjects} />
    </>
  )
}
