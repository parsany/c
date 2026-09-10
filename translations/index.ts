import { en } from "./en";
import { ru } from "./ru";
import { am } from "./am";

export type Locale = "en" | "ru" | "am";

export const LOCALES: { code: Locale; label: string; fullLabel: string }[] = [
  { code: "en", label: "EN", fullLabel: "English" },
  { code: "ru", label: "RU", fullLabel: "Русский" },
  { code: "am", label: "AM", fullLabel: "Հայերեն" },
];

export const translations: Record<Locale, typeof en> = {
  en,
  ru,
  am,
};

export type Translations = typeof en;
