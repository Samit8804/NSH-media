"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  CircleDot,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const project = {
  id: "1",
  title: "Website Redesign",
  status: "Design",
  progress: 45,
  description:
    "A complete overhaul of the corporate website focusing on modern UI/UX principles, responsive design, and seamless CMS integration. The project includes wireframing, prototyping, visual design, front-end development, and content migration.",
  statusColor: "bg-blue-100 text-blue-700 border-blue-200",
  progressColor: "bg-blue-500",
  milestones: [
    { name: "Discovery & Research", date: "Jan 15, 2026", status: "complete" },
    { name: "Wireframing", date: "Feb 10, 2026", status: "complete" },
    { name: "Visual Design", date: "Mar 05, 2026", status: "in-progress" },
    { name: "Development", date: "Apr 01, 2026", status: "pending" },
    { name: "Testing & QA", date: "May 01, 2026", status: "pending" },
    { name: "Launch", date: "Jun 01, 2026", status: "pending" },
  ],
  team: [
    { name: "Sarah Johnson", role: "Project Manager", avatar: "SJ", color: "bg-purple-500" },
    { name: "Mike Chen", role: "Lead Designer", avatar: "MC", color: "bg-blue-500" },
    { name: "Emily Davis", role: "Developer", avatar: "ED", color: "bg-green-500" },
    { name: "Alex Rivera", role: "Content Strategist", avatar: "AR", color: "bg-amber-500" },
  ],
  documents: [
    { name: "Project Brief.pdf", date: "Jan 20, 2026" },
    { name: "Wireframes_v2.fig", date: "Feb 15, 2026" },
    { name: "Style Guide.pdf", date: "Mar 01, 2026" },
  ],
  recentMessages: [
    { from: "Sarah Johnson", message: "The homepage mockups are ready for your review.", time: "2 hours ago" },
    { from: "Mike Chen", message: "I have updated the color palette based on your feedback.", time: "1 day ago" },
  ],
}

export default function ProjectDetailClient({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "messages">("overview")

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
            <Badge variant="outline" className={cn(project.statusColor)}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">Project ID: PRJ-{project.id.padStart(4, "0")}</p>
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
                    className={cn("h-full rounded-full", project.progressColor)}
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
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Timeline / Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {project.milestones.map((milestone, i) => (
                  <div key={i} className="flex gap-4 pb-6 relative last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10",
                          milestone.status === "complete" && "bg-green-100 text-green-600",
                          milestone.status === "in-progress" && "bg-blue-100 text-blue-600",
                          milestone.status === "pending" && "bg-gray-100 text-gray-400"
                        )}
                      >
                        {milestone.status === "complete" && <CheckCircle2 className="h-4 w-4" />}
                        {milestone.status === "in-progress" && <Clock className="h-4 w-4" />}
                        {milestone.status === "pending" && <CircleDot className="h-4 w-4" />}
                      </div>
                      {i < project.milestones.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          milestone.status === "complete" && "text-green-700",
                          milestone.status === "in-progress" && "text-blue-700",
                          milestone.status === "pending" && "text-muted-foreground"
                        )}
                      >
                        {milestone.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{milestone.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-medium",
                      member.color
                    )}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.documents.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Messages</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.recentMessages.map((msg) => (
                <div key={msg.from + msg.time} className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              ))}
              <Button className="w-full" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
