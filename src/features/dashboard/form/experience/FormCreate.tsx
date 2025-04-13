import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function FormCreate() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<CreateExperienceFormSchema>({
    resolver: zodResolver(createExperienceFormSchema),
    defaultValues: {
      company: "",
      position: "",
      desc: "",
      dateStart: "",
      dateEnd: "",
      logo: undefined,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mengubah file menjadi URL yang bisa ditampilkan
      const fileUrl = URL.createObjectURL(file);
      setLogoPreview(fileUrl);
      form.setValue("logo", file);
    }
  };

  // Cleanup URL objects when component unmounts
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleExperienceSubmit = (values: CreateExperienceFormSchema) => {
    // Sekarang values.logo berisi File object yang bisa diproses
    console.log("Form submitted with values:", values);

    const payload: {
      company: string;
      position: string;
      desc: string;
      dateStart: string;
      dateEnd?: string;
      logo?: File;
    } = {
      company: values.company,
      position: values.position,
      desc: values.desc,
      dateStart: values.dateStart,
    };

    if (values.dateEnd) {
      payload.dateEnd = values.dateEnd;
    }

    if (values.logo instanceof File) {
      payload.logo = values.logo;
    }

    // Lakukan proses submit ke API disini
    // misalnya: updateProfile.mutate(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Experience</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Experience</DialogTitle>
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date End</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
