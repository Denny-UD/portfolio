"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { techStack } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = Array.from(new Set(techStack.map((t) => t.category)))

const proficiencyColors = [
  "var(--accent)",       // 90+
  "var(--accent-light)", // 75-89
  "#f59e0b",            // 50-74
  "var(--text-muted)",  // <50
]

function getProficiencyColor(val: number): string {
  if (val >= 90) return proficiencyColors[0]
  if (val >= 75) return proficiencyColors[1]
  if (val >= 50) return proficiencyColors[2]
  return proficiencyColors[3]
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const filtered = techStack.filter((t) => t.category === activeCategory)

  return (
    <section id="stack" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Layers className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Technology Stack
        </h2>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Technology categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
            className="rounded-md px-3 py-1.5 font-mono text-xs border transition-all"
            style={{
              backgroundColor: activeCategory === cat ? "rgba(0, 107, 60, 0.2)" : "var(--bg-surface)",
              color: activeCategory === cat ? "var(--accent-light)" : "var(--text-muted)",
              borderColor: activeCategory === cat ? "var(--accent)" : "var(--border-color)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
        {filtered.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className="group rounded-lg border p-4 transition-colors"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {item.name}
              </h3>
              <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                {item.experience}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                <span>Proficiency</span>
                <span>{item.proficiency}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-elevated)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getProficiencyColor(item.proficiency) }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {item.projects.map((proj) => (
                <p key={proj} className="font-mono text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                  <span style={{ color: "var(--text-muted)", opacity: 0.3 }}>▸</span> {proj}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}