"use client"

import { motion } from "framer-motion"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Resume() {
  return (
    <section id="resume" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <FileText className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">Resume</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 rounded-lg border border-slate-800 bg-slate-900/50 p-8"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-950/40">
          <FileText className="h-8 w-8 text-green-400" aria-hidden="true" />
        </div>

        <div className="text-center">
          <h3 className="font-mono text-base font-semibold text-slate-200 mb-2">
            Umang Dakh — Cloud & DevOps Engineer
          </h3>
          <p className="font-mono text-xs text-slate-500 max-w-md">
            ATS-optimized resume detailing 3+ years of cloud infrastructure, Kubernetes orchestration,
            CI/CD automation, and production reliability engineering.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://raw.githubusercontent.com/umangdakh/portfolio/main/public/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download PDF
            </Button>
          </a>
          <a
            href="https://raw.githubusercontent.com/umangdakh/portfolio/main/public/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              View Online
            </Button>
          </a>
        </div>

        <p className="font-mono text-[10px] text-slate-700">
          Resume is served from GitHub. Ensure the file exists at public/resume.pdf in the repository.
        </p>
      </motion.div>
    </section>
  )
}