"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

export async function requireRole(roles: string[]) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as { role: string }).role
  if (!roles.includes(role)) throw new Error("Forbidden")
  return session.user
}
