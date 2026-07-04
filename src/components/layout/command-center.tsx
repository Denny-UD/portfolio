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
      <div
        className="mb-4 flex items-center gap-2 border-b px-3 pb-4 pt-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          UD
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
            Cloud Ops
          </span>
          <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>Control Center</span>
        </div>
      </div>

      {/* Nav items */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNav(item.section)}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-xs transition-all relative"
          style={{
            backgroundColor: activeSection === item.section ? "rgba(0, 107, 60, 0.2)" : "transparent",
            color: activeSection === item.section ? "var(--accent-light)" : "var(--text-muted)",
          }}
          onMouseEnter={(e) => {
            if (activeSection !== item.section) {
              e.currentTarget.style.backgroundColor = "var(--bg-elevated)"
              e.currentTarget.style.color = "var(--text-primary)"
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== item.section) {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "var(--text-muted)"
            }
          }}
          aria-current={activeSection === item.section ? "page" : undefined}
        >
          {activeSection === item.section && (
            <span
              className="absolute left-0 h-6 w-0.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          )}
          <span className="shrink-0">{iconMap[item.icon]}</span>
          <span className="truncate">{item.label}</span>
        </button>
      ))}

      {/* Theme toggle at bottom */}
      <div className="mt-auto border-t pt-2" style={{ borderColor: "var(--border-color)" }}>
        <button
          onClick={onToggleTheme}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-mono text-xs transition-all"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-elevated)"
            e.currentTarget.style.color = "var(--text-primary)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "var(--text-muted)"
          }}
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
        className="fixed left-0 top-0 z-40 hidden h-full w-56 border-r p-2 md:block"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg md:hidden"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" style={{ color: "var(--text-primary)" }} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-64 border-r p-2 md:hidden"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1"
                  style={{ color: "var(--text-muted)" }}
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