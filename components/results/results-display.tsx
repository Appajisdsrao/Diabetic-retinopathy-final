"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// Mock data for demonstration
const mockResult = {
  id: "1082",
  timestamp: "2025-04-10T14:30:00Z",
  filename: "retinal_scan_1082.jpg",
  prediction: {
    class: 0,
    label: "Normal",
    confidence: 0.92,
    probabilities: [
      { class: 0, label: "Normal", value: 0.92 },
      { class: 1, label: "Mild", value: 0.05 },
      { class: 2, label: "Moderate", value: 0.02 },
      { class: 3, label: "Severe", value: 0.01 },
      { class: 4, label: "Proliferative", value: 0.0 },
    ],
  },
}

export default function ResultsDisplay() {
  const [result, setResult] = useState<typeof mockResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch results
    const fetchResults = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/predict/latest')
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Use mock data for demo
        setResult(mockResult)
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Results</CardTitle>
          <CardDescription>Please wait while we analyze your retinal scan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-center text-sm text-muted-foreground">
            Our AI model is analyzing your retinal scan.
            <br />
            This may take a few moments.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Results Found</CardTitle>
          <CardDescription>We couldn't find any recent scan results</CardDescription>
        </CardHeader>
        <CardContent className="py-6 text-center">
          <p className="mb-4 text-muted-foreground">Please upload a retinal scan image to get started</p>
          <Button asChild>
            <a href="/dashboard/upload">Upload Scan</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get color based on class
  const getSeverityColor = (classValue: number) => {
    switch (classValue) {
      case 0:
        return "green"
      case 1:
        return "yellow"
      case 2:
        return "orange"
      case 3:
        return "red"
      case 4:
        return "purple"
      default:
        return "gray"
    }
  }

  const color = getSeverityColor(result.prediction.class)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Scan Image</CardTitle>
          <CardDescription>
            Retinal scan #{result.id} uploaded on {new Date(result.timestamp).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image src="/placeholder.svg?height=400&width=400" alt="Retinal scan" fill className="object-cover" />
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View Full Size
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>AI-powered detection of retinal blindness severity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="mb-2 text-sm text-muted-foreground">Predicted Severity</div>
            <div className="flex items-center justify-between">
              <div className={`rounded-full bg-${color}-100 px-3 py-1 text-sm font-medium text-${color}-800`}>
                {result.prediction.label} (Level {result.prediction.class})
              </div>
              <div className="text-sm font-medium">{Math.round(result.prediction.confidence * 100)}% Confidence</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium">Probability Distribution</div>

            {result.prediction.probabilities.map((prob) => (
              <div key={prob.class} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>
                    Level {prob.class}: {prob.label}
                  </span>
                  <span>{Math.round(prob.value * 100)}%</span>
                </div>
                <Progress
                  value={prob.value * 100}
                  className={`h-2 bg-${getSeverityColor(prob.class)}-100`}
                  indicatorClassName={`bg-${getSeverityColor(prob.class)}-500`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded border p-4 text-sm">
            <p className="font-medium">Recommendation</p>
            {result.prediction.class <= 1 ? (
              <p className="mt-1 text-muted-foreground">
                No immediate action required. Schedule a follow-up examination in 12 months.
              </p>
            ) : result.prediction.class === 2 ? (
              <p className="mt-1 text-muted-foreground">
                Schedule a follow-up examination within 6 months. Consider consulting with a specialist.
              </p>
            ) : (
              <p className="mt-1 text-muted-foreground">
                Immediate referral to an ophthalmologist is recommended. Prompt treatment may be necessary.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
