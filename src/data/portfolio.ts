export interface ProjectData {
  slug: string
  title: string
  description: string
  client: string
  industry: string
  overview: string
  challenge: string
  solution: string
  technologies: string[]
  results: string[]
  testimonial: { name: string; company: string; content: string }
  category: string
  liveUrl?: string
}
