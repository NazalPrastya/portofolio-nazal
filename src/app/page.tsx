import type { Metadata } from "next";
import Hero from "@/components/Welcome/hero";
// import About from "@/components/about";
// import Experience from "@/components/experience";
// import Projects from "@/components/projects";
// import Achievements from "@/components/achievements";
// import Contact from "@/components/contact";
import Navigation from "@/components/navigation";

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description:
    "Personal portfolio showcasing my work, experience, and achievements",
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24">
        <section id="home" className="min-h-screen">
          <Hero />
        </section>
        {/* <section id="about" className="min-h-screen py-20">
          <About />
        </section>
        <section id="experience" className="min-h-screen py-20">
          <Experience />
        </section>
        <section id="projects" className="min-h-screen py-20">
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
