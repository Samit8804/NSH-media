"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Project {
  id: number
  title: string
  category: string
  featured: boolean
  published: boolean
  date: string
}

const initialProjects: Project[] = [
  { id: 1, title: "TechFlow Dashboard", category: "Web App", featured: true, published: true, date: "2026-06-20" },
  { id: 2, title: "GreenLeaf Branding", category: "Branding", featured: false, published: true, date: "2026-06-18" },
  { id: 3, title: "FitTrack Mobile", category: "Mobile App", featured: true, published: false, date: "2026-06-15" },
  { id: 4, title: "UrbanEats Platform", category: "Web App", featured: false, published: true, date: "2026-06-10" },
  { id: 5, title: "CloudSync Solution", category: "SaaS", featured: false, published: true, date: "2026-06-05" },
  { id: 6, title: "Artisan Market", category: "E-commerce", featured: true, published: true, date: "2026-05-28" },
]

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editProject, setEditProject] = useState<Project | null>(null)

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFeatured = (id: number) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const togglePublished = (id: number) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, published: !p.published } : p)))
  }

  const handleDelete = () => {
    if (deleteId !== null) {
      setProjects(projects.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Link href="/admin/portfolio/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </Link>
      </div>

      <div className="glass-dashboard overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-silver text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Featured</th>
                <th className="pb-3 font-medium">Published</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project, i) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]"
                >
                  <td className="py-3 font-medium text-white">{project.title}</td>
                  <td className="py-3 text-silver">{project.category}</td>
                  <td className="py-3">
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={cn(
                        "h-6 w-6 rounded border flex items-center justify-center transition-colors",
                        project.featured
                          ? "bg-primary border-primary text-white"
                          : "border-white/20 text-transparent hover:border-white/40"
                      )}
                    >
                      {project.featured && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => togglePublished(project.id)}
                      className={cn(
                        "h-6 w-6 rounded border flex items-center justify-center transition-colors",
                        project.published
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-white/20 text-transparent hover:border-white/40"
                      )}
                    >
                      {project.published && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                  <td className="py-3 text-silver">{project.date}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditProject(project)}
                        className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="p-2 text-silver hover:text-red-400 hover:bg-white/[0.04] rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-dashboard">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Project</DialogTitle>
            <DialogDescription className="text-silver">
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editProject !== null} onOpenChange={() => setEditProject(null)}>
        <DialogContent className="glass-dashboard max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Project</DialogTitle>
          </DialogHeader>
          {editProject && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-silver mb-1">Title</label>
                <input
                  type="text"
                  value={editProject.title}
                  onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver mb-1">Category</label>
                <input
                  type="text"
                  value={editProject.category}
                  onChange={(e) => setEditProject({ ...editProject, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProject(null)}>Cancel</Button>
            <Button onClick={() => { setProjects(projects.map((p) => (p.id === editProject?.id ? editProject! : p))); setEditProject(null) }}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
