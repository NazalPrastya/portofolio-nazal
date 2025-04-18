import GitHubContributions from "~/components/github/GithubContributions";
import { Marquee } from "~/components/magicui/marquee";
import { TechCard } from "~/components/markquee-skills";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import NoSSR from "~/components/no-ssr";

const techStacks = [
  {
    name: "React",
    icon: "devicon-react-original",
    color: "text-blue-500",
  },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    color: "text-red-500",
  },
  {
    name: "TailwindCSS",
    icon: "devicon-tailwindcss-plain",
    color: "text-cyan-500",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    color: "text-blue-600",
  },
  {
    name: "MySQL",
    icon: "devicon-mysql-plain",
    color: "text-blue-400",
  },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    color: "text-yellow-500",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-plain",
    color: "text-gray-800 dark:text-white",
  },
  {
    name: "PHP",
    icon: "devicon-php-plain",
    color: "text-blue-500",
  },
  {
    name: "Composer",
    icon: "devicon-composer-plain",
    color: "text-amber-700",
  },
  {
    name: "Github",
    icon: "devicon-github-plain",
    color: "text-black",
  },
  {
    name: "MaterialUI",
    icon: "devicon-materialui-plain",
    color: "text-blue-600",
  },
  {
    name: "Nginx",
    icon: "devicon-nginx-plain",
    color: "text-green-600",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    color: "text-blue-700",
  },
  {
    name: "ViteJS",
    icon: "devicon-vitejs-plain",
    color: "text-yellow-700",
  },
];

const firstRow = techStacks.slice(0, techStacks.length / 2);
const secondRow = techStacks.slice(techStacks.length / 2);

export default function About() {
  const { t } = useTranslation();
  return (
    <NoSSR>
      <div className="container w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <Sparkles className="text-primary inline h-9 w-9" />
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground mt-5 text-justify leading-8 md:text-xl">
            {t("about.desc")}
          </p>
        </div>

        {/* Skills */}
        <div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/devicon/2.15.1/devicon.min.css"
          />
          <h2 className="mb-6 text-2xl font-bold"> {t("about.skills")}</h2>
          {/* Marquee container with fixed width */}
          <div className="w-full overflow-hidden">
            <div className="max-w-full overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((tech) => (
                  <TechCard key={tech.name} {...tech} />
                ))}
              </Marquee>
            </div>
          </div>

          <div className="mt-4 w-full overflow-hidden">
            <div className="max-w-full overflow-hidden">
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((tech) => (
                  <TechCard key={tech.name} {...tech} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-end gap-x-3 md:flex-row">
          <div className="flex w-full items-center justify-center overflow-hidden bg-transparent md:w-[25%]">
            <iframe
              title="Spotify"
              src="https://open.spotify.com/embed/track/1wo3UYTeizJHkwYIuLuBPF?utm_source=generator&theme=0"
              width="100%"
              height="240"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ backgroundColor: "transparent" }}
            ></iframe>
          </div>
          <div className="w-full md:w-[73%]">
            <GitHubContributions username="NazalPrastya" />
          </div>
        </div>
      </div>
    </NoSSR>
  );
}
