"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { createdAt: "desc" },
  })
}

const createTeamMemberSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  bio: z.string().optional(),
  image: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
})

export async function createTeamMember(data: z.infer<typeof createTeamMemberSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const validated = createTeamMemberSchema.parse(data)
  return prisma.teamMember.create({ data: validated })
}

export async function updateTeamMember(id: string, data: Partial<z.infer<typeof createTeamMemberSchema>>) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.teamMember.update({ where: { id }, data })
}

export async function deleteTeamMember(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.teamMember.delete({ where: { id } })
}
