"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/data/projects";
import type { ProfessionalProject } from "@/data/projects/types";
import {
  AIVisualizer,
  GameVisualizer,
  AppVisualizer,
  CompilerVisualizer,
} from "./ArchitectureSVG";
import { ArrowRight } from "lucide-react";
import OpenLinks from "./OpenLinks";
import ProjectCarousel from "./ProjectCarousel";
import ProjectBrandAnchor from "./ProjectBrandAnchor";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
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
  visualizer?: "ai" | "game" | "app" | "compiler";
  image?: string;
  video?: string;
  projectImages?: string[];
  minigame?: boolean;
  isLive?: boolean;
  category?: string;
  serviceHeadline?: string;
  keyOutcomes?: string[];
}

function DefaultArchitectureSVG({ isHovered }: { isHovered: boolean }) {
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
}

function renderVisualizer(visualizerType?: "ai" | "game" | "app" | "compiler", isHovered: boolean = false) {
  switch (visualizerType) {
    case "ai":
      return <AIVisualizer isHovered={isHovered} />;
    case "game":
      return <GameVisualizer isHovered={isHovered} />;
    case "app":
      return <AppVisualizer isHovered={isHovered} />;
    case "compiler":
      return <CompilerVisualizer isHovered={isHovered} />;
    default:
      return null;
  }
}

function FormattedOutcome({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-theme-text font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
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
  visualizer,
  image,
  video,
  projectImages,
  minigame,
  isLive,
  category,
  serviceHeadline,
  keyOutcomes,
}: ProjectCardProps) {
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const { t } = useLanguage();

  const handleCardInteraction = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a[target='_blank'], [data-prevent-glow]")) {
      return;
    }
    setIsProjectClicked(true);
    setTimeout(() => setIsProjectClicked(false), 450);
  };

  const imagesList = (projectImages && projectImages.length > 0) ? projectImages : (image ? [image] : []);

  if (isProfessional) {
    return (
      <article
        className={`group relative flex flex-col justify-between bg-theme-cardBg border rounded-xl p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md focus:outline-none ${
          isProjectClicked
            ? "!border-theme-text ring-1 ring-theme-text/40"
            : "border-theme-cardBorder"
        }`}
        onMouseDown={handleCardInteraction}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="space-y-4">
          <div className="aspect-[2.1/1] w-full rounded-lg overflow-hidden border border-theme-border bg-theme-btnExploreBg relative z-10">
            {imagesList.length > 0 ? (
              slug ? (
                <Link href={`/projects/${slug}`} prefetch={true} className="block w-full h-full">
                  <ProjectCarousel
                    images={imagesList}
                    isHovered={isHovered}
                    projectName={name}
                  />
                </Link>
              ) : (
                <ProjectCarousel
                  images={imagesList}
                  isHovered={isHovered}
                  projectName={name}
                />
              )
            ) : (
              <ProjectBrandAnchor
                slug={slug}
                name={name}
                category={category}
                isHovered={isHovered}
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1.5 pt-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-theme-accent font-bold px-2 py-0.5 rounded bg-theme-accentLight border border-theme-border">
                {category || t.projects.catEnterprise}
              </span>
            </div>

            <h3 className="text-lg font-bold text-theme-text group-hover:text-theme-accent transition-colors leading-snug">
              {slug ? (
                <Link href={`/projects/${slug}`} prefetch={true} className="focus:outline-none">
                  {name}
                  <span className="absolute inset-0 z-0" aria-hidden="true" />
                </Link>
              ) : (
                name
              )}
            </h3>

            {keyOutcomes && keyOutcomes.length > 0 ? (
              <ul className="space-y-1.5 pt-1 text-xs text-theme-secondary">
                {keyOutcomes.slice(0, 2).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-theme-accent font-bold select-none text-[11px] mt-0.5">›</span>
                    <FormattedOutcome text={bullet} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-theme-secondary text-sm leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
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
                  className="inline-flex items-center space-x-1 font-bold text-[var(--link-prominent-green)] hover:text-[var(--link-prominent-green-hover)] hover:underline transition-colors"
                >
                  <span>{links[0].label}</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              ) : link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-bold text-[var(--link-prominent-green)] hover:text-[var(--link-prominent-green-hover)] hover:underline transition-colors"
                >
                  <span>{t.common.liveSite}</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-theme-muted font-medium">{t.common.proprietary}</span>
              )}
            </div>

            {isLive && (link || (links && links[0]?.url)) && (
              <a
                href={link || links?.[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 font-bold text-[var(--link-prominent-green)] hover:text-[var(--link-prominent-green-hover)] hover:underline transition-colors"
              >
                <span>{t.common.live}</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  const renderMedia = () => {
    if (visualizer) {
      return renderVisualizer(visualizer, isHovered);
    }
    if (video && isHovered) {
      return (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
      );
    }
    if (image) {
      return (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover pointer-events-none"
        />
      );
    }
    return <DefaultArchitectureSVG isHovered={isHovered} />;
  };

  return (
    <article
      className={`group relative flex flex-col justify-between bg-theme-cardBg border rounded-xl p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_8px_30px_rgba(250,189,47,0.04)] focus:outline-none ${
        isProjectClicked
          ? "!border-theme-text ring-2 ring-theme-text/80 shadow-[0_0_25px_var(--text-primary)]"
          : "border-theme-cardBorder"
      }`}
      onMouseDown={handleCardInteraction}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="space-y-4">
        <div
          className="aspect-video w-full rounded-lg overflow-hidden border border-theme-border bg-theme-btnExploreBg relative z-10"
          onFocus={onMouseEnter}
          onBlur={onMouseLeave}
        >
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-full"
            >
              {renderMedia()}
            </a>
          ) : (
            <div className="relative block w-full h-full">
              {renderMedia()}
            </div>
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
                className="inline-flex items-center space-x-1 font-bold text-[var(--link-prominent-green)] hover:text-[var(--link-prominent-green-hover)] hover:underline transition-colors"
              >
                <span>{t.common.githubRepo}</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-theme-muted font-medium">{t.common.pendingRelease}</span>
            )}
          </div>

          {minigame && (
            <Link
              href="/game"
              data-no-destroy="true"
              className="inline-flex items-center text-xs font-mono text-emerald-600 dark:text-rose-400 hover:text-emerald-500 dark:hover:text-rose-300 font-bold transition-all cursor-pointer select-none"
              title="Launch minigame"
            >
              {t.projects.wannaPlay}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectList() {
  const [activeTab, setActiveTab] = useState<"professional" | "academic">("professional");
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { locale, t } = useLanguage();
  const { ProjectProfessional, ProjectAcademic } = getProjects(locale);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const professionalProjects = [...ProjectProfessional].sort((a, b) => b.id - a.id);
  const academicProjects = [...ProjectAcademic].sort((a, b) => b.id - a.id);

  const projectMatchesCategory = (p: ProfessionalProject, catId: string): boolean => {
    if (catId === "all") return true;
    const slug = p.slug;
    if (catId === "enterprise") {
      return (
        ["project-luna", "alzahra", "msk", "esp", "goldenbat", "edu-platform"].includes(slug) ||
        (p.category || "").toLowerCase().includes("enterprise") ||
        (p.category || "").toLowerCase().includes("корпоратив") ||
        (p.category || "").toLowerCase().includes("կորպորատիվ")
      );
    }
    if (catId === "realtime") {
      return (
        ["atrafian", "goldenbat", "taxiland"].includes(slug) ||
        (p.category || "").toLowerCase().includes("real-time") ||
        (p.category || "").toLowerCase().includes("реального времени") ||
        (p.category || "").toLowerCase().includes("ժամանակի") ||
        (p.category || "").toLowerCase().includes("dispatch") ||
        (p.category || "").toLowerCase().includes("диспетчер")
      );
    }
    return false;
  };

  const categories = [
    { id: "all", label: t.projects.catAll || "All Work", count: professionalProjects.length },
    {
      id: "enterprise",
      label: t.projects.catEnterprise || "Enterprise Platforms",
      count: professionalProjects.filter((p) => projectMatchesCategory(p, "enterprise")).length,
    },
    {
      id: "realtime",
      label: t.projects.catRealtime || "Real-Time & Systems",
      count: professionalProjects.filter((p) => projectMatchesCategory(p, "realtime")).length,
    },
  ];

  const filteredProfessionalProjects = professionalProjects.filter((p) => {
    return projectMatchesCategory(p, selectedCategory);
  });

  const displayedProfessionalProjects =
    selectedCategory === "all" && !showAll
      ? filteredProfessionalProjects.slice(0, 6)
      : filteredProfessionalProjects;

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-20 border-b border-theme-border" id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-theme-text mb-2">{t.projects.title}</h2>
          <p className="text-theme-muted text-sm md:text-base max-w-2xl">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row p-1 gap-1 bg-theme-btnExploreBg border border-theme-border rounded-lg self-stretch md:self-auto font-mono text-xs select-none">
          <button
            onClick={() => setActiveTab("professional")}
            className={`px-3 py-1.5 rounded transition-all focus:outline-none whitespace-nowrap text-center cursor-pointer ${activeTab === "professional"
              ? "bg-theme-bg border border-theme-border text-theme-text shadow-sm z-10 font-bold"
              : "text-theme-muted hover:text-theme-text border border-transparent z-0"
              } w-full sm:w-auto`}
          >
            {t.projects.tabProjects} ({professionalProjects.length})
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3 py-1.5 rounded transition-all focus:outline-none whitespace-nowrap text-center cursor-pointer ${activeTab === "academic"
              ? "bg-theme-bg border border-theme-border text-theme-text shadow-sm z-10 font-bold"
              : "text-theme-muted hover:text-theme-text border border-transparent z-0"
              } w-full sm:w-auto`}
          >
            {t.projects.tabAcademic} ({academicProjects.length})
          </button>
        </div>
      </div>

      {activeTab === "professional" && (
        <div className="flex flex-wrap items-center gap-1.5 mb-8 font-mono text-xs select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                selectedCategory === cat.id
                  ? "bg-theme-bg border-theme-border text-theme-text font-bold shadow-xs"
                  : "bg-theme-btnExploreBg/60 border-transparent text-theme-muted hover:text-theme-text hover:border-theme-border/50"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      )}

      {activeTab === "professional" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedProfessionalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                name={project.name}
                description={project.description}
                tags={project.tag}
                link={project.link || undefined}
                links={project.links}
                isProfessional={true}
                isHovered={hoveredId === project.slug}
                onMouseEnter={() => setHoveredId(project.slug)}
                onMouseLeave={() => setHoveredId(null)}
                image={project.image}
                projectImages={project.project_image}
                isLive={project.isLive}
                category={project.category}
                serviceHeadline={project.serviceHeadline}
                keyOutcomes={project.keyOutcomes}
              />
            ))}
          </div>

          {selectedCategory === "all" && filteredProfessionalProjects.length > 6 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-theme-border bg-theme-btnExploreBg hover:bg-theme-bg hover:border-theme-accent text-theme-text font-mono text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>
                  {showAll
                    ? t.projects.showFewerProjects
                    : (t.projects.showAllProjects || "Show All {count} Projects").replace(
                        "{count}",
                        String(filteredProfessionalProjects.length)
                      )}
                </span>
                <span className="text-theme-accent text-sm font-bold">{showAll ? "↑" : "↓"}</span>
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === "academic" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {academicProjects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              description={project.description}
              tags={project.tag}
              link={project.link || undefined}
              isProfessional={false}
              isHovered={hoveredId === project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              visualizer={project.visualizer}
              image={project.image}
              video={project.video}
              minigame={project.minigame}
            />
          ))}
        </div>
      )}
    </section>
  );
}
