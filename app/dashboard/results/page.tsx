import DashboardLayout from "@/components/layout/dashboard-layout"
import ResultsDisplay from "@/components/results/results-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResultsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scan Results</h1>
          <p className="text-muted-foreground">View the analysis results of your retinal scan</p>
        </div>

        <ResultsDisplay />

        <Card>
          <CardHeader>
            <CardTitle>Understanding the Results</CardTitle>
            <CardDescription>Learn how to interpret the severity classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <div className="mb-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 inline-block">
                    Level 0
                  </div>
                  <h3 className="font-medium">Normal</h3>
                  <p className="text-xs text-muted-foreground">No signs of diabetic retinopathy</p>
                </div>

                <div className="rounded-lg bg-yellow-50 p-4 text-center">
                  <div className="mb-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 inline-block">
                    Level 1
                  </div>
                  <h3 className="font-medium">Mild</h3>
                  <p className="text-xs text-muted-foreground">Microaneurysms only</p>
                </div>

                <div className="rounded-lg bg-orange-50 p-4 text-center">
                  <div className="mb-2 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 inline-block">
                    Level 2
                  </div>
                  <h3 className="font-medium">Moderate</h3>
                  <p className="text-xs text-muted-foreground">More than microaneurysms but less than severe</p>
                </div>

                <div className="rounded-lg bg-red-50 p-4 text-center">
                  <div className="mb-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 inline-block">
                    Level 3
                  </div>
                  <h3 className="font-medium">Severe</h3>
                  <p className="text-xs text-muted-foreground">More than 20 hemorrhages in each quadrant</p>
                </div>

                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <div className="mb-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 inline-block">
                    Level 4
                  </div>
                  <h3 className="font-medium">Proliferative</h3>
                  <p className="text-xs text-muted-foreground">
                    Abnormal blood vessel growth and/or vitreous hemorrhage
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  The classification is based on the International Clinical Diabetic Retinopathy Disease Severity Scale.
                  Early detection and treatment can significantly reduce the risk of vision loss.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
