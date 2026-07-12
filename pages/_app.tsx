import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";
import CommandMenu from "@/components/CommandMenu";
import { Sun, Moon } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [transitioningTheme, setTransitioningTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }

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



  return (
    <>
      <Head>
        <title>Parsa | Personal Portfolio</title>
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
        <link rel="canonical" href="https://parsany.ir" key="canonical" />
      </Head>

      <div className="min-h-screen text-theme-text antialiased selection:bg-theme-accentLight selection:text-theme-accentText transition-colors duration-200">
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

      {transitioningTheme && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] -translate-x-1/2 -translate-y-1/2 rotate-[45deg]">
            <div
              className="w-full h-full animate-curtain-swipe"
              style={{
                background: transitioningTheme === "dark"
                  ? "linear-gradient(to bottom, var(--curtain-bg-dark-fade) 0%, var(--curtain-bg-dark-solid) 15%, var(--curtain-bg-dark-solid) 85%, var(--curtain-bg-dark-fade) 100%)"
                  : "linear-gradient(to bottom, var(--curtain-bg-light-fade) 0%, var(--curtain-bg-light-solid) 15%, var(--curtain-bg-light-solid) 85%, var(--curtain-bg-light-fade) 100%)"
              }}
            />
          </div>

          <style>{`
            @keyframes curtain-text-in {
              0%   { opacity: 0; transform: translateY(6px) scale(0.97); }
              22%  { opacity: 1; transform: translateY(0)   scale(1);    }
              72%  { opacity: 1; transform: translateY(0)   scale(1);    }
              100% { opacity: 0; transform: translateY(-6px) scale(0.97);}
            }
            .curtain-text { animation: curtain-text-in 1.0s cubic-bezier(0.85,0,0.15,1) forwards; }
          `}</style>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="curtain-text flex flex-col items-center gap-3 select-none"
              style={{
                color: transitioningTheme === "dark" ? "var(--curtain-text-dark)" : "var(--curtain-text-light)",
                fontFamily: "'VT323','Courier New',monospace",
              }}
            >
              <span style={{ fontSize: "2.2rem", lineHeight: 1, letterSpacing: "0.05em" }}>✛</span>

              <span style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "ui-sans-serif,system-ui,sans-serif", fontWeight: 600 }}>
                {transitioningTheme === "dark" ? "switching to dark" : "switching to light"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
