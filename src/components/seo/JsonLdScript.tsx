import type { JsonLd } from "@/lib/seo"

/**
 * Server-rendered JSON-LD. Keeping this in server components means the
 * structured data is present in the initial HTML for crawlers and AI agents.
 */
export default function JsonLdScript({
  schema,
}: {
  schema: JsonLd | JsonLd[]
}) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
