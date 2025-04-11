import type { Metadata } from "next";
import Hero from "@/sections/Welcome/hero";
// import About from "@/components/about";
// import Experience from "@/components/experience";
// import Projects from "@/components/projects";
// import Achievements from "@/components/achievements";
// import Contact from "@/components/contact";
import Navigation from "@/components/navigation";
import About from "@/sections/Welcome/about";
import Experience from "@/sections/Welcome/experience";

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description:
    "Personal portfolio showcasing my work, experience, and achievements",
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden">
      <Navigation />
      <main className="flex-1 w-full overflow-x-hidden px-4 sm:px-8 md:px-16 lg:px-24">
        <section id="home" className="min-h-screen w-full">
          <Hero />
        </section>
        <section id="about" className="min-h-screen py-20 w-full">
          <About />
        </section>
        <section id="experience" className="min-h-screen py-20">
          <Experience />
        </section>
        {/* <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>
        <section id="achievements" className="min-h-screen py-20">
          <Achievements />
        </section>
        <section id="contact" className="min-h-screen py-20">
          <Contact />
        </section> */}
      </main>
    </div>
  );
}
