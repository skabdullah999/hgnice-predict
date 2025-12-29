"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TrendChartProps {
  history: Array<{
    issueNumber: string
    number: number
    result?: number
  }>
}

export function TrendChart({ history }: TrendChartProps) {
  const getProps = (n: number) => {
    return {
      size: n >= 5 ? "Big" : "Small",
      color: [0, 5].includes(n) ? "Violet" : [1, 3, 7, 9].includes(n) ? "Green" : "Red",
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-foreground">Trend Analysis</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-32 bg-secondary/30 rounded-xl p-4">
          {history.slice(0, 30).map((item, idx) => {
            const props = getProps(item.number || item.result || 0)
            const height = props.size === "Big" ? 80 : 40
            const color = props.size === "Big" ? "bg-yellow-500" : "bg-blue-500"
            return (
              <div
                key={idx}
                className={`flex-1 rounded-md transition-all hover:opacity-80 cursor-pointer ${color} opacity-70 hover:opacity-100`}
                style={{ height: `${height}%` }}
                title={`${item.issueNumber}: ${props.size}`}
              />
            )
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Latest 30 Periods</span>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500" />
              <span>Big</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span>Small</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
