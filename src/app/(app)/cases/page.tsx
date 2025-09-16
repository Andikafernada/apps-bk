
"use client"

import { useState } from "react"
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cases } from "@/lib/data"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

type Status = "all" | "active" | "closed" | "archived"

export default function CasesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<Status>("all")
  const [filters, setFilters] = useState({
    active: true,
    closed: true,
    archived: false,
  })
  const [isAddTreatmentOpen, setAddTreatmentOpen] = useState(false)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }))
  }

  const filteredCases = cases.filter((caseItem) => {
    if (activeTab !== "all" && caseItem.status.toLowerCase() !== activeTab) {
      return false
    }
    const status = caseItem.status.toLowerCase() as keyof typeof filters
    return filters[status];
  })

  const exportCases = () => {
    toast({
      title: "Exporting Cases",
      description: "Your case data is being exported.",
    })
  }
  
  const archiveCase = (caseId: string) => {
    toast({
      title: "Case Archived",
      description: `Case with ID ${caseId} has been archived.`,
    })
  }

  return (
    <>
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as Status)}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filters.active}
                  onCheckedChange={() => handleFilterChange("active")}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.closed}
                  onCheckedChange={() => handleFilterChange("closed")}
                >
                  Closed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.archived}
                  onCheckedChange={() => handleFilterChange("archived")}
                >
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={exportCases}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Cases</CardTitle>
              <CardDescription>
                Manage and review all student cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Counselor</TableHead>
                    <TableHead>Last Meeting</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">
                        {caseItem.studentName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{caseItem.kode_kasus}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={caseItem.status === 'Active' ? 'secondary' : caseItem.status === 'Closed' ? 'outline' : 'default'}>
                          {caseItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {caseItem.counselorName}
                      </TableCell>
                      <TableCell>
                        {caseItem.lastMeeting}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/cases/${caseItem.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                setSelectedCaseId(caseItem.id);
                                setAddTreatmentOpen(true);
                            }}>
                                Add Treatment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => archiveCase(caseItem.id)}>Archive Case</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{filteredCases.length}</strong> of <strong>{cases.length}</strong>{" "}
                cases
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddTreatmentOpen} onOpenChange={setAddTreatmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Treatment</DialogTitle>
            <DialogDescription>
              Add a new treatment for case {selectedCaseId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="treatment-date" className="text-right">
                Date
              </Label>
              <Input id="treatment-date" type="date" className="col-span-3" defaultValue={new Date().toISOString().substring(0, 10)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="treatment" className="text-right">
                Treatment
              </Label>
              <Textarea id="treatment" placeholder="Describe the treatment provided in the meeting..." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setAddTreatmentOpen(false)}>Save Treatment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
