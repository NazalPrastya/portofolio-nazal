import { useState, useMemo } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DashboardLayout from "~/components/layout/DashboardLayout";
import { api } from "~/utils/api";
import { FormCreate } from "../form/experience/FormCreate";
import { FormUpdate } from "../form/experience/FormUpdate";
import { toast } from "sonner";

export default function ExperiencePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const itemsPerPage = 5;

  const { data: experiences = [], refetch } =
    api.experience.getList.useQuery() as { data: any[]; refetch: () => void };
  const { mutate: deleteExperience } = api.experience.delete.useMutation({
    onSuccess: () => {
      toast.success("Experience deleted successfully");
      void refetch();
    },
    onError: () => {
      toast.error("Failed to delete experience");
    },
  });

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp: any) => {
      const companyName =
        typeof exp.company === "object"
          ? exp.company.en || exp.company.id
          : exp.company;
      const description =
        typeof exp.desc === "object" ? exp.desc.en || exp.desc.id : exp.desc;
      return (
        companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, experiences]);

  const paginatedExperiences = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredExperiences.slice(start, start + itemsPerPage);
  }, [filteredExperiences, currentPage]);

  const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-xl font-semibold">List of Experience</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset ke page 1 setelah search
            }}
            className="w-[200px]"
          />
          <FormCreate onSuccess={() => void refetch()} />
        </div>
      </div>

      <div className="bg-background rounded-md border">
        <Table className="rounded-md">
          <TableHeader>
            <TableRow className="bg-accent rounded-t-md">
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead className="w-[180px]">Company</TableHead>
              <TableHead className="w-[180px]">Position</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Period</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExperiences.length > 0 ? (
              paginatedExperiences.map((experience: any) => {
                const companyName =
                  typeof experience.company === "object"
                    ? experience.company.en || experience.company.id
                    : experience.company;
                const description =
                  typeof experience.desc === "object"
                    ? experience.desc.en || experience.desc.id
                    : experience.desc;
                const dateStart = new Date(
                  experience.dateStart,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
                const dateEnd = experience.now
                  ? "Present"
                  : new Date(experience.dateEnd).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });

                return (
                  <TableRow key={experience.id}>
                    <TableCell>
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${companyName} logo`}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{companyName}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{experience.position}</p>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{description}</p>
                    </TableCell>
                    <TableCell>
                      {dateStart} - {dateEnd}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2"
                            onClick={() => setSelectedExperience(experience)}
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive flex cursor-pointer items-center gap-2"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this experience?",
                                )
                              ) {
                                deleteExperience({ id: experience.id });
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
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
      <div className="flex items-center justify-end gap-2">
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {selectedExperience && (
        <FormUpdate
          experience={selectedExperience}
          open={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onSuccess={() => {
            void refetch();
            setSelectedExperience(null);
          }}
        />
      )}
    </div>
  );
}

ExperiencePage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout title="Experience">{page}</DashboardLayout>
);
