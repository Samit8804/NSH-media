import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { redirect } from "next/navigation"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) redirect("/auth/login")
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  const role = (session.user as { role: string }).role
  if (!["super-admin", "admin"].includes(role)) redirect("/")
  return session
}

export async function requireEditor() {
  const session = await requireAuth()
  return session
}
