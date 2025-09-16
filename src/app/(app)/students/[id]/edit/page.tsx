
"use client"
import { notFound, useRouter } from "next/navigation"
import { students } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function StudentEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const student = students.find((s) => s.id === params.id)
  
  const [formData, setFormData] = useState({
      name: student?.name || '',
      nis: student?.nis || '',
      class: student?.class || '',
      major: student?.major || '',
  })

  if (!student) {
    notFound()
  }

  const handleSave = (e: React.FormEvent) => {
      e.preventDefault()
      toast({
          title: "Student Updated",
          description: "Student details have been successfully updated."
      })
      router.push(`/students/${student.id}`)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({...prev, [id]: value}))
  }

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Edit Student</CardTitle>
                <CardDescription>Update the details for {student.name}.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSave} className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={formData.name} onChange={handleChange} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="nis">NIS</Label>
                        <Input id="nis" value={formData.nis} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="class">Class</Label>
                            <Input id="class" value={formData.class} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="major">Major</Label>
                            <Input id="major" value={formData.major} onChange={handleChange} />
                        </div>
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
