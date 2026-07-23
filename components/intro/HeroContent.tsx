import React from "react";

interface HeroContentProps {
  onOpenCommandMenu: () => void;
}

export default function HeroContent({ onOpenCommandMenu }: HeroContentProps) {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-theme-text leading-[1.1] mb-6">
        Hi, I&apos;m Parsa.
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

      <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
        <button
          onClick={onOpenCommandMenu}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none"
          aria-label="Open command menu"
        >
          <span>Explore Menu</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-theme-bg text-theme-muted text-[10px] border border-theme-border">
            ⌘K
          </kbd>
        </button>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold transition-all shadow-sm hover:shadow select-none"
        >
          <span>Download Resume</span>
          <span>&rarr;</span>
        </a>
      </div>
    </>
  );
}
