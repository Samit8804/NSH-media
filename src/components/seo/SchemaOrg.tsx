"use client"
import { usePathname } from 'next/navigation'
import JsonLdScript from './JsonLdScript'
import { organizationSchema, websiteSchema } from '@/lib/seo'

export default function SchemaOrg() {
  const pathname = usePathname()
  const schemas = [organizationSchema(), websiteSchema()]

  return schemas.map((schema, i) => (
    <JsonLdScript key={i} schema={schema} />
  ))
}
