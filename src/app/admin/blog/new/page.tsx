"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { slugify } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, X, ImageIcon } from "lucide-react"
import Link from "next/link"
import MediaPicker from "@/components/admin/MediaPicker"

const allCategories = ["Design", "Development", "SEO", "Marketing", "AI", "Trends", "Accessibility"]

export default function NewBlogPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [showPicker, setShowPicker] = useState(false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    setSlug(slugify(val))
  }

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-lg font-semibold text-slate-900">New Blog Post</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={16} className="font-mono text-sm" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Meta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <div className="space-y-2">
                {featuredImage && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                    <img src={featuredImage} alt="Preview" className="h-full w-full object-cover" />
                    <button onClick={() => setFeaturedImage("")} className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"><X className="h-3 w-3" /></button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input id="featuredImage" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="Paste image URL or pick from media" />
                  <Button type="button" variant="secondary" onClick={() => setShowPicker(true)}><ImageIcon className="h-4 w-4" /></Button>
                </div>
              </div>
              <MediaPicker open={showPicker} onClose={() => setShowPicker(false)} onSelect={(url) => setFeaturedImage(url)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    categories.includes(cat)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-slate-900"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Type and press Enter"
              />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-slate-300" />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded border-slate-300" />
              Featured
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea id="seoDescription" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => { setPublished(false); router.push("/admin/blog") }}>
          Save as Draft
        </Button>
        <Button onClick={() => router.push("/admin/blog")}>Publish</Button>
      </div>
    </div>
  )
}
