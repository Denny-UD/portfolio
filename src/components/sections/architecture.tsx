"use client"

import { motion } from "framer-motion"
import { Network } from "lucide-react"
import { architectureDiagrams } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

const typeColors: Record<string, string> = {
  network: "border-cyan-500/50 bg-cyan-950/30 text-cyan-400",
  gateway: "border-purple-500/50 bg-purple-950/30 text-purple-400",
  compute: "border-blue-500/50 bg-blue-950/30 text-blue-400",
  database: "border-yellow-500/50 bg-yellow-950/30 text-yellow-400",
  storage: "border-green-500/50 bg-green-950/30 text-green-400",
  monitoring: "border-red-500/50 bg-red-950/30 text-red-400",
}

export function Architecture() {
  const [activeDiagram, setActiveDiagram] = useState(0)
  const diagram = architectureDiagrams[activeDiagram]

  return (
    <section id="architecture" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Network className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Architecture Gallery
        </h2>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Architecture diagrams">
        {architectureDiagrams.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiveDiagram(i)}
            role="tab"
            aria-selected={activeDiagram === i}
            className="rounded-md px-4 py-2 font-mono text-xs border transition-all"
            style={{
              backgroundColor: activeDiagram === i ? "rgba(0, 107, 60, 0.2)" : "var(--bg-surface)",
              color: activeDiagram === i ? "var(--accent-light)" : "var(--text-muted)",
              borderColor: activeDiagram === i ? "var(--accent)" : "var(--border-color)",
            }}
          >
            {d.title}
          </button>
        ))}
      </div>

      <motion.div
        key={diagram.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-lg border p-6"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
        role="tabpanel"
        aria-label={diagram.title}
      >
        <div className="relative h-[400px] w-full">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {diagram.edges.map((edge, i) => {
              const from = diagram.nodes.find((n) => n.id === edge.from)
              const to = diagram.nodes.find((n) => n.id === edge.to)
              if (!from || !to) return null

              const x1 = (from.x / 100) * 100 + 5
              const y1 = (from.y / 100) * 100 + 5
              const x2 = (to.x / 100) * 100 + 5
              const y2 = (to.y / 100) * 100 + 5

              return (
                <g key={i}>
                  <motion.line
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="var(--border-color)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                  {edge.label && (
                    <text
                      x={`${(x1 + x2) / 2}%`}
                      y={`${(y1 + y2) / 2 - 2}%`}
                      fill="var(--text-muted)"
                      fontSize="8"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {diagram.nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={cn(
                "absolute flex items-center justify-center rounded-lg border px-3 py-2 text-center font-mono text-[10px] leading-tight transition-all hover:scale-110 hover:z-10 cursor-default",
                typeColors[node.type] || ""
              )}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                minWidth: "80px",
              }}
              title={`${node.label} (${node.type})`}
            >
              {node.label}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 border-t pt-3" style={{ borderColor: "var(--border-color)" }}>
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-sm border", color.split(" ")[0])} />
              <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{type}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}