"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Edit3, Eye, EyeOff } from "lucide-react"
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

interface Service {
  id: number
  title: string
  description: string
  icon: string
  showOnHome: boolean
  published: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  canonicalUrl?: string
  ogImage?: string
}

const initialServices: Service[] = [
  { id: 1, title: "Web Development", description: "Custom websites and web applications built with cutting-edge technology.", icon: "Globe", showOnHome: true, published: true },
  { id: 2, title: "UI/UX Design", description: "User-centered designs that delight and convert.", icon: "Palette", showOnHome: true, published: true },
  { id: 3, title: "SEO Optimization", description: "Data-driven SEO strategies to boost your search rankings.", icon: "Search", showOnHome: true, published: true },
  { id: 4, title: "Social Media", description: "Strategic social media management and content creation.", icon: "Share2", showOnHome: false, published: true },
  { id: 5, title: "Brand Strategy", description: "Comprehensive branding solutions from identity to execution.", icon: "Award", showOnHome: true, published: true },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<Service | null>(null)

  const openEdit = (s: Service) => {
    setForm({ ...s })
    setDialogOpen(true)
  }

  const save = () => {
    if (form) {
      setServices(services.map((s) => (s.id === form.id ? form : s)))
      setDialogOpen(false)
      setForm(null)
    }
  }

  const toggleHome = (id: number) => {
    setServices(services.map((s) => (s.id === id ? { ...s, showOnHome: !s.showOnHome } : s)))
  }

  const togglePublished = (id: number) => {
    setServices(services.map((s) => (s.id === id ? { ...s, published: !s.published } : s)))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Services Management</h2>

      <div className="glass-dashboard overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">All Services</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-silver text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Show on Homepage</th>
                <th className="pb-3 font-medium">Published</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]">
                  <td className="py-3 font-medium text-white">{s.title}</td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleHome(s.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                        s.showOnHome ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-silver"
                      )}
                    >
                      {s.showOnHome ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {s.showOnHome ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => togglePublished(s.id)}
                      className={cn(
                        "inline-flex px-2 py-1 rounded-full text-xs font-medium transition-colors",
                        s.published ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-silver"
                      )}
                    >
                      {s.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => openEdit(s)} className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg">
                      <Edit3 className="h-4 w-4" />
                    </button>
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
            <DialogTitle className="text-white">Edit Service</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-silver">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Icon Name</Label>
                <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-silver">
                  <input type="checkbox" checked={form.showOnHome} onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })} className="rounded border-white/20" />
                  Show on Homepage
                </label>
                <label className="flex items-center gap-2 text-sm text-silver">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-white/20" />
                  Published
                </label>
              </div>
              <div className="border-t border-white/10 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-white mb-3">SEO Settings</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-silver text-xs">SEO Title</Label>
                    <Input value={form.seoTitle || ""} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-silver text-xs">SEO Description</Label>
                    <Textarea value={form.seoDescription || ""} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={2} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-silver text-xs">SEO Keywords</Label>
                    <Input value={form.seoKeywords || ""} onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-silver text-xs">Canonical URL</Label>
                    <Input value={form.canonicalUrl || ""} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-silver text-xs">OG Image URL</Label>
                    <Input value={form.ogImage || ""} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
