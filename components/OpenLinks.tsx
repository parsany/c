import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface LinkItem {
  label: string;
  url: string;
}

interface OpenLinksProps {
  links: LinkItem[];
  className?: string;
  position?: "top" | "bottom";
}

export default function OpenLinks({ links, className = "", position = "bottom" }: OpenLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!links || links.length < 2) return null;

  const isBottom = position === "bottom";

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center space-x-1.5 font-bold text-theme-accent hover:text-theme-accentHover transition-colors focus:outline-none py-1"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Open Links</span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: isBottom ? -4 : 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isBottom ? -4 : 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute ${
              isBottom ? "bottom-full mb-2" : "top-full mt-2"
            } left-0 min-w-[160px] bg-theme-panelBg border border-theme-panelBorder rounded-lg shadow-xl py-1.5 z-30 font-mono text-[11px] text-theme-text`}
            style={{ originY: isBottom ? "bottom" : "top", originX: "left" }}
          >
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-theme-accentLight/60 hover:text-theme-accentText transition-colors duration-150"
              >
                <span>{link.label}</span>
                <ExternalLink className="h-3 w-3 text-theme-muted ml-2" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
