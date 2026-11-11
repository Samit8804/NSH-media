"use client"

import { ReactNode } from "react"
import ClientSidebar from "@/components/client/ClientSidebar"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const user = session?.user as { name?: string | null; email?: string | null } | undefined
  const displayName = user?.name || user?.email || "Client"
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-sm font-semibold text-muted-foreground">Client Portal</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 ml-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">{initials || "C"}</span>
              </div>
              <span className="hidden lg:block text-sm font-medium text-foreground">{displayName}</span>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto p-4 lg:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
