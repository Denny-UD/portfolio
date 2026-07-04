"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { certifications } from "@/data/mock-data"

export function Certifications() {
  return (
    <section id="certifications" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Award className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">Certifications</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700"
          >
            {/* Color accent bar */}
            <div
              className="absolute left-0 top-0 h-full w-1"
              style={{ backgroundColor: cert.badgeColor }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-400">
                    {cert.code}
                  </span>
                </div>
                <h3 className="font-mono text-sm font-semibold text-slate-200">{cert.name}</h3>
                <p className="font-mono text-xs text-slate-500">{cert.issuer}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>Issued: {cert.issueDate}</span>
                </div>
              </div>

              {/* Verify link */}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border border-slate-700 px-2.5 py-1.5 font-mono text-[10px] text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-300"
                aria-label={`Verify ${cert.code} certification`}
              >
                Verify
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${cert.badgeColor}08, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}