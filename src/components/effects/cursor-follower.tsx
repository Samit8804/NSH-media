"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const particles: { id: number; x: number; y: number; life: number }[] = []
let nextId = 0

export default function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    cursorX.set(x)
    cursorY.set(y)
    posRef.current = { x, y }

    for (let i = 0; i < 3; i++) {
      particles.push({
        id: nextId++,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        life: 1,
      })
    }
    if (particles.length > 60) particles.splice(0, particles.length - 60)
  }, [cursorX, cursorY])

  const handleMouseLeave = useCallback(() => {
    cursorX.set(-100)
    cursorY.set(-100)
  }, [cursorX, cursorY])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 0.025
        p.y -= 0.5

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = p.life * 0.6
        const size = 2.5 * p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha * 0.3})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-[#2563EB] opacity-20 blur-2xl" />
          <div className="absolute h-8 w-8 rounded-full bg-[#3B82F6] opacity-30 blur-lg" />
          <div className="absolute h-2 w-2 rounded-full bg-white opacity-90 blur-[1px]" />
        </div>
      </motion.div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      />
    </>
  )
}
