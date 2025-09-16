
"use client"

import { File as FileIcon } from "lucide-react"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { casesByType, casesByCounselor } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function ReportsPage() {
  const { toast } = useToast()

  const downloadPdf = () => {
    toast({
      title: "Downloading PDF",
      description: "Your report is being generated and will download shortly.",
    })
  }
  
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Visualize and analyze counseling data.
          </p>
        </div>
        <Button onClick={downloadPdf}>
          <FileIcon className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cases by Type</CardTitle>
            <CardDescription>Distribution of cases across different categories.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={casesByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip wrapperClassName="!bg-background !border-border" />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Cases by Counselor</CardTitle>
            <CardDescription>Workload distribution among counselors.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={casesByCounselor}
                  dataKey="count"
                  nameKey="counselor"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="hsl(var(--primary))"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                />
                <Tooltip wrapperClassName="!bg-background !border-border" />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
