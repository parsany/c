import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
  isHovered: boolean;
  projectName: string;
}

export default function ProjectCarousel({
  images,
  isHovered,
  projectName,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalImages = images.length;
  const duration = 3500
  const stepTime = 50;

  useEffect(() => {
    setIndex(0);
    setProgress(0);
    if (images && images.length > 0) {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [images]);

  useEffect(() => {
    if (!isHovered || totalImages <= 1) {
      setProgress(0);
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
    }, stepTime);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % totalImages);
      setProgress(0);
    }, duration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, index, totalImages]);

  if (!images || totalImages === 0) {
    return (
      <div className="w-full h-full bg-theme-btnExploreBg flex items-center justify-center text-xs text-theme-muted font-mono">
        No preview available
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(-1);
    setProgress(0);
    setIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(1);
    setProgress(0);
    setIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (idx === index) return;
    setDirection(idx > index ? 1 : -1);
    setProgress(0);
    setIndex(idx);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none group/carousel bg-zinc-950">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[index]}
            alt={`${projectName} screenshot ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            className="object-cover pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:hidden"
        style={{
          background: "linear-gradient(to top, var(--accent-primary) 0%, transparent 100%)"
        }}
      />
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-gradient-to-t from-black/25 via-transparent to-black/10" />

      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/90">
        {index + 1} / {totalImages}
      </div>

      {totalImages > 1 && (
        <>
          <button
            onClick={(e) => {
              handlePrev(e);
              e.currentTarget.blur();
            }}
            onDoubleClick={(e) => e.stopPropagation()}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              handleNext(e);
              e.currentTarget.blur();
            }}
            onDoubleClick={(e) => e.stopPropagation()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {totalImages > 1 && (
        <div className="absolute bottom-3 md:bottom-2 inset-x-4 z-10 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                handleDotClick(e, idx);
                e.currentTarget.blur();
              }}
              onDoubleClick={(e) => e.stopPropagation()}
              className="h-1 flex-1 relative rounded-full overflow-hidden focus:outline-none transition-colors dark:!bg-white/20"
              style={{
                backgroundColor: "color-mix(in srgb, var(--accent-primary) 20%, transparent)"
              }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === index && isHovered && (
                <div
                  className="h-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "var(--accent-primary)",
                    transition: progress === 0 ? "none" : `width ${stepTime}ms linear`,
                  }}
                />
              )}
              {idx === index && !isHovered && (
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: "var(--accent-primary)" }}
                />
              )}
              {idx < index && (
                <div
                  className="h-full w-full dark:!bg-white/70"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent-primary) 65%, transparent)"
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
