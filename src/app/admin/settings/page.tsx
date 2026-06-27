"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Linkedin, Twitter, Github, Youtube, Save } from "lucide-react"

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("NSH Media")
  const [siteDescription, setSiteDescription] = useState("Full-service digital agency specializing in web development, design, and marketing.")
  const [logoUrl, setLogoUrl] = useState("")
  const [faviconUrl, setFaviconUrl] = useState("")
  const [gaId, setGaId] = useState("G-XXXXXXXXXX")
  const [contactEmail, setContactEmail] = useState("hello@nshmedia.com")
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/nshmedia")
  const [twitter, setTwitter] = useState("https://twitter.com/nshmedia")
  const [github, setGithub] = useState("https://github.com/nshmedia")
  const [youtube, setYoutube] = useState("https://youtube.com/@nshmedia")
  const [officeAddress, setOfficeAddress] = useState("123 Business Ave, Suite 100, New York, NY 10001")
  const [officePhone, setOfficePhone] = useState("+1 (555) 123-4567")
  const [officeEmail, setOfficeEmail] = useState("hello@nshmedia.com")

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
              <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-silver">Contact Email</Label>
              <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription" className="text-silver">Site Description</Label>
            <Textarea id="siteDescription" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoUrl" className="text-silver">Logo URL</Label>
              <Input id="logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faviconUrl" className="text-silver">Favicon URL</Label>
              <Input id="faviconUrl" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} />
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
            <Input id="gaId" value={gaId} onChange={(e) => setGaId(e.target.value)} placeholder="G-XXXXXXXXXX" />
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
                <Linkedin className="h-4 w-4 text-primary" />
                LinkedIn URL
              </Label>
              <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Twitter className="h-4 w-4 text-sky-400" />
                Twitter URL
              </Label>
              <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Github className="h-4 w-4" />
                GitHub URL
              </Label>
              <Input value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-silver">
                <Youtube className="h-4 w-4 text-red-400" />
                YouTube URL
              </Label>
              <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} />
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
            <Input id="officeAddress" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="officePhone" className="text-silver">Phone</Label>
              <Input id="officePhone" value={officePhone} onChange={(e) => setOfficePhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officeEmail" className="text-silver">Email</Label>
              <Input id="officeEmail" type="email" value={officeEmail} onChange={(e) => setOfficeEmail(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
