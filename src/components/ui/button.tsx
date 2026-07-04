"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "success"
  size?: "sm" | "md" | "lg"
}

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-mono text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "border border-green-500/50 bg-green-950/30 text-green-400 hover:bg-green-900/40 hover:border-green-400":
            variant === "default",
          "border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800/50 hover:border-slate-600":
            variant === "outline",
          "bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200":
            variant === "ghost",
          "border border-red-500/50 bg-red-950/30 text-red-400 hover:bg-red-900/40":
            variant === "danger",
          "border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40":
            variant === "success",
        },
        {
          "h-7 px-2 text-xs": size === "sm",
          "h-9 px-4 text-sm": size === "md",
          "h-11 px-6 text-base": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
}