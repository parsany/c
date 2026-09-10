"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function ContactFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
      <Link href="/" className="hover:text-theme-text transition-colors">
        &larr; {t.common.backToHome}
      </Link>
      <Link href="/about" className="hover:text-theme-text transition-colors">
        {t.about.title}
      </Link>
    </footer>
  );
}
