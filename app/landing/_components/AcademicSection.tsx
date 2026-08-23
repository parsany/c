"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Terminal, Cpu } from "lucide-react";

export interface AcademicProject {
  id: number;
  name: string;
  description: string;
  date: string;
  image?: string;
  link?: string;
  video?: string;
  tag: string[];
}

interface AcademicSectionProps {
  projects: AcademicProject[];
}

export default function AcademicSection({ projects }: AcademicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".acad-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
            <Cpu className="w-3.5 h-3.5 text-theme-accent" />
            <span>Academic &amp; R&amp;D Projects</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-theme-text">
            Machine Learning, Computer Vision &amp; Algorithms
          </h2>
          <p className="text-xs font-mono text-theme-muted">
            Personal research, coursework, and open-source experimental software
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="acad-card flex flex-col justify-between p-5 rounded-xl bg-theme-cardBg border border-theme-cardBorder hover:border-theme-accent transition-all duration-300 space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-theme-muted">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-theme-accent" />
                    <span>{proj.date}</span>
                  </span>
                  <div className="flex gap-1">
                    {proj.tag.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-theme-panelBg border border-theme-border text-theme-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-theme-text">{proj.name}</h3>

                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {proj.link && (
                <div className="pt-2 border-t border-theme-border/40">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-theme-accent hover:underline font-semibold"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
