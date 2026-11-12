import type { Metadata } from "next"
import NotFoundPage from "./not-found-client"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Return to the NSH Media Services homepage or contact us for help.",
  path: "/404",
  noindex: true,
})

export default function Page() {
  return <NotFoundPage />
}
