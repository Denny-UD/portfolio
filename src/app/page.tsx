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
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [commandOpen, setCommandOpen] = useState(false)

  const scrollToSection = useCallback((section: string) => {
    setActiveSection(section)
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  useEffect(() => {
    if (!booted) return
    const handleScroll = () => {
      const sections = [
        "dashboard", "about", "stack", "experience", "projects",
        "architecture", "certifications", "blog", "resume", "contact",
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

      <main className="md:pl-56 min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Top status bar */}
        <div
          className="sticky top-0 z-30 flex items-center justify-between border-b px-4 md:px-8 py-2 backdrop-blur-sm"
          style={{
            backgroundColor: "color-mix(in srgb, var(--bg-surface) 80%, transparent)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} aria-hidden="true" />
            <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>
              umangdakh@cloud-ops:~$
            </span>
            <span className="font-mono text-[10px] hidden sm:inline" style={{ color: "var(--text-muted)" }}>
              {activeSection}
            </span>
          </div>
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-1 rounded border px-2.5 py-1 font-mono text-[10px] transition-colors"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)" }}
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

          <footer className="border-t pt-6 pb-8 text-center" style={{ borderColor: "var(--border-color)" }}>
            <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
              <span style={{ color: "var(--accent)", opacity: 0.6 }}>$</span> Built with Next.js 15 · TypeScript · Tailwind CSS · Framer Motion
            </p>
            <p className="font-mono text-[10px] mt-1" style={{ color: "var(--text-muted)", opacity: 0.3 }}>
              © {new Date().getFullYear()} Umang Dakh · Cloud Ops Control Center
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}