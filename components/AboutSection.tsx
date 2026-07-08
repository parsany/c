import React from "react";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="pt-8 md:pt-12 pb-10 md:pb-16 border-b border-theme-border" id="about-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-theme-text mb-2">About Me</h2>
          <p className="text-theme-muted text-sm md:text-base max-w-2xl font-mono">
            /dev/profile - overview of engineering values
          </p>
        </div>
      </div>

      <div className="bg-theme-cardBg border border-theme-cardBorder hover:border-theme-accent/40 rounded-xl p-6 md:p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(37,99,235,0.02)] dark:hover:shadow-[0_8px_30px_rgba(250,189,47,0.02)] flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
        <div className="flex-shrink-0 p-3 rounded-xl bg-theme-btnExploreBg border border-theme-border text-theme-accent">
          <User className="h-8 w-8" />
        </div>
        <div className="flex-1 space-y-4">
          <p className="text-theme-secondary text-sm md:text-base leading-relaxed">
            I am a full-stack engineer and R&D developer who loves building systems that scale and coding interactions that feel alive. I divide my time between shipping practical web applications and experimenting with low-level systems, compiler design, and machine learning models.
          </p>
          <p className="text-theme-secondary text-sm md:text-base leading-relaxed">
            My philosophy is simple: write clean, type-safe code, design for efficiency, and don't shy away from hard engineering problems. Whether it's building real-time messaging pipelines or training convolutional networks, I strive to make it performant and polished.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-theme-accent hover:text-theme-accentHover transition-colors border border-theme-border hover:border-theme-accent rounded px-3 py-1.5 bg-theme-btnExploreBg"
            >
              <span>Read my full story</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
