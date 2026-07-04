"use client"

import { motion } from "framer-motion"
import { Code, ExternalLink, CheckCircle, AlertTriangle, Archive } from "lucide-react"
import { projects } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="projects" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Code className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Projects / Deployments
        </h2>
      </div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-800/30"
              aria-expanded={expandedId === project.id}
              aria-controls={`project-${project.id}`}
            >
              {/* Status indicator */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  project.status === "production" && "bg-green-950/40 text-green-400",
                  project.status === "maintenance" && "bg-yellow-950/40 text-yellow-400",
                  project.status === "archived" && "bg-slate-800 text-slate-500"
                )}
              >
                {project.status === "production" && <CheckCircle className="h-4 w-4" />}
                {project.status === "maintenance" && <AlertTriangle className="h-4 w-4" />}
                {project.status === "archived" && <Archive className="h-4 w-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm font-semibold text-slate-200 truncate">
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-500"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[9px] text-slate-600">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <ExternalLink
                className={cn(
                  "h-4 w-4 text-slate-600 transition-transform",
                  expandedId === project.id && "rotate-45"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Expanded content */}
            {expandedId === project.id && (
              <motion.div
                id={`project-${project.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-slate-800 px-5 py-4 space-y-4"
              >
                <div>
                  <h4 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-400">
                    Problem
                  </h4>
                  <p className="font-mono text-xs leading-relaxed text-slate-400">{project.problem}</p>
                </div>
                <div>
                  <h4 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    Solution
                  </h4>
                  <p className="font-mono text-xs leading-relaxed text-slate-400">{project.solution}</p>
                </div>
                <div>
                  <h4 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-green-400">
                    Impact
                  </h4>
                  <p className="font-mono text-xs leading-relaxed text-slate-400">{project.impact}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-700 bg-slate-800/50 px-2 py-1 font-mono text-[10px] text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Key Metrics
                  </h4>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m}
                        className="rounded border border-slate-800 bg-slate-950/50 px-3 py-2"
                      >
                        <p className="font-mono text-[11px] text-slate-500">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}