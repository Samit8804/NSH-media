"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface SiteSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  darkMode: boolean
}

interface ThemeProviderProps {
  children: React.ReactNode
}

interface ThemeContextType {
  settings: SiteSettings
}

const defaultSettings: SiteSettings = {
  primaryColor: "#2563EB",
  secondaryColor: "#0F172A",
  accentColor: "#F59E0B",
  darkMode: true,
}

const ThemeContext = createContext<ThemeContextType>({ settings: defaultSettings })

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: SiteSettings) => {
        setSettings(data)
        const root = document.documentElement
        root.style.setProperty("--color-primary", data.primaryColor)
        root.style.setProperty("--color-accent", data.accentColor)
        if (data.darkMode) root.classList.add("dark")
        else root.classList.remove("dark")
      })
      .catch(() => {
        document.documentElement.classList.add("dark")
      })
  }, [])

  return (
    <ThemeContext.Provider value={{ settings }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
