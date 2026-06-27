"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
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
import { ArrowLeft, Upload, X, ImageIcon } from "lucide-react"
import MediaPicker from "@/components/admin/MediaPicker"
import Link from "next/link"

export default function NewProjectPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [client, setClient] = useState("")
  const [industry, setIndustry] = useState("")
  const [overview, setOverview] = useState("")
  const [challenge, setChallenge] = useState("")
  const [solution, setSolution] = useState("")
  const [technologies, setTechnologies] = useState<string[]>([])
  const [techInput, setTechInput] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [category, setCategory] = useState("")
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(false)
  const [displayOrder, setDisplayOrder] = useState("0")
  const [showPicker, setShowPicker] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [canonicalUrl, setCanonicalUrl] = useState("")
  const [ogImage, setOgImage] = useState("")

  const handleTitleChange = (val: string) => {
    setTitle(val)
    setSlug(slugify(val))
  }

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-lg font-semibold text-slate-900">New Project</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" value={client} onChange={(e) => setClient(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea id="overview" value={overview} onChange={(e) => setOverview(e.target.value)} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea id="challenge" value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} rows={4} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {tech}
                <button onClick={() => removeTech(tech)} className="hover:text-blue-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              placeholder="Type and press Enter"
            />
            <Button type="button" variant="outline" onClick={addTech}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Links & Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web App">Web App</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Branding">Branding</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input id="order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-6 mt-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded border-slate-300" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-slate-300" />
              Published
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Featured Image</CardTitle>
        </CardHeader>
        <CardContent>
          {imageUrl ? (
            <div className="relative mb-4">
              <img src={imageUrl} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
              <button
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}
          <Button type="button" variant="outline" onClick={() => setShowPicker(true)}>
            Choose from Media
          </Button>
          <MediaPicker open={showPicker} onClose={() => setShowPicker(false)} onSelect={(url) => setImageUrl(url)} />
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
          <div className="space-y-2">
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <Input id="seoKeywords" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <Input id="canonicalUrl" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input id="ogImage" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={() => router.push("/admin/portfolio")}>Save Project</Button>
        <Button variant="outline" onClick={() => router.push("/admin/portfolio")}>Cancel</Button>
      </div>
    </div>
  )
}
