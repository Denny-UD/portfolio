"use client"

/**
 * Boot Screen Component
 * Simulated cloud platform boot sequence — entirely client-side animation.
 * No real infrastructure is being initialized.
 * Respects prefers-reduced-motion and is skippable.
 */

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
          role="status"
          aria-label="System booting"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated terminal icon */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <Terminal className="h-12 w-12 text-green-400" aria-hidden="true" />
            </motion.div>

            {/* Boot text */}
            <div className="font-mono text-sm text-green-400/80">
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
                    className={`inline-block h-2 w-2 rounded-full ${
                      i < currentStep
                        ? "bg-green-500"
                        : i === currentStep
                          ? "bg-green-400 animate-pulse"
                          : "bg-slate-700"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={
                      i < currentStep
                        ? "text-green-400"
                        : i === currentStep
                          ? "text-green-300"
                          : "text-slate-600"
                    }
                  >
                    {stage}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Skip button */}
            <button
              onClick={onSkip}
              className="mt-4 flex items-center gap-2 rounded border border-slate-700 px-4 py-2 font-mono text-xs text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
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