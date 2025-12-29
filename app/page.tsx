"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendChart } from "@/components/trend-chart"
import { PredictionCard } from "@/components/prediction-card"
import { ResultModal } from "@/components/result-modal"
import { StatsGrid } from "@/components/stats-grid"
import { HistoryTable } from "@/components/history-table"
import { LandingPage } from "@/components/landing-page"

interface Prediction {
  period: string
  pick: string
  confidence: number
  reason: string
}

interface HistoryItem {
  issueNumber: string
  number: number
  result?: string
}

export default function Home() {
  const [isAppStarted, setIsAppStarted] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [nextPeriod, setNextPeriod] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [resultType, setResultType] = useState<"WIN" | "LOSS">("WIN")
  const [resultPeriod, setResultPeriod] = useState("")

  const enterApp = () => {
    setIsAppStarted(true)
    fetchHistory()
  }

  const getProps = (n: number) => {
    return {
      size: n >= 5 ? "Big" : "Small",
      color: [0, 5].includes(n) ? "Violet" : [1, 3, 7, 9].includes(n) ? "Green" : "Red",
    }
  }

  const analyzeStrategy = (items: HistoryItem[]) => {
    if (items.length < 5) return null
    const sizes = items.map((h) => getProps(h.number || h.result || 0).size)

    let pred = sizes[0]
    let reason = "Trend Flow"
    let conf = 55

    if (sizes[0] === sizes[1] && sizes[2] === sizes[3] && sizes[1] !== sizes[2]) {
      pred = sizes[0] === "Big" ? "Small" : "Big"
      reason = "AABB Pattern"
      conf = 80
    } else if (sizes[0] === sizes[1] && sizes[1] === sizes[2]) {
      pred = sizes[0] === "Big" ? "Small" : "Big"
      reason = "Triple Reverse"
      conf = 70
    }

    return { size: pred, reason, conf }
  }

  const fetchHistory = async () => {
    try {
      const ts = Date.now()
      const url = `https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json?ts=${ts}&page=1&pageSize=30`
      const res = await fetch(url)
      const json = await res.json()

      let list: HistoryItem[] = []
      if (json.data && json.data.list) list = json.data.list
      else if (Array.isArray(json.data)) list = json.data
      if (!list.length) return

      const latestItem = list[0]
      const latestIssue = String(latestItem.issueNumber)
      const latestSize = getProps(latestItem.number || latestItem.result || 0).size

      const lastProcessed = localStorage.getItem("last_processed_popup")
      const storedPred = localStorage.getItem("ai_active_pred")

      if (latestIssue !== lastProcessed) {
        if (storedPred) {
          const parsedPred = JSON.parse(storedPred)
          if (String(parsedPred.period) === latestIssue) {
            const isWin = parsedPred.pick === latestSize
            if (isWin) {
              setWins((w) => w + 1)
            } else {
              setLosses((l) => l + 1)
            }
            setResultType(isWin ? "WIN" : "LOSS")
            setResultPeriod(latestIssue)
            setShowResult(true)
            localStorage.setItem("last_processed_popup", latestIssue)
          }
        }
      }

      const nextIssue = (BigInt(latestIssue) + 1n).toString()
      setNextPeriod(nextIssue.slice(-4))

      const strategy = analyzeStrategy(list)
      if (strategy) {
        setPrediction({
          period: nextIssue,
          pick: strategy.size,
          confidence: strategy.conf,
          reason: strategy.reason,
        })

        const currentStored = localStorage.getItem("ai_active_pred")
        if (!currentStored || JSON.parse(currentStored).period !== nextIssue) {
          localStorage.setItem("ai_active_pred", JSON.stringify({ period: nextIssue, pick: strategy.size }))
        }
      }

      setHistory(list)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (isAppStarted) {
      const interval = setInterval(fetchHistory, 2000)
      return () => clearInterval(interval)
    }
  }, [isAppStarted])

  if (!isAppStarted) {
    return <LandingPage onEnter={enterApp} />
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">VIP Signal V3</h1>
            <p className="text-muted-foreground">Advanced AI Prediction Engine</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Next Period</div>
            <div className="text-3xl font-bold text-accent">{nextPeriod}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid wins={wins} losses={losses} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Prediction Card */}
          <div className="lg:col-span-2">
            {prediction && <PredictionCard prediction={prediction} nextPeriod={nextPeriod} />}
          </div>

          {/* Performance Metrics */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <h3 className="text-lg font-semibold text-foreground">Performance</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Win Rate</div>
                <div className="text-2xl font-bold text-foreground">
                  {wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0}%
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/50 transition-all duration-500"
                  style={{ width: wins + losses > 0 ? `${(wins / (wins + losses)) * 100}%` : "0%" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Plays</div>
                  <div className="text-xl font-bold text-foreground">{wins + losses}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Streak</div>
                  <div className="text-xl font-bold text-accent">+{wins}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <div className="mb-8">
          <TrendChart history={history} />
        </div>

        {/* History Table */}
        <div>
          <HistoryTable history={history} getProps={getProps} />
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal isOpen={showResult} type={resultType} period={resultPeriod} onClose={() => setShowResult(false)} />
    </div>
  )
}
