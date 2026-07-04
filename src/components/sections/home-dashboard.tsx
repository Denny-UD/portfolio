"use client"

import { motion } from "framer-motion"
import {
  Activity,
  Server,
  Cloud,
  Shield,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { dashboardMetrics } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { DeploymentFeed } from "@/components/layout/deployment-feed"

export function HomeDashboard() {
  return (
    <section id="dashboard" className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Activity className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Infrastructure Dashboard
        </h2>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-green-950/50 px-3 py-1 font-mono text-[10px] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
          >
            {/* Status indicator bar */}
            <div
              className={cn(
                "absolute right-0 top-0 h-full w-1",
                metric.status === "healthy" && "bg-green-500",
                metric.status === "warning" && "bg-yellow-500",
                metric.status === "critical" && "bg-red-500"
              )}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  {metric.label}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold text-slate-100">
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{metric.unit}</span>
                </div>
              </div>

              {/* Trend icon */}
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full",
                  metric.trend === "up" && "bg-green-900/30 text-green-400",
                  metric.trend === "down" && "bg-red-900/30 text-red-400",
                  metric.trend === "stable" && "bg-slate-800 text-slate-400"
                )}
                aria-hidden="true"
              >
                {metric.trend === "up" && <ArrowUp className="h-3.5 w-3.5" />}
                {metric.trend === "down" && <ArrowDown className="h-3.5 w-3.5" />}
                {metric.trend === "stable" && <Minus className="h-3.5 w-3.5" />}
              </div>
            </div>

            <p className="mt-2 font-mono text-[11px] text-slate-600">{metric.details}</p>

            {/* Animated progress glow on hover */}
            <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* System health quick status */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <Server className="h-8 w-8 text-cyan-400" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs text-slate-500">Cloud Platforms</p>
            <p className="font-mono text-sm font-semibold text-slate-200">AWS · Azure</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <Cloud className="h-8 w-8 text-blue-400" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs text-slate-500">Kubernetes Clusters</p>
            <p className="font-mono text-sm font-semibold text-slate-200">EKS · AKS</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <Shield className="h-8 w-8 text-emerald-400" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs text-slate-500">Certifications</p>
            <p className="font-mono text-sm font-semibold text-slate-200">SAA-C03 · AZ-104</p>
          </div>
        </div>
      </div>

      {/* Deployment feed */}
      <DeploymentFeed />
    </section>
  )
}