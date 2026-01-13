import LoginForm from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <div className="rounded-full bg-primary/10 p-3">
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
