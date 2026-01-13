import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Eye className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">Retinal Blindness Detection</h1>
        <p className="mb-8 text-gray-600">
          Advanced AI-powered tool for early detection and classification of retinal blindness severity
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to access the retinal blindness detection system</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Secure, accurate, and efficient retinal analysis
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
