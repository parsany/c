import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

interface HeroContentProps {
  onOpenCommandMenu: () => void;
  showTrigger?: boolean;
  panelOpen?: boolean;
  onOpenPanel?: () => void;
}

export default function HeroContent({
  onOpenCommandMenu,
  showTrigger,
  panelOpen,
  onOpenPanel,
}: HeroContentProps) {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-theme-text leading-[1.1] mb-6">
        Hi, I&apos;m Parsa — Full-Stack Software Engineer.
      </h1>

      <p className="text-xl md:text-2xl text-theme-secondary leading-relaxed font-normal tracking-wide mb-8 max-w-3xl">
        I build full-stack web apps end-to-end — from architecture to deployment
        — mainly with{" "}
        <span className="text-theme-text font-semibold">TypeScript</span>,{" "}
        <span className="text-theme-text font-semibold">Next.js</span>, and{" "}
        <span className="text-theme-text font-semibold">NestJS</span>. I&apos;ve
        shipped real products, sometimes solo, sometimes with teams of 7+ engineers
        and designers.
      </p>

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm font-medium w-full sm:w-auto">
        {showTrigger && !panelOpen && (
          <div className="sm:hidden absolute -top-11 right-0 z-20 flex items-center gap-1.5 group select-none" data-no-destroy="true">
            <button
              onClick={onOpenPanel}
              data-no-destroy="true"
              aria-label="Cross Options"
              className="relative overflow-hidden w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-all duration-300 active:scale-95 shadow-sm"
              style={{
                background: "var(--cross-trigger-bg)",
                borderColor: "var(--cross-trigger-border)",
                color: "var(--cross-trigger-color)",
              }}
            >
              <span className="relative z-10 text-[11px] font-bold">✛</span>
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2.5 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 select-none text-xs sm:text-sm text-center"
          >
            <span className="truncate">Download Resume</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>

          <Link
            href="/contact"
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none text-xs sm:text-sm text-center"
          >
            <span className="truncate">Get in touch</span>
            <Mail className="h-4 w-4 text-theme-muted shrink-0" />
          </Link>
        </div>

        <button
          onClick={onOpenCommandMenu}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none font-mono text-xs w-full sm:w-auto"
          aria-label="Open command menu"
        >
          <span>Explore Menu</span>
          <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-theme-bg text-theme-muted text-[10px] border border-theme-border">
            ⌘K
          </kbd>
        </button>
      </div>
    </>
  );
}