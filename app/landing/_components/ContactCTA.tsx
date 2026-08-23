"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Mail, Github, FileText, ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-animate",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="max-w-5xl mx-auto px-6 sm:px-10 py-20 space-y-12"
    >
      <div className="space-y-8 max-w-3xl">
        <div className="space-y-6 border-t border-theme-border/60 pt-8">
          <span className="cta-animate text-xs font-mono text-theme-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Available for contract &amp; full-time positions
          </span>

          <h2 className="cta-animate text-3xl sm:text-5xl font-bold tracking-tight text-theme-text">
            Let&apos;s build something exceptional.
          </h2>

          <p className="cta-animate text-theme-secondary text-base sm:text-lg">
            Whether you need a full-stack platform, high-performance web engineering, or machine learning infrastructure, feel free to reach out.
          </p>

          <div className="cta-animate flex flex-wrap gap-3.5 pt-2 text-xs font-mono">
            <a
              href="mailto:parsa@parsany.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-theme-accent text-slate-950 font-bold hover:bg-theme-accentHover transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>parsa@parsany.com</span>
            </a>

            <a
              href="https://github.com/parsany"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-theme-panelBg border border-theme-border text-theme-text hover:border-theme-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>github.com/parsany</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-resume-modal"));
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-theme-panelBg border border-theme-border text-theme-text hover:border-theme-accent transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume / CV</span>
            </a>
          </div>
        </div>

        <div className="cta-animate pt-4">
          <ContactForm />
        </div>
      </div>

      <div className="cta-animate pt-12 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-theme-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to main site</span>
        </Link>
        <span>© {new Date().getFullYear()} Parsa</span>
      </div>
    </footer>
  );
}
