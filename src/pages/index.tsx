import ChatBot from "~/components/chat-bot";
import { HeadMetaData } from "~/components/layout/HeadMetaData";
import Navigation from "~/components/navigation";
import About from "~/sections/Welcome/about";
import Contact from "~/sections/Welcome/contact";
import Experience from "~/sections/Welcome/experience";
import Hero from "~/sections/Welcome/hero";
import Projects from "~/sections/Welcome/projects";

export default function Home() {
  return (
    <>
      <HeadMetaData
        title="Web Developer"
        metaDescription="Nazal Prastya adalah seorang Web Developer dan UI Designer yang berfokus pada pembuatan aplikasi web modern dan desain antarmuka yang elegan."
        pathname="/"
      />

      <div className="relative flex min-h-screen overflow-x-hidden">
        <Navigation />
        <main className="w-full flex-1 overflow-x-hidden px-4 sm:px-8 md:px-16 lg:px-24">
          <section id="home" className="min-h-screen w-full">
            <Hero />
          </section>
          <section id="about" className="min-h-screen w-full py-20">
            <About />
          </section>
          <section id="experience" className="py-20">
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
        <div className="fixed right-5 bottom-5 z-[50]">
          <ChatBot />
        </div>
      </div>
    </>
  );
}
