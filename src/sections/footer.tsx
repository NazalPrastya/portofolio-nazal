import { Instagram, Github, Linkedin, Mail } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="relative flex flex-1 border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Nazal Gusti Prastya. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/NazalPrastya"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github nazal prastya"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/nazal-gusti-prastya-8a890a249/"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin nazal prastya"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/nazalprastya/"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram nazal prastya"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:nazalprastya@gmail.com"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="email nazal prastya"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://id.pinterest.com/nazalprastya/"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="pinterest nazal prastya"
          >
            <FaPinterest className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
