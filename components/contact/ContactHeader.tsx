"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactHeader() {
  const { t } = useLanguage();

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        <span>{t.common.backToHome}</span>
      </Link>

      <header className="space-y-3 mb-10 border-b border-theme-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">{t.contact.pageTitle}</h1>
        <p className="text-theme-secondary text-sm md:text-base leading-relaxed pt-1">
          {t.contact.pageSubtitle}
        </p>
      </header>
    </>
  );
}

