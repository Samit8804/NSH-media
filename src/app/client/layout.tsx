import type { Metadata } from "next"
import ClientShell from "./ClientShell"

/** Private client portal. Never index or cache authenticated content. */
export const metadata: Metadata = {
  title: "Client Portal",
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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientShell>{children}</ClientShell>
}
