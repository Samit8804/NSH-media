"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Upload,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  Download,
  MoreHorizontal,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

const documents = [
  { name: "Brand Guidelines v3.pdf", type: "PDF", project: "Website Redesign", date: "Mar 15, 2026", size: "4.2 MB", icon: FileText, color: "text-red-500", bg: "bg-red-100" },
  { name: "Homepage Mockup.fig", type: "Figma", project: "Website Redesign", date: "Mar 12, 2026", size: "12.8 MB", icon: Image, color: "text-purple-500", bg: "bg-purple-100" },
  { name: "SEO Report Q1.xlsx", type: "Excel", project: "SEO Campaign", date: "Mar 10, 2026", size: "1.5 MB", icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-100" },
  { name: "Social Media Calendar.csv", type: "CSV", project: "Social Media Package", date: "Mar 08, 2026", size: "856 KB", icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-100" },
  { name: "Logo Assets.zip", type: "Archive", project: "Brand Identity", date: "Mar 05, 2026", size: "24.3 MB", icon: File, color: "text-amber-500", bg: "bg-amber-100" },
  { name: "Contract_Signed.pdf", type: "PDF", project: "Website Redesign", date: "Feb 28, 2026", size: "1.1 MB", icon: FileText, color: "text-red-500", bg: "bg-red-100" },
  { name: "Typography Guide.pdf", type: "PDF", project: "Brand Identity", date: "Feb 25, 2026", size: "3.7 MB", icon: FileText, color: "text-red-500", bg: "bg-red-100" },
  { name: "Wireframes_v2.fig", type: "Figma", project: "Website Redesign", date: "Feb 20, 2026", size: "8.4 MB", icon: Image, color: "text-purple-500", bg: "bg-purple-100" },
  { name: "Keyword Research.xlsx", type: "Excel", project: "SEO Campaign", date: "Feb 18, 2026", size: "2.1 MB", icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-100" },
  { name: "Content Strategy.docx", type: "Word", project: "Social Media Package", date: "Feb 15, 2026", size: "1.8 MB", icon: FileText, color: "text-blue-500", bg: "bg-blue-100" },
]

const projects = ["All Projects", "Website Redesign", "SEO Campaign", "Social Media Package", "Brand Identity"]

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

export default function ClientDocuments() {
  const [search, setSearch] = useState("")
  const [projectFilter, setProjectFilter] = useState("All Projects")

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
          <p className="text-muted-foreground mt-1">Browse and manage all project files.</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
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
          <SelectTrigger className="w-full sm:w-[180px]">
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((doc) => {
              const Icon = doc.icon
              return (
                <motion.div
                  key={doc.name}
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors items-start md:items-center"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", doc.bg)}>
                      <Icon className={cn("h-5 w-5", doc.color)} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground md:hidden">{doc.type} - {doc.size}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-2 items-center">
                    <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                  </div>
                  <div className="hidden md:block col-span-2 text-sm text-muted-foreground">{doc.project}</div>
                  <div className="hidden md:block col-span-2 text-sm text-muted-foreground">{doc.date}</div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
