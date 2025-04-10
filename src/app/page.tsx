// import type { Metadata } from "next";
import Hero from "@/sections/Welcome/hero";
import Navigation from "@/components/navigation";
import About from "@/sections/Welcome/about";
import Experience from "@/sections/Welcome/experience";
import Projects from "@/sections/Welcome/projects";
import Contact from "@/sections/Welcome/contact";

// export const metadata: Metadata = {
//   title: "Nazal Prastya",
//   description: "Portofolio Nazal Gusti Prastya",
//   icons: {
//     icon: [
//       {
//         url: "/favicon.png",
//       },
//     ],
//   },
// };

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
        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>
        <section id="contact" className="min-h-screen py-20">
          <Contact />
        </section>
        {/*<section id="achievements" className="min-h-screen py-20">
          <Achievements />
        </section>
        */}
      </main>
    </div>
  );
}
