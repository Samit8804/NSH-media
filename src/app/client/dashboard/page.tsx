"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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
import { getClientDashboard } from "@/actions/client-portal"

type DashboardData = Awaited<ReturnType<typeof getClientDashboard>>

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

const statusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500"
    case "Design":
      return "bg-blue-500"
    case "Development":
      return "bg-yellow-500"
    case "Testing":
      return "bg-orange-500"
    case "Review":
      return "bg-purple-500"
    default:
      return "bg-gray-400"
  }
}

export default function ClientDashboard() {
  const [data, setData] = useState<DashboardData | null | undefined>(undefined)

  useEffect(() => {
    getClientDashboard().then(setData).catch(() => setData(null))
  }, [])

  if (data === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Client Portal</h1>
        <p className="mt-2 text-muted-foreground">Please sign in to view your projects, invoices, and messages.</p>
        <Link href="/auth/login">
          <Button className="mt-6">Sign In</Button>
        </Link>
      </div>
    )
  }

  const stats = [
    { label: "Active Projects", value: data.activeProjects, icon: FolderOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Completed", value: data.completedProjects, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending Invoices", value: data.pendingInvoices, icon: Receipt, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Recent Messages", value: data.messages.length, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-foreground">Welcome back{data.user.name ? `, ${data.user.name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground mt-1">
          {data.client
            ? "Here is what is happening with your projects today."
            : "Your client account has not been linked yet. Contact us to get set up."}
        </p>
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
              <CardTitle>Recent Messages</CardTitle>
              <Link href="/client/messages">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {data.messages.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                <div className="space-y-0">
                  {data.messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-purple-100 text-purple-600">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{message.sender}</p>
                        <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(message.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.projects.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">No active projects yet.</p>
              ) : (
                data.projects.slice(0, 5).map((project) => (
                  <div key={project.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{project.title}</span>
                      <Badge variant="secondary" className="text-xs">{project.status}</Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className={cn("h-full rounded-full", statusColor(project.status))}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-0.5 block">{project.progress}% complete</span>
                  </div>
                ))
              )}
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
            <Link href="/contact">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project Request
              </Button>
            </Link>
            <Link href="/client/documents">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </Button>
            </Link>
            <Link href="/client/messages">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Portfolio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
