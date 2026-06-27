"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: "1",
    title: "Website Redesign",
    status: "Design",
    progress: 45,
    description: "Complete overhaul of the corporate website with modern UI/UX, responsive design, and CMS integration.",
    color: "bg-blue-500",
    badgeBg: "bg-blue-100 text-blue-700",
  },
  {
    id: "2",
    title: "SEO Optimization Campaign",
    status: "Development",
    progress: 70,
    description: "Comprehensive SEO strategy including keyword research, on-page optimization, and backlink building.",
    color: "bg-yellow-500",
    badgeBg: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "3",
    title: "Social Media Management",
    status: "Review",
    progress: 90,
    description: "Content creation, scheduling, and analytics for Instagram, LinkedIn, and Twitter platforms.",
    color: "bg-purple-500",
    badgeBg: "bg-purple-100 text-purple-700",
  },
  {
    id: "4",
    title: "Brand Identity Package",
    status: "Completed",
    progress: 100,
    description: "Logo design, color palette, typography, brand guidelines, and stationery design.",
    color: "bg-green-500",
    badgeBg: "bg-green-100 text-green-700",
  },
  {
    id: "5",
    title: "Email Marketing Setup",
    status: "Discovery",
    progress: 15,
    description: "Email automation workflows, template design, subscriber list segmentation, and A/B testing setup.",
    color: "bg-gray-400",
    badgeBg: "bg-gray-100 text-gray-700",
  },
  {
    id: "6",
    title: "Mobile App UI Design",
    status: "Testing",
    progress: 80,
    description: "User interface design for iOS and Android app including wireframes, prototypes, and asset delivery.",
    color: "bg-orange-500",
    badgeBg: "bg-orange-100 text-orange-700",
  },
]

const statusColors: Record<string, string> = {
  Discovery: "bg-gray-100 text-gray-700 border-gray-200",
  Design: "bg-blue-100 text-blue-700 border-blue-200",
  Development: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Testing: "bg-orange-100 text-orange-700 border-orange-200",
  Review: "bg-purple-100 text-purple-700 border-purple-200",
  Completed: "bg-green-100 text-green-700 border-green-200",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ClientProjects() {
  const [search, setSearch] = useState("")

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">View and manage all your active and past projects.</p>
        </div>
        <Button>Request New Project</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filtered.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <Link href={`/client/projects/${project.id}`}>
              <Card className="border-border h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn("ml-2 shrink-0", statusColors[project.status])}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full", project.color)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
