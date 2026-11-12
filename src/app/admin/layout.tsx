import type { Metadata } from "next"
import AdminShell from "./AdminShell"

/**
 * Private admin area. Server layout exists only to emit noindex directives;
 * the interactive shell remains a client component.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
