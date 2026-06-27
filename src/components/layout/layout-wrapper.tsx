"use client"

import { usePathname } from "next/navigation"
import Header from "./header"
import Footer from "./footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideUI = pathname.startsWith("/admin") || pathname.startsWith("/auth")

  return (
    <div className="flex min-h-screen flex-col">
      {!hideUI && <Header />}
      <main className="flex-1">{children}</main>
      {!hideUI && <Footer />}
    </div>
  )
}
