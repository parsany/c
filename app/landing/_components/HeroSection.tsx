"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Terminal, FileText } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.fromTo(
        ".hero-mono-tag",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-tags-row",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-footer-row",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      gsap.to(".hero-main-content", {
        opacity: 0.2,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between max-w-5xl mx-auto px-6 sm:px-10 pt-10 pb-12 border-b border-theme-border"
    >
      <div className="hero-mono-tag flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-theme-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>parsany.com</span>
        </Link>
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-theme-accent" />
          <span>Parsa</span>
        </span>
      </div>

      <div className="hero-main-content my-auto py-12 space-y-6">
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-theme-text leading-[1.08]">
          Full-Stack Software Engineer &amp; Systems Developer
        </h1>

        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-theme-secondary font-normal max-w-3xl leading-relaxed">
          Building high-performance web applications, distributed backends, and machine learning experiments from ground zero.
        </p>

        <div className="hero-tags-row flex flex-wrap gap-2 pt-2 text-xs font-mono text-theme-muted">
          {["Next.js / React", "NestJS / Node.js", "TypeScript", "PostgreSQL / Redis", "Python / ML", "Linux R&D"].map(
            (item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded bg-theme-panelBg border border-theme-border text-theme-secondary"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <div className="hero-footer-row flex items-center justify-between text-xs font-mono text-theme-muted border-t border-theme-border/60 pt-6">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-theme-accent animate-bounce" />
          <span>Scroll to explore projects</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="hover:text-theme-text transition-colors"
          >
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-resume-modal"));
            }}
            className="hover:text-theme-text transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
        </div>
      </div>
    </section>
  );
}
