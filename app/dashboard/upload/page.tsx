import DashboardLayout from "@/components/layout/dashboard-layout"
import UploadForm from "@/components/upload/upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Retinal Scan</h1>
          <p className="text-muted-foreground">Upload a retinal image for analysis and detection</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select a retinal scan image (JPG or PNG) from your device</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Optimal Results</CardTitle>
            <CardDescription>Follow these guidelines to ensure accurate analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>Use high-resolution retinal images for better accuracy</li>
              <li>Ensure the image is properly focused and well-lit</li>
              <li>The retina should be clearly visible in the center of the image</li>
              <li>Avoid images with artifacts, reflections, or blurriness</li>
              <li>Supported formats: JPG and PNG</li>
              <li>Maximum file size: 10MB</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
