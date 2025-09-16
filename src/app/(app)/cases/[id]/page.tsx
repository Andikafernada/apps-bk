
import { notFound } from "next/navigation"
import { cases, students, users } from "@/lib/data"
import { placeholderImages } from "@/lib/placeholder-images.json"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  const caseItem = cases.find((c) => c.id === params.id)
  if (!caseItem) {
    notFound()
  }

  const student = students.find(s => s.name === caseItem.studentName)
  const counselor = users.find(u => u.name === caseItem.counselorName)
  
  const studentAvatar = placeholderImages.find(p => p.id === student?.avatarId)
  const counselorAvatar = placeholderImages.find(p => p.id === counselor?.avatarId)

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Case Details - {caseItem.id}</CardTitle>
                        <CardDescription>Detailed information for the student case.</CardDescription>
                    </div>
                    <Badge variant={caseItem.status === 'Active' ? 'secondary' : 'default'}>{caseItem.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    {studentAvatar && (
                        <Image
                        alt="Student avatar"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={studentAvatar.imageUrl}
                        width="64"
                        data-ai-hint={studentAvatar.imageHint}
                        />
                    )}
                    <div>
                        <p className="font-semibold">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">NIS: {student?.nis}</p>
                        <p className="text-sm text-muted-foreground">{student?.class} - {student?.major}</p>
                    </div>
                </div>
                <div className="grid gap-1">
                    <p className="font-semibold">Case Type</p>
                    <p>{caseItem.caseType}</p>
                </div>
                <div className="grid gap-1">
                    <p className="font-semibold">Counselor</p>
                    <div className="flex items-center gap-2">
                        {counselorAvatar && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={counselorAvatar.imageUrl} alt="Counselor Avatar" data-ai-hint={counselorAvatar.imageHint} />
                                <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <p>{caseItem.counselorName}</p>
                    </div>
                </div>
                 <div className="grid gap-1">
                    <p className="font-semibold">Last Meeting</p>
                    <p>{caseItem.lastMeeting}</p>
                </div>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Treatment History</CardTitle>
            </CardHeader>
            <CardContent>
                <p>No treatments have been added yet.</p>
            </CardContent>
        </Card>
    </div>
  )
}
