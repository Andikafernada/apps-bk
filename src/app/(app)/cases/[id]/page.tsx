
import { notFound } from "next/navigation"
import { cases, students, users } from "@/lib/data"
import { placeholderImages } from "@/lib/placeholder-images.json"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar as CalendarIcon, User } from "lucide-react"
import Link from "next/link"

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
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                         {studentAvatar && (
                            <Image
                            alt="Student avatar"
                            className="aspect-square rounded-md object-cover"
                            height="80"
                            src={studentAvatar.imageUrl}
                            width="80"
                            data-ai-hint={studentAvatar.imageHint}
                            />
                        )}
                        <div className="grid gap-1">
                            <p className="text-xl font-semibold">{student?.name}</p>
                            <p className="text-sm text-muted-foreground">NIS: {student?.nis}</p>
                            <p className="text-sm text-muted-foreground">{student?.class} - {student?.major}</p>
                            <p className="text-sm text-muted-foreground">{student?.jenjang} | {student?.tahunAjaran} | {student?.jenisKelamin}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-semibold">Case ID: {caseItem.id}</div>
                        <Badge variant={caseItem.status === 'Active' ? 'secondary' : caseItem.status === 'Closed' ? 'outline' : 'default'}>{caseItem.status}</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1">
                        <p className="font-semibold">Case Type</p>
                        <p>{caseItem.kode_kasus}</p>
                    </div>
                     <div className="grid gap-1">
                        <p className="font-semibold">Counselor</p>
                        <div className="flex items-center gap-2">
                            {counselorAvatar && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={counselorAvatar.imageUrl} alt="Counselor Avatar" data-ai-hint={counselorAvatar.imageHint} />
                                    <AvatarFallback>{counselor?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <p>{caseItem.counselorName}</p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2">
                    <p className="font-semibold">Anamnesa</p>
                    <p className="text-sm text-muted-foreground bg-slate-50 p-4 rounded-md border">{caseItem.anamnesa}</p>
                </div>
                
            </CardContent>
        </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Treatment History</CardTitle>
                 <Button size="sm" className="h-8 gap-1" asChild>
                    <Link href="#">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Treatment
                        </span>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="grid gap-6">
                {caseItem.treatments.length > 0 ? (
                    caseItem.treatments.map((treatment, index) => (
                        <div key={treatment.id} className="grid gap-2">
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2 font-semibold">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm">{index + 1}</div>
                                    Meeting #{index + 1}
                               </div>
                               <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                                   <CalendarIcon className="h-4 w-4" />
                                   <span>{treatment.tanggal_pertemuan}</span>
                               </div>
                            </div>
                            <p className="text-sm text-muted-foreground border rounded-md p-4 ml-12">{treatment.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">No treatments have been added yet.</p>
                )}
            </CardContent>
        </Card>
    </div>
  )
}
