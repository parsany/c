"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Terminal } from "lucide-react";

export default function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-5xl mx-auto px-6 sm:px-10 py-20 border-b border-theme-border"
    >
      <div className="space-y-6">
        <div className="about-animate-item flex items-center gap-2 text-xs font-mono text-theme-muted">
          <Terminal className="w-3.5 h-3.5 text-theme-accent" />
          <span>About</span>
        </div>

        <h2 className="about-animate-item text-2xl sm:text-4xl font-bold tracking-tight text-theme-text">
          Engineering products across the full stack
        </h2>

        <p className="about-animate-item text-theme-secondary text-base sm:text-lg leading-relaxed max-w-3xl">
          I design and build web applications, scaled location tracking systems, real-time communication platforms, and enterprise management panels. My background spans neural network research (CNNs, VAEs) to production Next.js &amp; NestJS monorepos.
        </p>

        <div className="about-animate-item grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg bg-theme-panelBg border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-theme-accent font-semibold">
              <Code className="w-4 h-4" />
              <span>Full-Stack Web</span>
            </div>
            <p className="text-xs text-theme-muted leading-normal">
              Next.js App Router, React 19, NestJS APIs, PostgreSQL, Redis, Turborepo monorepos.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-theme-panelBg border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-theme-accent font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Machine Learning & R&amp;D</span>
            </div>
            <p className="text-xs text-theme-muted leading-normal">
              Spectroscopic anomaly detection VAEs, CNN emotion models, PID optimization.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-theme-panelBg border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-theme-accent font-semibold">
              <Terminal className="w-4 h-4" />
              <span>Systems & Infrastructure</span>
            </div>
            <p className="text-xs text-theme-muted leading-normal">
              Self-hosted MinIO/S3, Socket.io real-time websockets, Linux optimization &amp; static export pipelines.
            </p>
          </div>
        </div>

        <div className="about-animate-item pt-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-mono text-theme-accent hover:text-theme-accentHover transition-colors font-medium"
          >
            <span>Read full bio and philosophy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
