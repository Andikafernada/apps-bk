
"use client"
import { useState } from "react"
import {
  File,
  MoreHorizontal,
  PlusCircle,
  Upload,
  Search,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { students } from "@/lib/data"
import { placeholderImages } from "@/lib/placeholder-images.json"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function StudentsPage() {
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddStudentOpen, setAddStudentOpen] = useState(false)
    const [isCreateCaseOpen, setCreateCaseOpen] = useState(false)
    const [selectedStudentName, setSelectedStudentName] = useState("")

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImport = () => {
        toast({ title: "Import Students", description: "Importing student data..." })
    }

    const handleExport = () => {
        toast({ title: "Export Students", description: "Exporting student data..." })
    }

    const handleDelete = (studentName: string) => {
        toast({ title: "Delete Student", description: `Student ${studentName} has been deleted.`, variant: "destructive" })
    }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>
          Manage student records and their case histories.
        </CardDescription>
        <div className="flex items-center gap-2 pt-4">
          <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleImport}>
              <Upload className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Import
              </span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setAddStudentOpen(true)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Student
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>NIS</TableHead>
              <TableHead className="hidden md:table-cell">
                Class
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Major
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => {
                const avatar = placeholderImages.find(p => p.id === student.avatarId)
                return (
              <TableRow key={student.id}>
                <TableCell className="hidden sm:table-cell">
                  {avatar && (
                    <Image
                      alt="Student avatar"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={avatar.imageUrl}
                      width="64"
                      data-ai-hint={avatar.imageHint}
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.nis}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.class}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{student.major}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/students/${student.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/students/${student.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                          setSelectedStudentName(student.name);
                          setCreateCaseOpen(true);
                      }}>Create Case</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(student.name)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
        </div>
      </CardFooter>
    </Card>

    <Dialog open={isAddStudentOpen} onOpenChange={setAddStudentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new student.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" placeholder="e.g. Jane Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nis" className="text-right">NIS</Label>
              <Input id="nis" placeholder="e.g. 12399" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">Class</Label>
              <Input id="class" placeholder="e.g. XII-A" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="major" className="text-right">Major</Label>
              <Input id="major" placeholder="e.g. Science" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setAddStudentOpen(false)}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    <Dialog open={isCreateCaseOpen} onOpenChange={setCreateCaseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Case</DialogTitle>
            <DialogDescription>
              Create a new case for {selectedStudentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="caseType" className="text-right">Case Type</Label>
              <Input id="caseType" placeholder="e.g. Academic" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="counselor" className="text-right">Counselor</Label>
              <Input id="counselor" placeholder="e.g. Dr. Ina" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setCreateCaseOpen(false)}>Create Case</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
