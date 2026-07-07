import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import CommandMenu from "@/components/CommandMenu";
import { Sun, Moon } from "lucide-react";

const TerminalIntro = dynamic(() => import("@/components/TerminalIntro"), {
  ssr: false,
});

const SESSION_KEY = "terminal_seen";

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [transitioningTheme, setTransitioningTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    const seen = sessionStorage.getItem(SESSION_KEY);
    setShowTerminal(!seen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    if (transitioningTheme) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTransitioningTheme(nextTheme);

    setTimeout(() => {
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    }, 500);

    setTimeout(() => {
      setTransitioningTheme(null);
    }, 1000);
  };

  const handleTerminalDone = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowTerminal(false);
  }, []);

  return (
    <>
      <Head>
        <title>Parsa | Full-Stack Software Engineer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS."
        />
        <meta
          name="keywords"
          content="Parsa, Software Engineer, TypeScript, Next.js, NestJS, Full-Stack, Portfolio"
        />
        <meta property="og:title" content="Parsa | Full-Stack Software Engineer" />
        <meta
          property="og:description"
          content="Hi, I'm Parsa. I'm a Full-Stack Software Engineer building web apps and distributed backend systems with TypeScript, Next.js, and NestJS."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://parsany.github.io/c/" />
      </Head>

      <div className="min-h-screen bg-theme-bg text-theme-text antialiased selection:bg-theme-accentLight selection:text-theme-accentText transition-colors duration-200">
        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all shadow-sm focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-4.5 w-4.5" />
            ) : (
              <Sun className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        <main className="max-w-4xl mx-auto px-6 py-4">
          <Component {...pageProps} onOpenCommandMenu={() => setIsOpen(true)} />
        </main>
      </div>

      <CommandMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {showTerminal === true && (
        <TerminalIntro onDone={handleTerminalDone} />
      )}

      {transitioningTheme && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] -translate-x-1/2 -translate-y-1/2 rotate-[45deg]">
            <div
              className="w-full h-full animate-curtain-swipe"
              style={{
                background: transitioningTheme === "dark"
                  ? "linear-gradient(to bottom, rgba(40,40,40,0) 0%, rgba(40,40,40,1) 15%, rgba(40,40,40,1) 85%, rgba(40,40,40,0) 100%)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
