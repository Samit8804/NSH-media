"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

const revenueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().default("General"),
  date: z.string().optional(),
  notes: z.string().optional(),
})

export async function getRevenue() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.revenue.findMany({ orderBy: { date: "desc" } })
}

export async function getRevenueStats() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const all = await prisma.revenue.findMany({ orderBy: { date: "asc" } })
  const total = all.reduce((s, r) => s + r.amount, 0)
  const byDay: Record<string, number> = {}
  all.forEach((r) => {
    const key = new Date(r.date).toISOString().slice(0, 10)
    byDay[key] = (byDay[key] || 0) + r.amount
  })
  return { total, entries: all.length, byDay }
}

export async function createRevenue(data: { title: string; amount: number; category?: string; date?: string; notes?: string }) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const parsed = revenueSchema.parse(data)
  return prisma.revenue.create({
    data: {
      title: parsed.title,
      amount: parsed.amount,
      category: parsed.category,
      date: parsed.date ? new Date(parsed.date) : new Date(),
      notes: parsed.notes,
    },
  })
}

export async function updateRevenue(id: string, data: { title: string; amount: number; category?: string; date?: string; notes?: string }) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const parsed = revenueSchema.parse(data)
  return prisma.revenue.update({
    where: { id },
    data: {
      title: parsed.title,
      amount: parsed.amount,
      category: parsed.category,
      date: parsed.date ? new Date(parsed.date) : new Date(),
      notes: parsed.notes,
    },
  })
}

export async function deleteRevenue(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.revenue.delete({ where: { id } })
}
