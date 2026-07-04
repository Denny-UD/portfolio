"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Terminal, SkipForward } from "lucide-react"

interface BootScreenProps {
  bootText: string
  currentStep: number
  visible: boolean
  onSkip: () => void
}

const bootStages = [
  "Loading Cloud Platform...",
  "Loading Kubernetes Cluster...",
  "Initializing Infrastructure...",
  "Provisioning Dashboard...",
  "Cloud Control Center Ready.",
]

export function BootScreen({ bootText, currentStep, visible, onSkip }: BootScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-dark-bg)" }}
          role="status"
          aria-label="System booting"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <Terminal className="h-12 w-12" style={{ color: "var(--accent)" }} aria-hidden="true" />
            </motion.div>

            <div className="font-mono text-sm" style={{ color: "var(--accent)" }}>
              {bootStages.map((stage, i) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: i <= currentStep ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 py-1"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        i < currentStep
                          ? "var(--accent)"
                          : i === currentStep
                            ? "var(--accent-light)"
                            : "var(--border-color)",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      color:
                        i < currentStep
                          ? "var(--accent)"
                          : i === currentStep
                            ? "var(--accent-light)"
                            : "var(--text-muted)",
                    }}
                  >
                    {stage}
                  </span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={onSkip}
              className="mt-4 flex items-center gap-2 rounded border px-4 py-2 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-dark)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="Skip boot sequence"
            >
              <SkipForward className="h-3 w-3" aria-hidden="true" />
              Skip (Space)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}