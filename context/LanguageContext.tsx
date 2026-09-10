"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, LOCALES, translations, Translations } from "@/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  locales: typeof LOCALES;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
  locales: LOCALES,
});

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // 1. Check cookies first, then localStorage
    const cookieLocale = getCookie("site_locale") as Locale | null;
    const localLocale = typeof localStorage !== "undefined" ? (localStorage.getItem("site_locale") as Locale | null) : null;
    const saved = cookieLocale || localLocale;

    if (saved && (saved === "en" || saved === "ru" || saved === "am")) {
      setLocaleState(saved);
      document.documentElement.lang = saved === "am" ? "hy" : saved;
      // Sync cookie and localStorage
      setCookie("site_locale", saved);
      localStorage.setItem("site_locale", saved);
    } else {
      // Auto-detect browser language
      const navLang = (navigator.language || "").toLowerCase();
      let detected: Locale = "en";
      if (navLang.startsWith("ru")) {
        detected = "ru";
      } else if (navLang.startsWith("hy") || navLang.startsWith("am")) {
        detected = "am";
      }
      setLocaleState(detected);
      document.documentElement.lang = detected === "am" ? "hy" : detected;
      setCookie("site_locale", detected);
      localStorage.setItem("site_locale", detected);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie("site_locale", newLocale);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("site_locale", newLocale);
    }
    document.documentElement.lang = newLocale === "am" ? "hy" : newLocale;
  };

  const t = translations[locale] || translations.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, locales: LOCALES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
