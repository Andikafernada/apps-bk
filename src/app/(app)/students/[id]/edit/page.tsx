
"use client"
import { notFound, useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Student } from "@prisma/client"

// This should be a server action in a real app
async function getStudent(id: string): Promise<Student | null> {
  // Mocking server fetch. Replace with actual fetch call.
  // This is a client component, so we can't use Prisma directly.
  // A server action would be the ideal pattern here.
  const res = await fetch(`/api/students/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function StudentEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
      name: '',
      nis: '',
      class: '',
      major: '',
      jenjang: '',
      tahunAjaran: '',
      jenisKelamin: '',
  })

  useEffect(() => {
    // In a real app, you would fetch this data from an API route or server action
    // For now, we'll simulate a fetch. This component cannot be async.
    // This is a placeholder for where the data fetching logic would go.
    // The dummy data approach is removed as requested.
    setIsLoading(false); // Assume loading finished, but no data is loaded.
  }, [params.id])


  if (isLoading) {
    return <div>Loading...</div>
  }

  // Since we can't fetch data in this structure without an API route,
  // we will show a placeholder state. A full implementation requires API routes.
  if (!student && !isLoading) {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Student</CardTitle>
                <CardDescription>Student data could not be loaded. Please implement an API route to fetch student details.</CardDescription>
            </CardHeader>
        </Card>
     )
  }


  const handleSave = (e: React.FormEvent) => {
      e.preventDefault()
      toast({
          title: "Student Updated",
          description: "Student details have been successfully updated."
      })
      router.push(`/students/${params.id}`)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({...prev, [id]: value}))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({...prev, jenisKelamin: value}))
  }

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Edit Student</CardTitle>
                <CardDescription>Update the details for {formData.name}.</CardDescription>
            </Header>
            <CardContent>
                <form onSubmit={handleSave} className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nis">NIS</Label>
                        <Input id="nis" value={formData.nis} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="class">Class</Label>                            <Input id="class" value={formData.class} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="major">Major</Label>
                            <Input id="major" value={formData.major} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="grid gap-2">
                            <Label htmlFor="jenjang">Jenjang</Label>
                            <Input id="jenjang" value={formData.jenjang} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
                            <Input id="tahunAjaran" value={formData.tahunAjaran} onChange={handleChange} />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label>Jenis Kelamin</Label>
                        <RadioGroup defaultValue={formData.jenisKelamin} onValueChange={handleRadioChange} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Laki-laki" id="male" />
                                <Label htmlFor="male">Laki-laki</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Perempuan" id="female" />
                                <Label htmlFor="female">Perempuan</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit">Save Changes</Button>
                        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
