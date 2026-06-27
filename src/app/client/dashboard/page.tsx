"use client"

import { motion } from "framer-motion"
import {
  FolderOpen,
  CheckCircle2,
  Receipt,
  MessageSquare,
  ArrowRight,
  Plus,
  FileText,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Active Projects", value: "3", icon: FolderOpen, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Completed", value: "8", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  { label: "Pending Invoices", value: "2", icon: Receipt, color: "text-amber-600", bg: "bg-amber-100" },
  { label: "Unread Messages", value: "5", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-100" },
]

const recentActivity = [
  { action: "Document uploaded", detail: "Brand Guidelines v3.pdf", time: "2 hours ago", type: "document" },
  { action: "Invoice paid", detail: "Invoice #0042 - $3,500.00", time: "Yesterday", type: "invoice" },
  { action: "Project milestone", detail: "Homepage redesign - Design phase completed", time: "2 days ago", type: "project" },
  { action: "Message received", detail: "Sarah: Mockups are ready for review", time: "3 days ago", type: "message" },
  { action: "New project created", detail: "SEO Optimization Campaign", time: "5 days ago", type: "project" },
]

const projects = [
  { name: "Website Redesign", status: "Design", progress: 45, color: "bg-blue-500" },
  { name: "SEO Campaign", status: "Development", progress: 70, color: "bg-yellow-500" },
  { name: "Social Media Package", status: "Review", progress: 90, color: "bg-purple-500" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ClientDashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-1">Here is what is happening with your projects today.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", stat.bg)}>
                    <Icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-3 border-b border-border last:border-0"
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                      item.type === "document" && "bg-blue-100 text-blue-600",
                      item.type === "invoice" && "bg-green-100 text-green-600",
                      item.type === "project" && "bg-purple-100 text-purple-600",
                      item.type === "message" && "bg-amber-100 text-amber-600"
                    )}>
                      {item.type === "document" && <FileText className="h-4 w-4" />}
                      {item.type === "invoice" && <Receipt className="h-4 w-4" />}
                      {item.type === "project" && <FolderOpen className="h-4 w-4" />}
                      {item.type === "message" && <MessageSquare className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div key={project.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{project.name}</span>
                    <Badge variant="secondary" className="text-xs">{project.status}</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className={cn("h-full rounded-full", project.color)}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5 block">{project.progress}% complete</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project Request
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Portfolio
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
