"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getMedia } from "@/actions/media"
import { ImageIcon, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MediaItem {
  id: string
  name: string
  url: string
  type: string
}

interface MediaPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export default function MediaPicker({ open, onClose, onSelect }: MediaPickerProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      setLoading(true)
      getMedia().then((data) => { setItems(data as unknown as MediaItem[]); setLoading(false) })
    }
  }, [open])

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-dashboard w-full max-w-3xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Select Media</h2>
              <button onClick={onClose} className="text-silver/50 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/50" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-9 pr-4 py-2 text-sm text-white placeholder:text-silver/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="text-center text-silver/60 py-10">Loading...</div>
              ) : filtered.length === 0 ? (
                <div className="text-center text-silver/60 py-10">
                  <ImageIcon className="h-10 w-10 mx-auto mb-3 text-silver/20" />
                  {items.length === 0 ? "No media uploaded yet." : "No results."}
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { onSelect(item.url); onClose() }}
                      className={cn(
                        "group relative aspect-square rounded-xl overflow-hidden border border-white/5",
                        "hover:border-primary/30 hover:ring-1 hover:ring-primary/30 transition-all"
                      )}
                    >
                      {item.type === "IMAGE" ? (
                        <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-white/[0.04]">
                          <ImageIcon className="h-8 w-8 text-silver/30" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] text-white truncate">{item.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5 flex justify-end">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
