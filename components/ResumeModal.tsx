"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Download,
  Code2,
  Server,
  Terminal,
  Headphones,
  FileText,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ResumeOption {
  id: string;
  title: string;
  subtitle: string;
  fileUrl: string;
  fileName: string;
  icon: React.ReactNode;
}

export const RESUME_OPTIONS: ResumeOption[] = [
  {
    id: "frontend",
    title: "Frontend Software Engineer",
    subtitle: "Next.js • React • TypeScript",
    fileUrl: "/application/frontend_resume.pdf",
    fileName: "frontend_resume.pdf",
    icon: <Code2 className="w-4 h-4 text-theme-accent shrink-0" />,
  },
  {
    id: "backend",
    title: "Backend Software Engineer",
    subtitle: "NestJS • Node.js • PostgreSQL • REST APIs",
    fileUrl: "/application/backend_resume.pdf",
    fileName: "backend_resume.pdf",
    icon: <Server className="w-4 h-4 text-theme-accent shrink-0" />,
  },
  {
    id: "systems",
    title: "Junior Systems Engineer",
    subtitle: "Linux • Nginx • Docker • Infrastructure",
    fileUrl: "/application/systems_engineer_resume.pdf",
    fileName: "systems_engineer_resume.pdf",
    icon: <Terminal className="w-4 h-4 text-theme-accent shrink-0" />,
  },
  {
    id: "support",
    title: "Technical Support Specialist",
    subtitle: "Troubleshooting + client-facing support",
    fileUrl: "/application/tech_support_resume.pdf",
    fileName: "tech_support_resume.pdf",
    icon: <Headphones className="w-4 h-4 text-theme-accent shrink-0" />,
  },
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsDropdownOpen(false);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume Options"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[calc(100vw-2rem)] max-w-md bg-theme-panelBg border border-theme-panelBorder rounded-xl shadow-2xl overflow-hidden flex flex-col p-5 sm:p-6 gap-4 font-sans max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-1 border-b border-theme-border/50">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-theme-text font-mono">
                Resume
              </h2>

              <button
                onClick={onClose}
                type="button"
                title="Close modal"
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-bg border border-transparent hover:border-theme-border transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Primary Full-Stack Resume */}
            <div className="space-y-1">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-no-modal="true"
                onClick={onClose}
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-bold font-mono text-xs sm:text-sm tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Open Full-Stack Engineer Resume</span>
              </a>
            </div>

            {/* Specialized Resumes Dropdown */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-theme-bg/60 hover:bg-theme-bg border border-theme-border/50 hover:border-theme-border text-theme-text text-xs font-mono transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-theme-accent" />
                  <span>Specialized resumes ({RESUME_OPTIONS.length})</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-theme-muted transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    {RESUME_OPTIONS.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-theme-bg/50 hover:bg-theme-bg border border-theme-border/40 hover:border-theme-border transition-colors gap-2"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className="p-1.5 rounded-md bg-theme-btnExploreBg border border-theme-btnExploreBorder shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold font-mono text-theme-text truncate">
                              {item.title}
                            </p>
                            <p className="text-[10px] font-mono text-theme-muted truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-no-modal="true"
                          onClick={onClose}
                          className="px-2.5 py-1 rounded-md bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-text font-mono text-xs transition-colors flex items-center space-x-1 shrink-0 cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-theme-accent" />
                          <span>PDF</span>
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Resumes / Contact Box */}
            <div className="p-3.5 sm:p-4 rounded-lg bg-theme-bg/60 border border-theme-border/40 space-y-2.5">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-theme-text">
                  Contact for other resumes
                </h3>
                <p className="text-[11px] sm:text-xs text-theme-muted leading-relaxed mt-1">
                  Need a specialized resume for specific roles (Backend, ML, other IT related positions, etc.)?
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/cv"
                  onClick={onClose}
                  className="flex-1 py-2 sm:py-2.5 px-3 rounded-lg bg-theme-accent/15 border border-theme-accent/40 text-theme-accent hover:bg-theme-accent/25 font-mono font-bold text-xs transition-colors cursor-pointer flex items-center justify-center text-center"
                >
                  View /cv Page
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex-1 py-2 sm:py-2.5 px-3 rounded-lg bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text font-medium text-xs transition-colors cursor-pointer flex items-center justify-center text-center"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

