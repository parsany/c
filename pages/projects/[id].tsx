import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useRef } from "react";
import { ProjectProfessional } from "@/public/JSONJS";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Globe, X } from "lucide-react";

interface ProjectDetailProps {
  project: any;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const hasMoved = useRef(false);

  const redirectTarget = project?.redirect
    ? ProjectProfessional.find((p) => p.slug === project.redirect)
    : null;

  const handlePrev = useCallback(() => {
    if (project?.project_image) {
      setActiveIndex((prev) =>
        prev === 0 ? project.project_image.length - 1 : prev - 1
      );
    }
  }, [project?.project_image]);

  const handleNext = useCallback(() => {
    if (project?.project_image) {
      setActiveIndex((prev) =>
        prev === project.project_image.length - 1 ? 0 : prev + 1
      );
    }
  }, [project?.project_image]);

  const handleDragStart = (clientX: number, clientY: number) => {
    dragStartX.current = clientX;
    dragStartY.current = clientY;
    hasMoved.current = false;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (dragStartX.current === null || dragStartY.current === null) return;
    const dx = Math.abs(clientX - dragStartX.current);
    const dy = Math.abs(clientY - dragStartY.current);
    if (dx > 8 || dy > 8) {
      hasMoved.current = true;
    }
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = clientX - dragStartX.current;
    if (hasMoved.current) {
      if (diff > 50) {
        handlePrev();
      } else if (diff < -50) {
        handleNext();
      }
    }
    dragStartX.current = null;
    dragStartY.current = null;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
        return;
      }
      if (!project?.project_image || project.project_image.length <= 1) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project?.project_image, isLightboxOpen, handlePrev, handleNext]);

  if (!project) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-mono text-theme-muted">
        Loading...
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto py-12">
      <Head>
        <title>{project.name} | Parsa</title>
        <meta name="description" content={project.description} />
      </Head>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">{project.name}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-theme-muted">
          <span className="flex items-center space-x-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(project.date)}</span>
          </span>
          {project.role && (
            <span className="px-2 py-0.5 rounded bg-theme-btnExploreBg border border-theme-btnExploreBorder text-theme-text">
              {project.role}
            </span>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Visit Website</span>
            </a>
          )}
        </div>

        {project.tag && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tag.map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-theme-accentLight text-theme-accentText border border-theme-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {project.project_image && project.project_image.length > 0 && (
        <>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#1d2021] border border-theme-border mb-10 group">
            <div
              className="relative w-full h-full cursor-zoom-in select-none"
              onClick={() => {
                if (!hasMoved.current) {
                  setIsLightboxOpen(true);
                }
              }}
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
              onMouseUp={(e) => handleDragEnd(e.clientX)}
              onMouseLeave={() => {
                dragStartX.current = null;
                dragStartY.current = null;
              }}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={(e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                  handleDragEnd(e.changedTouches[0].clientX);
                } else {
                  dragStartX.current = null;
                  dragStartY.current = null;
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Open image in full screen view"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsLightboxOpen(true);
                }
              }}
            >
              <Image
                src={project.project_image[activeIndex]}
                alt={`${project.name} preview ${activeIndex + 1}`}
                fill
                sizes="800px"
                priority
                className="object-cover pointer-events-none"
              />
            </div>

            {project.project_image.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-theme-panelBg/80 border border-theme-panelBorder hover:bg-theme-btnExploreBg text-theme-text transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-theme-panelBg/80 border border-theme-panelBorder hover:bg-theme-btnExploreBg text-theme-text transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                  {project.project_image.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        idx === activeIndex ? "bg-theme-accent w-3" : "bg-theme-border2"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {isLightboxOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
              onClick={() => setIsLightboxOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Image viewer"
            >
              <div className="absolute top-6 left-6 text-xs font-mono text-theme-muted select-none z-50">
                {activeIndex + 1} / {project.project_image.length}
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-5 right-5 p-2.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-50 focus:outline-none rounded-full"
                aria-label="Close image viewer"
              >
                <X className="h-6 w-6" />
              </button>

              <div
                className="relative w-[90vw] h-[80vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
                onMouseUp={(e) => handleDragEnd(e.clientX)}
                onMouseLeave={() => {
                  dragStartX.current = null;
                  dragStartY.current = null;
                }}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={(e) => {
                  if (e.changedTouches && e.changedTouches[0]) {
                    handleDragEnd(e.changedTouches[0].clientX);
                  } else {
                    dragStartX.current = null;
                    dragStartY.current = null;
                  }
                }}
              >
                <Image
                  src={project.project_image[activeIndex]}
                  alt={`${project.name} full view`}
                  fill
                  sizes="100vw"
                  className="object-contain select-none cursor-zoom-out pointer-events-none"
                  onClick={() => setIsLightboxOpen(false)}
                />

                {project.project_image.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-4 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 hover:text-zinc-100 transition-colors focus:outline-none"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 hover:text-zinc-100 transition-colors focus:outline-none"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5">
                      {project.project_image.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(idx);
                          }}
                          className={`h-2 w-2 rounded-full transition-all focus:outline-none ${
                            idx === activeIndex ? "bg-zinc-100 w-4" : "bg-zinc-600 hover:bg-zinc-500"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <div className="max-w-none text-theme-secondary text-sm md:text-base leading-relaxed space-y-6">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-theme-text mt-8 mb-4 border-b border-theme-border pb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-lg font-semibold text-theme-text mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 text-theme-secondary leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-theme-secondary" {...props} />,
            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
            code: ({ node, ...props }) => <code className="bg-theme-btnExploreBg text-theme-text border border-theme-border px-1 py-0.5 rounded text-xs font-mono" {...props} />,
          }}
        >
          {project.text}
        </ReactMarkdown>
      </div>

      {redirectTarget && (
        <div className="mt-8 p-4 rounded-lg bg-theme-btnExploreBg border border-theme-border">
          <p className="text-xs text-theme-muted font-mono">
            Connected Project:{" "}
            <Link
              href={`/projects/${redirectTarget.slug}`}
              className="text-theme-text underline hover:text-theme-accent"
            >
              {redirectTarget.name} &rarr;
            </Link>
          </p>
        </div>
      )}

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <span>Specs & Architecture Details</span>
      </footer>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = ProjectProfessional.map((project) => ({
    params: { id: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const project = ProjectProfessional.find((item) => item.slug === params.id) || null;

  return {
    props: { project },
  };
}
