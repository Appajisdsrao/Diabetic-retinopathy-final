import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Eye, Upload } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Retinal Blindness Detection System</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upload Scan</CardTitle>
              <CardDescription>Upload a retinal image for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-center justify-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <Link href="/dashboard/upload">
                <Button className="mt-2 w-full">Upload Image</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>View Results</CardTitle>
              <CardDescription>Check your recent scan results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-center justify-center">
                <Eye className="h-12 w-12 text-muted-foreground" />
              </div>
              <Link href="/dashboard/results">
                <Button className="mt-2 w-full" variant="outline">
                  View Results
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>View model performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-24 items-center justify-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground" />
              </div>
              <Link href="/dashboard/performance">
                <Button className="mt-2 w-full" variant="outline">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent scans and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Retinal Scan #1082</p>
                  <p className="text-sm text-muted-foreground">Uploaded on April 10, 2025</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Normal (0)
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Retinal Scan #1081</p>
                  <p className="text-sm text-muted-foreground">Uploaded on April 8, 2025</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Mild (1)
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Retinal Scan #1080</p>
                  <p className="text-sm text-muted-foreground">Uploaded on April 5, 2025</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Severe (3)
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
