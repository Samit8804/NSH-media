import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProjectBySlug, getProjects } from "@/actions/portfolio"
import PortfolioDetailClient from "./PortfolioDetailClient"
import type { ProjectData } from "@/data/portfolio"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, projectSchema } from "@/lib/seo"
import { ogImage, pageMetadata } from "@/lib/metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    if (!project) return {}

    return pageMetadata({
      title: project.title,
      description: project.description,
      path: `/portfolio/${project.slug}`,
      type: "article",
      keywords: [
        project.category,
        ...((project.technologies as string[] | null) ?? []),
      ].filter(Boolean),
      image: ogImage(project.title, project.category),
      imageAlt: `${project.title} — ${project.category}`,
    })
  } catch {
    return {}
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const structuredData = [
    projectSchema({
      title: project.title,
      slug: project.slug,
      description: project.description,
      client: project.client,
      category: project.category,
      technologies: (project.technologies as string[] | null) ?? [],
      liveUrl: project.liveUrl,
      publishedAt: project.createdAt,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Portfolio", url: "/portfolio" },
      { name: project.title, url: `/portfolio/${project.slug}` },
    ]),
  ]

  const allProjects = await getProjects()
  const relatedProjects = ((allProjects || []) as unknown as Array<Record<string, unknown>>)
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug as string,
      title: p.title as string,
      client: p.client as string,
      category: p.category as string,
      technologies: (p.technologies as string[]) ?? [],
    })) as unknown as ProjectData[]

  const plainProject = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    client: project.client,
    industry: project.industry,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    technologies: (project.technologies as string[]) ?? [],
    results: (project.results as string[]) ?? [],
    testimonial: (project.testimonial ?? null) as ProjectData["testimonial"],
    category: project.category,
    liveUrl: (project.liveUrl ?? null) as ProjectData["liveUrl"],
  } as unknown as ProjectData

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <PortfolioDetailClient
        slug={slug}
        project={plainProject}
        relatedProjects={relatedProjects}
      />
    </>
  )
}
