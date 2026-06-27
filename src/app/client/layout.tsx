"use client"

import { ReactNode } from "react"
import ClientSidebar from "@/components/client/ClientSidebar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <ClientSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-sm font-semibold text-muted-foreground">Client Portal</span>
          </div>

          <div className="hidden lg:flex items-center relative max-w-md w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-muted border-none"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">JD</span>
              </div>
              <span className="hidden lg:block text-sm font-medium text-foreground">John Doe</span>
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
