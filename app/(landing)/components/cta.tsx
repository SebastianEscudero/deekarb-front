import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type React from "react"
import { CalendarIcon, ChevronsRight } from "lucide-react"

export default function CTA() {
  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl tracking-tight">
            Insight at a glance,
            <br />
            action at a click
          </h1>
          <p className="text-base max-w-sm text-justify">
            Flourish aims to provide actionable insight into your operations so you don&apos;t have to search for it, and
            intelligence to provide more at a click.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="rounded-2xl p-6">
              See it in action
              <ChevronsRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="p-6 rounded-2xl">
              <CalendarIcon className="h-4 w-4" />
              Book Call
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle className="text-base font-normal">Revenue & Expenses</CardTitle>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Total Income</div>
                <div className="text-2xl font-bold">$ 23,194.80</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Paid</div>
                <div className="text-2xl font-bold">$ 8,145.20</div>
              </div>
            </div>
            <div className="h-[200px] w-full">
              <BarChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BarChart() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-[180px] gap-2">
        {[70, 60, 75, 80, 75, 65, 70].map((height, i) => (
          <div key={i} className="relative flex-1">
            <div className="bg-[#E76F51] rounded-t" style={{ height: `${height}%` }} />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-t" style={{ height: "20%" }} />
          </div>
        ))}
      </div>
    </div>
  )
}