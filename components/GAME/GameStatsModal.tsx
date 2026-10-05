"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GameStats } from "./types";
import { X, FileText, User, RotateCcw, Crosshair, Trophy, Target, Clock, ArrowRight, ArrowLeft } from "lucide-react";

interface GameStatsModalProps {
  stats: GameStats;
  onRestart: () => void;
  onResetToIdle: () => void;
}

const HIGH_SCORE_KEY = "conway_invaders_high_score";

export default function GameStatsModal({
  stats,
  onRestart,
  onResetToIdle,
}: GameStatsModalProps) {
  const router = useRouter();
  const durationSec = Math.max(1, Math.round((stats.endTime - stats.startTime) / 1000));
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;

  const [{ highScore, isNewHigh }] = useState(() => {
    if (typeof window === "undefined") {
      return { highScore: stats.score, isNewHigh: false };
    }
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      const prevHigh = saved ? parseInt(saved, 10) : 0;
      if (stats.score > prevHigh) {
        localStorage.setItem(HIGH_SCORE_KEY, stats.score.toString());
        return { highScore: stats.score, isNewHigh: true };
      }
      return { highScore: prevHigh, isNewHigh: false };
    } catch {
      return { highScore: stats.score, isNewHigh: false };
    }
  });

  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  const handleExitHome = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onResetToIdle();
    router.push("/");
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onResetToIdle();
    router.push("/about");
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onResetToIdle();
    router.push("/cv");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none"
      style={{ pointerEvents: "auto", cursor: "default" }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
        className="relative w-full max-w-md bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-7 gap-5 font-sans text-white"
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
                GAME OVER
              </h2>
              {isNewHigh && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-widest animate-pulse">
                  New High!
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 font-mono tracking-wider uppercase mt-1">
              Performance Summary
            </p>
          </div>
          <button
            onClick={handleExitHome}
            type="button"
            title="Exit to Homepage"
            aria-label="Exit to Homepage"
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-white/50 text-xs uppercase tracking-wider">
              <Crosshair className="w-3.5 h-3.5 text-rose-400" />
              <span>Kills</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {stats.kills}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-white/50 text-xs uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Score</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {stats.score}
            </span>
            {highScore > 0 && (
              <span className="text-[11px] text-white/40 mt-0.5">
                Best: {highScore}
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-white/50 text-xs uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              <span>Accuracy</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {accuracy}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1.5 mb-1 text-white/50 text-xs uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Survival</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {durationSec}s
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold font-mono text-sm tracking-wider uppercase shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleResumeClick}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium font-sans text-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-1.5 group"
            >
              <FileText className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
              <span>Resume</span>
              <ArrowRight className="w-3 h-3 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleAboutClick}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium font-sans text-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-1.5 group"
            >
              <User className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
              <span>About Me</span>
              <ArrowRight className="w-3 h-3 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button
            onClick={handleExitHome}
            type="button"
            className="w-full py-2 px-3 text-center text-xs font-mono text-white/50 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
