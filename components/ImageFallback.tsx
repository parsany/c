import React from "react";
import { ImageOff } from "lucide-react";

interface ImageFallbackProps {
  label?: string;
  className?: string;
}

export function ImageFallback({ label = "(Image will be uploaded)", className = "" }: ImageFallbackProps) {
  return (
    <div className={`w-full h-full min-h-[180px] bg-gradient-to-br from-[#f5f5f0] via-[#eaeae2] to-[#dfdfe7] dark:from-[#222425] dark:via-[#282a2b] dark:to-[#1d1f20] flex flex-col items-center justify-center p-6 text-center select-none border border-theme-border/30 dark:border-transparent relative overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent dark:from-amber-400/5 opacity-80 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-2.5">
        <div className="p-3 rounded-xl bg-theme-bg/80 dark:bg-[#1d2021]/80 border border-theme-border/60 dark:border-transparent shadow-sm backdrop-blur-sm text-theme-muted group-hover:text-theme-accent transition-all duration-300">
          <ImageOff className="w-5 h-5 opacity-70" />
        </div>
        <span className="font-mono text-xs font-medium text-theme-muted tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
}

export default ImageFallback;
