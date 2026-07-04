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
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Send className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">Contact</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-800 bg-slate-900/50 p-6"
      >
        <p className="mb-6 font-mono text-xs text-slate-500">
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
              className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/60"
              aria-label={`Contact via ${contact.platform}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 group-hover:text-green-400 transition-colors">
                {iconMap[contact.icon] || <ExternalLink className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-slate-200 group-hover:text-green-400 transition-colors">
                  {contact.platform}
                </p>
                <p className="font-mono text-xs text-slate-500 truncate">{contact.handle}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}