import type { Metadata } from "next"
import ThankYouPage from "./PageClient"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Thank You",
  description:
    "Thank you for contacting NSH Media Services. We have received your enquiry and will respond as soon as possible.",
  path: "/thank-you",
  noindex: true,
})

export default function Page() {
  return <ThankYouPage />
}
