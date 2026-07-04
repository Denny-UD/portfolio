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
  const baseClasses = "inline-flex items-center justify-center rounded-md font-mono text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const sizeClasses = {
    sm: "h-7 px-2 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  }[size]

  const variantStyles: React.CSSProperties = {
    borderWidth: variant === "ghost" ? 0 : 1,
    borderStyle: variant === "ghost" ? "none" : "solid",
  }

  switch (variant) {
    case "default":
      variantStyles.borderColor = "var(--accent)"
      variantStyles.color = "white"
      variantStyles.backgroundColor = "var(--accent)"
      break
    case "outline":
      variantStyles.borderColor = "var(--border-color)"
      variantStyles.color = "var(--text-muted)"
      variantStyles.backgroundColor = "transparent"
      break
    case "ghost":
      variantStyles.color = "var(--text-muted)"
      variantStyles.backgroundColor = "transparent"
      break
    case "danger":
      variantStyles.borderColor = "#ef4444"
      variantStyles.color = "#ef4444"
      variantStyles.backgroundColor = "rgba(239, 68, 68, 0.1)"
      break
    case "success":
      variantStyles.borderColor = "var(--accent)"
      variantStyles.color = "var(--accent-light)"
      variantStyles.backgroundColor = "rgba(0, 107, 60, 0.15)"
      break
  }

  return (
    <button
      className={cn(baseClasses, sizeClasses, className)}
      style={variantStyles}
      {...props}
    />
  )
}