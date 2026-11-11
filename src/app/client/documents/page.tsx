"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Search,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  File,
  Download,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getClientDocuments } from "@/actions/client-portal"

interface ClientDocument {
  id: string
  name: string
  url: string
  type: string
  project: string
  uploadedAt: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

function documentIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  if (["png", "jpg", "jpeg", "gif", "svg", "webp", "fig"].includes(ext)) {
    return { icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-100" }
  }
  if (["xls", "xlsx", "csv"].includes(ext)) {
    return { icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-100" }
  }
  if (["pdf", "doc", "docx", "txt"].includes(ext)) {
    return { icon: FileText, color: "text-red-500", bg: "bg-red-100" }
  }
  return { icon: File, color: "text-amber-500", bg: "bg-amber-100" }
}

export default function ClientDocuments() {
  const [documents, setDocuments] = useState<ClientDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [projectFilter, setProjectFilter] = useState("All Projects")

  useEffect(() => {
    getClientDocuments()
      .then((data) => setDocuments(data as unknown as ClientDocument[]))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false))
  }, [])

  const projects = useMemo(
    () => ["All Projects", ...Array.from(new Set(documents.map((d) => d.project).filter(Boolean)))],
    [documents]
  )

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchesProject = projectFilter === "All Projects" || doc.project === projectFilter
    return matchesSearch && matchesProject
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">Browse all files shared with your account.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Project</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              {documents.length === 0 ? "No documents have been shared with you yet." : "No documents match your search."}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((doc) => {
                const { icon: Icon, color, bg } = documentIcon(doc.name)
                return (
                  <motion.div
                    key={doc.id}
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors items-start md:items-center"
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
                        <Icon className={cn("h-5 w-5", color)} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{doc.type}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex col-span-2 items-center">
                      <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                    </div>
                    <div className="hidden md:block col-span-2 text-sm text-muted-foreground">{doc.project || "-"}</div>
                    <div className="hidden md:block col-span-2 text-sm text-muted-foreground">
                      {new Date(doc.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" aria-label={`Open ${doc.name}`}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
