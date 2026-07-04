"use client"

/**
 * MAIN PAGE — Cloud Ops Control Center
 * This is a static/client-side portfolio site. All "live" data (metrics, logs, etc.)
 * is simulated using mock data. No real backend or infrastructure APIs are called.
 * This is a portfolio demonstration, not a production monitoring system.
 */

import { useState, useEffect, useCallback } from "react"
import { BootScreen } from "@/components/layout/boot-screen"
import { CommandCenter } from "@/components/layout/command-center"
import { CommandPalette } from "@/components/layout/command-palette"
import { HomeDashboard } from "@/components/sections/home-dashboard"
import { About } from "@/components/sections/about"
import { TechStack } from "@/components/sections/tech-stack"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Architecture } from "@/components/sections/architecture"
import { Certifications } from "@/components/sections/certifications"
import { Blog } from "@/components/sections/blog"
import { Resume } from "@/components/sections/resume"
import { Contact } from "@/components/sections/contact"
import { useBootSequence } from "@/hooks/useBootSequence"
import { useTheme } from "@/hooks/useTheme"

export default function Home() {
  const { booted, currentStep, bootText, visible, skip } = useBootSequence()
  const { theme, setTheme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [commandOpen, setCommandOpen] = useState(false)

  const scrollToSection = useCallback((section: string) => {
    setActiveSection(section)
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  // Track scroll for active section
  useEffect(() => {
    if (!booted) return
    const handleScroll = () => {
      const sections = [
        "dashboard",
        "about",
        "stack",
        "experience",
        "projects",
        "architecture",
        "certifications",
        "blog",
        "resume",
        "contact",
      ]
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [booted])

  // Keyboard shortcuts
  useEffect(() => {
    if (!booted) return
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen((p) => !p)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [booted])

  // Boot keyboard escape
  useEffect(() => {
    if (visible) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === " " || e.key === "Escape") {
          e.preventDefault()
          skip()
        }
      }
      window.addEventListener("keydown", handleKey)
      return () => window.removeEventListener("keydown", handleKey)
    }
  }, [visible, skip])

  if (!booted) {
    return (
      <BootScreen
        bootText={bootText}
        currentStep={currentStep}
        visible={visible}
        onSkip={skip}
      />
    )
  }

  return (
    <>
      <CommandCenter
        activeSection={activeSection}
        onNavigate={scrollToSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNavigate={scrollToSection}
      />

      <main className="md:pl-56 min-h-screen">
        {/* Top status bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm px-4 md:px-8 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[10px] text-green-400">umangdakh@cloud-ops:~$</span>
            <span className="font-mono text-[10px] text-slate-600 hidden sm:inline">
              {activeSection}
            </span>
          </div>
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-[10px] text-slate-600 transition-colors hover:border-slate-700 hover:text-slate-400"
            aria-label="Open command palette"
          >
            <kbd className="text-[11px]">⌘K</kbd>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12 space-y-24">
          <HomeDashboard />
          <About />
          <TechStack />
          <Experience />
          <Projects />
          <Architecture />
          <Certifications />
          <Blog />
          <Resume />
          <Contact />

          {/* Footer */}
          <footer className="border-t border-slate-800 pt-6 pb-8 text-center">
            <p className="font-mono text-[10px] text-slate-700">
              <span className="text-green-500/60">$</span> Built with Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · ShadCN UI
            </p>
            <p className="font-mono text-[10px] text-slate-800 mt-1">
              © {new Date().getFullYear()} Umang Dakh · Cloud Ops Control Center
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}