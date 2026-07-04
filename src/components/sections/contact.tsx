"use client"

import { motion } from "framer-motion"
import { Send, Globe, Link2, Mail, ExternalLink } from "lucide-react"
import { contactInfo } from "@/data/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <Link2 className="h-5 w-5" />,
  github: <Globe className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
}

export function Contact() {
  return (
    <section id="contact" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Send className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Contact</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border p-6"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
      >
        <p className="mb-6 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          Reach out via any of the following channels. I typically respond within 24 hours.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {contactInfo.map((contact, i) => (
            <motion.a
              key={contact.platform}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center gap-3 rounded-lg border p-4 transition-all"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)"
                e.currentTarget.style.backgroundColor = "var(--bg-elevated)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)"
                e.currentTarget.style.backgroundColor = "var(--bg-primary)"
              }}
              aria-label={`Contact via ${contact.platform}`}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
              >
                {iconMap[contact.icon] || <ExternalLink className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold transition-colors" style={{ color: "var(--text-primary)" }}>
                  {contact.platform}
                </p>
                <p className="font-mono text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {contact.handle}
                </p>
              </div>
              <ExternalLink className="h-4 w-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}