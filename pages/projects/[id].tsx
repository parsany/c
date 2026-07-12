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
import OpenLinks from "@/components/OpenLinks";

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

  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const lastDragPos = useRef<{ x: number; y: number } | null>(null);
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartScale = useRef<number>(1);
  const lastClientXRef = useRef<number>(0);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project?.project_image && project.project_image.length > 0) {
      project.project_image.forEach((src: string) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [project?.project_image]);

  useEffect(() => {
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
  }, [activeIndex, isLightboxOpen]);

  useEffect(() => {
    const el = lightboxContainerRef.current;
    if (!el || !isLightboxOpen) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 0.12;
      const direction = e.deltaY < 0 ? 1 : -1;
      setZoomScale((prev) => {
        const next = Math.max(1, Math.min(8, prev + direction * zoomFactor * prev));
        if (next === 1) {
          setZoomOffset({ x: 0, y: 0 });
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isLightboxOpen]);

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = "touches" in e;

    if (isTouch && e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDist.current = dist;
      pinchStartScale.current = zoomScale;
      lastDragPos.current = null;
      return;
    }

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    if (zoomScale > 1) {
      lastDragPos.current = { x: clientX, y: clientY };
    } else {
      handleDragStart(clientX, clientY);
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = "touches" in e;

    if (isTouch && e.touches.length === 2) {
      if (pinchStartDist.current) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / pinchStartDist.current;
        const nextScale = Math.max(1, Math.min(8, pinchStartScale.current * factor));
        setZoomScale(nextScale);
        if (nextScale === 1) {
          setZoomOffset({ x: 0, y: 0 });
        }
      }
      return;
    }

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    lastClientXRef.current = clientX;

    if (zoomScale > 1 && lastDragPos.current) {
      const dx = clientX - lastDragPos.current.x;
      const dy = clientY - lastDragPos.current.y;
      setZoomOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      lastDragPos.current = { x: clientX, y: clientY };
    } else {
      handleDragMove(clientX, clientY);
    }
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent) => {
    lastDragPos.current = null;
    pinchStartDist.current = null;
    if (zoomScale === 1) {
      let finalX = 0;
      if ("changedTouches" in e && e.changedTouches && e.changedTouches[0]) {
        finalX = e.changedTouches[0].clientX;
      } else if ("clientX" in e) {
        finalX = e.clientX;
      } else {
        finalX = lastClientXRef.current;
      }
      handleDragEnd(finalX);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomScale > 1) {
      setZoomScale(1);
      setZoomOffset({ x: 0, y: 0 });
    } else {
      setZoomScale(2.5);
      setZoomOffset({ x: 0, y: 0 });
    }
  };

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

  const isNoIndex = ["esp", "msk", "taxiland", "goldenbat", "alzahra"].includes(project.slug);

  return (
    <article className="max-w-2xl mx-auto py-12">
      <Head>
        <title>{project.name} | Parsa</title>
        <meta name="description" content={project.description} />
        {isNoIndex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <link rel="canonical" href={`https://parsany.ir/projects/${project.slug}`} key="canonical" />
        )}
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
          {project.links && project.links.length >= 2 ? (
            <OpenLinks links={project.links} position="top" />
          ) : project.links && project.links.length === 1 ? (
            <a
              href={project.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{project.links[0].label}</span>
            </a>
          ) : project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-bold text-theme-accent hover:text-theme-accentHover transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Visit Website</span>
            </a>
          ) : null}
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
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] dark:hidden"
              style={{
                background: "linear-gradient(to top, var(--accent-primary) 0%, transparent 100%)"
              }}
            />
            <div className="absolute inset-0 pointer-events-none hidden dark:block bg-gradient-to-t from-black/25 via-transparent to-black/10" />

            {project.project_image.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                    e.currentTarget.blur();
                  }}
                  onDoubleClick={(e) => e.stopPropagation()}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                    e.currentTarget.blur();
                  }}
                  onDoubleClick={(e) => e.stopPropagation()}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-3 md:bottom-2 inset-x-4 z-10 flex gap-1.5">
                  {project.project_image.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                        e.currentTarget.blur();
                      }}
                      onDoubleClick={(e) => e.stopPropagation()}
                      className="h-1 flex-1 relative rounded-full overflow-hidden focus:outline-none transition-colors dark:!bg-white/20"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--accent-primary) 20%, transparent)"
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {idx === activeIndex ? (
                        <div 
                          className="h-full w-full"
                          style={{ backgroundColor: "var(--accent-primary)" }}
                        />
                      ) : idx < activeIndex ? (
                        <div 
                          className="h-full w-full dark:!bg-white/70"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--accent-primary) 65%, transparent)"
                          }}
                        />
                      ) : null}
                    </button>
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

              {project.project_image.length > 1 && zoomScale === 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              <div
                ref={lightboxContainerRef}
                className="relative w-[90vw] h-[80vh] flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
                onDoubleClick={handleDoubleClick}
              >
                <div
                  className="relative w-full h-full select-none"
                  style={{
                    transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`,
                    transformOrigin: "center center",
                    transition: (lastDragPos.current || pinchStartDist.current) ? "none" : "transform 0.15s ease-out",
                  }}
                >
                  <Image
                    src={project.project_image[activeIndex]}
                    alt={`${project.name} full view`}
                    fill
                    sizes="100vw"
                    className={`object-contain select-none ${zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                      }`}
                    priority
                  />
                </div>
              </div>

              {project.project_image.length > 1 && zoomScale === 1 && (
                <div className="absolute bottom-6 md:bottom-3 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 w-full max-w-xl px-4">
                  {project.project_image.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                      }}
                      onDoubleClick={(e) => e.stopPropagation()}
                      className="h-1 flex-1 relative rounded-full overflow-hidden bg-white/20 hover:bg-white/40 focus:outline-none transition-colors"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {idx === activeIndex ? (
                        <div className="h-full w-full bg-theme-accent" />
                      ) : idx < activeIndex ? (
                        <div className="h-full w-full bg-white/70" />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
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
