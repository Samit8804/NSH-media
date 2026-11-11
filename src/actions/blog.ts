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
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  })
}

export async function getFeaturedPosts() {
  return prisma.blogPost.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getAllPosts() {
  return prisma.blogPost.findMany({
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
  const post = await prisma.blogPost.create({ data: validated })
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    authorImage: post.authorImage,
    featuredImage: post.featuredImage,
    categories: post.categories,
    tags: post.tags,
    published: post.published,
    featured: post.featured,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

const updatePostSchema = createPostSchema.partial()

export async function updatePost(id: string, data: z.infer<typeof updatePostSchema>) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  const validated = updatePostSchema.parse(data)
  const post = await prisma.blogPost.update({ where: { id }, data: validated })
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    authorImage: post.authorImage,
    featuredImage: post.featuredImage,
    categories: post.categories,
    tags: post.tags,
    published: post.published,
    featured: post.featured,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

export async function deletePost(id: string) {
  await requireRole(["SUPER_ADMIN", "ADMIN"])
  const post = await prisma.blogPost.delete({ where: { id } })
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
  }
}

export async function togglePublished(id: string, published: boolean) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  const post = await prisma.blogPost.update({
    where: { id },
    data: { published },
  })
  return {
    id: post.id,
    published: post.published,
  }
}
