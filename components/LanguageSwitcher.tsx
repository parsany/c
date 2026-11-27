"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
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

export function FlagDe({ className = "w-4.5 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`${className} rounded-[2px] overflow-hidden shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="10" y="0" fill="#000000" />
      <rect width="60" height="10" y="10" fill="#DD0000" />
      <rect width="60" height="10" y="20" fill="#FFCE00" />
    </svg>
  );
}

export function FlagIcon({ locale, className }: { locale: Locale; className?: string }) {
  if (locale === "ru") return <FlagRu className={className} />;
  if (locale === "am") return <FlagAm className={className} />;
  if (locale === "de") return <FlagDe className={className} />;
  return <FlagEn className={className} />;
}

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${currentLocale.fullLabel}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-theme-btnExploreBg/80 hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-text transition-all shadow-xs cursor-pointer"
      >
        <FlagIcon locale={locale} className="w-4.5 h-3 border border-black/10 dark:border-white/10" />
        <ChevronDown className={`h-3 w-3 text-theme-muted transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selector"
          className="absolute right-0 mt-2 w-40 rounded-xl bg-theme-panelBg border border-theme-panelBorder shadow-xl py-1 z-50 font-mono text-xs"
        >
          {locales.map((item) => {
            const isActive = locale === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLocale(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer ${
                  isActive
                    ? "bg-theme-accentLight text-theme-accentText font-semibold"
                    : "text-theme-text hover:bg-theme-bg/60"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FlagIcon locale={item.code} className="w-4.5 h-3 border border-black/10 dark:border-white/10" />
                  <span>{item.fullLabel}</span>
                </span>
                {isActive && <Check className="h-3 w-3 text-theme-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
