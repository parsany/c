import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="pt-8 md:pt-12 pb-12 border-b border-theme-border" id="about-section">
      <h2 className="text-xl font-bold tracking-tight text-theme-text mb-6">About Me</h2>
      <div className="space-y-4 text-theme-secondary text-sm md:text-base leading-relaxed max-w-2xl">
        <p>
          I build things for the web. On the product side, I&apos;ve shipped real-time chat systems, ride-sharing applications, and e-commerce platforms. On the side, I tinker with Linux, writing PyTorch models, and open-source tooling — mostly because I find them interesting.
        </p>
        <p>
          I write TypeScript, prefer boring and correct over clever and broken, and I like working on projects where the code directly affects how something feels to use.
        </p>
        <div className="pt-2">
          <Link
            href="/about"
            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
          >
            <span>More about me</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
