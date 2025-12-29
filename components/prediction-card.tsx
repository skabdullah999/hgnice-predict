"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface PredictionCardProps {
  prediction: {
    period: string
    pick: string
    confidence: number
    reason: string
  }
  nextPeriod: string
}

export function PredictionCard({ prediction, nextPeriod }: PredictionCardProps) {
  const isBig = prediction.pick === "Big"
  const confColor =
    prediction.confidence > 70 ? "from-green-500" : prediction.confidence > 55 ? "from-yellow-500" : "from-orange-500"

  return (
    <Card className="bg-gradient-to-br from-card via-card to-secondary border-border overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">AI Prediction</h2>
          <div className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground">Period {nextPeriod}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Prediction */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-6 rounded-2xl border transition-all ${isBig ? "bg-yellow-500/10 border-yellow-500/30" : "bg-blue-500/10 border-blue-500/30"}`}
          >
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Prediction</div>
            <div className={`text-5xl font-black ${isBig ? "text-yellow-400" : "text-blue-400"}`}>
              {prediction.pick}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-secondary bg-secondary/30">
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Strategy</div>
            <div className="text-sm font-semibold text-foreground truncate">{prediction.reason}</div>
            <div className="mt-3 inline-block px-2 py-1 rounded text-xs font-mono bg-background text-accent">
              {prediction.confidence}%
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Confidence Level</label>
            <span className="text-lg font-bold text-accent">{prediction.confidence}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${confColor} to-accent/50 transition-all duration-1000 rounded-full`}
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {prediction.confidence > 70
              ? "High Confidence"
              : prediction.confidence > 55
                ? "Medium Confidence"
                : "Low Confidence"}
          </div>
        </div>

        {/* Status */}
        <div className="p-4 bg-background rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">
              System Active • Next update in <span className="text-foreground font-semibold">2s</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
