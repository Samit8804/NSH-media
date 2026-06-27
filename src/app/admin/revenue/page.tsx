"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRevenue, createRevenue, updateRevenue, deleteRevenue } from "@/actions/revenue"

type RevenueItem = Awaited<ReturnType<typeof getRevenue>>[number]

const defaultForm = { title: "", amount: 0 as number, category: "General", date: "", notes: "" }

export default function RevenuePage() {
  const [items, setItems] = useState<RevenueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)

  useEffect(() => { load() }, [])
  async function load() { setLoading(true); setItems(await getRevenue()); setLoading(false) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { title: form.title, amount: form.amount, category: form.category, date: form.date || undefined, notes: form.notes || undefined }
    if (editing) { await updateRevenue(editing, payload) } else { await createRevenue(payload) }
    setForm(defaultForm); setEditing(null); setShowForm(false); load()
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this revenue entry?")) { await deleteRevenue(id); load() }
  }

  function edit(item: RevenueItem) {
    setForm({ title: item.title, amount: item.amount, category: item.category, date: new Date(item.date).toISOString().slice(0, 10), notes: item.notes || "" })
    setEditing(item.id); setShowForm(true)
  }

  const total = items.reduce((s, i) => s + i.amount, 0)

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue</h1>
          <p className="text-silver mt-1">{items.length} entries · <span className="text-emerald-400 font-semibold">₹{total.toLocaleString()}</span> total</p>
        </div>
        <Button onClick={() => { setForm(defaultForm); setEditing(null); setShowForm(true) }}>
          <Plus className="h-4 w-4" /> Add Entry
        </Button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-dashboard p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-silver mb-1 block">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Project name" required />
            </div>
            <div>
              <label className="text-xs text-silver mb-1 block">Amount (₹) *</label>
              <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30" required />
            </div>
            <div>
              <label className="text-xs text-silver mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="General">General</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="SEO">SEO</option>
                <option value="Branding">Branding</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-silver mb-1 block">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="text-xs text-silver mb-1 block">Notes</label>
            <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Optional notes..." />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit">{editing ? "Update" : "Add"} Entry</Button>
          </div>
        </motion.form>
      )}

      <div className="glass-dashboard overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-silver/60">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-silver/60">No revenue entries yet. Add your first one above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 font-medium text-silver text-xs uppercase tracking-wider">Title</th>
                <th className="text-left p-4 font-medium text-silver text-xs uppercase tracking-wider">Amount</th>
                <th className="text-left p-4 font-medium text-silver text-xs uppercase tracking-wider">Category</th>
                <th className="text-left p-4 font-medium text-silver text-xs uppercase tracking-wider">Date</th>
                <th className="text-left p-4 font-medium text-silver text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-medium">{item.title}</td>
                  <td className="p-4 text-emerald-400 font-semibold">₹{item.amount.toLocaleString()}</td>
                  <td className="p-4 text-silver">{item.category}</td>
                  <td className="p-4 text-silver/70 text-xs">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => edit(item)} className="text-silver/50 hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-silver/50 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
