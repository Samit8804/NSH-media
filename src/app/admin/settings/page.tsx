"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Linkedin, Twitter, Github, Youtube, Save } from "lucide-react"
import { getSettings, updateSettings } from "@/actions/settings"

interface SettingsForm {
  siteName: string
  siteDescription: string
  logoUrl: string
  faviconUrl: string
  googleAnalytics: string
  contactEmail: string
  linkedin: string
  twitter: string
  github: string
  youtube: string
  officeAddress: string
  officePhone: string
}

const emptySettings: SettingsForm = {
  siteName: "",
  siteDescription: "",
  logoUrl: "",
  faviconUrl: "",
  googleAnalytics: "",
  contactEmail: "",
  linkedin: "",
  twitter: "",
  github: "",
  youtube: "",
  officeAddress: "",
  officePhone: "",
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>(emptySettings)
  const [saved, setSaved] = useState<SettingsForm>(emptySettings)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    getSettings()
      .then((data) => {
        if (!data) return
        const loaded: SettingsForm = {
          siteName: data.siteName ?? "",
          siteDescription: data.siteDescription ?? "",
          logoUrl: data.logoUrl ?? "",
          faviconUrl: data.faviconUrl ?? "",
          googleAnalytics: data.googleAnalytics ?? "",
          contactEmail: data.contactEmail ?? "",
          linkedin: data.linkedin ?? "",
          twitter: data.twitter ?? "",
          github: data.github ?? "",
          youtube: data.youtube ?? "",
          officeAddress: data.officeAddress ?? "",
          officePhone: data.officePhone ?? "",
        }
        setForm(loaded)
        setSaved(loaded)
      })
      .catch(() => setError("Failed to load settings."))
  }

  useEffect(load, [])

  const save = async () => {
    setError(null)
    setMessage(null)
    if (!form.siteName.trim()) {
      setError("Site name is required.")
      return
    }
    setIsSaving(true)
    try {
      await updateSettings({
        siteName: form.siteName.trim(),
        siteDescription: form.siteDescription,
        logoUrl: form.logoUrl,
        faviconUrl: form.faviconUrl,
        googleAnalytics: form.googleAnalytics,
        contactEmail: form.contactEmail,
        linkedin: form.linkedin,
        twitter: form.twitter,
        github: form.github,
        youtube: form.youtube,
        officeAddress: form.officeAddress,
        officePhone: form.officePhone,
      })
      setSaved(form)
      setMessage("Settings saved.")
    } catch (err) {
      console.error("Failed to save settings:", err)
      setError("Failed to save settings. Please check the email address and try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-white">General Settings</h2>

      <div className="glass-dashboard">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">Site Information</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-silver">Site Name</Label>
              <Input id="siteName" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-silver">Contact Email</Label>
              <Input id="contactEmail" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription" className="text-silver">Site Description</Label>
            <Textarea id="siteDescription" value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} rows={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoUrl" className="text-silver">Logo URL</Label>
              <Input id="logoUrl" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faviconUrl" className="text-silver">Favicon URL</Label>
              <Input id="faviconUrl" value={form.faviconUrl} onChange={(e) => setForm({ ...form, faviconUrl: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-dashboard">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">Analytics</h3>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="gaId" className="text-silver">Google Analytics ID</Label>
            <Input id="gaId" value={form.googleAnalytics} onChange={(e) => setForm({ ...form, googleAnalytics: e.target.value })} placeholder="G-XXXXXXXXXX" />
          </div>
        </div>
      </div>

      <div className="glass-dashboard">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">Social Links</h3>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Linkedin className="h-4 w-4 text-blue-400" />
                LinkedIn URL
              </Label>
              <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Twitter className="h-4 w-4 text-sky-400" />
                Twitter URL
              </Label>
              <Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Github className="h-4 w-4 text-slate-300" />
                GitHub URL
              </Label>
              <Input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Youtube className="h-4 w-4 text-red-400" />
                YouTube URL
              </Label>
              <Input value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-dashboard">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">Contact Information</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="officeAddress" className="text-silver">Office Address</Label>
            <Input id="officeAddress" value={form.officeAddress} onChange={(e) => setForm({ ...form, officeAddress: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="officePhone" className="text-silver">Phone</Label>
            <Input id="officePhone" value={form.officePhone} onChange={(e) => setForm({ ...form, officePhone: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
        <Button variant="outline" onClick={() => { setForm(saved); setMessage(null); setError(null) }}>
          Cancel
        </Button>
        {message && <span className="text-sm text-emerald-400">{message}</span>}
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    </div>
  )
}
