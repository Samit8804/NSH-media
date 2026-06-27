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
  return prisma.project.create({ data: validated })
}

export async function updateProject(id: string, data: Partial<z.infer<typeof createProjectSchema>>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.project.update({ where: { id }, data })
}

export async function deleteProject(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.project.delete({ where: { id } })
}

export async function toggleFeatured(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const project = await prisma.project.findUnique({ where: { id }, select: { featured: true } })
  if (!project) throw new Error("Project not found")
  return prisma.project.update({
    where: { id },
    data: { featured: !project.featured },
  })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const project = await prisma.project.findUnique({ where: { id }, select: { published: true } })
  if (!project) throw new Error("Project not found")
  return prisma.project.update({
    where: { id },
    data: { published: !project.published },
  })
}
