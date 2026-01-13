import DashboardLayout from "@/components/layout/dashboard-layout"
import PerformanceMetrics from "@/components/performance/performance-metrics"
import ModelComparison from "@/components/performance/model-comparison"
import ConfusionMatrix from "@/components/performance/confusion-matrix"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PerformanceAnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analysis</h1>
          <p className="text-muted-foreground">Detailed metrics and performance analysis of our AI models</p>
        </div>

        <Tabs defaultValue="metrics">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="models">Model Comparison</TabsTrigger>
            <TabsTrigger value="matrix">Confusion Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="mt-6">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <ModelComparison />
          </TabsContent>

          <TabsContent value="matrix" className="mt-6">
            <ConfusionMatrix />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>About Our Models</CardTitle>
            <CardDescription>Understanding the AI models used for retinal blindness detection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our system employs multiple machine learning models trained on a comprehensive dataset of labeled retinal
              images. These models have been optimized to detect and classify diabetic retinopathy with high accuracy.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Training Dataset</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>35,000+ high-resolution retinal images</li>
                  <li>Balanced class distribution</li>
                  <li>Multiple ethnicities and age groups</li>
                  <li>Expert-labeled by ophthalmologists</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Validation Process</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>5-fold cross-validation</li>
                  <li>Independent test set evaluation</li>
                  <li>Regular retraining with new data</li>
                  <li>Continuous performance monitoring</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              The current production model is a Random Forest classifier with an accuracy of 92.7% on the test set. This
              model was selected for its balance of accuracy, interpretability, and computational efficiency.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
