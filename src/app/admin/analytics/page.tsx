"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { getAnalyticsData } from "@/actions/analytics"

export default function AnalyticsPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getAnalyticsData>> | null>(null)

  useEffect(() => { getAnalyticsData().then(setData) }, [])

  if (!data) return (
    <div className="flex items-center justify-center h-64"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
  )

  const maxLeads = Math.max(...data.monthlyLeads.map((d) => d.value), 1)
  const maxRevenue = Math.max(...data.monthlyRevenue.map((d) => d.value), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-silver mt-1">Real-time data from your database.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-dashboard p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center", card.accent)}>
                {card.trend === "up" ? <TrendingUp className="h-5 w-5 text-white" /> : <TrendingDown className="h-5 w-5 text-white" />}
              </div>
              <span className={cn("text-xs font-medium", card.trend === "up" ? "text-emerald-400" : "text-red-400")}>{card.change}</span>
            </div>
            <p className="text-xs text-silver mb-0.5">{card.label}</p>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-dashboard p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Monthly Leads</h3>
          <p className="text-xs text-silver mb-6">Leads received per month</p>
          <div className="flex items-end gap-2 h-52">
            {data.monthlyLeads.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] text-silver/60">{item.value || ""}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(item.value / maxLeads) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-blue-400" style={{ minHeight: item.value ? 4 : 0 }}
                />
                <span className="text-[10px] text-silver/60">{item.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-dashboard p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Monthly Revenue</h3>
          <p className="text-xs text-silver mb-6">Revenue per month (₹)</p>
          <div className="flex items-end gap-2 h-52">
            {data.monthlyRevenue.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] text-silver/60">₹{item.value ? (item.value / 1000).toFixed(1) + "k" : ""}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(item.value / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full rounded-lg bg-gradient-to-t from-emerald-600 to-emerald-400" style={{ minHeight: item.value ? 4 : 0 }}
                />
                <span className="text-[10px] text-silver/60">{item.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-dashboard p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Revenue by Category</h3>
        <p className="text-xs text-silver mb-4">Breakdown from your revenue entries</p>
        {data.revenueByCategory.length === 0 ? (
          <p className="text-sm text-silver/60">No revenue entries yet. Add them in <a href="/admin/revenue" className="text-primary hover:underline">Revenue</a>.</p>
        ) : (
          <div className="space-y-4">
            {data.revenueByCategory.map((cat) => {
              const pct = (cat.value / data.totalCatValue) * 100
              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-silver">{cat.name}</span>
                    <span className="text-white font-medium">₹{cat.value.toLocaleString()} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={cn("h-full rounded-full", cat.color)}
                    />
                  </div>
                </div>
              )
            })}
            <div className="pt-2 text-right text-sm text-white font-semibold">
              Total: ₹{data.totalRevenue.toLocaleString()}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
