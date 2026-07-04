"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { techStack } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = Array.from(new Set(techStack.map((t) => t.category)))

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState(categories[0])

  const filtered = techStack.filter((t) => t.category === activeCategory)

  return (
    <section id="stack" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Layers className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Technology Stack
        </h2>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Technology categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-xs transition-all",
              activeCategory === cat
                ? "bg-green-900/40 text-green-400 border border-green-700/50"
                : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700 hover:text-slate-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
        {filtered.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className="group rounded-lg border border-slate-800 bg-slate-900/30 p-4 transition-colors hover:border-slate-700"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-slate-200">{item.name}</h3>
              <span className="font-mono text-[10px] text-slate-600">{item.experience}</span>
            </div>

            {/* Proficiency bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[10px] text-slate-600">
                <span>Proficiency</span>
                <span>{item.proficiency}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className={cn(
                    "h-full rounded-full",
                    item.proficiency >= 90 && "bg-green-500",
                    item.proficiency >= 75 && item.proficiency < 90 && "bg-cyan-500",
                    item.proficiency >= 50 && item.proficiency < 75 && "bg-yellow-500",
                    item.proficiency < 50 && "bg-slate-500"
                  )}
                />
              </div>
            </div>

            {/* Projects used in */}
            <div className="space-y-1">
              {item.projects.map((proj) => (
                <p key={proj} className="font-mono text-[10px] text-slate-600">
                  <span className="text-slate-700">▸</span> {proj}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}