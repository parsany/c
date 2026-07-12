import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
        <link rel="canonical" href="https://parsany.com/about" key="canonical" />
      </Head>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to home</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 md:gap-12 items-start mb-8">
        <div className="space-y-4">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-theme-text">About Me</h1>
            <p className="text-theme-muted text-xs font-mono">/usr/bin/parsa --verbose</p>
          </header>
          <p className="text-theme-secondary text-sm md:text-base leading-relaxed">
            Hi, I&apos;m Parsa. I like building things for the web. I work across the full stack — from React UIs to distributed backends — and spend a good chunk of my free time on personal R&D: Linux, AI models, and playing with open-source stuff.
          </p>
        </div>

        <div className="flex justify-center md:justify-end pt-2 md:pt-0">
          <div className="relative group/image select-none">
            <div className="absolute inset-0 rounded-xl bg-theme-accent/20 translate-x-3 translate-y-3 transition-all duration-300 ease-out group-hover/image:translate-x-1.5 group-hover/image:translate-y-1.5 group-hover/image:bg-theme-accent/30" />

            <div className="relative w-[180px] rounded-xl border-2 border-theme-border bg-theme-cardBg p-2.5 shadow-md transition-all duration-300 ease-out -rotate-3 group-hover/image:rotate-0 group-hover/image:border-theme-accent">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-theme-btnExploreBg border border-theme-border/50">
                <Image
                  src="/content/main.jpg"
                  alt="Parsa"
                  fill
                  sizes="180px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-2.5 flex items-center justify-center text-[9px] font-mono text-theme-secondary px-0.5">
                <span>parsa.jpg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-none text-theme-secondary text-sm md:text-base leading-relaxed space-y-6">
        <h2 className="text-lg font-semibold text-theme-text mt-8 mb-3 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-theme-accent" />
          <span>How I Started</span>
        </h2>
        <p>
          I started programming when I wanted to build tools for myself rather than using heavy, generic software that didn&apos;t fit my workflow. The itch to optimize existing systems led me down the rabbit hole of computer science.
        </p>
        <p>
          For a while that meant neural networks and ML — training models, reading papers, the academic side of things. But most people building real products needed websites, and if they wanted ML it was as a backend service, not a research project. So I moved into web development. Turns out a full stack has enough moving parts to stay interesting.
        </p>
        <p>
          Since then, I&apos;ve worked both solo and in teams of up to 7+ engineers. On the product side, I&apos;ve designed e-commerce websites, scaled location tracking infrastructure for GPS-tracking systems, and built real-time chat applications.
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
