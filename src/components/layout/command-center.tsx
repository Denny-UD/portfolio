"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Layers,
  Timeline,
  Code,
  NetworkIcon,
  Award,
  BookOpen,
  FileText,
  Send,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { navItems } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface CommandCenterProps {
  activeSection: string
  onNavigate: (section: string) => void
  theme: "dark" | "light"
  onToggleTheme: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  "monitor-dashboard": <LayoutDashboard className="h-5 w-5" />,
  user: <User className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  timeline: <Timeline className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  network: <NetworkIcon className="h-5 w-5" />,
  certificate: <Award className="h-5 w-5" />,
  "book-open": <BookOpen className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  send: <Send className="h-5 w-5" />,
}

export function CommandCenter({ activeSection, onNavigate, theme, onToggleTheme }: CommandCenterProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleNav = (section: string) => {
    onNavigate(section)
    if (isMobile) setMobileOpen(false)
  }

  const sidebarContent = (
    <nav
      className="flex h-full flex-col gap-1"
      role="navigation"
      aria-label="Command center navigation"
    >
      {/* Logo */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-800 px-3 pb-4 pt-3 dark:border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/20 text-xs font-bold text-green-400">
          UD
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-slate-200 dark:text-slate-200">
            Cloud Ops
          </span>
          <span className="font-mono text-[10px] text-slate-500">Control Center</span>
        </div>
      </div>

      {/* Nav items */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNav(item.section)}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-xs transition-all",
            activeSection === item.section
              ? "bg-green-900/30 text-green-400 before:absolute before:left-0 before:h-6 before:w-0.5 before:rounded-full before:bg-green-400"
              : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300",
            "relative"
          )}
          aria-current={activeSection === item.section ? "page" : undefined}
        >
          <span className="shrink-0">{iconMap[item.icon]}</span>
          <span className="truncate">{item.label}</span>
        </button>
      ))}

      {/* Theme toggle at bottom */}
      <div className="mt-auto border-t border-slate-800 pt-2 dark:border-slate-800">
        <button
          onClick={onToggleTheme}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-mono text-xs text-slate-500 transition-all hover:bg-slate-800/50 hover:text-slate-300"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-full w-56 border-r border-slate-800 bg-slate-950 p-2 dark:border-slate-800 dark:bg-slate-950 md:block",
          "light:border-slate-200 light:bg-white"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 shadow-lg md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5 text-slate-300" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-64 border-r border-slate-800 bg-slate-950 p-2 md:hidden"
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1 text-slate-500 hover:text-slate-300"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}