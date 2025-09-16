
"use client"

import { useState } from "react"
import {
  Search,
  PlusCircle,
  User,
  FileText,
  ClipboardList,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { students } from "@/lib/data"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images.json"
import { Separator } from "@/components/ui/separator"

type Student = typeof students[0]

export default function CreateCasePage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [searched, setSearched] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  
  const searchResults = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm)
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    if(searchResults.length === 1) {
        handleSelectStudent(searchResults[0])
    }
  }

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
  }
  
  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic to create a case would go here
    toast({
        title: "Case Created",
        description: `New case for ${selectedStudent?.name} has been successfully created.`
    })
    // Reset state
    setSelectedStudent(null)
    setSearchTerm("")
    setSearched(false)
  }
  
  const resetSearch = () => {
    setSelectedStudent(null)
    setSearchTerm("")
    setSearched(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Case</CardTitle>
        <CardDescription>
          Search for a student by NIS or name to begin creating a new counseling case.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!selectedStudent ? (
          <>
            <form onSubmit={handleSearch}>
              <div className="flex w-full max-w-lg items-center space-x-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by NIS or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button type="submit">Search Student</Button>
              </div>
            </form>
            {searched && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">Search Results</h3>
                <Separator className="my-2" />
                <div className="grid gap-4 mt-4">
                  {searchResults.length > 0 ? (
                    searchResults.map((student) => {
                      const avatar = placeholderImages.find(
                        (p) => p.id === student.avatarId
                      )
                      return (
                        <div
                          key={student.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-4">
                            {avatar && (
                              <Avatar>
                                <AvatarImage src={avatar.imageUrl} />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <p className="font-semibold">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                NIS: {student.nis}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleSelectStudent(student)}
                          >
                            Select
                          </Button>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground text-center">
                      No students found matching your search.
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleCreateCase}>
            <div className="grid gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Student Information</h3>
                    <Button variant="outline" size="sm" onClick={resetSearch}>Change Student</Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
                  {(() => {
                    const avatar = placeholderImages.find(p => p.id === selectedStudent.avatarId);
                    return avatar && (
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={avatar.imageUrl} alt={selectedStudent.name} />
                            <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    );
                  })()}
                  <div className="grid gap-1">
                    <p className="font-semibold text-lg">{selectedStudent.name}</p>
                    <p className="text-sm text-muted-foreground">NIS: {selectedStudent.nis}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.class} - {selectedStudent.major}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                 <h3 className="text-lg font-medium">Case Details</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="kode_kasus">
                           <FileText className="inline-block mr-2 h-4 w-4" />
                           Kode Kasus
                        </Label>
                        <Input id="kode_kasus" placeholder="e.g. Academic, Personal" required />
                    </div>
                 </div>

                <div className="grid gap-2">
                  <Label htmlFor="anamnesa">
                    <ClipboardList className="inline-block mr-2 h-4 w-4" />
                    Anamnesa
                  </Label>
                  <Textarea
                    id="anamnesa"
                    placeholder="Initial assessment and background of the case..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                 <div className="grid gap-2">
                  <Label htmlFor="treatment-1">
                     <PlusCircle className="inline-block mr-2 h-4 w-4" />
                     First Treatment
                  </Label>
                   <Textarea
                    id="treatment-1"
                    placeholder="Describe the first treatment or counseling session..."
                    required
                  />
                   <Input id="treatment-date-1" type="date" className="w-full md:w-1/3" defaultValue={new Date().toISOString().substring(0, 10)} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={resetSearch}>Cancel</Button>
                <Button type="submit">Create Case</Button>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
