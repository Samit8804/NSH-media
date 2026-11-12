import { MetadataRoute } from "next"
import prisma from "@/lib/db"
import { INDUSTRIES } from "@/data/industries"
import { SITE_URL } from "@/lib/site"

/**
 * Only indexable, canonical public URLs belong in this sitemap.
 * Admin, client, auth, thank-you, and redirected legacy pages are excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/portfolio`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/pricing`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${SITE_URL}/faq`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/refund-policy`, priority: 0.3, changeFrequency: "yearly" },
  ]

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }))

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
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }))

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }))

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: service.updatedAt,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    }))

    return [
      ...staticRoutes,
      ...serviceRoutes,
      ...projectRoutes,
      ...blogRoutes,
      ...industryRoutes,
    ]
  } catch {
    return [...staticRoutes, ...industryRoutes]
  }
}
