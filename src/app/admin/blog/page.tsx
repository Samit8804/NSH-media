"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, Edit3, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getAllPosts, deletePost } from "@/actions/blog"

interface Post {
  id: string
  title: string
  author: string
  categories: string[]
  status: "Draft" | "Published"
  date: string
  slug?: string
}

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        const list = (data as unknown as Array<Record<string, unknown>>) || []
        setPosts(
          list.map((p) => ({
            id: p.id as string,
            title: (p.title as string) ?? "",
            author: (p.author as string) ?? "",
            categories: (p.categories as string[]) ?? [],
            status: ((p.published as boolean) ? "Published" : "Draft") as "Draft" | "Published",
            date: p.createdAt ? new Date(p.createdAt as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "",
            slug: (p.slug as string) ?? "",
          }))
        )
      })
      .catch(() => setPosts([]))
  }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async () => {
    if (deleteId) {
      await deletePost(deleteId)
      setPosts(posts.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Categories</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post, i) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/10 last:border-0 hover:bg-white/[0.04]"
              >
                <td className="px-6 py-3 font-medium text-white">{post.title}</td>
                <td className="px-6 py-3 text-silver">{post.author}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-wrap gap-1">
                    {post.categories.map((cat) => (
                      <span key={cat} className="px-2 py-0.5 rounded-full bg-white/[0.06] text-silver text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className={cn(
                    "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                    post.status === "Published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  )}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-silver">{post.date}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-2 text-silver hover:text-primary hover:bg-white/[0.04] rounded-lg"
                      onClick={() => router.push(`/admin/blog/new?edit=${post.id}`)}
                      aria-label={`Edit ${post.title}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-silver hover:text-red-400 hover:bg-white/[0.04] rounded-lg"
                      onClick={() => setDeleteId(post.id)}
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-400">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-dashboard">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Post</DialogTitle>
            <DialogDescription className="text-silver">Are you sure you want to delete this post? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
