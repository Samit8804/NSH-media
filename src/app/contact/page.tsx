import type { Metadata } from "next"
import ContactPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Tell us about your website, web development, or e-commerce project. Contact NSH Media Services by email or through the project enquiry form.",
  path: "/contact",
  keywords: [
    "contact NSH Media Services",
    "website project enquiry",
    "hire web design studio",
  ],
})

export default function Page() {
  const description =
    "Contact NSH Media Services about a website design, web development, or e-commerce project."
  const structuredData = [
    webPageSchema({
      title: "Contact NSH Media Services",
      description,
      path: "/contact",
      type: "ContactPage",
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <ContactPage />
    </>
  )
}
