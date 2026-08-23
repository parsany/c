"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import ImageFallback from "@/components/ImageFallback";

export interface ProjectData {
  id: number;
  slug?: string;
  name: string;
  description: string;
  date: string;
  image: string;
  project_image?: string[];
  tag: string[];
  isactive?: boolean;
  link?: string;
  links?: { label: string; url: string }[];
  role?: string;
  highlights?: string[];
  text?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const [imgError, setImgError] = React.useState(false);
  const primaryImage = project.image || (project.project_image && project.project_image[0]);

  return (
    <article className="group relative flex flex-col justify-between w-[320px] sm:w-[380px] md:w-[420px] h-[520px] sm:h-[560px] p-5 sm:p-6 rounded-xl bg-theme-cardBg border border-theme-cardBorder shadow-sm hover:border-theme-accent transition-all duration-300 select-none flex-shrink-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-theme-muted pb-2 border-b border-theme-border/50">
          <span>
            PROJ [{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]
          </span>
          <span>{project.date}</span>
        </div>

        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-lg border border-theme-border/60 bg-theme-panelBg">
          {primaryImage && !imgError ? (
            <Image
              src={primaryImage}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 320px, 420px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <ImageFallback label={project.name} />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-theme-text group-hover:text-theme-accent transition-colors line-clamp-1">
              {project.name}
            </h3>
            {project.role && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-panelBg border border-theme-border text-theme-muted flex-shrink-0">
                {project.role}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-theme-secondary line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-theme-border/40">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-12">
          {project.tag.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-panelBg text-theme-muted border border-theme-border/60"
            >
              {t}
            </span>
          ))}
          {project.tag.length > 5 && (
            <span className="text-[10px] font-mono text-theme-muted self-center">
              +{project.tag.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-mono pt-1">
          {project.slug ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-theme-accent font-semibold hover:underline"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-theme-accent font-semibold hover:underline"
            >
              <span>Visit Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-theme-muted text-[11px]">Internal / Enterprise</span>
          )}

          {project.isactive && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Active
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
