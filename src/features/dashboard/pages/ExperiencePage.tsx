import { useState, useMemo } from "react"
import Image from "next/image"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import DashboardLayout from "~/components/layout/DashboardLayout"

const experiences = [
  {
    id: 1,
    company: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Developed and maintained web applications using React and Node.js",
    period: "Jan 2022 - Present",
  },
  {
    id: 2,
    company: "Tech Innovators",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Led a team of developers to create mobile applications using React Native",
    period: "Mar 2020 - Dec 2021",
  },
  {
    id: 3,
    company: "Digital Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Worked on backend systems using Express and MongoDB",
    period: "Jun 2018 - Feb 2020",
  },
  // Tambahkan data lebih banyak untuk melihat efek pagination
]

export default function ExperiencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) =>
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const paginatedExperiences = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredExperiences.slice(start, start + itemsPerPage)
  }, [filteredExperiences, currentPage])

  const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage)

  return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">List of Experience</h2>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset ke page 1 setelah search
              }}
              className="w-[200px]"
            />
            <Button>Add Experience</Button>
          </div>
        </div>

        <div className="rounded-md border bg-background">
          <Table className="rounded-md">
            <TableHeader>
              <TableRow className="bg-accent rounded-t-md">
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead className="w-[180px]">Company</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[150px]">Period</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExperiences.length > 0 ? (
                paginatedExperiences.map((experience) => (
                  <TableRow key={experience.id}>
                    <TableCell>
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{experience.company}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{experience.description}</p>
                    </TableCell>
                    <TableCell>{experience.period}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                            <Trash className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No experience found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
  )
}

ExperiencePage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout title="Experience">{page}</DashboardLayout>
);
