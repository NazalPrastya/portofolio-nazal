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

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 md:hidden">
        <motion.button
          className="p-2 rounded-full bg-primary text-primary-foreground"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        <motion.button
          className="p-2 rounded-full bg-primary text-primary-foreground"
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
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur flex flex-col items-center justify-center space-y-6 text-2xl font-semibold">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              )}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </motion.button>
          ))}
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="fixed hidden md:flex flex-col items-center justify-between py-8 h-screen w-24 bg-background border-r border-border z-40 transition-all duration-500">
        <div className="w-full flex justify-center">
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-primary/10 text-muted-foreground"
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
        <ul className="flex flex-col gap-6 items-center">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "p-3 rounded-full hover:bg-primary/10 text-muted-foreground transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : ""
              )}
              aria-label={item.name}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <item.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </ul>
        <div />
      </nav>
    </>
  );
}
