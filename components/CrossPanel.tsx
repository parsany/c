import React from "react";

type Phase = 'idle' | 'escaped' | 'going_rogue' | 'attacking';

interface CrossPanelProps {
  size: number;
  onSize: (v: number) => void;
  density: number;
  onDensity: (v: number) => void;
  radius: number;
  onRadius: (v: number) => void;
  fireMode: boolean;
  attackMode: boolean;
  phase: Phase;
  onAttack: () => void;
  onClose: () => void;
}

const Slider = ({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
  <div className="mb-4.5">
    <div className="flex justify-between mb-1.5 select-none">
      <span className="text-sm tracking-wider text-theme-muted uppercase font-semibold">
        {label}
      </span>
      <span className="text-sm font-mono text-theme-text font-bold">
        {value}
      </span>
    </div>
    <div className="relative h-6 flex items-center">
      <div className="absolute left-0 right-0 h-[4px] rounded bg-black/10 dark:bg-white/10" />
      <div
        className="absolute left-0 h-[4px] rounded transition-all duration-100"
        style={{
          width: `${((value - min) / (max - min)) * 100}%`,
          background: "var(--cross-accent)",
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="relative z-10 w-full m-0 appearance-none bg-transparent cursor-pointer outline-none"
      />
    </div>
  </div>
);

export default function CrossPanel({
  size,
  onSize,
  density,
  onDensity,
  radius,
  onRadius,
  fireMode,
  attackMode,
  phase,
  onAttack,
  onClose,
}: CrossPanelProps) {
  const isEscaped = phase === 'escaped';
  const isGoingRogue = phase === 'going_rogue';
  const isAttacking = phase === 'attacking';
  const isActive = phase !== 'idle';

  const borderColor = isAttacking
    ? "rgba(239, 68, 68, 0.7)"
    : isGoingRogue
      ? undefined // animated via keyframes
      : isEscaped
        ? "rgba(215, 201, 165, 0.6)"
        : fireMode
          ? "rgba(249, 115, 22, 0.6)"
          : "var(--panel-border)";

  const boxShadow = isAttacking
    ? "0 0 30px rgba(239, 68, 68, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.6)"
    : isGoingRogue
      ? undefined
      : isEscaped
        ? "0 0 20px rgba(215, 201, 165, 0.15), 0 10px 30px -10px rgba(0, 0, 0, 0.5)"
        : fireMode
          ? "0 0 30px rgba(249, 115, 22, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.6)"
          : "0 20px 40px -15px rgba(0,0,0,0.3)";

  const btnLabel = isAttacking
    ? "ATTACKING"
    : isGoingRogue
      ? "⚡ going rogue..."
      : isEscaped
        ? "they're outside"
        : "let them outside the header";

  const btnClass = isAttacking
    ? "bg-red-500/10 border-red-500/60 text-red-400 shadow-md shadow-red-500/10"
    : isGoingRogue
      ? "border-yellow-500/60 text-yellow-400 shadow-md shadow-yellow-500/10"
      : isEscaped
        ? "bg-yellow-500/5 border-yellow-600/40 text-yellow-600 dark:text-yellow-300/80"
        : "bg-theme-btnExploreBg border border-theme-btnExploreBorder text-theme-btnExploreText hover:text-theme-text hover:bg-theme-accentLight/30 hover:border-theme-accent/60";

  return (
    <div
      data-no-destroy="true"
      className={`${isActive ? 'fixed' : 'absolute'} bottom-6 right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[350px] bg-theme-panelBg border rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300`}
      style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        animation: "panelIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: isGoingRogue ? undefined : boxShadow,
        borderColor: isGoingRogue ? undefined : borderColor,
        animationName: isGoingRogue ? "panelIn, rogueBorder" : "panelIn",
      }}
    >
      <style>{`
        @keyframes panelIn { 
          from { opacity: 0; transform: translateY(16px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes rogueBorder {
          0%   { border-color: rgba(215,201,165,0.5); box-shadow: 0 0 20px rgba(215,201,165,0.15), 0 10px 30px -10px rgba(0,0,0,0.5); }
          20%  { border-color: rgba(239,68,68,0.7);  box-shadow: 0 0 30px rgba(239,68,68,0.2), 0 10px 30px -10px rgba(0,0,0,0.6); }
          40%  { border-color: rgba(251,191,36,0.8); box-shadow: 0 0 30px rgba(251,191,36,0.2); }
          60%  { border-color: rgba(239,68,68,0.9);  box-shadow: 0 0 40px rgba(239,68,68,0.35); }
          80%  { border-color: rgba(234,179,8,0.7);  box-shadow: 0 0 25px rgba(234,179,8,0.2); }
          100% { border-color: rgba(239,68,68,0.7);  box-shadow: 0 0 30px rgba(239,68,68,0.3), 0 10px 30px -10px rgba(0,0,0,0.6); }
        }
        @keyframes rogueBtn {
          0%   { background-color: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.6); color: rgb(251,191,36); }
          33%  { background-color: rgba(239,68,68,0.12);  border-color: rgba(239,68,68,0.7);  color: rgb(239,68,68); }
          66%  { background-color: rgba(255,140,0,0.1);   border-color: rgba(255,140,0,0.65); color: rgb(255,140,0); }
          100% { background-color: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.6); color: rgb(251,191,36); }
        }
        .rogue-panel {
          animation: panelIn 0.3s cubic-bezier(0.16,1,0.3,1), rogueBorder 0.55s ease-in-out infinite;
        }
        .rogue-btn {
          animation: rogueBtn 0.4s ease-in-out infinite;
        }
        input[type=range]::-webkit-slider-thumb {
          appearance: none; 
          width: 14px; 
          height: 14px; 
          border-radius: 9999px;
          background: var(--cross-accent); 
          border: 2px solid var(--panel-bg); 
          cursor: pointer;
          box-shadow: 0 0 8px var(--cross-accent-rgba);
          transition: transform 0.1s ease-out, background-color 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        input[type=range]:active::-webkit-slider-thumb {
          background: #ffffff;
          border-color: var(--cross-accent);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px; 
          height: 14px; 
          border-radius: 9999px;
          background: var(--cross-accent); 
          border: 2px solid var(--panel-bg); 
          cursor: pointer;
          box-shadow: 0 0 8px var(--cross-accent-rgba);
          transition: transform 0.1s ease-out, background-color 0.1s;
        }
        input[type=range]::-moz-range-thumb:hover {
          transform: scale(1.25);
        }
        input[type=range]:active::-moz-range-thumb {
          background: #ffffff;
          border-color: var(--cross-accent);
        }
      `}</style>

      {/* Wrapper to apply rogue animation class */}
      <div
        className={isGoingRogue ? "rogue-panel contents" : "contents"}
        style={isGoingRogue ? { display: "contents" } : {}}
      />

      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none ${isGoingRogue ? "rogue-panel" : ""}`}
        style={{ zIndex: -1 }}
      />

      <div className="flex items-center justify-between px-5 py-4 border-b border-theme-border bg-black/5 dark:bg-white/5 select-none">
        <span className="text-base tracking-widest text-theme-muted uppercase font-bold flex items-center gap-1.5">
          <span>✛</span>
          <span>CROSS FIELD OPTIONS</span>
        </span>
        <button
          onClick={onClose}
          className="text-theme-muted hover:text-theme-text transition-colors text-lg font-sans w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 hover:dark:bg-white/5"
          aria-label="Close settings panel"
        >
          ✕
        </button>
      </div>

      {/* Sliders only in idle */}
      {phase === 'idle' && (
        <div className="px-5 py-5 flex flex-col gap-1">
          <Slider label="Cross Size" value={size} min={2} max={12} onChange={onSize} />
          <Slider label="Cross Density" value={density} min={16} max={60} onChange={onDensity} />
          <Slider label="Cursor Influence Radius" value={radius} min={60} max={320} onChange={onRadius} />
        </div>
      )}

      {/* Status message for non-idle phases */}
      {isEscaped && (
        <div className="px-5 py-4 text-xs font-mono text-yellow-600 dark:text-yellow-300/70 tracking-wide select-none">
          thanks for letting them breathe out.
        </div>
      )}

      {isGoingRogue && (
        <div className="px-5 py-4 text-xs font-mono tracking-wide select-none" style={{ color: "rgb(239,68,68)", animation: "rogueBtn 0.4s ease-in-out infinite" }}>
          something{"'"}s off—
        </div>
      )}

      {isAttacking && (
        <div className="px-5 py-4 text-xs font-mono text-red-400 tracking-wide select-none">
          technically they are out, ill ship it.
        </div>
      )}

      <div className="px-5 py-4 border-t border-theme-border flex gap-3 bg-black/5 dark:bg-white/5">
        <button
          onClick={onAttack}
          className={`w-full py-2 px-3 text-xs sm:text-sm tracking-widest font-bold transition-all duration-200 font-mono rounded-lg border flex items-center justify-center gap-1 ${isGoingRogue ? "rogue-btn" : btnClass}`}
        >
          <span>{btnLabel}</span>
        </button>
      </div>
    </div>
  );
}
