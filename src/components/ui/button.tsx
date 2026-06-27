"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
        secondary:
          "bg-[rgba(255,255,255,0.06)] backdrop-blur-sm text-foreground border border-border hover:bg-[rgba(255,255,255,0.1)] hover:border-primary/30 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-[rgba(255,255,255,0.06)] hover:border-primary/30 hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-primary-hover",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover",
        accent:
          "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-[12px] px-4 text-xs",
        lg: "h-13 px-10 py-3 text-base",
        xl: "h-14 px-12 py-4 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
