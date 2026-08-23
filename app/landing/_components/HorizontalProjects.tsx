"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { Terminal, ArrowRight } from "lucide-react";

interface HorizontalProjectsProps {
  projects: ProjectData[];
}

export default function HorizontalProjects({ projects }: HorizontalProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="projects-horizontal-pin"
      className="relative w-full overflow-hidden border-b border-theme-border bg-theme-bg"
    >
      <div className="w-full px-6 sm:px-10 pt-6 pb-4 border-b border-theme-border/40 flex items-center justify-between text-xs font-mono text-theme-muted z-10 bg-theme-bg">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-theme-accent" />
          <span>Professional Projects [{projects.length}]</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Scroll to scrub</span>
          <ArrowRight className="w-3.5 h-3.5 text-theme-accent" />
        </div>
      </div>

      <div className="w-full h-0.5 bg-theme-border/40 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-theme-accent origin-left transition-transform duration-75"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="relative w-full h-[calc(100vh-80px)] flex items-center">
        <div
          ref={trackRef}
          className="projects-track flex items-center gap-6 sm:gap-8 px-6 sm:px-12 py-6"
        >
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.id || idx}
              project={proj}
              index={idx}
              total={projects.length}
            />
          ))}

          <div className="w-[240px] h-[520px] sm:h-[560px] rounded-xl border border-dashed border-theme-border/60 flex flex-col items-center justify-center text-center p-6 space-y-3 flex-shrink-0 text-theme-muted font-mono">
            <span className="text-2xl text-theme-accent">✓</span>
            <span className="text-[11px] text-theme-secondary">
              Scroll further for Academic &amp; R&amp;D projects ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
