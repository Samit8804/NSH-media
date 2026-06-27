"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "NSH Media transformed our online presence completely. Our traffic has doubled and conversions are at an all-time high. Their team's attention to detail is remarkable.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Velocity Finance",
    rating: 5,
    initials: "SM",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    quote: "Working with NSH Media was a game-changer for our startup. They delivered a stunning web application that exceeded our expectations, on time and within budget.",
    name: "James Chen",
    role: "CTO",
    company: "GreenLeaf Organics",
    rating: 5,
    initials: "JC",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    quote: "The team at NSH Media truly understands user experience. They redesigned our platform and the results speak for themselves — higher engagement and happier customers.",
    name: "Emily Rodriguez",
    role: "Product Director",
    company: "PrimeCloud Hub",
    rating: 5,
    initials: "ER",
    gradient: "from-purple-500 to-pink-600",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, next])

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" className="section-padding bg-secondary relative">
      <div className="absolute inset-0 bg-mesh" />
      <div className="container-site max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section text-gradient font-heading">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-silver max-w-2xl mx-auto">
            Real feedback from real partnerships that drive our passion for excellence.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card p-8 md:p-10 w-full"
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-accent fill-accent"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-sm font-bold font-heading`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-silver">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-silver" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-silver" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
