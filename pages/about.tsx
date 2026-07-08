import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Terminal, Code, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <article className="max-w-2xl mx-auto py-12">
      <Head>
        <title>About Parsa | Full-Stack Software Engineer</title>
        <meta
          name="description"
          content="Parsa is a full-stack software engineer who builds web applications and experiments with machine learning."
        />
      </Head>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">About Me</h1>
        <p className="text-theme-muted text-xs font-mono">/usr/bin/parsa --verbose</p>
      </header>

      <div className="max-w-none text-theme-secondary text-sm md:text-base leading-relaxed space-y-6">
        <p>
          Hi, I&apos;m Parsa. I like building things for the web. I work across the full stack — from React UIs to distributed backends — and spend a good chunk of my free time on personal R&D: Linux, AI stuff, and playing with open-source stuff.
        </p>

        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-theme-accent" />
          <span>How I Started</span>
        </h2>
        <p>
          I started programming when I wanted to build tools for myself rather than using heavy, generic software that didn&apos;t fit my workflow. the itch to optimize existing systems led me down the rabbit hole of computer science.
        </p>
        <p>
          Since then, I&apos;ve worked both solo and in teams of up to 7+ engineers. On the product side, I&apos;ve  designed e-commerce websites, scaled location tracking infrastructure for GPS-tracking systems, and built websockets for chat applications.
        </p>

        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-theme-accent" />
          <span>Research & Development (R&D)</span>
        </h2>
        <p>
          Beyond product engineering, I love digging into algorithms. I&apos;ve trained custom VAEs to detect geological mineral zones in highly imbalanced spectroscopic data, and CNNs to recognize labeled data.
        </p>

        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Code className="h-4 w-4 text-theme-accent" />
          <span>Philosophy</span>
        </h2>
        <p>
          I believe code should be written for humans to read first. That means TypeScript as a default, avoiding over-abstraction, and actually profiling before assuming something is slow.
        </p>
        <p>
          I can take a product from a description to a deployed stack — database schema, API, UI, and everything in between. I like projects where the engineering decisions visibly affect the end result.
        </p>
      </div>

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <span>Open to work</span>
      </footer>
    </article>
  );
}
