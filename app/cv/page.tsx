import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "CV & Resumes | Parsa",
  description:
    "Download Parsa's full-stack software engineer resume and role-specific CVs (Frontend, Backend, Systems, Tech Support).",
  alternates: {
    canonical: "https://parsany.com/cv",
  },
};

interface ResumeItem {
  id: string;
  title: string;
  subtitle: string;
  fileUrl: string;
  fileName: string;
}

const SPECIALIZED_RESUMES: ResumeItem[] = [
  {
    id: "frontend",
    title: "Frontend Software Engineer",
    subtitle: "Next.js • React • TypeScript",
    fileUrl: "/application/frontend_resume.pdf",
    fileName: "frontend_resume.pdf",
  },
  {
    id: "backend",
    title: "Backend Software Engineer",
    subtitle: "NestJS • Node.js • PostgreSQL • REST APIs",
    fileUrl: "/application/backend_resume.pdf",
    fileName: "backend_resume.pdf",
  },
  {
    id: "systems",
    title: "Junior Systems Engineer",
    subtitle: "Linux • Nginx • Docker • Infrastructure",
    fileUrl: "/application/systems_engineer_resume.pdf",
    fileName: "systems_engineer_resume.pdf",
  },
  {
    id: "support",
    title: "Technical Support Specialist",
    subtitle: "Troubleshooting • client-facing support",
    fileUrl: "/application/tech_support_resume.pdf",
    fileName: "tech_support_resume.pdf",
  },
];

export default function CVPage() {
  return (
    <article className="max-w-2xl mx-auto py-12">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to home</span>
      </Link>

      <header className="space-y-3 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-theme-text">
          Resumes & CVs
        </h1>
        <p className="text-theme-secondary text-sm md:text-base leading-relaxed">
          Direct download links for my primary full-stack software engineering resume and role-specific CVs.
        </p>
      </header>

      <section className="mb-10">
        <div className="p-5 md:p-6 rounded-xl bg-theme-cardBg border border-theme-cardBorder space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-theme-text">
                Full-Stack Software Engineer
              </h2>
              <p className="text-xs font-mono text-theme-muted">
                NestJS • Next.js • TypeScript • PostgreSQL • Docker
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-no-modal="true"
                className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-theme-secondary hover:text-theme-text transition-colors"
              >
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </a>
              <a
                href="/resume.pdf"
                download="Parsa_FullStack_Engineer_Resume.pdf"
                data-no-modal="true"
                className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Resumes */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-theme-muted border-b border-theme-border pb-2">
          Specialized Resumes
        </h2>

        <div className="space-y-3">
          {SPECIALIZED_RESUMES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-theme-cardBg border border-theme-cardBorder hover:border-theme-border/80 transition-all gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <FileText className="h-3.5 w-3.5 text-theme-accent shrink-0" />
                  <h3 className="text-sm font-semibold text-theme-text">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-theme-muted pl-5">
                  {item.subtitle}
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0 pl-5 sm:pl-0">
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-no-modal="true"
                  className="inline-flex items-center space-x-1 text-xs font-mono text-theme-muted hover:text-theme-text transition-colors"
                >
                  <span>View</span>
                </a>
                <a
                  href={item.fileUrl}
                  download={item.fileName}
                  data-no-modal="true"
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-md bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-border hover:border-theme-accent text-theme-text font-mono text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download className="h-3 w-3 text-theme-accent" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
        <Link href="/" className="hover:text-theme-text transition-colors">
          &larr; Back to home
        </Link>
        <Link href="/contact" className="hover:text-theme-text transition-colors">
          Contact page &rarr;
        </Link>
      </footer>
    </article>
  );
}
