import { Instagram, Github, Linkedin, Mail } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="relative flex flex-1 border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left md:pl-20">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Nazal Gusti Prastya. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/NazalPrastya"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github nazal prastya"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/nazal-gusti-prastya-8a890a249/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin nazal prastya"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/nazalprastya/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram nazal prastya"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:nazalprastya@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="email nazal prastya"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://id.pinterest.com/nazalprastya/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="pinterest nazal prastya"
          >
            <FaPinterest className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
