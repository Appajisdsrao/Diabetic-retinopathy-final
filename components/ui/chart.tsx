"use client"

import type * as React from "react"
import { TooltipContent, TooltipProvider, Tooltip } from "./tooltip"

interface ChartTooltipItemProps {
  name: string
  value: string
  color: string
}

export const ChartTooltipItem: React.FC<ChartTooltipItemProps> = ({ name, value, color }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-medium">{name}:</span>
      <span className="text-sm">{value}</span>
    </div>
  )
}

// Add the missing ChartTooltip component
export const ChartTooltip: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <Tooltip>{children}</Tooltip>
}

interface ChartTooltipContentProps {
  children: React.ReactNode
}

export const ChartTooltipContent: React.FC<{
  children: ({ payload, label }: { payload: any; label: any }) => React.ReactNode
}> = ({ children }) => {
  return (
    <TooltipContent className="w-max rounded border border-primary bg-popover p-2 text-primary-foreground shadow-md outline-none">
      {children}
    </TooltipContent>
  )
}

interface ChartLegendProps {
  className?: string
  items: { name: string; color: string }[]
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ className, items }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {items.map((item) => (
        <div key={item.name} className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  )
}

interface ChartProps {
  children: React.ReactNode
}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return <>{children}</>
}

interface ChartContainerProps {
  children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <TooltipProvider>{children}</TooltipProvider>
}
