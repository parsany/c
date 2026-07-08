import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 pb-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-theme-muted gap-4">
      <div>
        <span>&copy; {new Date().getFullYear()} Parsa. All rights open.</span>
      </div>
      <div className="flex items-center space-x-5">
        <a
          href="mailto:quantinitycorp@gmail.com"
          className="hover:text-theme-text transition-colors flex items-center gap-1.5"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
          <span>Contact</span>
        </a>
        <a
          href="https://github.com/parsany"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-theme-text transition-colors flex items-center gap-1.5"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/parsany"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-theme-text transition-colors flex items-center gap-1.5"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
