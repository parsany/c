import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
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
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-mono text-slate-500">
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
        className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to digital garden</span>
      </Link>

      <header className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">{project.name}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(project.date)}</span>
          </span>
          {project.role && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {project.role}
            </span>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-slate-300 hover:text-slate-100 transition-colors"
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
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {project.project_image && project.project_image.length > 0 && (
        <>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-900 mb-10 group">
            <div
              className="relative w-full h-full cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
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
                className="object-cover"
              />
            </div>

            {project.project_image.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-slate-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/70 border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-slate-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
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
                        idx === activeIndex ? "bg-slate-100 w-3" : "bg-slate-600"
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
              <div className="absolute top-6 left-6 text-xs font-mono text-slate-400 select-none z-50">
                {activeIndex + 1} / {project.project_image.length}
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-5 right-5 p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors z-50 focus:outline-none rounded-full"
                aria-label="Close image viewer"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative w-[90vw] h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={project.project_image[activeIndex]}
                  alt={`${project.name} full view`}
                  fill
                  sizes="100vw"
                  className="object-contain select-none cursor-zoom-out"
                  onClick={() => setIsLightboxOpen(false)}
                />

                {project.project_image.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-slate-100 transition-colors focus:outline-none"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 p-3 rounded-full bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-slate-100 transition-colors focus:outline-none"
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
                            idx === activeIndex ? "bg-slate-100 w-4" : "bg-slate-600 hover:bg-slate-500"
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

      <div className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base leading-relaxed space-y-6">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-slate-100 mt-8 mb-4 border-b border-slate-900 pb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-lg font-semibold text-slate-100 mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 text-slate-300 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-300" {...props} />,
            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
            code: ({ node, ...props }) => <code className="bg-slate-900 text-slate-300 border border-slate-800 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
          }}
        >
          {project.text}
        </ReactMarkdown>
      </div>

      {redirectTarget && (
        <div className="mt-8 p-4 rounded-lg bg-slate-950 border border-slate-900">
          <p className="text-xs text-slate-400 font-mono">
            Connected Project:{" "}
            <Link
              href={`/projects/${redirectTarget.slug}`}
              className="text-slate-200 underline hover:text-slate-100"
            >
              {redirectTarget.name} &rarr;
            </Link>
          </p>
        </div>
      )}

      <footer className="mt-16 pt-8 border-t border-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          &larr; Back to digital garden
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
