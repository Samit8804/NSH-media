"use client"

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export { useToast }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
