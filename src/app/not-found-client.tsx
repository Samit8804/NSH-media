"use client"

import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 dark:bg-[#020617]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
      <h1 className="font-heading text-[10rem] font-bold leading-none sm:text-[14rem]">
        <span className="bg-gradient-to-b from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
          4
        </span>
        <span className="bg-gradient-to-b from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
          0
        </span>
        <span className="bg-gradient-to-b from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
          4
        </span>
      </h1>
      <h2 className="mt-4 font-heading text-2xl font-semibold text-[#0F172A] dark:text-white sm:text-3xl">
        Page not found
      </h2>
      <p className="mt-3 max-w-md text-center text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2.5 rounded-[14px] bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 transition-all duration-300 hover:bg-[#1D4ED8] hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5"
      >
        <Home className="h-4 w-4" />
        Go Home
      </Link>
    </div>
  )
}
