"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { requireRole } from "./auth-actions"

export async function getPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
  })
}

export async function getFeaturedPosts() {
  return prisma.blogPost.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  })
}

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  authorImage: z.string().optional(),
  featuredImage: z.string().min(1),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

export async function createPost(data: z.infer<typeof createPostSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  const validated = createPostSchema.parse(data)
  return prisma.blogPost.create({ data: validated })
}

export async function updatePost(id: string, data: Partial<z.infer<typeof createPostSchema>>) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  return prisma.blogPost.update({ where: { id }, data })
}

export async function deletePost(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  return prisma.blogPost.delete({ where: { id } })
}

export async function togglePublished(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  const post = await prisma.blogPost.findUnique({ where: { id }, select: { published: true } })
  if (!post) throw new Error("Post not found")
  return prisma.blogPost.update({
    where: { id },
    data: { published: !post.published },
  })
}
