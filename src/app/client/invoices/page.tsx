"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getClientInvoices } from "@/actions/client-portal"

interface Invoice {
  id: string
  amount: number
  status: "PENDING" | "PAID" | "OVERDUE"
  dueDate: string
  createdAt: string
}

const statusLabels: Record<Invoice["status"], string> = {
  PAID: "Paid",
  PENDING: "Pending",
  OVERDUE: "Overdue",
}

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Overdue: "bg-red-100 text-red-700 border-red-200",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function ClientInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClientInvoices()
      .then((data) => setInvoices(data as unknown as Invoice[]))
      .catch(() => setInvoices([]))
      .finally(() => setLoading(false))
  }, [])

  const totalPaid = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const totalPending = invoices
    .filter((inv) => inv.status !== "PAID")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const totalBalance = invoices
    .filter((inv) => inv.status === "PENDING" || inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-1">Track payments and manage your billing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-1">${totalPaid.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Balance Due</p>
                <p className="text-2xl font-bold text-foreground mt-1">${totalBalance.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-3">Invoice</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3">Due Date</div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : invoices.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No invoices have been issued to your account yet.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {invoices.map((inv) => (
                <motion.div
                  key={inv.id}
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors items-start md:items-center"
                >
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-foreground">INV-{inv.id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="col-span-3 text-sm font-medium text-foreground">${inv.amount.toLocaleString()}</div>
                  <div className="col-span-3">
                    <Badge variant="outline" className={cn(statusStyles[statusLabels[inv.status]])}>
                      {statusLabels[inv.status]}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {new Date(inv.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
