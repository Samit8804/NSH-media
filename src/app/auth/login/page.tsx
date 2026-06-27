"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setLoading(true); setError(null)
    const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false })
    if (result?.error) { setError("Invalid email or password"); setLoading(false); return }
    router.push("/admin"); router.refresh()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark-bg px-4 overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-subtle" />

      <div className="glass relative w-full max-w-md p-8 glow-blue-subtle">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-heading text-2xl font-bold tracking-tight text-white">NSH</span>
            <span className="text-primary text-2xl font-bold">.</span>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">MEDIA</span>
          </Link>
          <h1 className="mt-6 font-heading text-xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-silver">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="mb-6 rounded-[14px] bg-destructive/10 px-4 py-3 text-sm text-destructive border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-silver">Email</label>
            <input id="email" type="email" {...register("email", { required: "Email is required" })}
              className="glass w-full rounded-[14px] border border-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-silver/40"
              placeholder="you@example.com" />
            {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-silver">Password</label>
            <div className="relative">
              <input id="password" type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required" })}
                className="glass w-full rounded-[14px] border border-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-silver/40 pr-10"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/60 hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="w-full rounded-[14px] bg-primary py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none glow-blue-subtle">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-silver/60">
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="font-medium text-primary hover:text-primary-hover transition-colors">
              Get in touch
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
