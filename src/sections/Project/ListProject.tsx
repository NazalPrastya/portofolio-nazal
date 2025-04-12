"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
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
  githubLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Budget Planning System",
    description:
      "A budget planning system created to plan the budget needed to carry out an activity. This system has features in making BEP (Budget Estimate Plan), as well as approval of each activity by authorized superiors.",
    image: "/porto/sianggara.jpg",
    tags: ["Laravel", "ReactJS", "MySQL", "MaterialTailwind"],
    category: "Government",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Numbering Application",
    description:
      "Numbering application that is used to give numbers to letters, or things that require numbers. this system aims to reduce the duplication of the same number. ",
    image: "/porto/penomoran.jpg",
    tags: ["Laravel", "ReactJS", "MySQL", "MaterialTailwind"],
    category: "Government",

    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Canteen System",
    description:
      "A system that was built when I was working on the 11th grade final project, which can purchase canteen goods based on their categories, and can make cash or cash payments using the payment gateway from midtrans.",
    image: "/porto/SIK.png",
    tags: ["Laravel", "Midtrans", "MySQL", "TailwindCSS"],
    category: "Government",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Goods and Services Monitoring System",
    description:
      "The monitoring system is built using a dashboard with statistics that are easy to read by users in determining targets.",
    image: "/porto/simonberjasa.png",
    category: "Government",
    tags: ["ReactJS", "Laravel", "MaterialUI", "MySQL"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 5,
    title: "Dashboard Statistics",
    description:
      "A dashboard that presents entrepreneurial statistics in each region with an intuitive, user-friendly display, ready to be shown to leaders.",
    image: "/porto/dash-ehub.jpg",
    category: "Government",
    tags: ["ReactJS", "Laravel", "MaterialUI", "MySQL"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 6,
    title: "My Class Website",
    description:
      "A website that contains about the excitement in my class and some of the work that we have created together during school at SMK.",
    image: "/porto/kelas.png",
    category: "Government",
    tags: ["Laravel", "MySQL", "TailwindCSS"],
    demoLink: "#",
    githubLink: "#",
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
  return (
    <div className="w-full container">
      <Link
        href="/"
        className="group flex items-center text-3xl font-bold transition-all duration-300 hover:text-primary"
      >
        <ArrowBigLeft className="mr-1 inline h-8 w-8 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />
        <span className="transform transition-transform duration-300 group-hover:scale-105">
          Back
        </span>
      </Link>
      <div className="mt-12 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <Sparkles className="inline w-9 h-9 text-primary" />
          Projects
        </h1>
      </div>

      {/* Projects */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <CardProject project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
