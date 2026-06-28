"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Upload, Search, Trash2, ImageIcon, FileText, Video, Music, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getMedia, uploadMedia, deleteMediaFromCloudinary } from "@/actions/media"

const typeIcons: Record<string, React.ElementType> = { IMAGE: ImageIcon, VIDEO: Video, PDF: FileText, LOGO: ImageIcon }
const typeFilters = ["All", "IMAGE", "VIDEO", "PDF"]

export default function MediaPage() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof getMedia>>>([])
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])
  async function load() { setItems(await getMedia()) }

  const filtered = items.filter((item) => {
    const m = item.name.toLowerCase().includes(search.toLowerCase())
    const t = typeFilter === "All" || item.type === typeFilter
    return m && t
  })

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append("file", file)
      await uploadMedia(fd)
    }
    setUploading(false)
    load()
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleDelete() {
    if (deleteId) { await deleteMediaFromCloudinary(deleteId); setDeleteId(null); load() }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-silver mt-1">{items.length} files</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/50" />
            <input
              type="text" placeholder="Search media..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-56 rounded-xl bg-white/[0.04] border border-white/10 pl-9 pr-4 py-2 text-sm text-white placeholder:text-silver/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <input ref={fileInputRef} type="file" multiple onChange={handleUpload} className="hidden" />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {typeFilters.map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={cn("px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all",
              typeFilter === t ? "bg-primary text-white" : "bg-white/[0.04] text-silver border border-white/10 hover:bg-white/[0.08]"
            )}>
            {t.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item, i) => {
          const Icon = typeIcons[item.type] || ImageIcon
          return (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="group relative">
              <div className="glass-card overflow-hidden">
                <div className="relative h-32 flex items-center justify-center bg-white/[0.02]">
                  {item.type === "IMAGE" ? (
                    <Image src={item.url} alt={item.name} fill className="object-cover" />
                  ) : (
                    <Icon className="h-10 w-10 text-silver/40" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-white truncate">{item.name}</p>
                  <p className="text-xs text-silver/60 mt-0.5">{item.size ? `${(item.size / 1024 / 1024).toFixed(1)} MB` : "—"}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white/20 transition-colors">
                  <Download className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => setDeleteId(item.id)}
                  className="p-1.5 bg-red-500/80 backdrop-blur text-white rounded-full hover:bg-red-500 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <ImageIcon className="h-12 w-12 text-silver/20 mx-auto mb-4" />
          <p className="text-silver/60">{items.length === 0 ? "Upload your first file." : "No matches."}</p>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="glass-dashboard p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Delete Media</h3>
            <p className="text-sm text-silver mb-6">This will delete from Cloudinary too. Cannot be undone.</p>
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
