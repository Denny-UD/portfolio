"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, CheckCircle, Clock, XCircle } from "lucide-react"
import { deploymentLogs } from "@/data/mock-data"
import { cn } from "@/lib/utils"

interface FeedEntry {
  id: string
  message: string
  type: "deploy" | "info" | "error" | "success"
  timestamp: string
}

const statusMessages = [
  "terraform plan — no changes to infrastructure",
  "kubectl rollout status deployment/ai-health-report",
  "helm upgrade --install monitoring-stack -f values.yaml",
  "aws ecs update-service --cluster prod --service api",
  "GitHub Actions — build #4281 passed",
  "Prometheus — all targets healthy",
  "ArgoCD — application synced successfully",
  "docker pull nginx:1.25",
]

const typeColors: Record<string, string> = {
  deploy: "#22d3ee",
  info: "#64748b",
  success: "#34d399",
  error: "#ef4444",
}

export function DeploymentFeed() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const initial: FeedEntry[] = deploymentLogs.slice(0, 3).map((log, i) => ({
      id: `init-${i}`,
      message: `${log.service} — ${log.action} [${log.duration}]`,
      type: log.status === "success" ? "deploy" : "info" as FeedEntry["type"],
      timestamp: new Date(log.timestamp).toLocaleTimeString(),
    }))
    setEntries(initial)

    const interval = setInterval(() => {
      if (paused) return
      const types: FeedEntry["type"][] = ["deploy", "info", "success", "error"]
      const msg = statusMessages[Math.floor(Math.random() * statusMessages.length)]
      const entry: FeedEntry = {
        id: Math.random().toString(36).slice(2),
        message: msg,
        type: types[Math.floor(Math.random() * types.length)],
        timestamp: new Date().toLocaleTimeString(),
      }
      setEntries((prev) => [entry, ...prev].slice(0, 20))
    }, 4000)

    return () => clearInterval(interval)
  }, [paused])

  return (
    <div
      className="rounded-lg border font-mono"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>deployment-logs (mock)</span>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className="rounded px-2 py-0.5 text-[10px] transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)" }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)" }}
          aria-label={paused ? "Resume live feed" : "Pause live feed"}
        >
          {paused ? "▶ Resume" : "❚❚ Pause"}
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto p-2" role="log" aria-label="Deployment log feed" aria-live="polite">
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2 px-2 py-1 text-[11px]"
            >
              <span className="shrink-0" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                [{entry.timestamp}]
              </span>
              <span className="shrink-0" style={{ color: typeColors[entry.type] }}>
                {entry.type === "error" && <XCircle className="inline h-3 w-3" />}
                {entry.type !== "error" && <CheckCircle className="inline h-3 w-3" />}
              </span>
              <span className="truncate" style={{ color: "var(--text-muted)" }}>
                {entry.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}