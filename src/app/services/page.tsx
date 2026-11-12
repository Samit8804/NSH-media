import type { Metadata } from "next"
import { getServices } from "@/actions/services"
import ServicesPage from "./PageClient"
import JsonLdScript from "@/components/seo/JsonLdScript"
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from "@/lib/seo"
import { ogImage, pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Web Design, Development & E-Commerce Services",
  description:
    "Explore NSH Media Services' verified services: web design, web development, and e-commerce. See what each service includes, how we work, and how to start a project.",
  path: "/services",
  keywords: [
    "web design services",
    "web development services",
    "e-commerce development services",
    "custom website design",
  ],
  image: ogImage(
    "Web Design, Development & E-Commerce",
    "Services from NSH Media Services",
  ),
})

export const dynamic = "force-dynamic"

export default async function Page() {
  const services = await getServices()
  const jsonServices = (services || []).map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    icon: s.icon,
    price: s.price,
  }))

  const description =
    "NSH Media Services provides web design, web development, and e-commerce services for businesses."
  const structuredData = [
    webPageSchema({
      title: "Web Design, Development & E-Commerce Services",
      description,
      path: "/services",
      type: "WebPage",
    }),
    collectionPageSchema({
      name: "NSH Media Services",
      description,
      path: "/services",
      items: jsonServices.map((service) => ({
        name: service.title,
        url: `/services/${service.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ]),
  ]

  return (
    <>
      <JsonLdScript schema={structuredData} />
      <ServicesPage services={jsonServices} />
    </>
  )
}
