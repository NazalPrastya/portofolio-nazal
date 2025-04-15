"use client";
// Contact.jsx
import { Signature, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useState } from "react";

// Import shadcn components
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";

export default function Contact() {
  const [formData, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setState({ name: "", email: "", message: "" });
  };

  return (
    <div className="container w-full py-16">
      <div className="mb-12 max-w-md">
        <p className="text-primary flex items-center gap-2 font-medium">
          <Signature className="h-5 w-5" />
          CONNECT WITH ME
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s Talk a project together
        </h1>
      </div>
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Profile Section */}
        <div className="w-full md:w-1/3">
          <Card className="mb-6">
            <div className="relative mt-6 mb-6 flex justify-center">
              {/* Profile Image with Avatar component - centered */}
              <Avatar className="border-background h-40 w-40 border-4">
                <AvatarImage src="/assets/me-kotak.jpg" alt="Profile Photo" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>

              {/* Open to Work Badge - positioned at top-right of avatar */}
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

            {/* Description */}
            <CardContent>
              <p className="text-muted-foreground">
                My inbox is always open, if you have a project to work on
                together or just to say hello. Feel free to contact me and I
                will get back to you.
              </p>
            </CardContent>

            {/* Social Media Links */}
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
              <h2 className="text-2xl font-bold">Send Me a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below to get in touch with me.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
