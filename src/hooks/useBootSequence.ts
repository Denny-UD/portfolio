"use client"

/**
 * Boot Sequence Hook
 * Simulates a cloud platform boot sequence on first visit.
 * This is entirely client-side animation — no real booting occurs.
 * Respects prefers-reduced-motion and can be skipped.
 */

import { useEffect, useState, useCallback } from "react"

interface BootStep {
  message: string
  duration: number // ms
}

const bootSteps: BootStep[] = [
  { message: "Loading Cloud Platform...", duration: 600 },
  { message: "Loading Kubernetes Cluster...", duration: 500 },
  { message: "Initializing Infrastructure...", duration: 700 },
  { message: "Provisioning Dashboard...", duration: 400 },
  { message: "Cloud Control Center Ready.", duration: 300 },
]

export function useBootSequence() {
  const [booted, setBooted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [bootText, setBootText] = useState("")
  const [visible, setVisible] = useState(true)
  const [skipped, setSkipped] = useState(false)

  const skip = useCallback(() => {
    setSkipped(true)
    setVisible(false)
    setBooted(true)
  }, [])

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hasBooted = sessionStorage.getItem("booted") === "true"

    if (hasBooted || prefersReduced) {
      setBootText("Cloud Control Center Ready.")
      setVisible(false)
      setBooted(true)
      return
    }

    let currentIdx = 0
    const runBoot = () => {
      if (currentIdx >= bootSteps.length) {
        sessionStorage.setItem("booted", "true")
        setTimeout(() => {
          setVisible(false)
          setBooted(true)
        }, 200)
        return
      }

      const step = bootSteps[currentIdx]
      setCurrentStep(currentIdx)
      setBootText(step.message)
      currentIdx++
      setTimeout(runBoot, step.duration)
    }

    runBoot()

    return () => {
      currentIdx = bootSteps.length // cleanup
    }
  }, [])

  return { booted, currentStep, bootText, visible, skipped, skip }
}