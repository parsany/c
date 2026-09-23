"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
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

function getLocaleSnapshot(): Locale {
  if (typeof document === "undefined") return "en";
  const cookieLocale = getCookie("site_locale") as Locale | null;
  const localLocale = typeof localStorage !== "undefined" ? (localStorage.getItem("site_locale") as Locale | null) : null;
  const saved = cookieLocale || localLocale;

  if (saved === "en" || saved === "ru" || saved === "am") {
    return saved;
  }

  const navLang = (navigator.language || "").toLowerCase();
  if (navLang.startsWith("ru")) return "ru";
  if (navLang.startsWith("hy") || navLang.startsWith("am")) return "am";
  return "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribeLocale(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("locale-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("locale-change", callback);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale === "am" ? "hy" : locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setCookie("site_locale", newLocale);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("site_locale", newLocale);
    }
    document.documentElement.lang = newLocale === "am" ? "hy" : newLocale;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("locale-change"));
    }
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
