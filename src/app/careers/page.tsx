import type { Metadata } from "next"
import CareersPage from "./PageClient"
import { pageMetadata } from "@/lib/metadata"

/**
 * No open roles are currently published, so this page is kept out of the
 * index until verified job listings and benefits exist.
 */
export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Learn how to introduce yourself to NSH Media Services for future design, development, and e-commerce opportunities.",
  path: "/careers",
  noindex: true,
})

export default function Page() {
  return <CareersPage />
}
