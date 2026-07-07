import React from "react";
import { motion } from "framer-motion";

interface IntroSectionProps {
  onOpenCommandMenu: () => void;
}

export default function IntroSection({ onOpenCommandMenu }: IntroSectionProps) {
  return (
    <section className="pt-12 md:pt-20 pb-8 md:pb-12 border-b border-slate-900/60">
      <div className="max-w-3xl">
        <div className="flex items-center space-x-2 mb-6 select-none">
          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
            Available for remote contracts & full-time relocation opportunities
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-[1.1] mb-6">
          Hi, I&apos;m Parsa.
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-normal tracking-wide mb-8">
          I&apos;m a Full-Stack Software Engineer building web apps and distributed backend systems with{" "}
          <span className="text-slate-100 font-medium">TypeScript</span>,{" "}
          <span className="text-slate-100 font-medium">Next.js</span>, and{" "}
          <span className="text-slate-100 font-medium">NestJS</span>.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300 hover:text-slate-100 transition-colors select-none"
            aria-label="Open command menu"
          >
            <span>Explore Menu</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-xs border border-slate-800">
              ⌘K
            </kbd>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-950 font-medium transition-colors shadow-sm select-none"
          >
            <span>Download Resume</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
