"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getLeads() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getLeadById(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.lead.findUnique({ where: { id } })
}

const leadStatusSchema = z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST", "ARCHIVED"])

export async function updateLeadStatus(id: string, status: z.infer<typeof leadStatusSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = leadStatusSchema.parse(status)
  return prisma.lead.update({
    where: { id },
    data: { status: validated },
  })
}

export async function addLeadNote(id: string, note: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const lead = await prisma.lead.findUnique({ where: { id } })
  if (!lead) throw new Error("Lead not found")
  const notes = lead.notes ? `${lead.notes}\n${note}` : note
  return prisma.lead.update({
    where: { id },
    data: { notes },
  })
}

export async function deleteLead(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.lead.delete({ where: { id } })
}
