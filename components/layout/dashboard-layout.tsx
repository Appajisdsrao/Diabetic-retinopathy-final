"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, Eye, Home, LogOut, Menu, Upload, User, X } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // In a real app, call logout API endpoint
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Upload Scan", href: "/dashboard/upload", icon: Upload },
    { name: "Results", href: "/dashboard/results", icon: Eye },
    { name: "Performance", href: "/dashboard/performance", icon: BarChart3 },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b px-4 py-5">
            <div className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Retinal AI</span>
            </div>
            <button
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-600"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="border-t p-4">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Dr. John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <span className="text-lg font-semibold md:hidden">Retinal AI</span>
            </div>
            <div className="flex items-center">{/* Header actions can go here */}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
