"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ResultModalProps {
  isOpen: boolean
  type: "WIN" | "LOSS"
  period: string
  onClose: () => void
}

export function ResultModal({ isOpen, type, period, onClose }: ResultModalProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAnimate(true)
    } else {
      setAnimate(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const isWin = type === "WIN"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative bg-card border border-border rounded-2xl p-8 max-w-sm w-full mx-4 transition-all duration-500 ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div
            className={`inline-block w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 ${
              isWin ? "bg-green-500/20" : "bg-red-500/20"
            }`}
          >
            {isWin ? "✓" : "✗"}
          </div>

          {/* Title */}
          <h2 className={`text-4xl font-bold mb-2 ${isWin ? "text-green-500" : "text-red-500"}`}>
            {isWin ? "WINNER" : "LOSS"}
          </h2>

          {/* Period */}
          <p className="text-sm text-muted-foreground mb-6">
            Period <span className="font-semibold text-foreground">{period}</span>
          </p>

          {/* Stats */}
          <div className="bg-secondary/30 rounded-xl p-4 mb-6 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Result</p>
            <p className="text-2xl font-bold text-accent">{isWin ? "+1 Win" : "-1 Loss"}</p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold"
          >
            Next Round
          </Button>
        </div>
      </div>
    </div>
  )
}
