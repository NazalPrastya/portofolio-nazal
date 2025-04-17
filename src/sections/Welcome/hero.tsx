import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Github, Instagram, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col justify-center">
      <div className="absolute top-0 left-0 flex space-x-4 p-4 md:right-0 md:left-auto">
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
            <div className="relative h-[350px] w-[280px] sm:h-[400px] sm:w-[320px] md:h-[480px] md:w-[380px]">
              {/* Image with clip path */}
              <div className="border-background absolute inset-0 overflow-hidden rounded-full border-4 shadow-xl">
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
                {t("hero.hello")}
                <span className="text-primary"> Nazal Gusti Prastya</span>
              </h1>
              <h2 className="bg-secondary text-secondary-foreground w-fit pr-3 text-2xl font-bold tracking-tighter italic sm:text-3xl md:text-4xl">
                Web Developer
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                {t("hero.intro")}
              </p>
              <span className="inline text-sm">
                <MapPin className="inline" /> {t("hero.location")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform md:bottom-12"
      >
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => {
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-muted-foreground mb-2 text-sm">
            {t("hero.scroll")}
          </span>
          <div className="border-primary flex h-10 w-6 justify-center rounded-full border-2 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="bg-primary h-2 w-2 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
