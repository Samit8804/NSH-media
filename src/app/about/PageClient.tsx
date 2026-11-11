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
