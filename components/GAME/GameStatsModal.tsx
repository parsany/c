import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GameStats } from "./types";
import { X, FileText, User, RotateCcw, Crosshair, Trophy, Target, Clock, ArrowRight } from "lucide-react";

interface GameStatsModalProps {
  stats: GameStats;
  onRestart: () => void;
  onResetToIdle: () => void;
}

export default function GameStatsModal({
  stats,
  onRestart,
  onResetToIdle,
}: GameStatsModalProps) {
  const router = useRouter();
  const durationSec = Math.max(1, Math.round((stats.endTime - stats.startTime) / 1000));
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;

  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onResetToIdle();
    router.push("/about");
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onResetToIdle();
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none"
      style={{ pointerEvents: "auto", cursor: "default" }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-md bg-theme-panelBg border border-theme-panelBorder rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-7 gap-6 font-sans"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-theme-border pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-theme-text font-mono uppercase">
              GAME OVER
            </h2>
            <p className="text-xs text-theme-muted font-mono tracking-wider uppercase mt-0.5">
              Performance Summary
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onResetToIdle();
            }}
            type="button"
            title="Return to Homepage"
            aria-label="Return to Homepage"
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2x2 Stats Grid */}
        <div className="grid grid-cols-2 gap-3 font-mono">
          {/* Kills */}
          <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border/70 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-theme-muted text-xs uppercase tracking-wider">
              <Crosshair className="w-3.5 h-3.5 text-theme-accent" />
              <span>Kills</span>
            </div>
            <span className="text-2xl font-bold text-theme-text">
              {stats.kills}
            </span>
          </div>

          {/* Score */}
          <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border/70 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-theme-muted text-xs uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-theme-accent" />
              <span>Score</span>
            </div>
            <span className="text-2xl font-bold text-theme-text">
              {stats.score}
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border/70 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-theme-muted text-xs uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-theme-accent" />
              <span>Accuracy</span>
            </div>
            <span className="text-2xl font-bold text-theme-text">
              {accuracy}%
            </span>
          </div>

          {/* Survival */}
          <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border/70 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-theme-muted text-xs uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-theme-accent" />
              <span>Survival</span>
            </div>
            <span className="text-2xl font-bold text-theme-text">
              {durationSec}s
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Primary Action: Play Again */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-bold font-mono text-sm tracking-wider uppercase shadow-sm transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          {/* Secondary Actions Row: Resume & About Me */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="py-2 px-3 rounded-xl bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent/50 text-theme-btnExploreText hover:text-theme-text font-medium font-sans text-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-1.5 group"
            >
              <FileText className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text transition-colors" />
              <span>Resume</span>
              <ArrowRight className="w-3 h-3 text-theme-muted group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={handleAboutClick}
              type="button"
              className="py-2 px-3 rounded-xl bg-theme-btnExploreBg hover:bg-theme-bg border border-theme-btnExploreBorder hover:border-theme-accent/50 text-theme-btnExploreText hover:text-theme-text font-medium font-sans text-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-1.5 group"
            >
              <User className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text transition-colors" />
              <span>About Me</span>
              <ArrowRight className="w-3 h-3 text-theme-muted group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

}
