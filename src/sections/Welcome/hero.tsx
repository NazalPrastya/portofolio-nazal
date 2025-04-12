"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Github, Instagram, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Creative Developer";
  const typingSpeed = 150;

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <div className="flex flex-col justify-center min-h-screen relative">
      <div className="absolute top-0 right-0 p-4 flex space-x-4">
        <Link
          href="https://github.com/NazalPrastya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/in/nazal-gusti-prastya-8a890a249/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </Link>
        <Link
          href="https://www.instagram.com/nazalprastya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Button>
        </Link>
      </div>
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px]">
              {/* Image with clip path */}
              <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-background shadow-xl">
                <Image
                  src="/assets/me.jpg"
                  alt="Profile photo"
                  fill
                  className="object-cover -hue-rotate-15"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hello, I&#39;m{" "}
                <span className="text-primary">Nazal Gusti Prastya</span>
              </h1>
              <h2 className="bg-secondary w-fit pr-3 text-2xl italic font-bold tracking-tighter sm:text-3xl md:text-4xl text-secondary-foreground">
                Web Developer
              </h2>

              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Hi, I am a web developer who enjoys delivering creative and
                high-quality digital solutions to meet your business needs.
              </p>
              <span className="inline text-sm">
                <MapPin className="inline" /> Based in Bogor, Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-sm text-muted-foreground mb-2">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
