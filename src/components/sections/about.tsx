"use client"

import { motion } from "framer-motion"
import { User, Target, Sparkles } from "lucide-react"

export function About() {
  const cards = [
    {
      icon: User,
      title: "Who I Am",
      content:
        "Cloud & DevOps Engineer focused on scalable AWS/Azure infrastructure, deployment automation, and production reliability. 3+ years of hands-on experience managing 100+ servers, 50+ containerized microservices, and 100% Terraform-managed infrastructure.",
      color: "#22d3ee",
    },
    {
      icon: Target,
      title: "Mission",
      content:
        "Build secure, automated, observable cloud platforms. I design infrastructure that is resilient, cost-optimized, and requires minimal manual intervention — so teams can focus on shipping features, not firefighting.",
      color: "var(--accent-light)",
    },
    {
      icon: Sparkles,
      title: "Current Focus",
      content:
        "Platform Engineering · Kubernetes · AI for DevOps · Infrastructure as Code · Multi-cloud Architecture · Observability · Disaster Recovery Automation",
      color: "#c084fc",
    },
  ]

  return (
    <section id="about" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <User className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          About / System Info
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="rounded-lg border p-5"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <card.icon className="h-4 w-4" style={{ color: card.color }} aria-hidden="true" />
              </div>
              <h3 className="font-mono text-sm font-semibold" style={{ color: card.color }}>
                {card.title}
              </h3>
            </div>
            <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {card.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}