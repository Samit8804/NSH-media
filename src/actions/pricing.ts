"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getPricingPlans() {
  return prisma.pricing.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

const updatePricingPlanSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  price: z.number().int().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  highlighted: z.boolean().optional(),
  popular: z.boolean().optional(),
  published: z.boolean().optional(),
})

export async function updatePricingPlan(id: string, data: z.infer<typeof updatePricingPlanSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = updatePricingPlanSchema.parse(data)
  return prisma.pricing.update({ where: { id }, data: validated })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const plan = await prisma.pricing.findUnique({ where: { id }, select: { published: true } })
  if (!plan) throw new Error("Pricing plan not found")
  return prisma.pricing.update({
    where: { id },
    data: { published: !plan.published },
  })
}

export async function togglePopular(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const plan = await prisma.pricing.findUnique({ where: { id }, select: { popular: true } })
  if (!plan) throw new Error("Pricing plan not found")
  return prisma.pricing.update({
    where: { id },
    data: { popular: !plan.popular },
  })
}
