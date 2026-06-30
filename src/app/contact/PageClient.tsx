"use client"

import { useState } from "react"
import { submitContact } from "@/actions/contact"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true); setSubmitted(false); setError(null)
    const result = await submitContact(data)
    if (result.success) { setSubmitted(true); reset() }
    else { setError(result.error || "Something went wrong") }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-bg px-6">
        <div className="glass-card max-w-lg text-center p-12">
          <motion.div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-success/10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            <CheckCircle className="h-12 w-12 text-success" />
          </motion.div>
          <h1 className="text-section mb-4">Message Sent!</h1>
          <p className="mb-8 text-lg leading-relaxed text-silver">Thank you for reaching out. We will get back to you within 24 hours.</p>
          <Link href="/"><Button variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10"><ArrowRight className="h-4 w-4" /> Back to Home</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <section className="relative overflow-hidden px-6 py-32 bg-mesh">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-hero">
            Get in{" "}<span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            Have a project in mind? We would love to hear from you. Fill out the form and we will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <h2 className="text-card mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" {...register("name")} className={cn("glass border-white/10", errors.name && "border-destructive")} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={cn("glass border-white/10", errors.email && "border-destructive")} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} className={cn("glass border-white/10", errors.phone && "border-destructive")} />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label>Service</Label>
                    <Select onValueChange={(v) => setValue("service", v)}>
                      <SelectTrigger className={cn("glass border-white/10", errors.service && "border-destructive")}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/10">
                        <SelectItem value="web-design">Web Design</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="ai-automation">AI Automation</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <Select onValueChange={(v) => setValue("budget", v)}>
                      <SelectTrigger className={cn("glass border-white/10", errors.budget && "border-destructive")}>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/10">
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                        <SelectItem value="50k-plus">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.budget && <p className="mt-1 text-xs text-destructive">{errors.budget.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} placeholder="Tell us about your project..." {...register("message")} className={cn("glass border-white/10", errors.message && "border-destructive")} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full gap-2 bg-primary text-white hover:bg-primary-hover sm:w-auto">
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-card mb-8">Contact Information</h2>
              <div className="mb-10 space-y-6">
                {[
                  { icon: MapPin, title: "Our Office", detail: "123 Madison Avenue, Suite 400\nNew York, NY 10016, USA" },
                  { icon: Phone, title: "Phone", detail: "+1 (555) 123-4567" },
                  { icon: Mail, title: "Email", detail: <ObfuscatedEmail email="hello@nshmedia.com" /> },
                ].map((item) => (
                  <div key={item.title} className="glass-card flex items-start gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-silver whitespace-pre-line">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-10">
                <p className="mb-3 font-semibold">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", viewBox: "0 0 24 24" },
                    { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", viewBox: "0 0 24 24" },
                    { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", viewBox: "0 0 24 24" },
                  ].map((svg, i) => (
                    <a key={i} href="#" className="flex h-11 w-11 items-center justify-center rounded-xl glass text-silver transition-colors hover:bg-primary hover:text-white">
                      <svg className="h-5 w-5" fill="currentColor" viewBox={svg.viewBox}><path d={svg.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-semibold">Our Location</p>
                <div className="glass-card aspect-[16/9] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-primary/50" />
                    <span className="text-sm text-silver/60">Interactive Map</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-lg transition-all hover:bg-success/80 hover:shadow-xl hover:scale-105"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
