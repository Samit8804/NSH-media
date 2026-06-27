"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Star,
  UserCircle,
  Settings,
  DollarSign,
  HelpCircle,
  BarChart3,
  Image,
  Palette,
  Cog,
  ArrowLeft,
  X,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Team", href: "/admin/team", icon: UserCircle },
  { label: "Services", href: "/admin/services", icon: Settings },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Theme", href: "/admin/theme", icon: Palette },
  { label: "Settings", href: "/admin/settings", icon: Cog },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex h-full flex-col glass-nav border-r border-white/5">
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-500/20">
            NS
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight leading-none">NSH Media</div>
            <div className="text-[10px] text-silver font-medium mt-0.5">Admin Panel</div>
          </div>
        </Link>
        <button onClick={onClose} className="lg:hidden text-silver hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-white bg-primary/10 border border-primary/20 shadow-sm shadow-primary/10"
                  : "text-silver hover:text-white hover:bg-white/[0.04] border border-transparent"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-silver/70"
              )} />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/5 p-4 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-silver hover:text-white hover:bg-white/[0.04] transition-all"
          onClick={onClose}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Website</span>
        </Link>

        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 border border-white/5">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-lg">
              JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#020617]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">John Doe</div>
            <div className="text-xs text-silver truncate">admin@nshmedia.com</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-30">
        {sidebarContent}
      </aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
