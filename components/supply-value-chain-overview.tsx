"use client"

import * as React from "react"
import { Truck, Factory, Package, Users, Recycle, AlertTriangle, Trash2 } from 'lucide-react';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function SupplyValueChainOverview() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const steps = [
    { icon: <Package className="w-10 h-10 text-blue-900" />, title: 'Product design', value: '-', subtitle: 'In Progress' },
    { icon: <Users className="w-10 h-10 text-blue-900" />, title: 'Suppliers', value: '2.4K', subtitle: 'Materials' },
    { icon: <AlertTriangle className="w-10 h-10 text-blue-900" />, title: 'Material Procurement', value: '-', subtitle: 'Slower delay' },
    { icon: <Factory className="w-10 h-10 text-blue-900" />, title: 'Production', value: '5.7K', subtitle: 'Current Ink' },
    { icon: <Truck className="w-10 h-10 text-blue-900" />, title: 'Distribution', value: '2.5K', subtitle: 'In-stack' },
  ];

  const lower_steps = [
    { icon: <Recycle className="w-10 h-10 text-blue-900" />, title: 'Recycling', value: '1.6K', subtitle: 'units' },
    { icon: <Package className="w-10 h-10 text-blue-900" />, title: 'Collection', value: '800', subtitle: 'units' },
    { icon: <Factory className="w-10 h-10 text-blue-900" />, title: 'Use Phase', value: '100', subtitle: 'units' },
  ];

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Material Flow</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block text-gray-500" >
            Last updated on 22 Oct 2025
          </span>
        </CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="flex flex-col items-center w-full px-6 py-8 relative">
        {/* Main process row */}
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-10 lg:gap-x-18 xl:gap-x-22 relative">
            {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 shadow-sm min-w-[160px]">
                {step.icon}
                <h3 className="text-sm font-semibold mt-3 text-blue-900">{step.title}</h3>
                {step.value && <p className="text-lg font-bold text-blue-800">{step.value}</p>}
                {step.subtitle && <p className="text-xs text-gray-500">{step.subtitle}</p>}
                </div>
                {index < steps.length -1 && (
                 <svg
                className="absolute top-1/2 right-[-40px] lg:right-[-60px] xl:right-[-80px] w-20 lg:w-16 xl:w-18 h-4 text-blue-300"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="5"
                  y1="5"
                  x2="95"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
     
                )}
            </div>
            ))}
        </div>

        <div className="flex flex-wrap items-center gap-y-40">
            &nbsp;
        </div>
    {/* Middle process row */}
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-10 lg:gap-x-18 xl:gap-x-22 relative">
            {lower_steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 shadow-sm min-w-[160px]">
                {step.icon}
                <h3 className="text-sm font-semibold mt-3 text-blue-900">{step.title}</h3>
                {step.value && <p className="text-lg font-bold text-blue-800">{step.value}</p>}
                {step.subtitle && <p className="text-xs text-gray-500">{step.subtitle}</p>}
                </div>
                {index < lower_steps.length -1 && (
                 <svg
                className="absolute top-1/2 right-[-40px] lg:right-[-60px] xl:right-[-80px] w-20 lg:w-16 xl:w-18 h-4 text-blue-300"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="95"
                  y1="5"
                  x2="5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
     
                )}
            </div>
            ))}
        </div>
        <div className="flex flex-wrap items-center gap-y-40">
            &nbsp;
        </div>
        {/* Lower circular flow */}
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-50 lg:gap-x-18 xl:gap-x-20 relative">
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 shadow-sm min-w-[160px]"> 
            <Trash2 className="w-10 h-10 text-blue-900" />
            <h3 className="text-sm font-semibold mt-2 text-blue-900">Waste</h3>
            <p className="text-sm text-blue-800 font-bold">100</p>
            <p className="text-xs text-gray-500">units</p>
            </div>

               
            <svg
                className="absolute top-1/2 right-[-40px] lg:right-[-60px] xl:right-[-80px] w-20 lg:w-16 xl:w-18 h-4 text-blue-300"
                viewBox="0 0 100 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="95"
                  y1="20"
                  x2="95"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                
                <line
                  x1="95"
                  y1="5"
                  x2="5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
     
               
        </div>
            </div>
      </CardContent>
    </Card>
  )
}
