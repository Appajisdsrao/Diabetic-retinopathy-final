"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fragment } from "react"

const confusionMatrixData = {
  "Random Forest": [
    [952, 32, 12, 3, 1],
    [41, 873, 65, 18, 3],
    [15, 58, 897, 27, 3],
    [5, 12, 31, 942, 10],
    [2, 4, 8, 15, 971],
  ],
  SVM: [
    [943, 38, 14, 4, 1],
    [45, 865, 68, 19, 3],
    [18, 62, 889, 28, 3],
    [6, 15, 35, 933, 11],
    [3, 5, 9, 18, 965],
  ],
  "Logistic Regression": [
    [921, 48, 22, 7, 2],
    [52, 842, 78, 24, 4],
    [25, 73, 868, 30, 4],
    [9, 21, 42, 915, 13],
    [5, 8, 12, 22, 953],
  ],
}

const classLabels = ["Normal (0)", "Mild (1)", "Moderate (2)", "Severe (3)", "Proliferative (4)"]

export default function ConfusionMatrix() {
  const [selectedModel, setSelectedModel] = useState("Random Forest")

  const getCellColor = (value: number, rowIndex: number, colIndex: number) => {
    if (rowIndex === colIndex) {
      const intensity = Math.min(255, Math.floor(value / 10) * 10)
      return `rgba(16, 185, 129, ${intensity / 1000})`
    } else {
      const intensity = Math.min(255, Math.floor(value / 5) * 10)
      return `rgba(239, 68, 68, ${intensity / 1000})`
    }
  }

  const calculateMetrics = (matrix: number[][]) => {
    const metrics = {
      accuracy: 0,
      precision: Array(5).fill(0),
      recall: Array(5).fill(0),
      f1: Array(5).fill(0),
    }

    const total = matrix.reduce((sum, row) => sum + row.reduce((s, cell) => s + cell, 0), 0)
    const diagonalSum = matrix.reduce((sum, row, i) => sum + row[i], 0)

    metrics.accuracy = diagonalSum / total

    for (let i = 0; i < 5; i++) {
      const colSum = matrix.reduce((sum, row) => sum + row[i], 0)
      metrics.precision[i] = matrix[i][i] / colSum

      const rowSum = matrix[i].reduce((sum, cell) => sum + cell, 0)
      metrics.recall[i] = matrix[i][i] / rowSum

      metrics.f1[i] = (2 * (metrics.precision[i] * metrics.recall[i])) / (metrics.precision[i] + metrics.recall[i])
    }

    return metrics
  }

  const metrics = calculateMetrics(confusionMatrixData[selectedModel as keyof typeof confusionMatrixData])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Confusion Matrix</CardTitle>
              <CardDescription>Visualization of prediction errors for each class</CardDescription>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Random Forest">Random Forest</SelectItem>
                  <SelectItem value="SVM">SVM</SelectItem>
                  <SelectItem value="Logistic Regression">Logistic Regression</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1">
                {/* Header row */}
                <div className="flex h-12 items-center justify-center font-medium">Actual ↓ / Predicted →</div>
                {classLabels.map((label, index) => (
                  <div
                    key={`header-${index}`}
                    className="flex h-12 items-center justify-center bg-gray-100 font-medium"
                  >
                    {label}
                  </div>
                ))}

                {/* Matrix rows */}
                {confusionMatrixData[selectedModel as keyof typeof confusionMatrixData].map((row, rowIndex) => (
                  <Fragment key={`row-${rowIndex}`}>
                    <div
                      className="flex h-12 items-center justify-center bg-gray-100 font-medium"
                    >
                      {classLabels[rowIndex]}
                    </div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="flex h-12 items-center justify-center text-sm font-medium"
                        style={{
                          backgroundColor: getCellColor(cell, rowIndex, colIndex),
                          color: rowIndex === colIndex ? "rgb(6, 95, 70)" : "rgb(153, 27, 27)",
                        }}
                      >
                        {cell}
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>The confusion matrix shows the count of predictions for each class.</p>
            <p>Diagonal cells (green) represent correct predictions, while off-diagonal cells (red) represent errors.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Class-wise Metrics</CardTitle>
          <CardDescription>Detailed performance metrics for each class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Class</th>
                  <th className="px-4 py-2 text-center font-medium">Precision</th>
                  <th className="px-4 py-2 text-center font-medium">Recall</th>
                  <th className="px-4 py-2 text-center font-medium">F1 Score</th>
                </tr>
              </thead>
              <tbody>
                {classLabels.map((label, index) => (
                  <tr key={`metrics-${index}`} className="border-b">
                    <td className="px-4 py-3 font-medium">{label}</td>
                    <td className="px-4 py-3 text-center">{(metrics.precision[index] * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center">{(metrics.recall[index] * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center">{(metrics.f1[index] * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-4 py-3">Overall</td>
                  <td className="px-4 py-3 text-center">
                    {((metrics.precision.reduce((a, b) => a + b, 0) / 5) * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {((metrics.recall.reduce((a, b) => a + b, 0) / 5) * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {((metrics.f1.reduce((a, b) => a + b, 0) / 5) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4 rounded-lg border p-4">
            <h3 className="text-sm font-medium">Interpretation</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p><span className="font-medium">Precision:</span> The percentage of positive predictions that are correct. High precision means few false positives.</p>
              <p><span className="font-medium">Recall:</span> The percentage of actual positives that are correctly identified. High recall means few false negatives.</p>
              <p><span className="font-medium">F1 Score:</span> The harmonic mean of precision and recall. A good balance between precision and recall.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
