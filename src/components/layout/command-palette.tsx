"use client"

/**
 * Command Palette (Cmd+K)
 * Client-side navigation search — no real backend.
 * Filters and jumps to sections within the portfolio.
 */

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Command } from "lucide-react"
import { navItems } from "@/data/mock-data"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (section: string) => void
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = useCallback(
    (section: string) => {
      onNavigate(section)
      onOpenChange(false)
      setQuery("")
    },
    [onNavigate, onOpenChange]
  )

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].section)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-slate-700 px-4 py-3">
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search sections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent font-mono text-sm text-slate-200 placeholder-slate-600 outline-none"
                aria-label="Search sections"
              />
              <kbd className="hidden rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-500 sm:inline-block">
                <Command className="inline h-3 w-3" aria-hidden="true" />K
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center font-mono text-sm text-slate-600">
                  No results found
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.section)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    role="option"
                    aria-selected={i === selectedIndex}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm transition-colors",
                      i === selectedIndex
                        ? "bg-green-900/30 text-green-400"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    )}
                  >
                    <span className="text-base">{getIcon(item.icon)}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-slate-600">{item.section}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function getIcon(icon: string): string {
  const icons: Record<string, string> = {
    "monitor-dashboard": "📊",
    user: "👤",
    layers: "📚",
    timeline: "📋",
    code: "💻",
    network: "🔗",
    certificate: "🏅",
    "book-open": "📖",
    "file-text": "📄",
    send: "✉️",
  }
  return icons[icon] || "•"
}