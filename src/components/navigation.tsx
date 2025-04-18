"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("transition-colors");
    document.documentElement.style.transition =
      "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease";

    const elementsToTransition = [
      "a",
      "button",
      "div",
      "nav",
      "span",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "ul",
      "input",
      "textarea",
      "section",
      "article",
      "header",
      "footer",
    ];

    elementsToTransition.forEach((tag: string) => {
      const elements = document.getElementsByTagName(tag);
      for (const el of elements) {
        (el as HTMLElement).classList.add("transition-colors");
        (el as HTMLElement).style.transition =
          "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease";
      }
    });

    return () => {
      document.documentElement.classList.remove("transition-colors");
      document.documentElement.style.transition = "";

      elementsToTransition.forEach((tag: string) => {
        const elements = document.getElementsByTagName(tag);
        Array.from(elements).forEach((el) => {
          (el as HTMLElement).classList.add("transition-colors");
          (el as HTMLElement).style.transition =
            "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease";
        });
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 300;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") ?? "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  const toggleLanguage = async () => {
    const newLang = i18n.language === "id" ? "en" : "id";
    await i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 md:hidden">
        <motion.button
          onClick={toggleLanguage}
          className="bg-primary text-primary-foreground cursor-pointer rounded-full px-4 py-2"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {i18n.language === "id" ? "ID" : "EN"}
        </motion.button>
        <motion.button
          className="bg-primary text-primary-foreground rounded-full p-2"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        <motion.button
          className="bg-primary text-primary-foreground rounded-full p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="bg-background/95 fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 text-2xl font-semibold backdrop-blur">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary",
              )}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </motion.button>
          ))}
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-background border-border fixed z-40 hidden h-screen w-24 flex-col items-center justify-between border-r py-8 transition-all duration-500 md:flex">
        <div className="flex w-full justify-center">
          <motion.button
            onClick={toggleTheme}
            className="hover:bg-primary/10 text-muted-foreground rounded-full p-3"
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </motion.div>
          </motion.button>
        </div>
        <ul className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "hover:bg-primary/10 text-muted-foreground rounded-full p-3 transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "",
              )}
              aria-label={item.name}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <item.icon className="h-5 w-5" />
            </motion.button>
          ))}
        </ul>
        <div className="flex p-4">
          <motion.button
            onClick={toggleLanguage}
            className="bg-muted cursor-pointer rounded-full px-4 py-2"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {i18n.language === "id" ? "ID" : "EN"}
          </motion.button>
        </div>
        <div />
      </nav>
    </>
  );
}
