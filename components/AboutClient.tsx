"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Terminal, Code, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <article className="max-w-2xl mx-auto py-12">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{t.common.backToHome}</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 md:gap-12 items-start mb-8">
        <div className="space-y-4">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-theme-text">{t.about.title}</h1>
          </header>
          <p className="text-theme-secondary text-sm md:text-base leading-relaxed">
            {t.about.pageIntro}
          </p>
        </div>

        <div className="flex justify-center md:justify-end pt-2 md:pt-0">
          <div className="relative group/image select-none">
            <div className="absolute inset-0 rounded-xl bg-theme-accent/20 translate-x-3 translate-y-3 transition-all duration-300 ease-out group-hover/image:translate-x-1.5 group-hover/image:translate-y-1.5 group-hover/image:bg-theme-accent/30" />

            <div className="relative w-[180px] rounded-xl border-2 border-theme-border bg-theme-cardBg p-2.5 shadow-md transition-all duration-300 ease-out -rotate-3 group-hover/image:rotate-0 group-hover/image:border-theme-accent">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-theme-btnExploreBg border border-theme-border/50">
                <Image
                  src="/content/main.jpg"
                  alt="Parsa"
                  fill
                  sizes="180px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-2.5 flex items-center justify-center text-[9px] font-mono text-theme-secondary px-0.5">
                <span>parsa.jpg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-none text-theme-secondary text-sm md:text-base leading-relaxed space-y-6">
        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-theme-accent" />
          <span>{t.about.sectionStarted}</span>
        </h2>
        <p>
          {t.about.startedP1}
        </p>
        <p>
          {t.about.startedP2}
        </p>
        <p>
          {t.about.startedP3}
        </p>

        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-theme-accent" />
          <span>{t.about.sectionRD}</span>
        </h2>
        <p>
          {t.about.rdP1}
        </p>

        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Code className="h-4 w-4 text-theme-accent" />
          <span>{t.about.sectionPhilosophy}</span>
        </h2>
        <p>
          {t.about.philosophyP1}
        </p>
        <p>
          {t.about.philosophyP2}
        </p>
      </div>

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; {t.common.backToHome}
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("open-resume-modal"));
          }}
          className="hover:text-theme-text transition-colors cursor-pointer"
        >
          {t.common.openToWorkCv}
        </a>
      </footer>
    </article>
  );
}
