"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolio": "Portfolio",
  "/admin/portfolio/new": "New Project",
  "/admin/blog": "Blog Posts",
  "/admin/blog/new": "New Post",
  "/admin/leads": "Leads",
  "/admin/testimonials": "Testimonials",
  "/admin/team": "Team",
  "/admin/services": "Services",
  "/admin/pricing": "Pricing",
  "/admin/faq": "FAQ",
  "/admin/analytics": "Analytics",
  "/admin/media": "Media Library",
  "/admin/theme": "Theme Settings",
  "/admin/settings": "Settings",
}

function getPageTitle(path: string): string {
  if (pageTitles[path]) return pageTitles[path]
  const match = Object.entries(pageTitles).find(([key]) => path.startsWith(key))
  return match ? match[1] : "Admin"
}

interface AdminHeaderProps {
  onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [query, setQuery] = useState("")
  const user = session?.user as { name?: string | null; email?: string | null } | undefined
  const displayName = user?.name || user?.email || "Admin"
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleSearch = () => {
    const q = query.trim().toLowerCase()
    if (!q) return
    const match = Object.entries(pageTitles).find(
      ([path, title]) => title.toLowerCase().includes(q) || path.toLowerCase().includes(q)
    )
    if (match) router.push(match[0])
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 glass-nav px-4 md:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden -ml-2 p-2 text-silver hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        <Menu className="h-5 w-5" />
      </button>

      <motion.h1
        key={pathname}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold text-white flex-1 md:flex-none"
      >
        {getPageTitle(pathname)}
      </motion.h1>

      <div className="hidden md:block flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver/70 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
            className="w-full rounded-xl bg-white/[0.04] border border-white/5 pl-9 pr-16 py-2 text-sm text-white placeholder:text-silver/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/5 px-1.5 py-0.5 text-[10px] font-medium text-silver/60">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/admin/leads"
          aria-label="View leads"
          className="relative p-2.5 text-silver hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <Bell className="h-5 w-5" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-lg">
                {initials || "A"}
              </div>
              <ChevronDown className="h-4 w-4 text-silver/70 hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-normal text-silver -mt-2">
              {user?.email || ""}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push("/admin/settings")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/admin/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-400 focus:text-red-400"
              onSelect={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
