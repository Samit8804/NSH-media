"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase, MapPin, Clock, DollarSign, HeartHandshake, Laptop, Coffee,
  Globe, BookOpen, Gift, Users, Upload, Send, CheckCircle, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

const perks = [
  { icon: Laptop, title: "Remote-First Culture", description: "Work from anywhere in the world. We trust our team to deliver, no matter where they are." },
  { icon: HeartHandshake, title: "Health & Wellness", description: "Comprehensive health insurance, dental, vision, and wellness stipends." },
  { icon: Coffee, title: "Flexible Hours", description: "Design your own schedule. We focus on output, not hours logged." },
  { icon: Globe, title: "Global Team Retreats", description: "Annual team retreats in inspiring locations around the world." },
  { icon: BookOpen, title: "Learning Budget", description: "Annual budget for courses, conferences, books, and professional development." },
  { icon: Gift, title: "Equity & Bonuses", description: "Competitive compensation with equity packages and performance bonuses." },
  { icon: Users, title: "Inclusive Culture", description: "A diverse, welcoming environment where every voice is heard and valued." },
  { icon: DollarSign, title: "Competitive Salary", description: "Top-of-market compensation with regular reviews and adjustments." },
]

const jobs = [
  { title: "Senior Frontend Developer", department: "Engineering", location: "Remote / New York", type: "Full-Time", description: "Build world-class web experiences using Next.js, React, and modern frontend technologies." },
  { title: "UI/UX Designer", department: "Design", location: "Remote / New York", type: "Full-Time", description: "Create beautiful, intuitive interfaces and delightful user experiences for our clients." },
  { title: "SEO Strategist", department: "Marketing", location: "Remote", type: "Full-Time", description: "Develop and execute data-driven SEO strategies that drive organic growth for our clients." },
  { title: "Project Manager", department: "Operations", location: "New York", type: "Contract", description: "Lead cross-functional teams to deliver exceptional projects on time and within budget." },
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault(); setApplied(true)
    setTimeout(() => { setApplied(false); setSelectedJob(null) }, 3000)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Briefcase className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h1 className="text-hero mb-6">Join Our{" "}<span className="text-gradient">Team</span></h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-silver">
              Come build the future of digital experiences with a team of passionate, creative, and driven individuals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our Culture</span>
              <h2 className="text-section mb-6">Where Creativity Meets Technology</h2>
              <div className="space-y-4 leading-relaxed text-silver">
                <p>At NSH Media, we believe that great work happens when talented people are given the freedom to innovate. Our culture is built on trust, collaboration, and a shared passion for pushing the boundaries of what digital experiences can achieve.</p>
                <p>We hire people, not resumes. Whether you are a seasoned professional or an emerging talent, if you bring curiosity, drive, and a commitment to excellence, you will find a home here.</p>
                <p>Diversity is not just a value — it is a competitive advantage. We actively cultivate an inclusive environment where different perspectives fuel better ideas and stronger outcomes.</p>
              </div>
            </motion.div>
            <motion.div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-primary/10 to-[#7C3AED]/10 flex items-center justify-center" {...fadeInUp}>
              <Users className="h-20 w-20 text-primary/30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Benefits</span>
            <h2 className="text-section">Perks & Benefits</h2>
          </motion.div>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" {...stagger}>
            {perks.map((perk) => (
              <motion.div key={perk.title} className="glass-card p-6 glass-hover" {...stagger}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <perk.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold">{perk.title}</h3>
                <p className="text-sm leading-relaxed text-silver">{perk.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site max-w-4xl">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Open Positions</span>
            <h2 className="text-section">Join Us</h2>
          </motion.div>
          <motion.div className="space-y-6" {...stagger}>
            {jobs.map((job) => (
              <motion.div key={job.title} className="glass-card group flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between glass-hover" {...stagger}>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary">{job.title}</h3>
                  <p className="mb-2 text-sm text-silver">{job.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-silver/60">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                  </div>
                </div>
                <Button onClick={() => setSelectedJob(job.title)} className="shrink-0 gap-2 bg-primary text-white hover:bg-primary-hover">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedJob} onOpenChange={(open) => { if (!open) setSelectedJob(null); setApplied(false) }}>
        <DialogContent className="sm:max-w-lg bg-dark-bg border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for {selectedJob}</DialogTitle>
            <DialogDescription className="text-silver">Fill out the form below and we will review your application.</DialogDescription>
          </DialogHeader>
          {applied ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">Application Submitted!</h3>
              <p className="text-sm text-silver">Thank you for applying. We will review your application and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="apply-name">Full Name</Label><Input id="apply-name" placeholder="John Doe" required className="glass border-white/10" /></div>
                <div><Label htmlFor="apply-email">Email</Label><Input id="apply-email" type="email" placeholder="john@example.com" required className="glass border-white/10" /></div>
              </div>
              <div><Label htmlFor="apply-phone">Phone</Label><Input id="apply-phone" type="tel" placeholder="+1 (555) 000-0000" required className="glass border-white/10" /></div>
              <div><Label htmlFor="apply-position">Position</Label><Input id="apply-position" value={selectedJob || ""} readOnly className="glass border-white/10 bg-white/5" /></div>
              <div>
                <Label htmlFor="resume">Resume / CV</Label>
                <div className="mt-1 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-white/20 p-6 transition-colors hover:border-primary">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 h-6 w-6 text-silver/60" />
                    <p className="text-sm font-medium text-silver">Click to upload or drag and drop</p>
                    <p className="text-xs text-silver/40">PDF, DOC, DOCX (max 10MB)</p>
                  </div>
                </div>
              </div>
              <div><Label htmlFor="apply-message">Cover Letter (optional)</Label><Textarea id="apply-message" rows={4} placeholder="Tell us why you would be a great fit..." className="glass border-white/10" /></div>
              <Button type="submit" className="w-full gap-2 bg-primary text-white hover:bg-primary-hover">Submit Application <Send className="h-4 w-4" /></Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <motion.div className="relative container-site max-w-xl text-center" {...fadeInUp}>
          <h2 className="text-subsection mb-4">Do Not See the Right Role?</h2>
          <p className="mb-8 text-lg text-silver">We are always looking for talented individuals. Send us your resume and we will keep you in mind for future opportunities.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">Send Open Application <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
