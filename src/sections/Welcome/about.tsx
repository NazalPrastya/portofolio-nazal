import GitHubContributions from "~/components/github/GithubContributions";
import { Marquee } from "~/components/magicui/marquee";
import { TechCard } from "~/components/markquee-skills";
import { Sparkles } from "lucide-react";

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
  return (
    <div className="w-full container">
      <div className="mb-12 ">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <Sparkles className="inline w-9 h-9  text-primary" />
          About Me
        </h1>
        <p className="mt-5 text-muted-foreground text-justify leading-8 md:text-xl">
          Hello, my name is Nazal Gusti Prastya and I reside in Bogor,
          Indonesia. At 18 years old, I am a student of Information Systems and
          a web developer. Beyond writing code, I consider myself a creative
          thinker, adept problem solver, and enthusiastic self-learner
          passionate about delving into the endless possibilities of technology.
          My current focus lies in website development utilizing Laravel,
          React.js, and Next.js. I am keen on exploring opportunities for
          collaboration. Should you be interested in working together or
          discussing potential projects, please feel free to reach out to me.
        </p>
      </div>

      {/* Skills */}
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/devicon/2.15.1/devicon.min.css"
        />
        <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
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

        <div className="w-full overflow-hidden mt-4">
          <div className="max-w-full overflow-hidden">
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-end mt-5 gap-x-3">
        <div className="w-full md:w-[25%] flex justify-center items-center bg-transparent overflow-hidden">
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
  );
}
