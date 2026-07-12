import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ProjectProfessional, ProjectAcademic } from "@/public/JSONJS";
import {
  AIVisualizer,
  GameVisualizer,
  AppVisualizer,
  CompilerVisualizer,
} from "./ArchitectureSVG";
import { ArrowRight } from "lucide-react";
import OpenLinks from "./OpenLinks";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectCardProps {
  id: string | number;
  slug?: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  links?: { label: string; url: string }[];
  isProfessional: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  renderArchitecture: () => React.ReactNode;
  image?: string;
  video?: string;
  projectImages?: string[];
}

function ProjectCard({
  slug,
  name,
  description,
  tags,
  link,
  links,
  isProfessional,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  renderArchitecture,
  image,
  video,
  projectImages,
}: ProjectCardProps) {
  if (isProfessional) {
    return (
      <article
        className="group relative flex flex-col justify-between bg-theme-cardBg border border-theme-cardBorder hover:border-theme-accent/60 rounded-xl p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_8px_30px_rgba(250,189,47,0.04)] focus-within:ring-2 focus-within:ring-theme-accent/50 focus-within:outline-none"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="space-y-4">
          <div
            className="aspect-video w-full rounded-lg overflow-hidden border border-theme-border bg-theme-btnExploreBg relative z-10"
            tabIndex={0}
          >
            {slug ? (
              <Link href={`/projects/${slug}`} className="block w-full h-full">
                <ProjectCarousel
                  images={projectImages || (image ? [image] : [])}
                  isHovered={isHovered}
                  projectName={name}
                />
              </Link>
            ) : (
              <ProjectCarousel
                images={projectImages || (image ? [image] : [])}
                isHovered={isHovered}
                projectName={name}
              />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-theme-text group-hover:text-theme-accent transition-colors">
              {slug ? (
                <Link href={`/projects/${slug}`} className="focus:outline-none">
                  {name}
                  <span className="absolute inset-0 z-0" aria-hidden="true" />
                </Link>
              ) : (
                name
              )}
            </h3>
            <p className="text-theme-secondary text-sm leading-relaxed line-clamp-3">
              {description}
            </p>

          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-theme-border flex flex-col gap-3 relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-theme-accentLight text-theme-accentText border border-theme-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-0.5">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {links && links.length >= 2 ? (
                <OpenLinks links={links} position="bottom" />
              ) : links && links.length === 1 ? (
                <a
                  href={links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover hover:underline transition-colors"
                >
                  <span>{links[0].label}</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              ) : link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover hover:underline transition-colors"
                >
                  <span>Live Site</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-theme-muted font-medium">Proprietary</span>
              )}
            </div>

            {slug && (
              <Link
                href={`/projects/${slug}`}
                className="inline-flex items-center space-x-1 text-theme-muted hover:text-theme-text transition-colors"
                aria-label={`View ${name} architectural details`}
              >
                <span>Specs</span>
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative flex flex-col justify-between bg-theme-cardBg border border-theme-cardBorder hover:border-theme-accent/60 rounded-xl p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_8px_30px_rgba(250,189,47,0.04)] focus-within:ring-2 focus-within:ring-theme-accent/50 focus-within:outline-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="space-y-4">
        <div
          className="aspect-video w-full rounded-lg overflow-hidden border border-theme-border bg-theme-btnExploreBg relative z-10"
          tabIndex={0}
          onFocus={onMouseEnter}
          onBlur={onMouseLeave}
        >
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              {name.toLowerCase().includes("cat") && video && isHovered ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (name.toLowerCase().includes("cat") || name.toLowerCase().includes("anomaly")) && image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover pointer-events-none"
                />
              ) : (
                renderArchitecture()
              )}
            </a>
          ) : (
            <>
              {name.toLowerCase().includes("cat") && video && isHovered ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (name.toLowerCase().includes("cat") || name.toLowerCase().includes("anomaly")) && image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover pointer-events-none"
                />
              ) : (
                renderArchitecture()
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-theme-text group-hover:text-theme-accent transition-colors">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                {name}
                <span className="absolute inset-0 z-0" aria-hidden="true" />
              </a>
            ) : (
              name
            )}
          </h3>

          <p className="text-theme-secondary text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>


      <div className="mt-6 pt-4 border-t border-theme-border flex flex-col gap-3 relative z-10">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-theme-accentLight text-theme-accentText border border-theme-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono pt-0.5">
          <div>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover hover:underline transition-colors"
              >
                <span>GitHub Repo</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-theme-muted font-medium">Pending Release</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectList() {
  const [activeTab, setActiveTab] = useState<"professional" | "academic">("professional");
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  useEffect(() => {
    ProjectProfessional.forEach((project) => {
      if ((project as any).project_image) {
        (project as any).project_image.forEach((src: string) => {
          const img = new window.Image();
          img.src = src;
        });
      } else if (project.image) {
        const img = new window.Image();
        img.src = project.image;
      }
    });

    ProjectAcademic.forEach((project) => {
      if (project.image) {
        const img = new window.Image();
        img.src = project.image;
      }
      if ((project as any).video) {
        const vid = document.createElement("video");
        vid.src = (project as any).video;
        vid.preload = "auto";
      }
    });
  }, []);

  const renderArchitecture = (identifier: string | number, isHovered: boolean) => {
    const nameStr = String(identifier).toLowerCase();
    if (nameStr.includes("cat") || nameStr.includes("anomaly") || nameStr.includes("pid_nn")) {
      return <AIVisualizer isHovered={isHovered} />;
    }
    if (nameStr.includes("conway") || nameStr.includes("invaders")) {
      return <GameVisualizer isHovered={isHovered} />;
    }
    if (nameStr.includes("qt") || nameStr.includes("library")) {
      return <AppVisualizer isHovered={isHovered} />;
    }
    if (nameStr.includes("interpreter") || nameStr.includes("flex")) {
      return <CompilerVisualizer isHovered={isHovered} />;
    }

    return (
      <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
        <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[200px]">
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M 80 110 L 190 110"
            stroke={isHovered ? "var(--accent-primary)" : "var(--border-secondary)"}
            strokeWidth="1"
            strokeDasharray={isHovered ? "4 4" : "0"}
            className={isHovered ? "animate-flow-right" : ""}
          />
          <path
            d="M 250 110 L 330 110"
            stroke={isHovered ? "var(--accent-primary)" : "var(--border-secondary)"}
            strokeWidth="1"
            strokeDasharray={isHovered ? "4 4" : "0"}
            className={isHovered ? "animate-flow-right" : ""}
          />
          <g transform="translate(20, 85)">
            <rect x="0" y="0" width="60" height="50" rx="4" fill="var(--card-bg)" stroke="var(--border-secondary)" strokeWidth="1.2" />
            <text x="30" y="28" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="monospace">Frontend</text>
          </g>
          <g transform="translate(180, 85)">
            <rect x="0" y="0" width="70" height="50" rx="4" fill="var(--card-bg)" stroke="var(--border-secondary)" strokeWidth="1.2" />
            <text x="35" y="28" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="monospace">API Server</text>
          </g>
          <g transform="translate(330, 90)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="var(--card-bg)" stroke="var(--border-secondary)" strokeWidth="1.2" />
            <text x="35" y="24" fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="monospace">Database</text>
          </g>
        </svg>
      </div>
    );
  };

  const professionalProjects = [...ProjectProfessional].sort((a, b) => b.id - a.id);
  const academicProjects = [...ProjectAcademic].sort((a, b) => b.id - a.id);

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-20 border-b border-theme-border" id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-theme-text mb-2">Featured Work</h2>
          <p className="text-theme-muted text-sm md:text-base max-w-2xl">
            Selected projects, live applications and codebases.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row p-1 gap-1 bg-theme-btnExploreBg border border-theme-border rounded-lg self-stretch md:self-auto font-mono text-xs select-none">
          <button
            onClick={() => setActiveTab("professional")}
            className={`px-3 py-1.5 rounded transition-all focus:outline-none whitespace-nowrap text-center ${activeTab === "professional"
              ? "bg-theme-bg border border-theme-border text-theme-text shadow-sm z-10 font-bold"
              : "text-theme-muted hover:text-theme-text border border-transparent z-0"
              } w-full sm:w-auto`}
          >
            Projects ({professionalProjects.length})
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3 py-1.5 rounded transition-all focus:outline-none whitespace-nowrap text-center ${activeTab === "academic"
              ? "bg-theme-bg border border-theme-border text-theme-text shadow-sm z-10 font-bold"
              : "text-theme-muted hover:text-theme-text border border-transparent z-0"
              } w-full sm:w-auto`}
          >
            R&D & Experiments ({academicProjects.length})
          </button>
        </div>
      </div>

      {activeTab === "professional" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {professionalProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              slug={project.slug}
              name={project.name}
              description={project.description}
              tags={project.tag}
              link={project.link || undefined}
              links={(project as any).links}
              isProfessional={true}
              isHovered={hoveredId === project.slug}
              onMouseEnter={() => setHoveredId(project.slug)}
              onMouseLeave={() => setHoveredId(null)}
              renderArchitecture={() => renderArchitecture(project.slug, hoveredId === project.slug)}
              image={(project as any).image}
              video={(project as any).video}
              projectImages={(project as any).project_image}
            />
          ))}
        </div>
      )}

      {activeTab === "academic" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {academicProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              tags={project.tag}
              link={project.link || undefined}
              isProfessional={false}
              isHovered={hoveredId === project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              renderArchitecture={() => renderArchitecture(project.name, hoveredId === project.id)}
              image={(project as any).image}
              video={(project as any).video}
            />
          ))}
        </div>
      )}
    </section>
  );
}
