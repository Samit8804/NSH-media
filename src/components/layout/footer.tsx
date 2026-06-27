"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Youtube, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

const services = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "E-Commerce", href: "/services/e-commerce" },
  { label: "SEO", href: "/services/seo" },
  { label: "Branding", href: "/services/branding" },
  { label: "Maintenance", href: "/services/maintenance" },
  { label: "AI Automation", href: "/services/ai-automation" },
]

const company = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const resources = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
]

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "GitHub", href: "#", icon: Github },
  { label: "YouTube", href: "#", icon: Youtube },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-bg">
      <div className="border-t border-[rgba(37,99,235,0.2)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="container-site pt-20 pb-12 lg:pt-30"
        >
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-1">
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  NSH
                </span>
                <span className="text-primary text-2xl font-bold">.</span>
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  MEDIA
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver">
                We craft digital experiences that drive growth. From web
                development to AI automation, we help businesses thrive in the
                digital landscape.
              </p>
              <div className="mt-7 flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/5 text-silver transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-white">
                Services
              </h3>
              <ul className="mt-6 space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-silver transition-colors duration-200 hover:text-white"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-white">
                Company
              </h3>
              <ul className="mt-6 space-y-3">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-silver transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-white">
                Resources
              </h3>
              <ul className="mt-6 space-y-3">
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <Link
                      href={resource.href}
                      className="text-sm text-silver transition-colors duration-200 hover:text-white"
                    >
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-white">
                Stay Updated
              </h3>
              <p className="mt-3 text-sm text-silver">
                Get the latest news and insights delivered to your inbox.
              </p>
              <div className="mt-5 flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-l-[14px] border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-silver/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button className="flex shrink-0 items-center justify-center rounded-r-[14px] bg-primary px-4 text-white transition-all hover:bg-primary-hover">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 text-sm text-silver">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>contact@nshmedia.com</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-silver">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-silver">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>123 Digital Ave, Tech City, TC 10001</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="border-t border-white/5">
          <div className="container-site flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-silver">
              &copy; {currentYear} NSH Media. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                href="/privacy-policy"
                className="text-xs text-silver transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs text-silver transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="text-xs text-silver transition-colors hover:text-white"
              >
                Refund Policy
              </Link>
              <Link
                href="/auth/login"
                className="text-xs text-silver/40 transition-colors hover:text-primary"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
