"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Search, Download, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLeads, updateLeadStatus, addLeadNote } from "@/actions/leads"

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST" | "ARCHIVED"

interface Lead {
  id: string
  name: string
  email: string
  service: string
  budget: string
  status: LeadStatus
  date: string
  message: string
  notes: string
}

const statusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL_SENT: "Proposal Sent",
  WON: "Won",
  LOST: "Lost",
  ARCHIVED: "Archived",
}

const tabs = ["All", "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost", "Archived"]

const statusStyles: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Qualified: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Proposal Sent": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Won: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Lost: "bg-red-500/10 text-red-400 border-red-500/20",
  Archived: "bg-white/5 text-silver/60 border-white/10",
}

const months = [
  { value: "all", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})
  const [selectedMonth, setSelectedMonth] = useState("all")

  useEffect(() => {
    getLeads()
      .then((data) => {
        const list = (data as unknown as Array<Record<string, unknown>>) || []
        setLeads(
          list.map((l) => ({
            id: l.id as string,
            name: (l.name as string) ?? "",
            email: (l.email as string) ?? "",
            service: (l.service as string) ?? "",
            budget: (l.budget as string) ?? "",
            status: (l.status as LeadStatus) ?? "NEW",
            date: l.createdAt ? new Date(l.createdAt as string).toISOString().slice(0, 10) : "",
            message: (l.message as string) ?? "",
            notes: (l.notes as string) ?? "",
          }))
        )
      })
      .catch(() => setLeads([]))
  }, [])

  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase()
    const matchesSearch = lead.name.toLowerCase().includes(q) || lead.email.toLowerCase().includes(q)
    const matchesTab = activeTab === "All" || statusLabels[lead.status] === activeTab
    const matchesMonth = selectedMonth === "all" || lead.date.slice(5, 7) === selectedMonth
    return matchesSearch && matchesTab && matchesMonth
  })

  const exportCSV = () => {
    const headers = ["Name", "Email", "Service", "Budget", "Status", "Date", "Message"]
    const rows = filtered.map((l) => [l.name, l.email, l.service, l.budget, statusLabels[l.status], l.date, `"${l.message}"`])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const changeStatus = async (id: string, status: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)))
    try {
      await updateLeadStatus(id, status)
    } catch (err) {
      console.error("Failed to update lead status:", err)
    }
  }

  const addNote = async (id: string) => {
    const note = noteInputs[id]
    if (!note?.trim()) return
    const lead = leads.find((l) => l.id === id)
    if (!lead) return
    const nextNotes = lead.notes + (lead.notes ? "\n" : "") + note
    setLeads(leads.map((l) => (l.id === id ? { ...l, notes: nextNotes } : l)))
    setNoteInputs({ ...noteInputs, [id]: "" })
    try {
      await addLeadNote(id, note)
    } catch (err) {
      console.error("Failed to add lead note:", err)
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-silver/60 mt-1">Manage and track your incoming leads.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/40" />
          <input
            type="text"
            placeholder="Search leads by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white/[0.04] border border-white/5 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-silver/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
          />
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-xl bg-white/[0.04] border border-white/5 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value} className="bg-[#020617] text-white">{m.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/5 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all",
              activeTab === tab
                ? "bg-primary text-white shadow-sm"
                : "text-silver/50 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-dashboard overflow-hidden">
        <div className="p-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Name</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Email</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Service</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Budget</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Status</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider">Date</th>
                <th className="p-4 font-medium text-silver/50 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    "border-b border-white/[0.02] last:border-0 cursor-pointer transition-colors group",
                    expandedId === lead.id ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                  )}
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <td className="p-4 font-medium text-white group-hover:text-primary transition-colors">{lead.name}</td>
                  <td className="p-4 text-silver/60">{lead.email}</td>
                  <td className="p-4 text-silver/60">{lead.service}</td>
                  <td className="p-4 text-silver/60">{lead.budget}</td>
                  <td className="p-4">
                    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border", statusStyles[statusLabels[lead.status]])}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="p-4 text-silver/50 text-xs">{lead.date}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-white/[0.04] border border-white/5 group-hover:bg-white/[0.08] transition-all">
                      {expandedId === lead.id ? (
                        <ChevronUp className="h-3.5 w-3.5 text-silver/60" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-silver/60" />
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-silver/40">No leads found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {expandedId && (() => {
          const lead = leads.find((l) => l.id === expandedId)
          if (!lead) return null
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-white/5 p-5 bg-white/[0.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-silver/50 uppercase tracking-wider mb-2">Message</h4>
                  <p className="text-sm text-silver/80 leading-relaxed">{lead.message}</p>
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-silver/50 uppercase tracking-wider mb-2">Status</h4>
                    <select
                      value={lead.status}
                      onChange={(e) => changeStatus(lead.id, e.target.value as LeadStatus)}
                      className="rounded-xl bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {(Object.keys(statusLabels) as LeadStatus[]).map((status) => (
                        <option key={status} value={status} className="bg-[#020617] text-white">
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-silver/50 uppercase tracking-wider mb-2">Notes</h4>
                  {lead.notes ? (
                    <p className="text-sm text-silver/80 mb-3 whitespace-pre-wrap leading-relaxed">{lead.notes}</p>
                  ) : (
                    <p className="text-sm text-silver/40 mb-3 italic">No notes yet.</p>
                  )}
                  <div className="flex gap-2">
                    <input
                      placeholder="Add a note..."
                      value={noteInputs[lead.id] || ""}
                      onChange={(e) => setNoteInputs({ ...noteInputs, [lead.id]: e.target.value })}
                      className="flex-1 rounded-xl bg-white/[0.04] border border-white/5 px-3 py-2 text-sm text-white placeholder:text-silver/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                      onKeyDown={(e) => { if (e.key === "Enter") addNote(lead.id) }}
                    />
                    <Button size="sm" onClick={() => addNote(lead.id)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </div>
    </>
  )
}
