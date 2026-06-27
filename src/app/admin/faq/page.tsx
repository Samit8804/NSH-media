"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, Edit3, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  published: boolean
}

const initialFAQs: FAQ[] = [
  { id: 1, question: "What services does NSH Media offer?", answer: "We offer web development, UI/UX design, SEO optimization, social media management, and brand strategy services.", category: "General", order: 1, published: true },
  { id: 2, question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A typical website takes 4-8 weeks, while larger projects can take 3-6 months.", category: "Process", order: 1, published: true },
  { id: 3, question: "What is your pricing model?", answer: "We offer project-based pricing with transparent quotes. Contact us for a free consultation and estimate.", category: "Pricing", order: 1, published: true },
  { id: 4, question: "Do you offer post-launch support?", answer: "Yes, we offer maintenance and support packages to keep your website running smoothly after launch.", category: "Support", order: 1, published: false },
]

const emptyForm: FAQ = { id: 0, question: "", answer: "", category: "General", order: 0, published: true }

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState<FAQ>(emptyForm)
  const [editing, setEditing] = useState(false)

  const openEdit = (f: FAQ) => { setForm(f); setEditing(true); setDialogOpen(true) }
  const openNew = () => { setForm({ ...emptyForm, id: Date.now(), order: faqs.length + 1 }); setEditing(false); setDialogOpen(true) }
  const save = () => { setFaqs(editing ? faqs.map((f) => (f.id === form.id ? form : f)) : [...faqs, form]); setDialogOpen(false) }
  const handleDelete = () => { if (deleteId !== null) { setFaqs(faqs.filter((f) => f.id !== deleteId)); setDeleteId(null) } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
          <p className="text-silver mt-1">{faqs.length} entries</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add FAQ</Button>
      </div>

      <div className="glass-dashboard overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 font-medium text-silver text-xs uppercase tracking-wider text-left">Question</th>
                <th className="p-4 font-medium text-silver text-xs uppercase tracking-wider text-left">Category</th>
                <th className="p-4 font-medium text-silver text-xs uppercase tracking-wider text-left">Order</th>
                <th className="p-4 font-medium text-silver text-xs uppercase tracking-wider text-left">Published</th>
                <th className="p-4 font-medium text-silver text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((f, i) => (
                <motion.tr key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 font-medium text-white max-w-xs truncate">{f.question}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-silver text-xs">{f.category}</span>
                  </td>
                  <td className="p-4 text-silver">{f.order}</td>
                  <td className="p-4">
                    <span className={cn("inline-flex px-2 py-1 rounded-full text-xs font-medium",
                      f.published ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/[0.06] text-silver/60 border border-white/10"
                    )}>{f.published ? "Yes" : "No"}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(f)} className="p-2 text-silver/50 hover:text-primary hover:bg-white/5 rounded-lg transition-all"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(f.id)} className="p-2 text-silver/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDialogOpen(false)}>
          <div className="glass-dashboard p-6 max-w-lg w-full space-y-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white">{editing ? "Edit FAQ" : "New FAQ"}</h2>
            <div className="space-y-2">
              <label className="text-xs text-silver">Question</label>
              <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-silver">Answer</label>
              <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-silver">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-silver">Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-silver">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-white/20 bg-white/[0.04]" />
              Published
            </label>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="glass-dashboard p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Delete FAQ</h3>
            <p className="text-sm text-silver mb-6">Are you sure? Cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
