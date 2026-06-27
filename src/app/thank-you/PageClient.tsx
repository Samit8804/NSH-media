"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-6">
      <motion.div className="glass-card max-w-lg text-center p-12" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <motion.div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-success/10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}>
          <CheckCircle className="h-14 w-14 text-success" />
        </motion.div>
        <motion.h1 className="mb-4 text-5xl font-bold tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          Thank You!
        </motion.h1>
        <motion.p className="mb-8 text-lg leading-relaxed text-silver" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          We have received your message and will get back to you within 24 hours.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <Link href="/">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-hover">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
