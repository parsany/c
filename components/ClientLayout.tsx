"use client";

import "@/styles/globals.css";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandMenu from "@/components/CommandMenu";
import ResumeModal from "@/components/ResumeModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Sun, Moon, Search } from "lucide-react";

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as "light" | "dark") || "dark";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "dark";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
  };
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/landing";
  const isGame = pathname === "/game" || pathname?.startsWith("/game");
  const isFullScreen = isLanding || isGame;
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [transitioningTheme, setTransitioningTheme] = useState<"light" | "dark" | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpenMenu = () => setIsOpen(true);
    const handleCustomOpenResume = () => setIsResumeOpen(true);

    const handleGlobalResumeClick = (e: MouseEvent) => {
      if (window.location.pathname === "/cv" || window.location.pathname.startsWith("/cv/")) {
        return;
      }
      const target = (e.target as HTMLElement).closest('a[href*="resume.pdf"], a[href*="_resume.pdf"], a[href*="CV.pdf"], a[href*="Parsa_niavand_CV.pdf"]');
      if (target) {
        if (target.getAttribute("data-no-modal") === "true" || target.closest('[role="dialog"]')) {
          return;
        }
        e.preventDefault();
        setIsResumeOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleCustomOpenMenu);
    window.addEventListener("open-resume-modal", handleCustomOpenResume);
    document.addEventListener("click", handleGlobalResumeClick, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleCustomOpenMenu);
      window.removeEventListener("open-resume-modal", handleCustomOpenResume);
      document.removeEventListener("click", handleGlobalResumeClick, true);
    };
  }, []);

  const toggleTheme = () => {
    if (transitioningTheme) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTransitioningTheme(nextTheme);

    setTimeout(() => {
      localStorage.setItem("theme", nextTheme);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("theme-change"));
      }
    }, 275);

    setTimeout(() => {
      setTransitioningTheme(null);
    }, 550);
  };

  const navLinks = [
    { href: "/#projects", label: t.projects.tabProjects, match: "/projects" },
    { href: "/about", label: t.about.title, match: "/about" },
    { href: "/posts", label: t.writings.pageTitle, match: "/posts" },
    { href: "/cv", label: "CV", match: "/cv" },
    { href: "/contact", label: t.contact.pageTitle, match: "/contact" },
  ];

  return (
    <>
      <div className="min-h-screen text-theme-text antialiased selection:bg-theme-accentLight selection:text-theme-accentText transition-colors duration-200">
        {!isGame && (
          <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out pointer-events-none ${
              isScrolled ? "pt-3 px-3 sm:px-6" : "pt-0 px-0"
            }`}
          >
            <div
              className={`pointer-events-auto mx-auto flex items-center justify-between gap-3 transition-all duration-300 ease-out ${
                isScrolled
                  ? "max-w-3xl h-12 px-4 sm:px-5 rounded-full backdrop-blur-xl bg-theme-bg/75 border border-theme-border/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                  : "max-w-5xl h-16 px-4 sm:px-6 rounded-none bg-transparent border border-transparent"
              }`}
            >
              <Link
                href="/"
                className="font-mono text-sm font-bold tracking-tight text-theme-text hover:text-theme-accent transition-colors shrink-0"
              >
                parsa<span className="text-theme-accent">.</span>
              </Link>

              <nav className="hidden md:flex items-center gap-5 text-xs font-mono" aria-label="Primary">
                {navLinks.map((item) => {
                  const isActive = pathname === item.match || pathname?.startsWith(`${item.match}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-theme-accent font-semibold"
                          : "text-theme-muted hover:text-theme-text"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-theme-btnExploreBg/80 hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-muted hover:text-theme-text transition-all text-xs font-mono cursor-pointer"
                  aria-label={t.hero.exploreMenu}
                  title={t.hero.exploreMenu}
                >
                  <Search className="h-3.5 w-3.5" />
                  <kbd className="hidden sm:inline-block text-[10px] opacity-80">⌘K</kbd>
                </button>
                <LanguageSwitcher />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-theme-btnExploreBg/80 hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all shadow-xs focus:outline-none cursor-pointer"
                  aria-label={t.common.toggleTheme}
                  title={t.common.toggleTheme}
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </header>
        )}

        {isFullScreen ? (
          children
        ) : (
          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            {children}
          </main>
        )}
      </div>

      <CommandMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

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
            .curtain-text { animation: curtain-text-in 0.55s cubic-bezier(0.85,0,0.15,1) forwards; }
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
                {transitioningTheme === "dark" ? t.common.switchingToDark : t.common.switchingToLight}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InnerLayout>{children}</InnerLayout>
    </LanguageProvider>
  );
}

