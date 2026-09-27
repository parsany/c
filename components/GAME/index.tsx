"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpaceInvadersEngine from "./SpaceInvadersEngine";
import GameStatsModal from "./GameStatsModal";
import { GameStats, PlayerUpgrades } from "./types";
import { ArrowLeft, Volume2, VolumeX, Shield, Bomb, Key } from "lucide-react";
import { setMuted, getMuted } from "./audio";

interface GameProps {
  onResetToIdle?: () => void;
}

export default function Game({ onResetToIdle }: GameProps) {
  const router = useRouter();
  const [key, setKey] = useState(0);
  const [kills, setKills] = useState(0);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [shields, setShields] = useState(3);
  const [keysCollected, setKeysCollected] = useState(0);
  const [isBossActive, setIsBossActive] = useState(false);
  const [gameOverStats, setGameOverStats] = useState<GameStats | null>(null);
  const [upgrades, setUpgrades] = useState<PlayerUpgrades>({
    weaponLevel: 1,
    fireRateLevel: 1,
    bombs: 0,
  });

  const [isAudioMuted, setIsAudioMuted] = useState(() =>
    typeof window !== "undefined" ? getMuted() : false
  );
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const hintTimer = setTimeout(() => {
      setShowHint(false);
    }, 6000);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(hintTimer);
    };
  }, []);

  const handleGameOver = useCallback((stats: GameStats) => {
    setGameOverStats(stats);
  }, []);

  const handleUpdateStats = useCallback(
    (
      newKills: number,
      newScore: number,
      newWave: number,
      newShields: number,
      newKeys: number,
      bossActive: boolean
    ) => {
      setKills(newKills);
      setScore(newScore);
      setWave(newWave);
      setShields(newShields);
      setKeysCollected(newKeys);
      setIsBossActive(bossActive);
    },
    []
  );

  const handleRestart = useCallback(() => {
    setGameOverStats(null);
    setKills(0);
    setScore(0);
    setWave(1);
    setShields(3);
    setKeysCollected(0);
    setIsBossActive(false);
    setUpgrades({
      weaponLevel: 1,
      fireRateLevel: 1,
      bombs: 0,
    });
    setKey((prev) => prev + 1);
  }, []);

  const handleExit = useCallback(() => {
    if (onResetToIdle) {
      onResetToIdle();
    }
    router.push("/");
  }, [onResetToIdle, router]);

  const toggleSound = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    setMuted(nextMuted);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-40 overflow-hidden select-none font-mono bg-[#09090b] text-white"
      style={{
        cursor: gameOverStats ? "default" : "none",
        pointerEvents: gameOverStats ? "none" : "auto",
      }}
    >
      {!gameOverStats && (
        <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-3 sm:px-6 py-3 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              onClick={handleExit}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white text-xs uppercase tracking-wider font-mono transition-all cursor-pointer shadow-sm active:scale-95"
              title="Return to Home (ESC)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>

            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer shadow-sm"
              title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isAudioMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Shield className="w-3.5 h-3.5 text-sky-400 hidden sm:block" />
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className={`w-3 sm:w-3.5 h-2.5 rounded-xs transition-colors duration-200 ${
                      bar <= Math.min(3, shields)
                        ? shields > 1
                          ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                          : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              {shields > 3 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-sky-400 bg-sky-400/15 border border-sky-400/30">
                  x{shields}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
              <Key className="w-3 h-3 text-amber-400" />
              <div className="flex items-center gap-0.5">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-2 rounded-xs transition-colors ${
                      idx < keysCollected ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-[11px] font-bold">{keysCollected}/3</span>
            </div>

            {upgrades.bombs > 0 && (
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                <Bomb className="w-3 h-3" />
                <span>x{upgrades.bombs} [B]</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono uppercase tracking-wider text-white">
            <div className="bg-white/[0.06] border border-white/10 px-2 sm:px-2.5 py-1 rounded-md">
              <span className="text-white/50 text-[10px] sm:text-xs mr-1">KILLS:</span>
              <span className="font-bold text-rose-400">{kills}</span>
            </div>

            <div className="bg-white/[0.06] border border-white/10 px-2 sm:px-2.5 py-1 rounded-md">
              <span className="text-white/50 text-[10px] sm:text-xs mr-1">SCORE:</span>
              <span className="font-bold text-amber-400">{score}</span>
            </div>

            <div className={`border px-2 sm:px-2.5 py-1 rounded-md hidden sm:block ${
              isBossActive
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse font-bold"
                : wave % 4 === 0
                ? "bg-sky-500/20 border-sky-500/40 text-sky-300 font-bold"
                : "bg-white/[0.06] border-white/10 text-sky-400"
            }`}>
              <span className="text-white/50 text-xs mr-1">
                {isBossActive ? "SECTOR:" : wave % 4 === 0 ? "STATION:" : "WAVE:"}
              </span>
              <span className="font-bold">
                {isBossActive ? "BOSS" : wave % 4 === 0 ? "ARMORY" : wave}
              </span>
            </div>
          </div>
        </header>
      )}

      <SpaceInvadersEngine
        key={key}
        onGameOver={handleGameOver}
        onUpdateStats={handleUpdateStats}
        onReset={handleExit}
        isPaused={false}
        upgrades={upgrades}
        onUpdateUpgrades={setUpgrades}
      />

      {showHint && !gameOverStats && (
        <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center pointer-events-none transition-opacity duration-500">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/60 text-[11px] font-mono tracking-wider backdrop-blur-sm shadow-lg flex items-center gap-2">
            <span>[Move: Mouse / Touch]</span>
            <span>•</span>
            <span>[Shoot: {upgrades.fireRateLevel > 1 ? "Hold to Auto-Fire" : "Click to Fire"}]</span>
            <span>•</span>
            <span>[Keys: Collect 3 for Boss]</span>
            <span>•</span>
            <span>[Shop: Every 4 Waves]</span>
            {upgrades.bombs > 0 && (
              <>
                <span>•</span>
                <span>[Bomb: B]</span>
              </>
            )}
            <span>•</span>
            <span>[Exit: ESC]</span>
          </div>
        </div>
      )}

      {gameOverStats && (
        <GameStatsModal
          stats={gameOverStats}
          onRestart={handleRestart}
          onResetToIdle={handleExit}
        />
      )}
    </div>
  );
}
