"use client"

import { motion } from "framer-motion"
import { Timeline, GitCommit, Clock, CheckCircle, BarChart } from "lucide-react"
import { experienceEntries } from "@/data/mock-data"

export function Experience() {
  const exp = experienceEntries[0]

  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Timeline className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Deployment History / Experience
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-800 bg-slate-900/50"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
          <GitCommit className="h-5 w-5 text-cyan-400" aria-hidden="true" />
          <div>
            <span className="font-mono text-sm font-semibold text-slate-200">{exp.role}</span>
            <p className="font-mono text-xs text-slate-500">{exp.company}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded bg-green-950/40 px-2 py-0.5 font-mono text-[10px] text-green-400">
              v{exp.version}
            </span>
            <span className="font-mono text-[10px] text-slate-600">{exp.date}</span>
          </div>
        </div>

        {/* Deployment notes */}
        <div className="px-5 py-4">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold text-slate-400">
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
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-950/40">
                  <CheckCircle className="h-3 w-3 text-green-400" aria-hidden="true" />
                </span>
                <p className="font-mono text-xs leading-relaxed text-slate-400">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="border-t border-slate-800 px-5 py-4">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold text-slate-400">
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
                className="rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2"
              >
                <p className="font-mono text-[11px] text-slate-500">{metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}