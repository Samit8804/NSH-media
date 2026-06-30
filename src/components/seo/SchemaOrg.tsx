"use client"
import { usePathname } from 'next/navigation'
import JsonLdScript from './JsonLdScript'
import { organizationSchema, websiteSchema, localBusinessSchema, breadcrumbSchema } from '@/lib/seo'

export default function SchemaOrg() {
  const pathname = usePathname()
  const schemas = [organizationSchema(), websiteSchema(), localBusinessSchema()]

  // Add breadcrumb for non-home pages
  if (pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbItems = segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      url: "/" + segments.slice(0, index + 1).join("/"),
    }))
    schemas.push(breadcrumbSchema([{ name: "Home", url: "/" }, ...breadcrumbItems]))
  }

  return schemas.map((schema, i) => (
    <JsonLdScript key={i} schema={schema} />
  ))
}
