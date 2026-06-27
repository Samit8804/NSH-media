"use server"

import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getAnalyticsData() {
  await requireRole(["SUPER_ADMIN", "ADMIN"])

  const [leads, projects, blogs, revenue, testimonials] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.blogPost.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.revenue.findMany({ orderBy: { date: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "asc" } }),
  ])

  const totalLeads = leads.length
  const totalRevenue = revenue.reduce((s, r) => s + r.amount, 0)
  const totalProjects = projects.length
  const totalBlogs = blogs.length

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const monthlyLeads = months.map((month, i) => ({
    month,
    value: leads.filter((l) => new Date(l.createdAt).getMonth() === i).length,
  }))

  const monthlyRevenue = months.map((month, i) => ({
    month,
    value: revenue.filter((r) => new Date(r.date).getMonth() === i).reduce((s, r) => s + r.amount, 0),
  }))

  const revenueByCategory: { name: string; value: number; color: string }[] = []
  const catMap: Record<string, number> = {}
  revenue.forEach((r) => { catMap[r.category] = (catMap[r.category] || 0) + r.amount })
  const catColors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500", "bg-pink-500", "bg-cyan-500"]
  Object.entries(catMap).forEach(([name, value], i) => {
    revenueByCategory.push({ name, value, color: catColors[i % catColors.length] })
  })

  const totalCatValue = revenueByCategory.reduce((s, c) => s + c.value, 0) || 1

  return {
    statCards: [
      { label: "Total Leads", value: String(totalLeads), change: `${leads.length > 0 ? "+" : ""}${leads.length}`, trend: "up" as const, accent: "from-blue-500 to-blue-600" },
      { label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(1)}k`, change: `${revenue.length} entries`, trend: "up" as const, accent: "from-emerald-500 to-emerald-600" },
      { label: "Projects", value: String(totalProjects), change: "0", trend: "up" as const, accent: "from-amber-500 to-amber-600" },
      { label: "Blog Posts", value: String(totalBlogs), change: "0", trend: "up" as const, accent: "from-purple-500 to-purple-600" },
    ],
    monthlyLeads,
    monthlyRevenue,
    revenueByCategory,
    totalCatValue,
    totalRevenue,
  }
}
