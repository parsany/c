import React, { useRef, useEffect, useState, useCallback } from "react";
import CrossPanel from "./CrossPanel";
import HeroBadge from "./intro/HeroBadge";
import HeroContent from "./intro/HeroContent";
import AttackEngine from "./intro/AttackEngine";
import { Phase } from "./intro/types";
import Game from "@/GAME";

interface IntroSectionProps {
  onOpenCommandMenu: () => void;
}

export default function IntroSection({ onOpenCommandMenu }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rogueCanvasRef = useRef<HTMLCanvasElement>(null);
  const fireCanvasRef = useRef<HTMLCanvasElement>(null);

  const [showTrigger, setShowTrigger] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [size, setSize] = useState(4);
  const [density, setDensity] = useState(32);
  const [radius, setRadius] = useState(160);
  const [fireMode, setFireMode] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [allEaten, setAllEaten] = useState(false);

  const attackMode = phase === 'attacking';
  const isMinigame = phase === 'minigame';

  useEffect(() => {
    const t = setTimeout(() => setShowTrigger(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleToggle = () => setFireMode((prev) => !prev);
    window.addEventListener("toggle-burning", handleToggle);
    return () => window.removeEventListener("toggle-burning", handleToggle);
  }, []);

  useEffect(() => {
    const handleStartMinigame = () => setPhase('minigame');
    window.addEventListener("start-minigame", handleStartMinigame);
    return () => window.removeEventListener("start-minigame", handleStartMinigame);
  }, []);

  useEffect(() => {
    if (allEaten || isMinigame) {
      document.body.classList.add("all-eaten");
    } else {
      document.body.classList.remove("all-eaten");
    }
    return () => {
      document.body.classList.remove("all-eaten");
    };
  }, [allEaten, isMinigame]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("toggle-burning-state", { detail: fireMode }));
  }, [fireMode]);

  const handleAttackClick = useCallback(() => {
    setPhase(prev => (prev === 'idle' ? 'escaped' : 'idle'));
  }, []);

  const handleStartGame = useCallback(() => {
    setPhase('minigame');
  }, []);

  const handleResetToIdle = useCallback(() => {
    setPhase('idle');
  }, []);

  return (
    <>
      {isMinigame && (
        <Game onResetToIdle={handleResetToIdle} />
      )}

      <canvas
        ref={fireCanvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9997,
          pointerEvents: "none",
          display: fireMode ? "block" : "none",
        }}
      />
      <canvas
        ref={rogueCanvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: "none",
          display: attackMode ? "block" : "none",
        }}
      />

      <section
        ref={sectionRef}
        className={`relative pt-12 md:pt-20 pb-8 md:pb-12 border-b border-theme-border overflow-hidden ${
          isMinigame ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"
        }`}
      >
        <AttackEngine
          sectionRef={sectionRef}
          canvasRef={canvasRef}
          rogueCanvasRef={rogueCanvasRef}
          fireCanvasRef={fireCanvasRef}
          phase={phase}
          setPhase={setPhase}
          size={size}
          density={density}
          radius={radius}
          fireMode={fireMode}
          setFireMode={setFireMode}
          allEaten={allEaten}
          setAllEaten={setAllEaten}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: phase !== 'idle' ? "fixed" : "absolute",
            inset: 0,
            zIndex: phase !== 'idle' ? 0 : "auto",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
          className="pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          <HeroBadge allEaten={allEaten} onStartGame={handleStartGame} />
          <HeroContent onOpenCommandMenu={onOpenCommandMenu} />
        </div>

        {showTrigger && !panelOpen && !isMinigame && (
          <div
            className="absolute bottom-6 right-6 z-50 flex items-center gap-2 group select-none"
            data-no-destroy="true"
          >
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono tracking-widest uppercase bg-theme-panelBg border border-theme-border text-theme-muted group-hover:text-theme-text shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
              Cross Options
            </span>

            <button
              onClick={() => setPanelOpen(true)}
              data-no-destroy="true"
              className="relative overflow-hidden w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-all duration-300 group-hover:scale-110 active:scale-95"
              style={{
                background: "var(--cross-trigger-bg)",
                borderColor: "var(--cross-trigger-border)",
                color: "var(--cross-trigger-color)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--cross-trigger-border-hover)";
                el.style.color = "var(--cross-trigger-color-hover)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--cross-trigger-border)";
                el.style.color = "var(--cross-trigger-color)";
              }}
            >
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%)",
                  animation: "curvedFlash 4s ease-in-out infinite",
                }}
              />
              <style>{`
                @keyframes curvedFlash {
                  0%, 65% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
                  70% { opacity: 1; }
                  85%, 100% { transform: translateX(200%) skewX(-25deg); opacity: 0; }
                }
              `}</style>
              <span className="relative z-10 text-xs font-bold">✛</span>
            </button>
          </div>
        )}

      </section>

      {panelOpen && !isMinigame && (
        <div data-no-destroy="true">
          <CrossPanel
            size={size}
            onSize={setSize}
            density={density}
            onDensity={setDensity}
            radius={radius}
            onRadius={setRadius}
            fireMode={fireMode}
            attackMode={attackMode}
            phase={phase}
            onAttack={handleAttackClick}
            onClose={() => setPanelOpen(false)}
          />
        </div>
      )}
    </>
  );
}
