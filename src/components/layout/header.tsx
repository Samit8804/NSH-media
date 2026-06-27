"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ChevronDown, Sparkles, X, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavLink } from "@/types"

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Design", href: "/services/web-design" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "E-Commerce", href: "/services/e-commerce" },
      { label: "SEO", href: "/services/seo" },
      { label: "Branding", href: "/services/branding" },
      { label: "Maintenance", href: "/services/maintenance" },
      { label: "AI Automation", href: "/services/ai-automation" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const fadeSlideUp = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const

const linkUnderline = {
  rest: { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1 },
} as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeSlideUp}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container-site flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="NSH Media" className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "group relative flex items-center gap-1 rounded-[14px] px-4 py-2 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-primary"
                          : "text-silver hover:text-white"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          dropdownOpen && "rotate-180"
                        )}
                      />
                      <motion.span
                        variants={linkUnderline}
                        initial="rest"
                        whileHover="hover"
                        animate={isActive(link.href) ? "hover" : "rest"}
                        className="absolute bottom-0 left-4 right-4 h-0.5 origin-left rounded-full bg-primary"
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="glass absolute left-0 top-full mt-2 w-56 rounded-[20px] p-2 shadow-xl shadow-black/30"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "group flex items-center rounded-[14px] px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive(child.href)
                                  ? "bg-primary/20 text-primary"
                                  : "text-silver hover:bg-white/5 hover:text-white"
                              )}
                            >
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors group-hover:bg-primary" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative inline-block rounded-[14px] px-4 py-2 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-primary"
                        : "text-silver hover:text-white"
                    )}
                  >
                    {link.label}
                    <motion.span
                      variants={linkUnderline}
                      initial="rest"
                      whileHover="hover"
                      animate={isActive(link.href) ? "hover" : "rest"}
                      className="absolute bottom-0 left-4 right-4 h-0.5 origin-left rounded-full bg-primary"
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden sm:flex items-center gap-1.5 text-xs text-silver/50 transition-colors hover:text-primary"
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-[14px] bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get a Quote
              <Sparkles className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-[14px] text-silver transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation - Glass Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="glass fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <Link
                  href="/"
                  className="flex items-center gap-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="font-heading text-lg font-bold tracking-tight text-white">
                    NSH
                  </span>
                  <span className="text-primary text-lg font-bold">.</span>
                  <span className="font-heading text-lg font-bold tracking-tight text-white">
                    MEDIA
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[14px] text-silver transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: 24, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                    >
                      {link.children ? (
                        <div className="py-1">
                          <span
                            className={cn(
                              "flex items-center rounded-[14px] px-4 py-3 text-sm font-semibold",
                              isActive(link.href)
                                ? "text-primary"
                                : "text-white"
                            )}
                          >
                            {link.label}
                            <ChevronDown className="ml-auto h-4 w-4 text-silver" />
                          </span>
                          <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-white/10 pl-3">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={cn(
                                    "block rounded-[14px] px-4 py-2.5 text-sm font-medium transition-colors",
                                    isActive(child.href)
                                      ? "bg-primary/20 text-primary"
                                      : "text-silver hover:bg-white/5 hover:text-white"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-[14px] px-4 py-3 text-sm font-medium transition-colors",
                            isActive(link.href)
                              ? "bg-primary/20 text-primary"
                              : "text-silver hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 p-4 space-y-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-white/10 px-5 py-2.5 text-xs text-silver/60 transition-all hover:border-primary/30 hover:text-primary"
                >
                  <Lock className="h-3 w-3" />
                  Admin Login
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
