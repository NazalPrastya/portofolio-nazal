"use client";
import { Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CardProject from "~/components/card-project";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Project data stays the same...
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demoLink: string;
  githubLink: string[];
}

const projects: Project[] = [
  {
    id: 9,
    title: "AI Summary Budget Tracker",
    description:
      "An application for recording income and expenditure budgets with summaries compiled using AI implementation",
    image: "/assets/porto/budget-tracker.png",
    tags: ["NextJS", "MySQL", "ExpressJS", "OpenRouter"],
    category: "AI Implement",
    demoLink: "#",
    githubLink: [
      "https://github.com/NazalPrastya/fe-budget-tracker",
      "https://github.com/NazalPrastya/be_budget_tracker",
    ],
  },
  {
    id: 7,
    title: "Pelaporan dan Demografi Desa",
    description:
      "A web-based application used to generate reports and display village demographics.",
    image: "/assets/porto/pelaporan.png",
    tags: ["Laravel", "ReactJS", "MySQL", "MUI", "WebSocket"],
    category: "Government",
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 8,
    title: "Ticketing System",
    description:
      "Cyber security report to address web-based cyber threats and security",
    image: "/assets/porto/ticketing.png",
    tags: ["Laravel", "MySQL"],
    category: "Government",
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 1,
    title: "Budget Planning System",
    description:
      "A budget planning system created to plan the budget needed to carry out an activity. This system has features in making BEP (Budget Estimate Plan), as well as approval of each activity by authorized superiors.",
    image: "/assets/porto/sianggara.jpg",
    tags: ["Laravel", "ReactJS", "MySQL", "MaterialTailwind"],
    category: "Government",
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 2,
    title: "Numbering Application",
    description:
      "Numbering application that is used to give numbers to letters, or things that require numbers. this system aims to reduce the duplication of the same number. ",
    image: "/assets/porto/penomoran.jpg",
    tags: ["Laravel", "ReactJS", "MySQL", "MaterialTailwind"],
    category: "Government",
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 3,
    title: "Canteen System",
    description:
      "A system that was built when I was working on the 11th grade final project, which can purchase canteen goods based on their categories, and can make cash or cash payments using the payment gateway from midtrans.",
    image: "/assets/porto/SIK.png",
    tags: ["Laravel", "Midtrans", "MySQL", "TailwindCSS"],
    category: "Government",
    demoLink: "#",
    githubLink: ["https://github.com/NazalPrastya/sistem-kantin"],
  },
  {
    id: 5,
    title: "Dashboard Statistics",
    description:
      "A dashboard that presents entrepreneurial statistics in each region with an intuitive, user-friendly display, ready to be shown to leaders.",
    image: "/assets/porto/dash-ehub.jpg",
    category: "Government",
    tags: ["ReactJS", "Laravel", "MaterialUI", "MySQL"],
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 6,
    title: "My Class Website",
    description:
      "A website that contains about the excitement in my class and some of the work that we have created together during school at SMK.",
    image: "/assets/porto/kelas.png",
    category: "Government",
    tags: ["Laravel", "MySQL", "TailwindCSS"],
    demoLink: "#",
    githubLink: ["https://github.com/NazalPrastya/zapeosethero"],
  },
  {
    id: 9,
    title: "Najal Games",
    description: "simple fun games",
    image: "/assets/porto/najal-games.jpg",
    category: "Fun",
    tags: ["ReactJS", "Firebase"],
    demoLink: "https://najal-games.vercel.app",
    githubLink: ["https://github.com/NazalPrastya/kalkulator-cinta"],
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Add client-side only state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const titleFallback = "My Projects";
  const subtitleFallback = "Here are some projects I've worked on.";
  const seeMoreFallback = "See More";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="container w-full">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <Sparkles className="text-primary inline h-9 w-9" />
          {isClient ? t("projects.title") : titleFallback}
        </h1>
        <p className="text-muted-foreground mt-4 text-justify text-lg">
          {isClient ? t("projects.subtitle") : subtitleFallback}
        </p>
      </div>

      {isMobile ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id}>
              <CardProject project={project} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isClient ? (isInView ? "visible" : "hidden") : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <CardProject project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Link
          className={buttonVariants({ variant: "default" })}
          href={"/projects"}
        >
          {isClient ? t("projects.seeMore") : seeMoreFallback}
        </Link>
      </div>
    </div>
  );
}
