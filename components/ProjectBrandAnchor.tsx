"use client";

import React from "react";

interface ProjectBrandAnchorProps {
  slug?: string;
  name: string;
  category?: string;
  isHovered?: boolean;
}

export default function ProjectBrandAnchor({
  slug,
  name,
  category,
  isHovered = false,
}: ProjectBrandAnchorProps) {
  const renderEmblem = () => {
    switch (slug) {
      case "project-luna":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <circle cx="24" cy="24" r="18" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
            <path
              d="M 24 8 C 32.8 8 40 15.2 40 24 C 40 32.8 32.8 40 24 40 C 27 34 27 14 24 8 Z"
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.2" : "0.08"}
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              strokeWidth="1.75"
            />
            <circle cx="24" cy="24" r="3" fill="var(--accent-primary)" />
          </svg>
        );

      case "k2n-solutions":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <polygon
              points="24,7 41,37 7,37"
              strokeWidth="1.75"
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
            />
            <path d="M 24 16 L 24 37 M 15 37 L 33 37" strokeWidth="1.5" opacity="0.6" />
            <polygon points="24,15 28,26 22,26 26,34 24,34" fill="var(--accent-primary)" />
          </svg>
        );

      case "esp":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <rect
              x="10"
              y="14"
              width="28"
              height="24"
              rx="4"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <line x1="16" y1="10" x2="22" y2="10" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="10" x2="32" y2="10" strokeWidth="2" strokeLinecap="round" />
            <path d="M 20 22 L 28 22 M 24 18 L 24 26" stroke="var(--accent-primary)" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="19" y1="31" x2="29" y2="31" strokeWidth="1.75" strokeLinecap="round" opacity="0.7" />
          </svg>
        );

      case "msk":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <rect
              x="9"
              y="13"
              width="30"
              height="24"
              rx="3"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.45"
            />
            <rect
              x="14"
              y="17"
              width="20"
              height="16"
              rx="2"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <circle cx="24" cy="25" r="3.5" fill="var(--accent-primary)" />
          </svg>
        );

      case "atrafian":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <circle cx="24" cy="24" r="17" strokeWidth="1.2" opacity="0.3" strokeDasharray="3 3" />
            <circle cx="24" cy="24" r="11" strokeWidth="1.5" opacity="0.6" />
            <circle cx="24" cy="24" r="5" strokeWidth="1.75" stroke={isHovered ? "var(--accent-primary)" : "currentColor"} />
            <line x1="24" y1="24" x2="37" y2="13" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="37" cy="13" r="2.5" fill="var(--accent-primary)" />
          </svg>
        );

      case "goldenbat":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <circle cx="24" cy="24" r="16" strokeWidth="1.5" opacity="0.35" />
            <path
              d="M 12 24 C 18 16 30 16 36 24 C 30 32 18 32 12 24 Z"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <line x1="24" y1="13" x2="24" y2="35" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
            <circle cx="24" cy="24" r="3" fill="var(--accent-primary)" />
          </svg>
        );

      case "alzahra":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <polygon
              points="24,8 39,18 39,34 24,42 9,34 9,18"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <line x1="24" y1="8" x2="24" y2="42" strokeWidth="1.2" opacity="0.4" />
            <line x1="9" y1="18" x2="39" y2="34" strokeWidth="1.2" opacity="0.3" />
            <circle cx="24" cy="24" r="3.5" fill="var(--accent-primary)" />
          </svg>
        );

      case "edu-platform":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <rect
              x="9"
              y="12"
              width="30"
              height="24"
              rx="3"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <polygon points="21,19 31,24 21,29" fill="var(--accent-primary)" />
          </svg>
        );

      case "himeh":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <path
              d="M 10 14 C 16 11 24 13 24 18 L 24 38 C 24 33 16 31 10 34 Z"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <path
              d="M 38 14 C 32 11 24 13 24 18 L 24 38 C 24 33 32 31 38 34 Z"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <line x1="24" y1="18" x2="24" y2="38" stroke="var(--accent-primary)" strokeWidth="2" />
          </svg>
        );

      case "charbag":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <path
              d="M 18 10 L 30 10 M 20 10 C 20 16 12 20 12 28 C 12 36 17 40 24 40 C 31 40 36 36 36 28 C 36 20 28 16 28 10"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <circle cx="24" cy="28" r="3" fill="var(--accent-primary)" />
          </svg>
        );

      case "taxiland":
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <rect
              x="10"
              y="16"
              width="28"
              height="20"
              rx="4"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
              fill={isHovered ? "var(--accent-primary)" : "currentColor"}
              fillOpacity={isHovered ? "0.15" : "0.06"}
            />
            <circle cx="17" cy="36" r="3" strokeWidth="1.5" stroke="currentColor" fill="var(--card-bg)" />
            <circle cx="31" cy="36" r="3" strokeWidth="1.5" stroke="currentColor" fill="var(--card-bg)" />
            <line x1="16" y1="23" x2="32" y2="23" strokeWidth="1.5" opacity="0.6" />
            <line x1="18" y1="12" x2="30" y2="12" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 transition-colors duration-200" stroke="currentColor">
            <rect
              x="10"
              y="10"
              width="28"
              height="28"
              rx="3"
              strokeWidth="1.75"
              stroke={isHovered ? "var(--accent-primary)" : "currentColor"}
            />
            <polyline points="18,22 14,26 18,30" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="30,22 34,26 30,30" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="26" y1="18" x2="22" y2="34" strokeWidth="1.5" stroke="var(--accent-primary)" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5 relative select-none bg-theme-btnExploreBg/60 transition-colors duration-200 group-hover:bg-theme-btnExploreBg/90">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="text-theme-text transition-transform duration-200 group-hover:scale-105">
          {renderEmblem()}
        </div>
        <div className="space-y-1">
          <span className="block text-xs sm:text-sm font-mono font-bold tracking-wider text-theme-text uppercase">
            {name}
          </span>
          {category && (
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
