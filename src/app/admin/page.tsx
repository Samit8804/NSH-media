"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Users,
  FileText,
  Star,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "@/actions/dashboard"
import { getRevenueStats } from "@/actions/revenue"

type DashboardData = {
  projectCount: number
  leadCount: number
  blogCount: number
  testimonialsCount: number
  servicesCount: number
  recentLeads: {
    id: string
    name: string
    email: string
    service: string | null
    status: string
    createdAt: string
  }[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [revenueStats, setRevenueStats] = useState<{ total: number; entries: number; byDay: Record<string, number> } | null>(null)

  useEffect(() => {
    getDashboardStats().then(setData)
    getRevenueStats().then(setRevenueStats)
  }, [])

  const today = new Date()
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
  const chartData = weekDays.map((day) => ({
    label: new Date(day + "T00:00:00").toLocaleDateString("en", { weekday: "short" }),
    value: revenueStats?.byDay[day] || 0,
  }))
  const maxRevenue = Math.max(...chartData.map((d) => d.value), 1)

  const statsCards = data ? [
    { title: "Total Revenue", value: revenueStats ? `₹${(revenueStats.total / 1000).toFixed(1)}k` : "—", change: `${revenueStats?.entries || 0} entries`, trend: "up" as const, icon: DollarSign, accent: "from-emerald-500 to-emerald-600", glow: "rgba(16,185,129,0.3)" },
    { title: "Total Projects", value: String(data.projectCount), change: "0", trend: "up" as const, icon: Briefcase, accent: "from-blue-500 to-blue-600", glow: "rgba(37,99,235,0.3)" },
    { title: "Total Leads", value: String(data.leadCount), change: "+0", trend: "up" as const, icon: Users, accent: "from-emerald-500 to-emerald-600", glow: "rgba(16,185,129,0.3)" },
    { title: "Blog Posts", value: String(data.blogCount), change: "0", trend: "up" as const, icon: FileText, accent: "from-amber-500 to-amber-600", glow: "rgba(245,158,11,0.3)" },
    { title: "Testimonials", value: String(data.testimonialsCount), change: "0", trend: "up" as const, icon: Star, accent: "from-purple-500 to-purple-600", glow: "rgba(139,92,246,0.3)" },
    { title: "Visitors", value: "—", change: "—", trend: "up" as const, icon: Eye, accent: "from-cyan-500 to-cyan-600", glow: "rgba(6,182,212,0.3)" },
  ] : []

  const statusBadge = (s: string) => cn(
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border",
    s === "NEW" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
    s === "CONTACTED" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
    s === "QUALIFIED" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  )

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-silver mt-1">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm"><Upload className="h-4 w-4" /> Export</Button>
          <Button size="sm"><Plus className="h-4 w-4" /> New Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-dashboard p-5 relative overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              style={{ background: `radial-gradient(circle, ${card.glow}, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center", card.accent)}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                  card.trend === "up" ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10")}>
                  {card.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {card.change}
                </div>
              </div>
              <p className="text-xs text-silver font-medium mb-0.5">{card.title}</p>
              <p className="text-2xl font-bold text-white">{card.value || "—"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-dashboard p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">Weekly Revenue</h3>
              <p className="text-xs text-silver">Last 7 days</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-silver">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Revenue
            </span>
          </div>
          <div className="flex items-end gap-3 h-44">
            {chartData.map((item, i) => {
              const pct = (item.value / maxRevenue) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] text-silver/60 font-medium">₹{item.value ? (item.value / 1000).toFixed(1) + "k" : "—"}</span>
                  <div className="w-full rounded-lg relative overflow-hidden" style={{ height: `${pct}%`, minHeight: 4 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                      className="absolute bottom-0 w-full rounded-lg bg-gradient-to-t from-blue-600 to-blue-400" />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-transparent" />
                  </div>
                  <span className="text-[10px] text-silver/60">{item.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-dashboard p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue Summary</h3>
              <p className="text-xs text-silver">All-time earnings</p>
            </div>
          </div>
          <div className="space-y-4">
            {revenueStats ? (
              <>
                <div className="text-4xl font-bold text-white">₹{revenueStats.total.toLocaleString()}</div>
                <p className="text-sm text-silver">{revenueStats.entries} entries recorded</p>
                {revenueStats.entries === 0 && (
                  <p className="text-sm text-silver/60 mt-4">Go to <a href="/admin/revenue" className="text-primary hover:underline">Revenue</a> to add your first entry.</p>
                )}
              </>
            ) : (
              <p className="text-sm text-silver/60">Loading...</p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-dashboard p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Leads</h3>
            <p className="text-xs text-silver">Latest inquiries from your site</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-3 font-medium text-silver text-xs uppercase tracking-wider text-left">Name</th>
                <th className="pb-3 font-medium text-silver text-xs uppercase tracking-wider text-left">Email</th>
                <th className="pb-3 font-medium text-silver text-xs uppercase tracking-wider text-left">Service</th>
                <th className="pb-3 font-medium text-silver text-xs uppercase tracking-wider text-left">Status</th>
                <th className="pb-3 font-medium text-silver text-xs uppercase tracking-wider text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentLeads.length ? data.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 text-white font-medium">{lead.name}</td>
                  <td className="py-3.5 text-silver">{lead.email}</td>
                  <td className="py-3.5 text-silver">{lead.service || "—"}</td>
                  <td className="py-3.5"><span className={statusBadge(lead.status)}>{lead.status.toLowerCase().replace("_", " ")}</span></td>
                  <td className="py-3.5 text-silver text-xs">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-10 text-center text-silver/60">No leads yet. They will appear here once visitors submit the contact form.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}
