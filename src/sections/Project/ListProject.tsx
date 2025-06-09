"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CardProject from "~/components/card-project";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useInView } from "framer-motion";

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
      "Aplikasi berbasis web yang digunakan untuk melakukan laporan dan menampilkan demografi desa.",
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
      "Laporan keamanan siber untuk mengatasi ancaman dan kemanan siber berbasis web",
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
    id: 4,
    title: "Goods and Services Monitoring System",
    description:
      "The monitoring system is built using a dashboard with statistics that are easy to read by users in determining targets.",
    image: "/assets/porto/simonberjasa.png",
    category: "Government",
    tags: ["ReactJS", "Laravel", "MaterialUI", "MySQL"],
    demoLink: "#",
    githubLink: [],
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
    id: 13,
    title: "Landing Page Voice Over Talent v2",
    description:
      "A simple landing page to showcase the voice over talent's profile, voice demo, and contact form. Designed to be responsive and easy to use to attract potential clients.",
    image: "/assets/porto/vo-talent-v2.png",
    tags: ["ReactJS", "TailwindCSS"],
    category: "AI Implement",
    demoLink: "https://www.utamisundari.com/",
    githubLink: [],
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
  {
    id: 10,
    title: "Guestbook System",
    description: "a web-based application to record guests who attend",
    image: "/assets/porto/sibt.png",
    category: "Fun",
    tags: ["Laravel", "MySQL", "TailwindCSS"],
    demoLink: "#",
    githubLink: ["https://github.com/NazalPrastya/sistem-sibt.git"],
  },
  {
    id: 11,
    title: "Landing Page Voice Over Talent",
    description:
      "A simple landing page to showcase the voice over talent's profile, voice demo, and contact form. Designed to be responsive and easy to use to attract potential clients.",
    image: "/assets/porto/voice-over.jpg",
    category: "Landing Page",
    tags: ["TailwindCSS"],
    demoLink: "#",
    githubLink: [],
  },
  {
    id: 12,
    title: "Movie List (Learning Projects)",
    description: "a website created to learn api integration using reactjs ",
    image: "/assets/porto/movie-list.jpg",
    category: "learing-projects",
    tags: ["ReactJS", "TailwindCSS", "API"],
    demoLink: "https://movie-list-zal.vercel.app/",
    githubLink: ["https://github.com/NazalPrastya/movie-list"],
  },
];

export default function ListProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
  // Add mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="container w-full">
      <Link
        href="/"
        className="group hover:text-primary flex items-center text-3xl font-bold transition-all duration-300"
      >
        <ArrowBigLeft className="mr-1 inline h-8 w-8 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />
        <span className="transform transition-transform duration-300 group-hover:scale-105">
          Back
        </span>
      </Link>
      <div className="mt-12 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <Sparkles className="text-primary inline h-9 w-9" />
          Projects
        </h1>
      </div>

      {/* Projects */}
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
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <CardProject project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
