"use client"

import { motion } from "framer-motion"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Resume() {
  return (
    <section id="resume" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <FileText className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Resume</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 rounded-lg border p-8"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0, 107, 60, 0.15)" }}>
          <FileText className="h-8 w-8" style={{ color: "var(--accent-light)" }} aria-hidden="true" />
        </div>

        <div className="text-center">
          <h3 className="font-mono text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Umang Dakh — Cloud & DevOps Engineer
          </h3>
          <p className="font-mono text-xs max-w-md" style={{ color: "var(--text-muted)" }}>
            ATS-optimized resume detailing 3+ years of cloud infrastructure, Kubernetes orchestration,
            CI/CD automation, and production reliability engineering.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="/Umang_Dakh_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="lg">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download PDF
            </Button>
          </a>
          <a href="/Umang_Dakh_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              View Online
            </Button>
          </a>
        </div>

        <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
          Resume is served locally from the public/ folder. Place Umang_Dakh_Resume.pdf in the public directory.
        </p>
      </motion.div>
    </section>
  )
}