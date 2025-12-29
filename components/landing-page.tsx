"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-secondary overflow-hidden flex flex-col items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {/* Logo Circle */}
        <div className="mb-8 inline-flex relative">
          <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full border border-accent/20 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div className="text-4xl">🚀</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-3 text-foreground">
          VIP Signal <span className="text-accent">V3</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 tracking-wide">
          Next Generation AI Prediction Engine
        </p>

        {/* CTA Button */}
        <Button
          onClick={onEnter}
          size="lg"
          className="px-8 py-6 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          Start Engine
          <span className="ml-2">→</span>
        </Button>

        {/* Footer */}
        <div className="mt-16 text-xs text-muted-foreground">
          <p>POWERED BY ADVANCED AI ANALYTICS</p>
          <p className="mt-1 text-accent">Enterprise Edition</p>
        </div>
      </div>
    </div>
  )
}
