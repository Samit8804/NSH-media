"use client"

import { useEffect, useState, useRef } from "react"

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  label: string
}

function Counter({ target, suffix = "", prefix = "", label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    let startTime: number | null = null
    const duration = 2000
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-silver mt-3 text-base font-medium">{label}</div>
    </div>
  )
}

export default function StatisticsCounter() {
  // Demo statistics removed — no real aggregated data to display yet.
  return null
}
