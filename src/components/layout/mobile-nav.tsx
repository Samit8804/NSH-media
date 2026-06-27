"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavLink } from "@/types"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[14px] text-silver transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {links.map((link, i) => (
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
                                onClick={onClose}
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
                        onClick={onClose}
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
            <div className="border-t border-white/10 p-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
              >
                Get a Quote
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
