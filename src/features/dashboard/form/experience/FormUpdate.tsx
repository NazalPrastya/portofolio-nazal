import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  createExperienceFormSchema,
  type CreateExperienceFormSchema,
} from "./experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";
import { toast } from "sonner";

interface Experience {
  id: string;
  company: { en: string; id: string } | string;
  desc: { en: string; id: string } | string;
  position: string;
  dateStart: string;
  dateEnd?: string;
  now: boolean;
  logo?: string | null;
}

interface FormUpdateProps {
  experience: Experience;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function FormUpdate({
  experience,
  open,
  onClose,
  onSuccess,
}: FormUpdateProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<CreateExperienceFormSchema>({
    resolver: zodResolver(createExperienceFormSchema),
  });

  useEffect(() => {
    if (experience) {
      const companyName =
        typeof experience.company === "object"
          ? experience.company.en || experience.company.id
          : experience.company;
      const description =
        typeof experience.desc === "object"
          ? experience.desc.en || experience.desc.id
          : experience.desc;

      form.reset({
        company: companyName,
        desc: description,
        position: experience.position,
        dateStart: new Date(experience.dateStart),
        dateEnd: experience.dateEnd ? new Date(experience.dateEnd) : undefined,
        now: experience.now,
      });
      setLogoPreview(experience.logo ?? null);
    }
  }, [experience, form]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLogoPreview(fileUrl);

      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        form.setValue("logo", {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const { mutate: updateExperience, isPending: isPendingUpdateExperience } =
    api.experience.update.useMutation({
      onSuccess: () => {
        toast.success("Experience updated successfully");
        onSuccess?.();
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update experience");
      },
    });

  const handleExperienceSubmit = (values: CreateExperienceFormSchema) => {
    updateExperience({
      id: experience.id,
      ...values,
      dateStart: values.dateStart.toISOString().split("T")[0] ?? "",
      dateEnd: values.dateEnd
        ? values.dateEnd.toISOString().split("T")[0]
        : undefined,
      now: values.now ?? false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Experience</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleExperienceSubmit)}
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company*</FormLabel>
                  <FormControl>
                    <Input placeholder="PT ...." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={() => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={logoPreview || ""} alt="Logo" />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                    <FormControl>
                      <Input
                        placeholder="Upload logo..."
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Input placeholder="desc" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position*</FormLabel>
                  <FormControl>
                    <Input placeholder="Position.." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Start*</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="now"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">
                    Currently working here
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.watch("now") && (
              <FormField
                control={form.control}
                name="dateEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date End</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPendingUpdateExperience}>
                {isPendingUpdateExperience ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
