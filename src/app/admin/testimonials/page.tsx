"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, Edit3, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Testimonial {
  id: number
  name: string
  company: string
  role: string
  content: string
  rating: number
  photoUrl: string
  published: boolean
}

const initialTestimonials: Testimonial[] = [
  { id: 1, name: "Sarah Johnson", company: "TechFlow Inc.", role: "CEO", content: "NSH Media transformed our online presence. Our traffic increased by 300% in just 3 months!", rating: 5, photoUrl: "", published: true },
  { id: 2, name: "Michael Chen", company: "GreenLeaf Co.", role: "Marketing Director", content: "The team delivered beyond our expectations. Professional, creative, and results-driven.", rating: 5, photoUrl: "", published: true },
  { id: 3, name: "Emily Rodriguez", company: "UrbanEats", role: "Founder", content: "Working with NSH Media was a game-changer. Our sales grew by 150% after the rebrand.", rating: 4, photoUrl: "", published: false },
]

const emptyForm: Testimonial = {
  id: 0,
  name: "",
  company: "",
  role: "",
  content: "",
  rating: 5,
  photoUrl: "",
  published: true,
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState<Testimonial>(emptyForm)
  const [editing, setEditing] = useState(false)

  const openEdit = (t: Testimonial) => {
    setForm(t)
    setEditing(true)
    setDialogOpen(true)
  }

  const openNew = () => {
    setForm({ ...emptyForm, id: Date.now() })
    setEditing(false)
    setDialogOpen(true)
  }

  const save = () => {
    if (editing) {
      setTestimonials(testimonials.map((t) => (t.id === form.id ? form : t)))
    } else {
      setTestimonials([...testimonials, form])
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (deleteId !== null) {
      setTestimonials(testimonials.filter((t) => t.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Testimonials</h2>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Testimonial</Button>
      </div>

      <div className="glass-dashboard overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">All Testimonials</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-silver text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Published</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]">
                  <td className="py-3 font-medium text-white">{t.name}</td>
                  <td className="py-3 text-silver">{t.company}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={cn("h-4 w-4", j < t.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20")} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={cn("inline-flex px-2 py-1 rounded-full text-xs font-medium", t.published ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-silver")}>
                      {t.published ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(t)} className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(t.id)} className="p-2 text-silver hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg glass-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">{editing ? "Edit Testimonial" : "New Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-silver">Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Company</Label>
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-silver">Role</Label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Photo URL</Label>
                <Input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-silver">Content</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-silver">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })}>
                    <Star className={cn("h-6 w-6", r <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20")} />
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-silver">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-white/20" />
              Published
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Testimonial</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-silver">Are you sure? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
