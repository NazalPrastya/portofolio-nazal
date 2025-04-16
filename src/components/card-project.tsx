"use client";
// CardProject.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

const CardProject = ({ project }: { project: Project }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleTags = () => {
    setShowAllTags(!showAllTags);
  };

  const visibleTags = showAllTags ? project.tags : project.tags.slice(0, 3);

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white/90 shadow-lg transition-colors duration-300 dark:border-gray-700/30 dark:bg-gray-800/70"
    >
      <div className="relative h-44">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          {project.title}
        </h2>
        <p className="mb-3 flex-grow text-sm text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-blue-600 transition-colors duration-300 dark:bg-gray-700 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
          {!showAllTags && project.tags.length > 3 && (
            <button
              onClick={toggleTags}
              className="cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-xs text-blue-600 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
            >
              +{project.tags.length - 3}
            </button>
          )}
          {showAllTags && project.tags.length > 3 && (
            <button
              onClick={toggleTags}
              className="cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-xs text-blue-600 transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-600 dark:text-blue-300 dark:hover:bg-gray-700"
            >
              Show less
            </button>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          {project.demoLink !== "#" && (
            <a
              href={project.demoLink}
              target="_blank"
              className="bg-primary hover:bg-secondary flex-1 rounded py-1.5 text-center text-sm font-medium text-white transition-colors duration-300"
            >
              Demo
            </a>
          )}
          {project.githubLink !== "#" && (
            <a
              href={project.githubLink}
              className="flex-1 rounded border border-gray-300 py-1.5 text-center text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardProject;
