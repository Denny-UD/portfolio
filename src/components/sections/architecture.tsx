"use client"

import { motion } from "framer-motion"
import { Network, ArrowRight } from "lucide-react"
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
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Network className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Architecture Gallery
        </h2>
      </div>

      {/* Diagram selector */}
      <div className="flex gap-2" role="tablist" aria-label="Architecture diagrams">
        {architectureDiagrams.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiveDiagram(i)}
            role="tab"
            aria-selected={activeDiagram === i}
            className={cn(
              "rounded-md px-4 py-2 font-mono text-xs transition-all",
              activeDiagram === i
                ? "bg-green-900/40 text-green-400 border border-green-700/50"
                : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700"
            )}
          >
            {d.title}
          </button>
        ))}
      </div>

      {/* Interactive diagram */}
      <motion.div
        key={diagram.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-6"
        role="tabpanel"
        aria-label={diagram.title}
      >
        <div className="relative h-[400px] w-full">
          {/* Connection lines */}
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
                    stroke="rgb(71, 85, 105)"
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
                      fill="rgb(100, 116, 139)"
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

          {/* Nodes */}
          {diagram.nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={cn(
                "absolute flex items-center justify-center rounded-lg border px-3 py-2 text-center font-mono text-[10px] leading-tight transition-all hover:scale-110 hover:z-10 cursor-default",
                typeColors[node.type] || "border-slate-700 bg-slate-800 text-slate-400"
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

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-800 pt-3">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-sm border", color.split(" ")[0])} />
              <span className="font-mono text-[10px] text-slate-500 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}