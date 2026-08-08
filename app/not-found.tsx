import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Parsa",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
      <div className="p-4 rounded-full bg-theme-btnExploreBg border border-theme-border text-theme-accent mb-6 shadow-sm">
        <FileQuestion className="h-10 w-10" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-theme-text mb-2">Page Not Found</h1>

      <p className="text-theme-secondary text-sm leading-relaxed mb-8">
        The page you are looking for has been removed, renamed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-4 py-2 text-xs font-mono rounded bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all focus:outline-none shadow-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}
