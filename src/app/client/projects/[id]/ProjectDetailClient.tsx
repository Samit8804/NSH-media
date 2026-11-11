"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  FileText,
  MessageSquare,
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getClientProject } from "@/actions/client-portal"

interface ClientProjectDetail {
  id: string
  title: string
  description: string
  status: string
  progress: number
  startDate: string
  deadline: string | null
  documents: Array<{ id: string; name: string; url: string; type: string; uploadedAt: string }>
}

const statusColors: Record<string, string> = {
  Discovery: "bg-gray-100 text-gray-700 border-gray-200",
  Design: "bg-blue-100 text-blue-700 border-blue-200",
  Development: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Testing: "bg-orange-100 text-orange-700 border-orange-200",
  Review: "bg-purple-100 text-purple-700 border-purple-200",
  Completed: "bg-green-100 text-green-700 border-green-200",
}

const progressColors: Record<string, string> = {
  Discovery: "bg-gray-400",
  Design: "bg-blue-500",
  Development: "bg-yellow-500",
  Testing: "bg-orange-500",
  Review: "bg-purple-500",
  Completed: "bg-green-500",
}

const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "-"

export default function ProjectDetailClient({ id }: { id: string }) {
  const [project, setProject] = useState<ClientProjectDetail | null | undefined>(undefined)

  useEffect(() => {
    getClientProject(id)
      .then((data) => setProject(data as unknown as ClientProjectDetail | null))
      .catch(() => setProject(null))
  }, [id])

  if (project === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
        <p className="mt-2 text-muted-foreground">This project does not exist or is not linked to your account.</p>
        <Link href="/client/projects">
          <Button className="mt-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link
          href="/client/projects"
          className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
            <Badge variant="outline" className={cn(statusColors[project.status])}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">Project ID: PRJ-{project.id.slice(-6).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall completion</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", progressColors[project.status] ?? "bg-gray-400")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {project.description ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No description provided.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(project.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(project.deadline)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <Link href="/client/documents">
                <Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.documents.length === 0 ? (
                <p className="py-3 text-sm text-muted-foreground">No documents for this project yet.</p>
              ) : (
                project.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <Button variant="ghost" size="icon" aria-label={`Download ${doc.name}`}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Need an Update?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Send a message to the team about this project.
              </p>
              <Link href="/client/messages">
                <Button className="w-full" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
