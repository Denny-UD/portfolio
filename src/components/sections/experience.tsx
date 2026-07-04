"use client"

import { motion } from "framer-motion"
import { Timeline, GitCommit, Clock, CheckCircle, BarChart } from "lucide-react"
import { experienceEntries } from "@/data/mock-data"

export function Experience() {
  const exp = experienceEntries[0]

  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Timeline className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Deployment History / Experience
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--border-color)" }}>
          <GitCommit className="h-5 w-5" style={{ color: "#22d3ee" }} aria-hidden="true" />
          <div>
            <span className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{exp.role}</span>
            <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{exp.company}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="rounded px-2 py-0.5 font-mono text-[10px]"
              style={{
                backgroundColor: "rgba(0, 107, 60, 0.15)",
                color: "var(--accent-light)",
              }}
            >
              v{exp.version}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{exp.date}</span>
          </div>
        </div>

        <div className="px-5 py-4">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Deployment Notes
          </h3>
          <div className="space-y-3">
            {exp.deploymentNotes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(0, 107, 60, 0.15)" }}
                >
                  <CheckCircle className="h-3 w-3" style={{ color: "var(--accent-light)" }} aria-hidden="true" />
                </span>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t px-5 py-4" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            <BarChart className="h-3.5 w-3.5" aria-hidden="true" />
            Performance Metrics
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {exp.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-md border px-3 py-2"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <p className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>{metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}