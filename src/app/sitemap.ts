import { MetadataRoute } from "next"
import prisma from "@/lib/db"

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nshmedia.com").replace(/\/+$/, "")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/portfolio`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/pricing`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/faq`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/case-studies`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/careers`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/refund-policy`, priority: 0.3, changeFrequency: "yearly" },
  ]

  try {
    const [blogPosts, projects, services] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ])

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.6,
      changeFrequency: "weekly" as const,
    }))

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${BASE_URL}/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    }))

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: service.updatedAt,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    }))

    return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...serviceRoutes]
  } catch {
    return staticRoutes
  }
}
