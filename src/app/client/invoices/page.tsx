"use client"

import { motion } from "framer-motion"
import {
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const invoices = [
  { id: "INV-0043", amount: "$4,500.00", status: "Pending", dueDate: "Apr 15, 2026", project: "Website Redesign" },
  { id: "INV-0042", amount: "$3,500.00", status: "Paid", dueDate: "Mar 01, 2026", project: "SEO Campaign" },
  { id: "INV-0041", amount: "$2,800.00", status: "Overdue", dueDate: "Feb 15, 2026", project: "Social Media Package" },
  { id: "INV-0040", amount: "$5,200.00", status: "Paid", dueDate: "Jan 30, 2026", project: "Brand Identity" },
  { id: "INV-0039", amount: "$1,950.00", status: "Paid", dueDate: "Jan 10, 2026", project: "Website Redesign" },
  { id: "INV-0038", amount: "$3,200.00", status: "Pending", dueDate: "Apr 01, 2026", project: "Email Marketing" },
  { id: "INV-0037", amount: "$4,100.00", status: "Paid", dueDate: "Dec 20, 2025", project: "Mobile App UI" },
]

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
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0)
  const totalPending = invoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0)
  const totalBalance = invoices
    .filter((inv) => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0)

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
            <div className="col-span-2">Invoice</div>
            <div className="col-span-2">Project</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

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
                <div className="col-span-2">
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{inv.project}</p>
                </div>
                <div className="hidden md:block col-span-2 text-sm text-muted-foreground">{inv.project}</div>
                <div className="col-span-2 text-sm font-medium text-foreground">{inv.amount}</div>
                <div className="col-span-2">
                  <Badge variant="outline" className={cn(statusStyles[inv.status])}>
                    {inv.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">{inv.dueDate}</div>
                <div className="col-span-2 flex justify-end gap-1">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
