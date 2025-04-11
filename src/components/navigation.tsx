"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  // Award,
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
  // { name: "Achievements", href: "#achievements", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add smooth transition to body element
  useEffect(() => {
    // Add transition to all elements that change with theme
    document.documentElement.classList.add("transition-colors");
    document.documentElement.style.transition =
      "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease";

    // Also add transitions to commonly themed elements
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

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement; // pastikan elemen bertipe HTMLElement
        el.classList.add("transition-colors");
        el.style.transition =
          "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease";
      }
    });

    return () => {
      // Clean up
      document.documentElement.classList.remove("transition-colors");
      document.documentElement.style.transition = "";

      elementsToTransition.forEach((tag) => {
        const elements = document.getElementsByTagName(tag);
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement; // pastikan elemen bertipe HTMLElement
          el.classList.remove("transition-colors");
          el.style.transition = "";
        }
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
        const sectionId = section.getAttribute("id") || "";

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

  // Wait until component is mounted to render theme toggle
  if (!mounted) return null;

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 md:hidden">
        <motion.button
          className="p-2 rounded-full bg-primary text-primary-foreground transition-all duration-500"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        <motion.button
          className="p-2 rounded-full bg-primary text-primary-foreground transition-all duration-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Desktop Navigation */}
      <nav className="fixed hidden md:flex flex-col items-center justify-between py-8 h-screen w-24 bg-background border-r border-border z-40 transition-all duration-500">
        <div className="w-full flex justify-center">
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full transition-all duration-500 hover:bg-primary/10 text-muted-foreground"
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </motion.div>
          </motion.button>
        </div>
        <div className="flex flex-col items-center space-y-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="group relative flex flex-col items-center"
              >
                <div
                  className={cn(
                    "p-3 rounded-full transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground",
                    activeSection === item.href.substring(1)
                      ? "bg-primary text-primary-foreground group-hover:bg-secondary"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon size={24} />
                </div>
                <span className="absolute left-full ml-4 px-2 py-1 rounded bg-background border text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="w-full"></div> {/* Spacer */}
      </nav>

      {/* Mobile Navigation Menu */}
      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 right-0 w-64 bg-background border-l border-border z-40 flex flex-col justify-center md:hidden transition-colors duration-500"
      >
        <div className="flex flex-col space-y-6 px-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "flex items-center space-x-4 p-2 rounded-lg transition-all duration-500 hover:bg-primary",
                  activeSection === item.href.substring(1)
                    ? "bg-primary/10 text-primary hover:bg-secondary/10"
                    : "text-muted-foreground hover:bg-primary/10"
                )}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 p-2 rounded-lg transition-all duration-500 text-muted-foreground hover:bg-accent mt-4"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}
