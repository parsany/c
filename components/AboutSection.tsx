"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="pt-8 md:pt-12 pb-12 border-b border-theme-border" id="about-section">
      <h2 className="text-xl font-bold tracking-tight text-theme-text mb-6">{t.about.title}</h2>
      <div className="space-y-4 text-theme-secondary text-sm md:text-base leading-relaxed max-w-2xl">
        <p>
          {t.about.previewText1}
        </p>
        <p>
          {t.about.previewText2}
        </p>
        <div className="pt-2">
          <Link
            href="/about"
            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
          >
            <span>{t.about.moreAboutMe}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

