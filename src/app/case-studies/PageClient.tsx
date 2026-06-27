"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const caseStudies = [
  {
    title: "E-Commerce Transformation for Urban Luxe", client: "Urban Luxe", industry: "Fashion & Retail",
    description: "A complete digital overhaul that transformed a traditional fashion retailer into a high-converting e-commerce powerhouse.",
    results: [
      { icon: TrendingUp, label: "Revenue Growth", value: "340%" },
      { icon: Users, label: "Traffic Increase", value: "280%" },
      { icon: DollarSign, label: "Avg. Order Value", value: "+65%" },
      { icon: Clock, label: "Page Load Speed", value: "0.8s" },
    ],
  },
  {
    title: "AI-Powered Lead Generation for TechCorp", client: "TechCorp Solutions", industry: "Technology",
    description: "Implemented an intelligent AI automation system that redefined how TechCorp generates, qualifies, and converts leads.",
    results: [
      { icon: TrendingUp, label: "Lead Conversion", value: "215%" },
      { icon: Users, label: "Qualified Leads", value: "4.2x" },
      { icon: DollarSign, label: "Cost Per Lead", value: "-60%" },
      { icon: Clock, label: "Response Time", value: "2 min" },
    ],
  },
  {
    title: "Brand Identity & Platform for GreenLife", client: "GreenLife Organics", industry: "Health & Wellness",
    description: "A full-spectrum branding and web development project that positioned GreenLife as a market leader in organic products.",
    results: [
      { icon: TrendingUp, label: "Brand Awareness", value: "410%" },
      { icon: Users, label: "Online Sales", value: "290%" },
      { icon: DollarSign, label: "Customer Retention", value: "+85%" },
      { icon: Clock, label: "Time to Market", value: "6 weeks" },
    ],
  },
  {
    title: "Real Estate Platform for Metro Properties", client: "Metro Properties", industry: "Real Estate",
    description: "A cutting-edge real estate platform with AI-powered search, 3D virtual tours, and automated listing syndication.",
    results: [
      { icon: TrendingUp, label: "Listing Views", value: "300%" },
      { icon: Users, label: "Virtual Tours", value: "68%" },
      { icon: DollarSign, label: "Time-to-Close", value: "-40%" },
      { icon: Clock, label: "Platform Uptime", value: "99.9%" },
    ],
  },
]

const gradients = [
  "from-[#2563EB]/20 to-[#7C3AED]/20",
  "from-[#22C55E]/20 to-[#0891B2]/20",
  "from-[#F59E0B]/20 to-[#EF4444]/20",
  "from-[#EC4899]/20 to-[#8B5CF6]/20",
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Case{" "}<span className="text-gradient">Studies</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            See how we have helped businesses achieve remarkable results through strategic digital solutions.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <motion.div key={study.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card group overflow-hidden glass-hover">
                <div className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {study.results.slice(0, 4).map((r) => (
                      <div key={r.label} className="glass rounded-xl p-3 text-center">
                        <p className="text-lg font-bold text-primary-hover">{r.value}</p>
                        <p className="text-[10px] text-silver/70">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">{study.industry}</Badge>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">{study.client}</p>
                  <h3 className="mb-3 text-xl font-bold group-hover:text-primary">{study.title}</h3>
                  <p className="mb-6 leading-relaxed text-silver text-sm">{study.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:gap-3">
                    <Link href="/contact">Read Full Case Study</Link> <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Want Results Like These?</h2>
          <p className="mb-8 text-lg text-silver">Let&apos;s discuss how we can help your business achieve measurable growth.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Start Your Journey <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
