import type { Metadata } from "next"
import AboutPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "About the Studio",
  description:
    "Learn how NSH Media Services approaches web design, web development, and e-commerce — our mission, values, and the way we work with businesses.",
  path: "/about",
  keywords: [
    "about NSH Media Services",
    "digital design studio",
    "web design and development team",
  ],
})

export default function Page() {
  const description =
    "NSH Media Services is a digital design and development studio offering web design, web development, and e-commerce services."
  const structuredData = [
    webPageSchema({
      title: "About NSH Media Services",
      description,
      path: "/about",
      type: "AboutPage",
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <AboutPage />
    </>
  )
}
