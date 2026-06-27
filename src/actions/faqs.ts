"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getFAQs() {
  return prisma.fAQ.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })
}

const createFAQSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().default("General"),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
})

export async function createFAQ(data: z.infer<typeof createFAQSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = createFAQSchema.parse(data)
  return prisma.fAQ.create({ data: validated })
}

export async function updateFAQ(id: string, data: Partial<z.infer<typeof createFAQSchema>>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.fAQ.update({ where: { id }, data })
}

export async function deleteFAQ(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.fAQ.delete({ where: { id } })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const faq = await prisma.fAQ.findUnique({ where: { id }, select: { published: true } })
  if (!faq) throw new Error("FAQ not found")
  return prisma.fAQ.update({
    where: { id },
    data: { published: !faq.published },
  })
}
