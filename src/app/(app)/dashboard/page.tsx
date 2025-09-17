
import {
  Activity,
  ArrowUpRight,
  BookUser,
  FolderKanban,
  Users,
} from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import prisma from "@/lib/db"
import { placeholderImages } from "@/lib/placeholder-images"
import WeeklyCasesChart from "./weekly-cases-chart"
import { subDays, format } from "date-fns"

export default async function DashboardPage() {
  const totalStudents = await prisma.student.count();
  const activeCasesCount = await prisma.case.count({ where: { status: 'Active' } });
  const recentCases = await prisma.case.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { student: true }
  });

  const sevenDaysAgo = subDays(new Date(), 7);
  const weeklyCasesData = await prisma.case.groupBy({
    by: ['createdAt'],
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Format data for the chart
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const day = format(date, 'EEE'); // e.g., 'Mon'
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const dayData = weeklyCasesData.find(d => format(new Date(d.createdAt), 'yyyy-MM-dd') === formattedDate);
    
    return {
      day,
      cases: dayData ? dayData._count.id : 0,
    };
  });
  
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Total students in the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Cases
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{activeCasesCount}</div>
            <p className="text-xs text-muted-foreground">
              Total active cases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Treatments</CardTitle>
            <BookUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground">Data not available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases this Month</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground">
              Data not available
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Case Report</CardTitle>
            <CardDescription>
              Number of new cases reported in the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyCasesChart data={chartData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>
                Recently opened student counseling cases.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/cases">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentCases.length > 0 ? recentCases.map(caseItem => {
              const studentAvatar = placeholderImages.find(p => p.id === caseItem.student.avatarId)
              return (
              <div key={caseItem.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={studentAvatar?.imageUrl} alt="Avatar" data-ai-hint="student avatar" />
                  <AvatarFallback>{caseItem.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {caseItem.student.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.kode_kasus}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant={caseItem.status === 'Active' ? 'secondary' : 'default'}>{caseItem.status}</Badge>
                </div>
              </div>
            )}) : (
              <p className="text-sm text-muted-foreground text-center">No recent cases found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
