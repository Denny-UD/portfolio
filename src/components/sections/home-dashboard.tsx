"use client"

import { motion } from "framer-motion"
import { Activity, Server, Cloud, Shield, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { dashboardMetrics } from "@/data/mock-data"
import { DeploymentFeed } from "@/components/layout/deployment-feed"

export function HomeDashboard() {
  return (
    <section id="dashboard" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <Activity className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Infrastructure Dashboard
        </h2>
        <span
          className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px]"
          style={{
            backgroundColor: "rgba(0, 107, 60, 0.15)",
            color: "var(--accent-light)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative overflow-hidden rounded-lg border p-4 transition-colors"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="absolute right-0 top-0 h-full w-1"
              style={{
                backgroundColor:
                  metric.status === "healthy"
                    ? "var(--accent)"
                    : metric.status === "warning"
                      ? "#f59e0b"
                      : "#ef4444",
              }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {metric.label}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {metric.unit}
                  </span>
                </div>
              </div>

              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: metric.trend === "up"
                    ? "rgba(0, 107, 60, 0.2)"
                    : metric.trend === "down"
                      ? "rgba(239, 68, 68, 0.1)"
                      : "var(--bg-elevated)",
                  color: metric.trend === "up"
                    ? "var(--accent-light)"
                    : metric.trend === "down"
                      ? "#ef4444"
                      : "var(--text-muted)",
                }}
                aria-hidden="true"
              >
                {metric.trend === "up" && <ArrowUp className="h-3.5 w-3.5" />}
                {metric.trend === "down" && <ArrowDown className="h-3.5 w-3.5" />}
                {metric.trend === "stable" && <Minus className="h-3.5 w-3.5" />}
              </div>
            </div>

            <p className="mt-2 font-mono text-[11px]" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              {metric.details}
            </p>
          </motion.div>
        ))}
      </div>

      {/* System health quick status */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Server, label: "Cloud Platforms", value: "AWS · Azure", color: "#22d3ee" },
          { icon: Cloud, label: "Kubernetes Clusters", value: "EKS · AKS", color: "#3b82f6" },
          { icon: Shield, label: "Certifications", value: "SAA-C03 · AZ-104", color: "var(--accent-light)" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg border p-4"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
          >
            <item.icon className="h-8 w-8" style={{ color: item.color }} aria-hidden="true" />
            <div>
              <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <DeploymentFeed />
    </section>
  )
}