"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface HistoryTableProps {
  history: Array<{
    issueNumber: string
    number: number
    result?: number
  }>
  getProps: (n: number) => { size: string; color: string }
}

export function HistoryTable({ history, getProps }: HistoryTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-foreground">History</h3>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Period</th>
                <th className="text-center py-3 px-4 font-semibold">Result</th>
                <th className="text-right py-3 px-4 font-semibold">Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.slice(0, 15).map((item, idx) => {
                const props = getProps(item.number || item.result || 0)
                const issue = String(item.issueNumber).slice(-4)
                return (
                  <tr key={idx} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-mono">{issue}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          props.size === "Big" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {props.size}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{item.number || item.result}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
