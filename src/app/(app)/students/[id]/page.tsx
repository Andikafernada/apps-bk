
import { notFound } from "next/navigation"
import { placeholderImages } from "@/lib/placeholder-images"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"
import prisma from "@/lib/db"
import { format } from "date-fns"

export default async function StudentDetailsPage({ params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      cases: {
        include: {
          counselor: true,
        },
        orderBy: {
          lastMeeting: 'desc'
        }
      }
    }
  })

  if (!student) {
    notFound()
  }

  const { cases: studentCases } = student;
  const avatar = placeholderImages.find(p => p.id === student.avatarId)

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                     {avatar && (
                        <Image
                        alt="Student avatar"
                        className="aspect-square rounded-full object-cover"
                        height="80"
                        src={avatar.imageUrl}
                        width="80"
                        data-ai-hint={avatar.imageHint}
                        />
                    )}
                    <div>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription>
                            NIS: {student.nis} | {student.class} - {student.major}
                            <br />
                            {student.jenjang} | {student.tahunAjaran} | {student.jenisKelamin}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Case History</CardTitle>
                 <CardDescription>All counseling cases related to {student.name}.</CardDescription>
            </Header>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Case Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Counselor</TableHead>
                            <TableHead>Last Meeting</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {studentCases.length > 0 ? studentCases.map((caseItem) => (
                          <TableRow key={caseItem.id}>
                            <TableCell>
                                <Link href={`/cases/${caseItem.id}`} className="font-medium hover:underline">
                                    {caseItem.kode_kasus}
                                </Link>
                            </TableCell>
                            <TableCell>
                               <Badge variant={caseItem.status === 'Active' ? 'secondary' : 'default'}>
                                    {caseItem.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{caseItem.counselor.name}</TableCell>
                            <TableCell>{format(new Date(caseItem.lastMeeting), "PPP")}</TableCell>
                          </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No cases found for this student.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
