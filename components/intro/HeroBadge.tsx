import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroBadgeProps {
  allEaten: boolean;
  onStartGame?: () => void;
}

export default function HeroBadge({ allEaten, onStartGame }: HeroBadgeProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-6 select-none" data-no-destroy="true">
        <span className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-rose-400 tracking-widest uppercase flex items-center h-8">
          {t.hero.badge}
        </span>

        {allEaten && (
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-resume-modal"));
            }}
            data-no-destroy="true"
            className="relative z-[10000] pointer-events-auto inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 leading-none select-none h-8 cursor-pointer"
          >
            <span>📄 {t.hero.downloadResume}</span>
            <span>&rarr;</span>
          </a>
        )}
      </div>
    </>
  );
}

