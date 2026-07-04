"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { certifications } from "@/data/mock-data"

export function Certifications() {
  return (
    <section id="certifications" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Award className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Certifications</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-lg border p-5 transition-all"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="absolute left-0 top-0 h-full w-1"
              style={{ backgroundColor: cert.badgeColor }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                  <span
                    className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {cert.code}
                  </span>
                </div>
                <h3 className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {cert.name}
                </h3>
                <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{cert.issuer}</p>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>Issued: {cert.issueDate}</span>
                </div>
              </div>

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border px-2.5 py-1.5 font-mono text-[10px] transition-colors"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)"
                  e.currentTarget.style.color = "var(--accent-light)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)"
                  e.currentTarget.style.color = "var(--text-muted)"
                }}
                aria-label={`Verify ${cert.code} certification`}
              >
                Verify
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}