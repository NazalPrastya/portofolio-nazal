"use client"; // If using Next.js App Router

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubContributions = ({ username }: { username: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is active
  useEffect(() => {
    // Check initial preference
    const checkDarkMode = () => {
      // Check for system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      // Check for manual setting in html tag (commonly used in frameworks)
      const htmlHasDarkClass =
        document.documentElement.classList.contains("dark");

      setIsDarkMode(systemPrefersDark || htmlHasDarkClass);
    };

    checkDarkMode();

    // Create media query observer for system preference changes
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleDarkModeChange = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    // Create mutation observer for manual dark mode toggles
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={
        "bg-background text-medium p-4 rounded-lg shadow-md w-full border-2  h-[228px] flex justify-center item-center"
      }
    >
      <GitHubCalendar
        username={username}
        blockSize={11} // Block size
        blockMargin={3} // Margin between blocks
        fontSize={14} // Month label text size
        theme={{
          light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
        }}
        colorScheme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default GitHubContributions;
