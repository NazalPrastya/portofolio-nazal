"use client";
import { Signature, Github, Linkedin, Mail, Instagram } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inboxFormSchema,
  type InboxFormSchema,
} from "~/features/inbox/form/inbox";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import NoSSR from "~/components/no-ssr";

export default function Contact() {
  const { t } = useTranslation();
  const form = useForm<InboxFormSchema>({
    resolver: zodResolver(inboxFormSchema),
  });

  const { mutate: sendingInbox, isPending: sendingInboxIsPending } =
    api.inbox.create.useMutation({
      onSuccess: () => {
        toast.success("Terimakasih sudah menghubungi");
        form.setValue("name", "");
        form.setValue("email", "");
        form.setValue("message", "");
      },
      onError: () => {
        toast.warning("Pesan tersimpan, namun ada sedikit kesalahan");
      },
    });

  const onSubmit = async (values: InboxFormSchema) => {
    console.log(values);
    sendingInbox(values);
  };

  return (
    <NoSSR>
      <div className="container w-full py-16">
        <div className="mb-12 max-w-md">
          <p className="text-primary flex items-center gap-2 font-medium">
            <Signature className="h-5 w-5" />
            {t("contact.span")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("contact.title")}
          </h1>
        </div>
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Profile Section */}
          <div className="w-full md:w-1/3">
            <Card className="mb-6">
              <div className="relative mt-6 mb-6 flex justify-center">
                <Avatar className="border-background h-40 w-40 border-4">
                  <AvatarImage src="/assets/me-kotak.jpg" alt="Profile Photo" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>

                <div className="absolute -top-2 left-0 translate-x-1/4">
                  <Badge className="bg-accent text-accent-foreground flex items-center gap-2 px-4 py-2 font-medium shadow-md">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="absolute top-0 left-0 h-3 w-3 animate-ping rounded-full bg-green-500 opacity-75"></div>
                    </div>
                    Open To Work
                  </Badge>
                </div>
              </div>

              <CardContent>
                <p className="text-muted-foreground">{t("contact.subtitle")}</p>
              </CardContent>

              <CardFooter className="flex gap-3">
                <a
                  href="https://github.com/NazalPrastya"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="github nazal prastya"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nazal-gusti-prastya-8a890a249/"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin nazal prastya"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/nazalprastya/"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram nazal prastya"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:nazalprastya@gmail.com"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="email nazal prastya"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </CardFooter>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">{t("contact.send")}</h2>
                <p className="text-muted-foreground">{t("contact.subSend")}</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>name</FormLabel>
                        <FormControl>
                          <Input placeholder="nazal.." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>{t("contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("contact.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    type="submit"
                    className="mt-5 w-full"
                    disabled={sendingInboxIsPending}
                  >
                    {t("contact.buttonSend")}
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NoSSR>
  );
}
