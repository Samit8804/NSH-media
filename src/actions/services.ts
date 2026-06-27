"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  })
}

const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  process: z.any().optional(),
  faqs: z.any().optional(),
  image: z.string().optional(),
  price: z.string().optional(),
  published: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
})

export async function updateService(id: string, data: z.infer<typeof updateServiceSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = updateServiceSchema.parse(data)
  return prisma.service.update({ where: { id }, data: validated })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const service = await prisma.service.findUnique({ where: { id }, select: { published: true } })
  if (!service) throw new Error("Service not found")
  return prisma.service.update({
    where: { id },
    data: { published: !service.published },
  })
}
