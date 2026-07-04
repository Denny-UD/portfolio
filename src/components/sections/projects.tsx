"use client"

import { motion } from "framer-motion"
import { Code, ExternalLink, CheckCircle, AlertTriangle, Archive } from "lucide-react"
import { projects } from "@/data/mock-data"
import { useState } from "react"

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production": return "var(--accent-light)"
      case "maintenance": return "#f59e0b"
      case "archived": return "var(--text-muted)"
      default: return "var(--text-muted)"
    }
  }

  const getStatusStyle = (status: string) => ({
    color: getStatusColor(status),
    backgroundColor: status === "production"
      ? "rgba(0, 107, 60, 0.15)"
      : status === "maintenance"
        ? "rgba(245, 158, 11, 0.1)"
        : "var(--bg-elevated)",
  })

  return (
    <section id="projects" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Code className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
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
            className="rounded-lg border overflow-hidden"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
          >
            <button
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors"
              style={{}}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-elevated)" }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
              aria-expanded={expandedId === project.id}
              aria-controls={`project-${project.id}`}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={getStatusStyle(project.status)}
              >
                {project.status === "production" && <CheckCircle className="h-4 w-4" />}
                {project.status === "maintenance" && <AlertTriangle className="h-4 w-4" />}
                {project.status === "archived" && <Archive className="h-4 w-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded px-1.5 py-0.5 font-mono text-[9px]"
                      style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[9px]" style={{ color: "var(--text-muted)" }}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <ExternalLink
                className="h-4 w-4 transition-transform"
                style={{
                  color: "var(--text-muted)",
                  transform: expandedId === project.id ? "rotate(45deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              />
            </button>

            {expandedId === project.id && (
              <motion.div
                id={`project-${project.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t px-5 py-4 space-y-4"
                style={{ borderColor: "var(--border-color)" }}
              >
                {[
                  { label: "Problem", color: "#ef4444", content: project.problem },
                  { label: "Solution", color: "#22d3ee", content: project.solution },
                  { label: "Impact", color: "var(--accent-light)", content: project.impact },
                ].map(({ label, color, content }) => (
                  <div key={label}>
                    <h4 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                      {label}
                    </h4>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{content}</p>
                  </div>
                ))}
                <div>
                  <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border px-2 py-1 font-mono text-[10px]"
                        style={{
                          borderColor: "var(--border-color)",
                          backgroundColor: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Key Metrics
                  </h4>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m}
                        className="rounded border px-3 py-2"
                        style={{
                          borderColor: "var(--border-color)",
                          backgroundColor: "var(--bg-primary)",
                        }}
                      >
                        <p className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>{m}</p>
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