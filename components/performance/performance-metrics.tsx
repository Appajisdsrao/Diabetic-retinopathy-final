"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// Mock data for demonstration
const accuracyData = [
  { month: "Jan", accuracy: 0.89, precision: 0.87, recall: 0.85 },
  { month: "Feb", accuracy: 0.9, precision: 0.88, recall: 0.86 },
  { month: "Mar", accuracy: 0.91, precision: 0.89, recall: 0.87 },
  { month: "Apr", accuracy: 0.92, precision: 0.9, recall: 0.89 },
  { month: "May", accuracy: 0.92, precision: 0.91, recall: 0.9 },
  { month: "Jun", accuracy: 0.93, precision: 0.92, recall: 0.91 },
]

export default function PerformanceMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Performance Metrics Over Time</CardTitle>
          <CardDescription>Tracking accuracy, precision, and recall metrics over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0.8, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <Tooltip
                      content={(props) => {
                        if (!props.active || !props.payload) return null
                        return (
                          <div className="rounded border border-primary bg-popover p-2 text-primary-foreground shadow-md">
                            <div className="font-medium">{props.label}</div>
                            {props.payload.map((item: any) => (
                              <div key={item.name} className="flex items-center space-x-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-medium">{item.name}:</span>
                                <span className="text-sm">{`${(Number(item.value) * 100).toFixed(1)}%`}</span>
                              </div>
                            ))}
                          </div>
                        )
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Accuracy"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} name="Precision" />
                    <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={2} name="Recall" />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend
                className="mt-4 justify-center"
                items={[
                  { name: "Accuracy", color: "#3b82f6" },
                  { name: "Precision", color: "#10b981" },
                  { name: "Recall", color: "#f59e0b" },
                ]}
              />
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Performance</CardTitle>
          <CardDescription>Latest metrics for the production model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">92.7%</div>
                <div className="text-sm font-medium text-blue-800">Accuracy</div>
                <div className="mt-1 text-xs text-muted-foreground">Overall correct predictions</div>
              </div>

              <div className="rounded-lg bg-green-50 p-4 text-center">
                <div className="text-3xl font-bold text-green-600">91.5%</div>
                <div className="text-sm font-medium text-green-800">Precision</div>
                <div className="mt-1 text-xs text-muted-foreground">True positives / predicted positives</div>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 text-center">
                <div className="text-3xl font-bold text-amber-600">90.2%</div>
                <div className="text-sm font-medium text-amber-800">Recall</div>
                <div className="mt-1 text-xs text-muted-foreground">True positives / actual positives</div>
              </div>

              <div className="rounded-lg bg-purple-50 p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">90.8%</div>
                <div className="text-sm font-medium text-purple-800">F1 Score</div>
                <div className="mt-1 text-xs text-muted-foreground">Harmonic mean of precision and recall</div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-sm font-medium">Class-wise Performance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Normal (0)</span>
                  <span className="text-xs font-medium">95.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Mild (1)</span>
                  <span className="text-xs font-medium">92.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Moderate (2)</span>
                  <span className="text-xs font-medium">89.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Severe (3)</span>
                  <span className="text-xs font-medium">91.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Proliferative (4)</span>
                  <span className="text-xs font-medium">93.5%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key observations and improvement areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-1 text-sm font-medium text-green-800">Strengths</h3>
              <ul className="list-inside list-disc space-y-1 text-xs text-green-700">
                <li>High accuracy for normal and proliferative cases</li>
                <li>Consistent performance across different demographics</li>
                <li>Low false negative rate for severe cases</li>
                <li>Steady improvement in precision over time</li>
              </ul>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-1 text-sm font-medium text-amber-800">Areas for Improvement</h3>
              <ul className="list-inside list-disc space-y-1 text-xs text-amber-700">
                <li>Moderate cases are sometimes misclassified as mild</li>
                <li>Performance drops slightly with lower quality images</li>
                <li>Recall for mild cases can be improved</li>
                <li>More training data needed for edge cases</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-1 text-sm font-medium">Next Steps</h3>
              <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                <li>Collect more training data for moderate cases</li>
                <li>Implement image quality assessment pre-processing</li>
                <li>Explore ensemble methods to improve overall performance</li>
                <li>Conduct external validation with partner hospitals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
