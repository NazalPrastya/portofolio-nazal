import type { Metadata } from "next";
import { HeadMetaData } from "~/components/layout/HeadMetaData";
import ListProject from "~/sections/Project/ListProject";

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description:
    "Personal portfolio showcasing my work, experience, and achievements",
};

export default function Page() {
  return (
    <>
      <HeadMetaData
        title="Projects"
        metaDescription="Nazal Prastya adalah seorang Web Developer dan UI Designer yang berfokus pada pembuatan aplikasi web modern dan desain antarmuka yang elegan."
        pathname="/projects"
      />
      <div className="relative flex min-h-screen overflow-x-hidden">
        <main className="w-full flex-1 overflow-x-hidden px-4 sm:px-8 md:px-16 lg:px-24">
          <section id="projects" className="min-h-screen w-full">
            <ListProject />
          </section>
        </main>
      </div>
    </>
  );
}
