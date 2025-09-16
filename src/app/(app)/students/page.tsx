import {
  File,
  MoreHorizontal,
  PlusCircle,
  Upload,
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
import { Search } from "lucide-react"

export default function StudentsPage() {
  return (
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
              />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Upload className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Import
              </span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
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
            {students.map((student) => {
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Create Case</DropdownMenuItem>
                      <DropdownMenuLabel className="text-destructive">Delete</DropdownMenuLabel>
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
          Showing <strong>1-10</strong> of <strong>{students.length}</strong> students
        </div>
      </CardFooter>
    </Card>
  )
}
