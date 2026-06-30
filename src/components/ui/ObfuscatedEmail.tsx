"use client"

import { useState } from "react"

export default function ObfuscatedEmail({ email, className }: { email: string; className?: string }) {
  const [show, setShow] = useState(false)

  const parts = email.split("@")
  const obfuscated = parts[0].slice(0, 2) + "****@" + parts[1]

  const handleClick = () => {
    setShow(true)
    window.location.href = `mailto:${email}`
    setTimeout(() => setShow(false), 3000)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || "text-silver underline hover:text-primary transition-colors"}
      aria-label={`Send email to ${email}`}
    >
      {show ? email : obfuscated}
    </button>
  )
}
