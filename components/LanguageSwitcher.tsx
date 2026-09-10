"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLanguage();

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder shadow-sm select-none"
      role="group"
      aria-label="Language selector"
    >
      {locales.map((item) => {
        const isActive = locale === item.code;
        return (
          <button
            key={item.code}
            onClick={() => setLocale(item.code)}
            title={item.fullLabel}
            className={`px-2 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
              isActive
                ? "bg-theme-bg text-theme-text border border-theme-border shadow-xs scale-100"
                : "text-theme-muted hover:text-theme-text hover:bg-theme-bg/40 border border-transparent"
            }`}
            aria-pressed={isActive}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
