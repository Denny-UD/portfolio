"use client"

import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored) {
      setThemeState(stored)
      document.documentElement.classList.remove("dark", "light")
      document.documentElement.classList.add(stored)
    } else {
      // Default to dark
      document.documentElement.classList.add("dark")
    }
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(t)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return { theme, setTheme, toggleTheme }
}