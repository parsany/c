"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ChevronDown,
  Code2,
  Server,
  Terminal,
  Headphones,
  ExternalLink,
} from "lucide-react";

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
    icon: <Code2 className="w-4 h-4 text-theme-accent" />,
  },
  {
    id: "backend",
    title: "Backend Software Engineer",
    subtitle: "NestJS • Node.js • PostgreSQL • REST APIs",
    fileUrl: "/application/backend_resume.pdf",
    fileName: "backend_resume.pdf",
    icon: <Server className="w-4 h-4 text-theme-accent" />,
  },
  {
    id: "systems",
    title: "Junior Systems Engineer",
    subtitle: "Linux • Nginx • Docker • Infrastructure",
    fileUrl: "/application/systems_engineer_resume.pdf",
    fileName: "systems_engineer_resume.pdf",
    icon: <Terminal className="w-4 h-4 text-theme-accent" />,
  },
  {
    id: "support",
    title: "Technical Support Specialist",
    subtitle: "Troubleshooting + client-facing support",
    fileUrl: "/application/tech_support_resume.pdf",
    fileName: "tech_support_resume.pdf",
    icon: <Headphones className="w-4 h-4 text-theme-accent" />,
  },
];

interface DownloadResumeDropdownProps {
  className?: string;
  showModalTrigger?: boolean;
}

export default function DownloadResumeDropdown({
  className = "",
  showModalTrigger = true,
}: DownloadResumeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="w-full sm:w-auto flex items-center justify-between sm:justify-center space-x-2 px-4 sm:px-5 py-2.5 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all select-none cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <Download className="h-4 w-4 shrink-0" />
          <span>Download Resume</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 sm:left-0 top-full mt-2 w-full sm:w-[380px] md:w-[420px] z-50 bg-theme-panelBg border border-theme-panelBorder rounded-xl shadow-2xl overflow-hidden p-2 space-y-1.5 select-none"
          >
            <div className="px-3 py-2 border-b border-theme-border/60 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-theme-muted">
                Available Resumes
              </span>
              {showModalTrigger && (
                <button
                  onClick={handleOpenModal}
                  className="text-[10px] font-mono text-theme-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Expand Modal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-[340px] overflow-y-auto pr-0.5">
              {RESUME_OPTIONS.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-theme-bg/60 hover:bg-theme-bg border border-transparent hover:border-theme-border transition-all gap-2"
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
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-mono font-bold text-[11px] shadow-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer shrink-0 text-center"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
