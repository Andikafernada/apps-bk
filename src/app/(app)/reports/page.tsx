
"use client"

import { File as FileIcon } from "lucide-react"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis, CartesianGrid, Cell } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// This page must be a client component because it uses hooks (useToast)
// and Recharts which is a client-side library.
// In a real app, you would fetch the data via a server action or API route.

export default function ReportsPage() {
  const { toast } = useToast()

  const downloadPdf = () => {
    toast({
      title: "Downloading PDF",
      description: "Your report is being generated and will download shortly.",
    })
  }

  // Data fetching would happen here, e.g., in a useEffect hook calling a server action.
  // For now, we'll continue with empty/placeholder data.
  const casesByType: any[] = [];
  const casesByCounselor: any[] = [];
  
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

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
             {casesByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={casesByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip wrapperClassName="!bg-background !border-border" contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              ) : (
                <div className="flex h-[350px] items-center justify-center">
                  <p className="text-muted-foreground">Case type data is not available yet.</p>
                </div>
              )}
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Cases by Counselor</CardTitle>
            <CardDescription>Workload distribution among counselors.</CardDescription>
          </Header>
          <CardContent>
            {casesByCounselor.length > 0 ? (
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
                >
                    {casesByCounselor.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip wrapperClassName="!bg-background !border-border" contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
             ) : (
                <div className="flex h-[350px] items-center justify-center">
                  <p className="text-muted-foreground">Counselor workload data is not available yet.</p>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
