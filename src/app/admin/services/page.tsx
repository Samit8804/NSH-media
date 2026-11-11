"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Edit3 } from "lucide-react"
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
import { getAllServices, updateService, togglePublished } from "@/actions/services"

interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  price: string
  published: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  canonicalUrl?: string
  ogImage?: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<Service | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    getAllServices()
      .then((data) => {
        const list = (data as unknown as Array<Record<string, unknown>>) || []
        setServices(
          list.map((s) => ({
            id: s.id as string,
            title: (s.title as string) ?? "",
            slug: (s.slug as string) ?? "",
            description: (s.description as string) ?? "",
            icon: (s.icon as string) ?? "",
            price: (s.price as string) ?? "Custom",
            published: (s.published as boolean) ?? false,
            seoTitle: (s.seoTitle as string) ?? "",
            seoDescription: (s.seoDescription as string) ?? "",
            seoKeywords: (s.seoKeywords as string) ?? "",
            canonicalUrl: (s.canonicalUrl as string) ?? "",
            ogImage: (s.ogImage as string) ?? "",
          }))
        )
      })
      .catch(() => setServices([]))
  }

  useEffect(load, [])

  const openEdit = (s: Service) => {
    setForm({ ...s })
    setError(null)
    setDialogOpen(true)
  }

  const save = async () => {
    if (!form) return
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim()) {
      setError("Title, slug and description are required.")
      return
    }
    setError(null)
    try {
      await updateService(form.id, {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        icon: form.icon,
        price: form.price,
        published: form.published,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
        seoKeywords: form.seoKeywords || undefined,
        canonicalUrl: form.canonicalUrl || undefined,
        ogImage: form.ogImage || undefined,
      })
      setServices(services.map((s) => (s.id === form.id ? form : s)))
      setDialogOpen(false)
      setForm(null)
    } catch (err) {
      console.error("Failed to save service:", err)
      setError("Failed to save the service. Please try again.")
    }
  }

  const handleTogglePublished = async (s: Service) => {
    const next = !s.published
    setServices(services.map((item) => (item.id === s.id ? { ...item, published: next } : item)))
    try {
      await togglePublished(s.id)
    } catch (err) {
      console.error("Failed to toggle service:", err)
      setServices(services.map((item) => (item.id === s.id ? { ...item, published: !next } : item)))
    }
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
                <th className="px-6 pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Slug</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Published</th>
                <th className="pb-3 pr-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]">
                  <td className="px-6 py-3 font-medium text-white">{s.title}</td>
                  <td className="py-3 text-silver">{s.slug}</td>
                  <td className="py-3 text-silver">{s.price}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleTogglePublished(s)}
                      className={cn(
                        "inline-flex px-2 py-1 rounded-full text-xs font-medium transition-colors",
                        s.published ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-silver"
                      )}
                    >
                      {s.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3 pr-6 text-right">
                    <button onClick={() => openEdit(s)} className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg">
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-silver/40">No services yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg glass-dashboard border-white/10 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Service</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-silver">Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-silver">Slug</Label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-silver">Icon Name</Label>
                  <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-silver">Price Label</Label>
                  <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-silver">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-white/20" />
                Published
              </label>
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
              {error && <p className="text-sm text-red-400">{error}</p>}
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
