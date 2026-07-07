import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";
import CommandMenu from "@/components/CommandMenu";

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("bg-slate-950", "text-slate-100");

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-slate-800 selection:text-slate-100">
        <main className="max-w-4xl mx-auto px-6 py-4">
          <Component {...pageProps} onOpenCommandMenu={() => setIsOpen(true)} />
        </main>
      </div>

      <CommandMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
