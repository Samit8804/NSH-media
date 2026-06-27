"use client"

import { motion } from "framer-motion"
import {
  Lightbulb, Award, ShieldCheck, Users, TrendingUp,
  Eye, Sparkles, Briefcase, ArrowRight, Globe, MessageCircle, Linkedin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, staggerChildren: 0.1 },
}

const values = [
  { icon: Lightbulb, title: "Innovation", description: "We push creative boundaries to deliver cutting-edge solutions that set new industry standards." },
  { icon: Award, title: "Quality", description: "Every project undergoes rigorous quality assurance to ensure pixel-perfect, high-performance results." },
  { icon: ShieldCheck, title: "Transparency", description: "Open communication and honest reporting form the foundation of every client relationship." },
  { icon: Users, title: "Collaboration", description: "We believe the best work emerges from deep partnership between our team and our clients." },
  { icon: TrendingUp, title: "Growth", description: "We are committed to continuous learning and helping our clients scale their digital presence." },
]

const timeline = [
  { year: "2020", title: "Founded", description: "NSH Media was established with a vision to transform digital experiences for businesses worldwide." },
  { year: "2021", title: "First 50 Clients", description: "Reached the milestone of 50 satisfied clients across web development and branding projects." },
  { year: "2022", title: "Expanded Services", description: "Launched AI automation, SEO, and e-commerce divisions to meet growing client demand." },
  { year: "2023", title: "Team Growth", description: "Grew to a team of 25+ talented professionals spanning design, development, and strategy." },
  { year: "2024", title: "Global Reach", description: "Expanded operations internationally, serving clients across North America, Europe, and Asia." },
  { year: "2025", title: "Industry Leaders", description: "Recognized as a top digital agency with 200+ successful projects and multiple industry awards." },
  { year: "2026", title: "Innovation Hub", description: "Launched our AI research division and opened a new innovation lab in Silicon Valley." },
]

const team = [
  { name: "Alexandra Chen", position: "CEO & Founder", initials: "AC" },
  { name: "Marcus Rivera", position: "CTO", initials: "MR" },
  { name: "Sarah Thompson", position: "Creative Director", initials: "ST" },
  { name: "James Okafor", position: "Head of Strategy", initials: "JO" },
]

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Team Members" },
  { value: "6+", label: "Years of Excellence" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <motion.div className="relative mx-auto max-w-4xl text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-hero mb-6">
            About{" "}
            <span className="text-gradient">NSH Media</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-silver">
            Building digital excellence since 2020
          </p>
        </motion.div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our Story</span>
              <h2 className="text-section mb-6">Crafted with Purpose, Driven by Passion</h2>
              <div className="space-y-4 leading-relaxed text-silver">
                <p>Founded in 2020, NSH Media began as a small design studio with a big dream: to help businesses tell their stories through exceptional digital experiences. What started with two founders working from a co-working space has grown into a full-service digital agency with a global footprint.</p>
                <p>Over the years, we have partnered with startups, enterprises, and nonprofits alike, delivering everything from stunning websites and e-commerce platforms to AI-driven automation and comprehensive SEO strategies. Every project we undertake is guided by a simple philosophy — put the client first, never compromise on quality, and always stay ahead of the curve.</p>
                <p>Today, our team of 50+ creators, engineers, and strategists continues to push boundaries, leveraging cutting-edge technology and timeless design principles to create work that matters.</p>
              </div>
            </motion.div>
            <motion.div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-primary/10 to-[#7C3AED]/10" {...fadeInUp}>
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {["#2563EB", "#F59E0B", "#22C55E", "#EF4444"].map((color, i) => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="mb-2 h-3 w-16 rounded bg-white/10" />
                      <div className="h-8 w-full rounded" style={{ backgroundColor: `${color}20` }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div className="glass-card p-10" {...fadeInUp}>
              <Eye className="mb-4 h-8 w-8 text-primary" />
              <h3 className="text-card mb-4">Our Mission</h3>
              <p className="leading-relaxed text-silver">To empower businesses with transformative digital solutions that blend creativity, technology, and strategy — enabling them to thrive in an ever-evolving digital landscape.</p>
            </motion.div>
            <motion.div className="glass-card p-10" {...fadeInUp}>
              <Sparkles className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-card mb-4">Our Vision</h3>
              <p className="leading-relaxed text-silver">To be the most trusted digital partner globally, setting the benchmark for innovation, quality, and client success in every market we serve.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Core Values</span>
            <h2 className="text-section">What We Stand For</h2>
          </motion.div>
          <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" {...stagger}>
            {values.map((value) => (
              <motion.div key={value.title} className="glass-card p-8 text-center group glass-hover" {...stagger}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-silver">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site max-w-4xl">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Timeline</span>
            <h2 className="text-section">Our Journey</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[23px] top-0 h-full w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div key={item.year} className="relative flex items-start gap-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-dark-bg">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{item.year.slice(2)}</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Team</span>
            <h2 className="text-section">Meet the People Behind the Work</h2>
          </motion.div>
          <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" {...stagger}>
            {team.map((member) => (
              <motion.div key={member.name} className="glass-card p-8 text-center group glass-hover" {...stagger}>
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-[#7C3AED]/20 text-2xl font-bold text-primary">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mb-4 text-sm font-medium text-primary">{member.position}</p>
                <div className="flex justify-center gap-3">
                  {[Globe, MessageCircle, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-silver transition-colors hover:bg-primary hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 bg-mesh">
        <div className="relative container-site">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} className="glass-card p-8 text-center" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-primary-hover">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <motion.div className="container-site max-w-2xl text-center" {...fadeInUp}>
          <h2 className="text-section mb-4">Let&apos;s Work Together</h2>
          <p className="mb-8 text-lg leading-relaxed text-silver">Ready to build something extraordinary? Get in touch and let us bring your vision to life.</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">
              Start a Project <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
