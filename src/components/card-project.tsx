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
      className="bg-white/90 dark:bg-gray-800/70 rounded-lg overflow-hidden shadow-lg 
                border border-gray-200 dark:border-gray-700/30 flex flex-col h-full
                transition-colors duration-300"
    >
      <div className="relative h-44">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          {project.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-blue-600 
                      dark:bg-gray-700 dark:text-blue-300 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
          {!showAllTags && project.tags.length > 3 && (
            <button
              onClick={toggleTags}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-blue-600 
                      hover:bg-gray-200 dark:bg-gray-700 dark:text-blue-300 
                      dark:hover:bg-gray-600 cursor-pointer transition-colors duration-300"
            >
              +{project.tags.length - 3}
            </button>
          )}
          {showAllTags && project.tags.length > 3 && (
            <button
              onClick={toggleTags}
              className="px-2 py-1 text-xs rounded-full bg-gray-200 text-blue-600 
                      hover:bg-gray-100 dark:bg-gray-600 dark:text-blue-300 
                      dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300"
            >
              Show less
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          {project.demoLink !== "#" && (
            <a
              href={project.demoLink}
              className="flex-1 py-1.5 rounded text-sm bg-blue-600 hover:bg-blue-700 
                      text-white font-medium text-center transition-colors duration-300"
            >
              Demo
            </a>
          )}
          {project.githubLink !== "#" && (
            <a
              href={project.githubLink}
              className="flex-1 py-1.5 rounded text-sm border border-gray-300 text-gray-700 
                      font-medium text-center hover:bg-gray-100 dark:border-gray-600 
                      dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
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
