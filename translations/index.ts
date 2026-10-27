import { en } from "./en";
import { ru } from "./ru";
import { am } from "./am";
import { de } from "./de";

export type Locale = "en" | "ru" | "am" | "de";

export const LOCALES: { code: Locale; label: string; fullLabel: string }[] = [
  { code: "en", label: "EN", fullLabel: "English" },
  { code: "ru", label: "RU", fullLabel: "Русский" },
  { code: "am", label: "AM", fullLabel: "Հայերեն" },
  { code: "de", label: "DE", fullLabel: "Deutsch" },
];

export const translations: Record<Locale, typeof en> = {
  en,
  ru,
  am,
  de,
};

export type Translations = typeof en;
