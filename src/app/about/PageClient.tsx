"use client"

import { motion } from "framer-motion"
import {
  Lightbulb,
  Award,
  ShieldCheck,
  Users,
  TrendingUp,
  Eye,
  Sparkles,
  ArrowRight,
  Palette,
  Code2,
  ShoppingCart,
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

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Structure, wireframes, visual design, and a reusable design system for responsive websites.",
    href: "/services/web-design",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, maintainable websites and web applications built with modern frameworks.",
    href: "/services/web-development",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Online stores with clear product journeys, secure checkout, and practical store management.",
    href: "/services/ecommerce",
  },
]

const values = [
  { icon: Lightbulb, title: "Clarity", description: "We define scope, milestones, and deliverables before work starts so everyone knows what is being built and why." },
  { icon: Award, title: "Quality", description: "We review design and code for usability, performance, accessibility, and maintainability before launch." },
  { icon: ShieldCheck, title: "Transparency", description: "We communicate directly about progress, trade-offs, and anything that could affect the project." },
  { icon: Users, title: "Collaboration", description: "The best work comes from a real partnership between the client and the people doing the work." },
  { icon: TrendingUp, title: "Improvement", description: "We keep learning and refining our process so each project benefits from the last." },
]

const approach = [
  {
    title: "Understand",
    description:
      "We start with your goals, audience, content, and constraints. No design decisions before the problem is clear.",
  },
  {
    title: "Structure",
    description:
      "We map pages, user journeys, and technical requirements so the build has a solid foundation.",
  },
  {
    title: "Design and build",
    description:
      "Design and development work together, with review points before launch.",
  },
  {
    title: "Launch and hand over",
    description:
      "We test the site, deploy it, and make sure you can manage the parts you need to manage.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Visual Solutions
          </p>
          <h1 className="text-hero mb-6">
            About{" "}
            <span className="text-gradient">NSH Media Services</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-silver">
            A digital design and development studio focused on web design, web
            development, and e-commerce.
          </p>
        </motion.div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Who we are
              </span>
              <h2 className="text-section mb-6">
                A focused studio for websites that need to work
              </h2>
              <div className="space-y-4 leading-relaxed text-silver">
                <p>
                  NSH Media Services helps businesses plan, design, and build
                  websites, web applications, and online stores. Our work is
                  concentrated in three connected services rather than every
                  digital discipline.
                </p>
                <p>
                  That focus lets us carry a project from early structure and
                  visual design through development and launch. We agree the
                  scope and milestones in writing, and we keep the process
                  visible from start to finish.
                </p>
                <p>
                  If you are planning a new website, a redesign, or an online
                  store, tell us what you are trying to achieve. We will give
                  you a direct answer about whether we are the right fit.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-primary/10 to-[#7C3AED]/10"
              {...fadeInUp}
            >
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {["#2563EB", "#94A3B8", "#F8FAFC", "#020617"].map(
                    (color, i) => (
                      <div key={i} className="glass rounded-xl p-4">
                        <div className="mb-2 h-3 w-16 rounded bg-white/10" />
                        <div
                          className="h-8 w-full rounded"
                          style={{ backgroundColor: `${color}20` }}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site">
          <motion.div className="mb-14 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              What we do
            </span>
            <h2 className="text-section">Three connected services</h2>
          </motion.div>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            {...stagger}
          >
            {services.map((service) => (
              <motion.div key={service.title} {...stagger}>
                <Link
                  href={service.href}
                  className="glass-card group flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-silver">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-14 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our approach
            </span>
            <h2 className="text-section">A clear way of working</h2>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            {...stagger}
          >
            {approach.map((step, index) => (
              <motion.div
                key={step.title}
                className="glass-card p-7"
                {...stagger}
              >
                <span className="mb-4 block font-heading text-3xl font-bold text-primary/40">
                  0{index + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-silver">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 bg-secondary">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div className="glass-card p-10" {...fadeInUp}>
              <Eye className="mb-4 h-8 w-8 text-primary" />
              <h2 className="text-card mb-4">Our mission</h2>
              <p className="leading-relaxed text-silver">
                To help businesses build clear, useful digital experiences that
                combine thoughtful design, reliable development, and a practical
                understanding of how the site will be used.
              </p>
            </motion.div>
            <motion.div className="glass-card p-10" {...fadeInUp}>
              <Sparkles className="mb-4 h-8 w-8 text-accent" />
              <h2 className="text-card mb-4">Our vision</h2>
              <p className="leading-relaxed text-silver">
                To be a trusted digital partner for the businesses we work with
                — known for direct communication, considered craft, and websites
                that remain maintainable after launch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <motion.div className="mb-16 text-center" {...fadeInUp}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Values
            </span>
            <h2 className="text-section">What we stand for</h2>
          </motion.div>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            {...stagger}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="glass-card group p-8 text-center glass-hover"
                {...stagger}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-silver">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding px-6">
        <motion.div className="container-site max-w-2xl text-center" {...fadeInUp}>
          <h2 className="text-section mb-4">Let&apos;s work together</h2>
          <p className="mb-8 text-lg leading-relaxed text-silver">
            Ready to discuss a website, web application, or online store? Tell us
            about the project and we will reply with next steps.
          </p>
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
