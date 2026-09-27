"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/translations";

export function FlagEn({ className = "w-4.5 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`${className} rounded-[2px] overflow-hidden shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <clipPath id="uk-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-diag">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#uk-diag)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function FlagRu({ className = "w-4.5 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`${className} rounded-[2px] overflow-hidden shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="10" y="0" fill="#ffffff" />
      <rect width="60" height="10" y="10" fill="#0039A6" />
      <rect width="60" height="10" y="20" fill="#D52B1E" />
    </svg>
  );
}

export function FlagAm({ className = "w-4.5 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`${className} rounded-[2px] overflow-hidden shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="10" y="0" fill="#D90012" />
      <rect width="60" height="10" y="10" fill="#0033A0" />
      <rect width="60" height="10" y="20" fill="#F2A800" />
    </svg>
  );
}

export function FlagIcon({ locale, className }: { locale: Locale; className?: string }) {
  if (locale === "ru") return <FlagRu className={className} />;
  if (locale === "am") return <FlagAm className={className} />;
  return <FlagEn className={className} />;
}

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLanguage();

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder shadow-sm select-none gap-0.5"
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
            className={`p-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-theme-bg border border-theme-border shadow-xs opacity-100 scale-105"
                : "opacity-50 hover:opacity-100 hover:bg-theme-bg/40 border border-transparent"
            }`}
            aria-pressed={isActive}
            aria-label={item.fullLabel}
          >
            <FlagIcon locale={item.code} className="w-5 h-3.5 border border-black/10 dark:border-white/10" />
          </button>
        );
      })}
    </div>
  );
}
