"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

const createTestimonialSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  role: z.string().optional(),
  photo: z.string().optional(),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  published: z.boolean().default(true),
})

export async function createTestimonial(data: z.infer<typeof createTestimonialSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = createTestimonialSchema.parse(data)
  return prisma.testimonial.create({ data: validated })
}

export async function updateTestimonial(id: string, data: Partial<z.infer<typeof createTestimonialSchema>>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.testimonial.update({ where: { id }, data })
}

export async function deleteTestimonial(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.testimonial.delete({ where: { id } })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const testimonial = await prisma.testimonial.findUnique({ where: { id }, select: { published: true } })
  if (!testimonial) throw new Error("Testimonial not found")
  return prisma.testimonial.update({
    where: { id },
    data: { published: !testimonial.published },
  })
}
