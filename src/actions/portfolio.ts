"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  })
}

export async function getAllProjects() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const all = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  })
  return all.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
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
    featured: p.featured,
    displayOrder: p.displayOrder,
    published: p.published,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    images: p.images,
    thumbnail: p.thumbnail,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    seoKeywords: p.seoKeywords,
    canonicalUrl: p.canonicalUrl,
    ogImage: p.ogImage,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  })
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { displayOrder: "asc" },
  })
}

const createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  client: z.string().min(1),
  industry: z.string().min(1),
  overview: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  results: z.array(z.string()).default([]),
  testimonial: z.any().optional(),
  category: z.string().min(1),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
})

export async function createProject(data: z.infer<typeof createProjectSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = createProjectSchema.parse(data)
  const project = await prisma.project.create({ data: validated })
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    client: project.client,
    industry: project.industry,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    technologies: project.technologies,
    images: project.images,
    thumbnail: project.thumbnail,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    results: project.results,
    testimonial: project.testimonial,
    category: project.category,
    featured: project.featured,
    displayOrder: project.displayOrder,
    published: project.published,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
    seoKeywords: project.seoKeywords,
    canonicalUrl: project.canonicalUrl,
    ogImage: project.ogImage,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }
}

const updateProjectSchema = createProjectSchema.partial()

export async function updateProject(id: string, data: z.infer<typeof updateProjectSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = updateProjectSchema.parse(data)
  const project = await prisma.project.update({ where: { id }, data: validated })
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    client: project.client,
    industry: project.industry,
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    technologies: project.technologies,
    images: project.images,
    thumbnail: project.thumbnail,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    results: project.results,
    testimonial: project.testimonial,
    category: project.category,
    featured: project.featured,
    displayOrder: project.displayOrder,
    published: project.published,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
    seoKeywords: project.seoKeywords,
    canonicalUrl: project.canonicalUrl,
    ogImage: project.ogImage,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }
}

export async function deleteProject(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const project = await prisma.project.delete({ where: { id } })
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    createdAt: project.createdAt.toISOString(),
  }
}

export async function toggleFeatured(id: string, featured: boolean) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const project = await prisma.project.update({
    where: { id },
    data: { featured },
  })
  return {
    id: project.id,
    featured: project.featured,
  }
}

export async function togglePublished(id: string, published: boolean) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const project = await prisma.project.update({
    where: { id },
    data: { published },
  })
  return {
    id: project.id,
    published: project.published,
  }
}
