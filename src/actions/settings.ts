"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getSettings() {
  return prisma.siteSettings.findFirst()
}

const updateSettingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  siteDescription: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  googleAnalytics: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  youtube: z.string().optional(),
  officeAddress: z.string().optional(),
  officePhone: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  darkMode: z.boolean().optional(),
})

export async function updateSettings(data: z.infer<typeof updateSettingsSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = updateSettingsSchema.parse(data)
  const existing = await prisma.siteSettings.findFirst()
  if (existing) {
    return prisma.siteSettings.update({ where: { id: existing.id }, data: validated })
  }
  return prisma.siteSettings.create({ data: validated as any })
}
