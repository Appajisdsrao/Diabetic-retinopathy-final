"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const modelComparisonData = [
  { name: "Random Forest", accuracy: 0.927, precision: 0.915, recall: 0.902, f1: 0.908, time: 120 },
  { name: "SVM", accuracy: 0.913, precision: 0.905, recall: 0.897, f1: 0.901, time: 180 },
  { name: "Logistic Regression", accuracy: 0.885, precision: 0.872, recall: 0.868, f1: 0.87, time: 60 },
  { name: "KNN", accuracy: 0.872, precision: 0.865, recall: 0.858, f1: 0.861, time: 90 },
  { name: "Decision Tree", accuracy: 0.856, precision: 0.842, recall: 0.838, f1: 0.84, time: 45 },
]

const metricColors = {
  accuracy: "#3b82f6",
  precision: "#10b981",
  recall: "#f59e0b",
  f1: "#8b5cf6",
  time: "#ef4444",
}

export default function ModelComparison() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Comparison</CardTitle>
          <CardDescription>Performance comparison across different machine learning models</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accuracy">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="precision">Precision</TabsTrigger>
              <TabsTrigger value="recall">Recall</TabsTrigger>
              <TabsTrigger value="f1">F1 Score</TabsTrigger>
              <TabsTrigger value="time">Inference Time</TabsTrigger>
            </TabsList>

            {["accuracy", "precision", "recall", "f1", "time"].map((metric) => (
              <TabsContent key={metric} value={metric} className="mt-4">
                <div className="h-80 w-full">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={modelComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            domain={metric === "time" ? [0, "auto"] : [0.8, 1]}
                            tickFormatter={(value) =>
                              metric === "time" ? `${value}ms` : `${(value * 100).toFixed(0)}%`
                            }
                          />
                          <Tooltip
                            content={(props) => {
                              if (!props.active || !props.payload) return null
                              return (
                                <div className="rounded border border-primary bg-popover p-2 text-primary-foreground shadow-md">
                                  <div className="font-medium">{props.label}</div>
                                  {props.payload.map((item: any) => (
                                    <div key={item.name} className="flex items-center space-x-2">
                                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                      <span className="text-sm font-medium">
                                        {item.name === metric ? metric.charAt(0).toUpperCase() + metric.slice(1) : ""}:
                                      </span>
                                      <span className="text-sm">
                                        {metric === "time"
                                          ? `${item.value}ms`
                                          : `${(Number(item.value) * 100).toFixed(1)}%`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )
                            }}
                          />
                          <Bar dataKey={metric} name={metric.charAt(0).toUpperCase() + metric.slice(1)}>
                            {modelComparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={metricColors[metric as keyof typeof metricColors]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Characteristics</CardTitle>
          <CardDescription>Detailed comparison of model features and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Model</th>
                  <th className="px-4 py-2 text-left font-medium">Accuracy</th>
                  <th className="px-4 py-2 text-left font-medium">Strengths</th>
                  <th className="px-4 py-2 text-left font-medium">Weaknesses</th>
                  <th className="px-4 py-2 text-left font-medium">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Random Forest</td>
                  <td className="px-4 py-3">92.7%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>High accuracy</li>
                      <li>Handles imbalanced data well</li>
                      <li>Robust to outliers</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Slower inference time</li>
                      <li>Large model size</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">Production use</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">SVM</td>
                  <td className="px-4 py-3">91.3%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Good with high-dimensional data</li>
                      <li>Effective with clear margin of separation</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Slow training time</li>
                      <li>Sensitive to kernel choice</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">Complex cases</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Logistic Regression</td>
                  <td className="px-4 py-3">88.5%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Fast training and inference</li>
                      <li>Highly interpretable</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Lower accuracy</li>
                      <li>Assumes linear relationships</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">Baseline model</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">KNN</td>
                  <td className="px-4 py-3">87.2%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Simple implementation</li>
                      <li>No training phase</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Slow for large datasets</li>
                      <li>Sensitive to irrelevant features</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">Small datasets</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Decision Tree</td>
                  <td className="px-4 py-3">85.6%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Highly interpretable</li>
                      <li>Fast inference</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Prone to overfitting</li>
                      <li>Lower accuracy</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">Explainable AI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
