"use server"

import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getDashboardStats() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])

  const [projectCount, leadCount, blogCount, testimonialsCount, servicesCount, recentLeads] = await Promise.all([
    prisma.project.count(),
    prisma.lead.count(),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ])

  return {
    projectCount,
    leadCount,
    blogCount,
    testimonialsCount,
    servicesCount,
    recentLeads: recentLeads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      service: l.service,
      status: l.status,
      createdAt: l.createdAt.toISOString(),
    })),
  }
}
