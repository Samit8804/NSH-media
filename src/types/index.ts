export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Service {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  benefits: string[]
  features: string[]
  process: Step[]
  faqs: FAQ[]
  image?: string
  price: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Step {
  title: string
  description: string
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  category: string
  order: number
  published: boolean
  createdAt: Date
}

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  client: string
  industry: string
  overview: string
  challenge: string
  solution: string
  technologies: string[]
  images: string[]
  thumbnail: string
  liveUrl?: string
  githubUrl?: string
  results: string[]
  testimonial?: Testimonial
  category: string
  featured: boolean
  displayOrder: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorImage?: string
  featuredImage: string
  categories: string[]
  tags: string[]
  published: boolean
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  _id: string
  name: string
  company: string
  role: string
  photo?: string
  content: string
  rating: number
  published: boolean
  createdAt: Date
}

export interface TeamMember {
  _id: string
  name: string
  position: string
  bio: string
  image?: string
  linkedin?: string
  twitter?: string
  createdAt: Date
}

export interface Lead {
  _id: string
  name: string
  email: string
  phone?: string
  service?: string
  budget?: string
  message: string
  status: LeadStatus
  notes: string
  createdAt: Date
  updatedAt: Date
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost" | "Archived"

export interface PricingPlan {
  _id: string
  name: string
  slug: string
  price: number
  description: string
  features: string[]
  highlighted: boolean
  popular: boolean
  published: boolean
  createdAt: Date
}

export interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  ctaText: string
  statistics: StatItem[]
  mission: string
  vision: string
  footerContent: string
  industries: string[]
  technologies: string[]
}

export interface StatItem {
  label: string
  value: number
  suffix?: string
}

export interface SiteTheme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  darkMode: boolean
}

export interface AdminUser {
  _id: string
  name: string
  email: string
  role: "super-admin" | "admin" | "editor"
  image?: string
}

export interface ClientUser {
  _id: string
  name: string
  email: string
  company: string
  projects: string[]
  createdAt: Date
}

export interface ClientProject {
  _id: string
  title: string
  description: string
  status: "Discovery" | "Design" | "Development" | "Testing" | "Review" | "Completed"
  progress: number
  startDate: Date
  deadline?: Date
  client: string
  documents: Document[]
  messages: Message[]
}

export interface Document {
  _id: string
  name: string
  url: string
  type: string
  uploadedAt: Date
}

export interface Message {
  _id: string
  sender: string
  content: string
  timestamp: Date
}

export interface Invoice {
  _id: string
  client: string
  amount: number
  status: "Pending" | "Paid" | "Overdue"
  dueDate: Date
  items: InvoiceItem[]
  createdAt: Date
}

export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
}

export interface Comment {
  _id: string
  name: string
  email: string
  content: string
  postId: string
  approved: boolean
  createdAt: Date
}

export interface MediaItem {
  _id: string
  name: string
  url: string
  type: "image" | "video" | "pdf" | "logo"
  size: number
  createdAt: Date
}

export interface AnalyticsEvent {
  date: Date
  visitors: number
  pageViews: number
  leads: number
  sales: number
}
