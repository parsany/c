import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-theme-text leading-[1.15]">
          {t.hero.title}
        </h1>

        <div className="md:hidden flex-shrink-0">
          <div
            className="relative group w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-theme-border bg-theme-btnExploreBg shadow-md"
            data-attackable="true"
          >
            <Image
              src="/content/portrait.jpg"
              alt="Parsa Niavand — Full-Stack Software Engineer"
              fill
              sizes="(max-width: 640px) 112px, 128px"
              className="object-cover object-center scale-[1.14] transition-transform duration-300 ease-out group-hover:scale-[1.18]"
              priority
            />
          </div>
        </div>
      </div>

      <p className="text-xl md:text-2xl text-theme-secondary leading-relaxed font-normal tracking-wide mb-8 max-w-3xl">
        {t.hero.description}
      </p>

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm font-medium w-full sm:w-auto">
        {showTrigger && !panelOpen && (
          <div className="sm:hidden absolute -top-11 right-0 z-20 flex items-center gap-1.5 group select-none" data-no-destroy="true">
            <button
              onClick={onOpenPanel}
              data-no-destroy="true"
              aria-label={t.hero.crossOptions}
              title={t.hero.crossOptions}
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
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-resume-modal"));
            }}
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2.5 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-slate-950 font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 select-none text-xs sm:text-sm text-center cursor-pointer"
          >
            <span className="truncate">{t.hero.downloadResume}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>

          <Link
            href="/contact"
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none text-xs sm:text-sm text-center"
          >
            <span className="truncate">{t.hero.getInTouch}</span>
            <Mail className="h-4 w-4 text-theme-muted shrink-0" />
          </Link>
        </div>

        <button
          onClick={onOpenCommandMenu}
          className="group/cmd flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none font-mono text-xs w-full sm:w-auto cursor-pointer"
          aria-label={t.hero.exploreMenu}
        >
          <span>{t.hero.exploreMenu}</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-theme-bg text-theme-accent font-semibold text-[10px] border border-theme-accent/30 group-hover/cmd:border-theme-accent transition-colors">
            ⌘K
          </kbd>
        </button>
      </div>
    </>
  );
}