"use client"

/**
 * Deployment Feed Component
 * Simulated live deployment log feed — entirely client-side.
 * Uses mock data with random timing to simulate "live" activity.
 * No real deployments are being tracked.
 */

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

export function DeploymentFeed() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    // Add initial entries from mock data
    const initial: FeedEntry[] = deploymentLogs.slice(0, 3).map((log, i) => ({
      id: `init-${i}`,
      message: `${log.service} — ${log.action} [${log.duration}]`,
      type: log.status === "success" ? "deploy" : "info",
      timestamp: new Date(log.timestamp).toLocaleTimeString(),
    }))
    setEntries(initial)

    // Simulate live feed
    const interval = setInterval(() => {
      if (paused) return
      const types: FeedEntry["type"][] = ["deploy", "info", "success", "error"]
      const log = deploymentLogs[Math.floor(Math.random() * deploymentLogs.length)]
      const msg = statusMessages[Math.floor(Math.random() * statusMessages.length)]

      const entry: FeedEntry = {
        id: Math.random().toString(36).slice(2),
        message: paused ? "Feed paused" : msg,
        type: types[Math.floor(Math.random() * types.length)],
        timestamp: new Date().toLocaleTimeString(),
      }
      setEntries((prev) => [entry, ...prev].slice(0, 20))
    }, 4000)

    return () => clearInterval(interval)
  }, [paused])

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>deployment-logs (mock)</span>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className="rounded px-2 py-0.5 text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
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
              <span className="shrink-0 text-slate-600">[{entry.timestamp}]</span>
              <span
                className={cn(
                  "shrink-0",
                  entry.type === "deploy" && "text-cyan-400",
                  entry.type === "info" && "text-slate-400",
                  entry.type === "success" && "text-green-400",
                  entry.type === "error" && "text-red-400"
                )}
              >
                {entry.type === "deploy" && <CheckCircle className="inline h-3 w-3" aria-hidden="true" />}
                {entry.type === "info" && <Clock className="inline h-3 w-3" aria-hidden="true" />}
                {entry.type === "success" && <CheckCircle className="inline h-3 w-3" aria-hidden="true" />}
                {entry.type === "error" && <XCircle className="inline h-3 w-3" aria-hidden="true" />}
              </span>
              <span className="text-slate-400 truncate">{entry.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}