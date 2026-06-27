"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sun, Moon, Check } from "lucide-react"
import { getSettings, updateSettings } from "@/actions/settings"

const fontOptions = ["Inter", "Poppins", "Roboto", "Open Sans", "Montserrat", "Playfair Display"]
const colorPresets = {
  primary: ["#2563EB", "#059669", "#DC2626", "#7C3AED", "#D97706", "#0891B2"],
  accent: ["#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"],
}

export default function ThemePage() {
  const [primaryColor, setPrimaryColor] = useState("#2563EB")
  const [secondaryColor, setSecondaryColor] = useState("#0F172A")
  const [accentColor, setAccentColor] = useState("#F59E0B")
  const [darkMode, setDarkMode] = useState(true)
  const [bodyFont, setBodyFont] = useState("Inter")
  const [headingFont, setHeadingFont] = useState("Poppins")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSettings().then((s) => {
      if (s) {
        setPrimaryColor(s.primaryColor)
        setSecondaryColor(s.secondaryColor)
        setAccentColor(s.accentColor)
        setDarkMode(s.darkMode)
      }
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await updateSettings({ primaryColor, secondaryColor, accentColor, darkMode })
    const root = document.documentElement
    root.style.setProperty("--color-primary", primaryColor)
    root.style.setProperty("--color-accent", accentColor)
    if (darkMode) root.classList.add("dark"); else root.classList.remove("dark")
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Theme Settings</h1>
          <p className="text-silver mt-1">Customize your site appearance</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? <><Check className="h-4 w-4 mr-1" /> Saved</> : "Save Changes"}
        </Button>
      </div>

      <div className="glass-dashboard p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="text-silver">Primary Color</Label>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border-2 border-white/10 shrink-0" style={{ backgroundColor: primaryColor }} />
              <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono" />
            </div>
            <div className="flex gap-1.5">
              {colorPresets.primary.map((c) => (
                <button key={c} onClick={() => setPrimaryColor(c)}
                  className={cn("h-6 w-6 rounded-full border-2 transition-all", primaryColor === c ? "border-white scale-110" : "border-transparent hover:scale-110")}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-silver">Secondary Color</Label>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border-2 border-white/10 shrink-0" style={{ backgroundColor: secondaryColor }} />
              <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="font-mono" />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-silver">Accent Color</Label>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border-2 border-white/10 shrink-0" style={{ backgroundColor: accentColor }} />
              <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="font-mono" />
            </div>
            <div className="flex gap-1.5">
              {colorPresets.accent.map((c) => (
                <button key={c} onClick={() => setAccentColor(c)}
                  className={cn("h-6 w-6 rounded-full border-2 transition-all", accentColor === c ? "border-white scale-110" : "border-transparent hover:scale-110")}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-silver">Body Font</Label>
              <Select value={bodyFont} onValueChange={setBodyFont}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((f) => (
                    <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-silver/60" style={{ fontFamily: bodyFont }}>The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div className="space-y-3">
              <Label className="text-silver">Heading Font</Label>
              <Select value={headingFont} onValueChange={setHeadingFont}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((f) => (
                    <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-silver/60 font-bold text-lg" style={{ fontFamily: headingFont }}>The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm text-white font-medium">Dark Mode</label>
              <p className="text-xs text-silver mt-0.5">Switch between light and dark appearance</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={cn("relative h-7 w-12 rounded-full transition-colors", darkMode ? "bg-primary" : "bg-white/20")}
            >
              <div className={cn(
                "absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform",
                darkMode ? "translate-x-6" : "translate-x-0.5"
              )}>
                {darkMode ? <Moon className="h-3 w-3 text-[#020617]" /> : <Sun className="h-3 w-3 text-amber-500" />}
              </div>
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-sm text-silver mb-4">Preview</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[10px] text-silver/40 ml-2">Dark Mode</span>
              </div>
              <div className="p-4 bg-[#020617] space-y-3">
                <div className="text-sm font-bold text-white" style={{ fontFamily: headingFont }}>Dark Theme</div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: primaryColor }}>Button</span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: accentColor, color: "#020617" }}>CTA</span>
                </div>
                <div className="text-[10px] text-[#CBD5E1]" style={{ fontFamily: bodyFont }}>Dark background · Light text · Blue accent</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[10px] text-gray-400 ml-2">Light Mode</span>
              </div>
              <div className="p-4 bg-white space-y-3">
                <div className="text-sm font-bold text-gray-900" style={{ fontFamily: headingFont }}>Light Theme</div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: primaryColor }}>Button</span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: accentColor, color: "#020617" }}>CTA</span>
                </div>
                <div className="text-[10px] text-gray-500" style={{ fontFamily: bodyFont }}>Light background · Dark text · Blue accent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
