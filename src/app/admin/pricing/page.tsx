"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check, X as XIcon, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getAllPricingPlans, updatePricingPlan } from "@/actions/pricing"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular: boolean
  published: boolean
}

const emptyForm: Plan = {
  id: "",
  name: "",
  price: 0,
  description: "",
  features: [],
  popular: false,
  published: true,
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<Plan | null>(null)
  const [featureInput, setFeatureInput] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllPricingPlans()
      .then((data) => {
        const list = (data as unknown as Array<Record<string, unknown>>) || []
        setPlans(
          list.map((p) => ({
            id: p.id as string,
            name: (p.name as string) ?? "",
            price: (p.price as number) ?? 0,
            description: (p.description as string) ?? "",
            features: (p.features as string[]) ?? [],
            popular: (p.popular as boolean) ?? false,
            published: (p.published as boolean) ?? false,
          }))
        )
      })
      .catch(() => setPlans([]))
  }, [])

  const openEdit = (p: Plan) => {
    setForm({ ...p, features: [...p.features] })
    setError(null)
    setDialogOpen(true)
  }

  const save = async () => {
    if (!form) return
    if (!form.name.trim()) {
      setError("Plan name is required.")
      return
    }
    setError(null)
    try {
      await updatePricingPlan(form.id, {
        name: form.name.trim(),
        price: form.price,
        description: form.description,
        features: form.features,
        popular: form.popular,
        published: form.published,
      })
      setPlans(plans.map((p) => (p.id === form.id ? form : p)))
      setDialogOpen(false)
      setForm(null)
    } catch (err) {
      console.error("Failed to save plan:", err)
      setError("Failed to save the plan. Please try again.")
    }
  }

  const addFeature = () => {
    if (featureInput.trim() && form) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] })
      setFeatureInput("")
    }
  }

  const removeFeature = (idx: number) => {
    if (form) {
      setForm({ ...form, features: form.features.filter((_, i) => i !== idx) })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Pricing Plans</h2>

      {plans.length === 0 ? (
        <div className="glass-dashboard p-10 text-center text-silver/60">
          No pricing plans yet. Add plans from the database or seed script to display them here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={cn("glass-dashboard p-6 flex flex-col h-full relative", plan.popular && "ring-2 ring-primary")}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="text-sm text-silver mt-1">{plan.description}</p>
                  </div>
                  <button onClick={() => openEdit(plan)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-white/[0.04] rounded-lg">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-3xl font-bold text-white mb-4">{plan.price > 0 ? `$${plan.price.toLocaleString()}` : "Custom"}</p>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-silver">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    plan.published ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-silver"
                  )}>
                    {plan.published ? "Published" : "Hidden"}
                  </span>
                  {plan.popular && <span className="text-xs text-primary font-medium">Popular</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg glass-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Plan</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-silver">Plan Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label className="text-silver">Price (USD / month)</Label>
                  <Input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
              </div>
              <div className="space-y-2">
                <Label className="text-silver">Features</Label>
                <div className="space-y-1 mb-2">
                  {form.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-white">
                      <span className="flex-1">{f}</span>
                      <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-300"><XIcon className="h-3.5 w-3.5" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())} placeholder="Add feature" />
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>Add</Button>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-silver">
                  <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="rounded border-white/20" />
                  Popular
                </label>
                <label className="flex items-center gap-2 text-sm text-silver">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-white/20" />
                  Published
                </label>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
