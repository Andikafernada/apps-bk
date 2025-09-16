
"use client"

import { useState } from "react"
import {
  Search,
  PlusCircle,
  FileText,
  ClipboardList,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images.json"
import { Separator } from "@/components/ui/separator"
import type { Student } from "@prisma/client"
import { searchStudents, createCase } from "./actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  studentId: z.string().min(1, "Please select a student."),
  kode_kasus: z.string().min(1, "Case type is required."),
  anamnesa: z.string().min(1, "Anamnesa is required."),
  treatmentDescription: z.string().min(1, "First treatment description is required."),
  treatmentDate: z.string().min(1, "First treatment date is required."),
})

export default function CreateCasePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      kode_kasus: "",
      anamnesa: "",
      treatmentDescription: "",
      treatmentDate: new Date().toISOString().substring(0, 10),
    },
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    setIsSearching(true)
    try {
      const results = await searchStudents(searchTerm)
      setSearchResults(results)
      if (results.length === 0) {
        toast({
            title: "No Students Found",
            description: "There are no students matching your search term.",
            variant: "destructive"
        })
      }
    } catch (error) {
        toast({
            title: "Search Error",
            description: "Failed to search for students.",
            variant: "destructive"
        })
    } finally {
        setIsSearching(false)
    }
  }

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    form.setValue("studentId", student.id)
    setSearchResults([])
    setSearchTerm("")
  }
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newCase = await createCase(values);
      toast({
          title: "Case Created",
          description: `New case for ${selectedStudent?.name} has been successfully created.`
      })
      router.push(`/cases/${newCase.id}`)
    } catch (error) {
       console.error(error)
      toast({
        title: "Error Creating Case",
        description: "Failed to create a new case. Please check the details and try again.",
        variant: "destructive"
      })
    }
  }
  
  const resetSearch = () => {
    setSelectedStudent(null)
    setSearchTerm("")
    setSearchResults([])
    form.reset({
      studentId: "",
      kode_kasus: "",
      anamnesa: "",
      treatmentDescription: "",
      treatmentDate: new Date().toISOString().substring(0, 10),
    });
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
                        disabled={isSearching}
                    />
                </div>
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search Student"}
                </Button>
              </div>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">Search Results</h3>
                <Separator className="my-2" />
                <div className="grid gap-4 mt-4">
                  {searchResults.map((student) => {
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
                                <AvatarImage src={avatar.imageUrl} alt={student.name} />
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
                    })}
                </div>
              </div>
            )}
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              
              <div className="space-y-4">
                 <h3 className="text-lg font-medium">Case Details</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="kode_kasus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                             <FileText className="inline-block mr-2 h-4 w-4" />
                             Kode Kasus
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Academic, Personal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>

                <FormField
                  control={form.control}
                  name="anamnesa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <ClipboardList className="inline-block mr-2 h-4 w-4" />
                        Anamnesa
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Initial assessment and background of the case..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                 <div className="space-y-2">
                  <Label>
                     <PlusCircle className="inline-block mr-2 h-4 w-4" />
                     First Treatment
                  </Label>
                   <FormField
                      control={form.control}
                      name="treatmentDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                             <Textarea
                              placeholder="Describe the first treatment or counseling session..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   <FormField
                      control={form.control}
                      name="treatmentDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                             <Input type="date" className="w-full md:w-1/3" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={resetSearch}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Case"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

    