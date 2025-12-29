"use client"

import { Card, CardContent } from "@/components/ui/card"

interface StatsGridProps {
  wins: number
  losses: number
}

export function StatsGrid({ wins, losses }: StatsGridProps) {
  const totalRounds = wins + losses
  const winRate = totalRounds > 0 ? Math.round((wins / totalRounds) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Wins */}
      <Card className="border-border bg-gradient-to-br from-green-500/10 to-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Wins</p>
              <p className="text-4xl font-bold text-green-500">{wins}</p>
            </div>
            <div className="text-3xl opacity-20">✓</div>
          </div>
        </CardContent>
      </Card>

      {/* Losses */}
      <Card className="border-border bg-gradient-to-br from-red-500/10 to-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Losses</p>
              <p className="text-4xl font-bold text-red-500">{losses}</p>
            </div>
            <div className="text-3xl opacity-20">✗</div>
          </div>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card className="border-border bg-gradient-to-br from-accent/10 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Win Rate</p>
              <p className="text-4xl font-bold text-accent">{winRate}%</p>
            </div>
            <div className="text-3xl opacity-20">📊</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
