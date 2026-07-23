import React, { useState, useCallback } from "react";
import SpaceInvadersEngine from "./SpaceInvadersEngine";
import GameStatsModal from "./GameStatsModal";
import { GameStats } from "./types";

interface GameProps {
  onResetToIdle: () => void;
}

export default function Game({ onResetToIdle }: GameProps) {
  const [key, setKey] = useState(0);
  const [kills, setKills] = useState(0);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [gameOverStats, setGameOverStats] = useState<GameStats | null>(null);

  const handleGameOver = useCallback((stats: GameStats) => {
    setGameOverStats(stats);
  }, []);

  const handleUpdateStats = useCallback((newKills: number, newScore: number, newWave: number) => {
    setKills(newKills);
    setScore(newScore);
    setWave(newWave);
  }, []);

  const handleRestart = useCallback(() => {
    setGameOverStats(null);
    setKills(0);
    setScore(0);
    setWave(1);
    setKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[9999] overflow-hidden select-none font-mono bg-[#09090b]"
        style={{
          cursor: gameOverStats ? "default" : "none",
          pointerEvents: gameOverStats ? "none" : "auto",
        }}
      >
        {/* Top Right Spacewar HUD Header */}
        {!gameOverStats && (
          <div className="absolute top-4 right-4 z-[10001] flex items-center space-x-3 text-base sm:text-lg font-mono uppercase tracking-wider text-white select-none pointer-events-none">
            <div>
              KILLS: <span className="font-bold">{kills}</span>
            </div>
            <span className="text-white">|</span>
            <div>
              SCORE: <span className="font-bold">{score}</span>
            </div>
            <span className="text-white">|</span>
            <div>
              WAVE: <span className="font-bold">{wave}</span>
            </div>
          </div>
        )}

        {/* Arcade Game Canvas */}
        <SpaceInvadersEngine
          key={key}
          onGameOver={handleGameOver}
          onUpdateStats={handleUpdateStats}
          onReset={onResetToIdle}
        />
      </div>

      {/* Standalone Top-Level Game Over Stats Modal Component */}
      {gameOverStats && (
        <GameStatsModal
          stats={gameOverStats}
          onRestart={handleRestart}
          onResetToIdle={onResetToIdle}
        />
      )}
    </>
  );
}
