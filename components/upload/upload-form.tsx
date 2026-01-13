"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, FileImage, Loader2, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    const file = e.target.files?.[0] || null

    if (!file) {
      setSelectedFile(null)
      setPreview(null)
      return
    }

    // Check file type
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      setError("Please select a JPG or PNG image")
      setSelectedFile(null)
      setPreview(null)
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      setSelectedFile(null)
      setPreview(null)
      return
    }

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!selectedFile) {
      setError("Please select an image to upload")
      return
    }
  
    setIsLoading(true)
    setError("")
  
    try {
      const formData = new FormData()
      formData.append("image", selectedFile)
  
      // 🔍 Send image to Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error("Failed to predict")
      }
  
      const result = await response.json()
  
      console.log("🧠 Prediction:", result.prediction)
      console.log("📈 Probabilities:", result.probabilities)
  
      // ✅ Fetch metrics from backend
      const metricsRes = await fetch("http://127.0.0.1:5000/metrics")
      const metricsData = await metricsRes.json()
      console.log("📊 Metrics:", metricsData)
  
      toast({
        title: `Prediction: ${result.prediction}`,
        description: "Model processed the image. Check console for details.",
      })
  
      // Optionally redirect or show result on same page
      // router.push("/dashboard/results")
  
    } catch (err) {
      console.error("Upload Error:", err)
      setError("Failed to upload image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${
          preview ? "border-gray-300" : "border-gray-300 hover:border-primary"
        }`}
        onClick={!preview ? triggerFileInput : undefined}
        style={{ cursor: !preview ? "pointer" : "default" }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png"
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4 text-center">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Retinal scan preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="text-sm font-medium">{selectedFile?.name}</div>
            <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
              Change Image
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <FileImage className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm font-medium">Click to select or drag and drop</div>
            <div className="text-xs text-muted-foreground">JPG or PNG (max. 10MB)</div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={!selectedFile || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Scan Image
          </>
        )}
      </Button>
    </form>
  )
}
