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
      color: "text-cyan-400",
      bg: "bg-cyan-950/30",
      border: "border-cyan-800/30",
    },
    {
      icon: Target,
      title: "Mission",
      content:
        "Build secure, automated, observable cloud platforms. I design infrastructure that is resilient, cost-optimized, and requires minimal manual intervention — so teams can focus on shipping features, not firefighting.",
      color: "text-emerald-400",
      bg: "bg-emerald-950/30",
      border: "border-emerald-800/30",
    },
    {
      icon: Sparkles,
      title: "Current Focus",
      content:
        "Platform Engineering · Kubernetes · AI for DevOps · Infrastructure as Code · Multi-cloud Architecture · Observability · Disaster Recovery Automation",
      color: "text-purple-400",
      bg: "bg-purple-950/30",
      border: "border-purple-800/30",
    },
  ]

  return (
    <section id="about" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <User className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
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
            className={`rounded-lg border ${card.border} ${card.bg} p-5`}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} aria-hidden="true" />
              </div>
              <h3 className={`font-mono text-sm font-semibold ${card.color}`}>{card.title}</h3>
            </div>
            <p className="font-mono text-xs leading-relaxed text-slate-400">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}