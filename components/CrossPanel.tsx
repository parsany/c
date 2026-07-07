import React from "react";

interface CrossPanelProps {
  size: number; onSize: (v: number) => void;
  density: number; onDensity: (v: number) => void;
  radius: number; onRadius: (v: number) => void;
  fireMode: boolean; onFire: () => void;
  attackMode: boolean; onAttack: () => void;
  onClose: () => void;
}

const Slider = ({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void;
}) => (
  <div className="mb-3.5">
    <div className="flex justify-between mb-1">
      <span className="text-[10px] tracking-wider text-slate-400 uppercase">{label}</span>
      <span className="text-[10px] font-mono text-slate-300">{value}</span>
    </div>
    <div className="relative h-5 flex items-center">
      <div className="absolute left-0 right-0 h-[1px] bg-slate-800" />
      <div
        className="absolute left-0 h-[1px]"
        style={{
          width: `${((value - min) / (max - min)) * 100}%`,
          background: "rgba(215,201,165,0.6)",
        }}
      />
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="relative z-10 w-full m-0 appearance-none bg-transparent cursor-pointer outline-none"
      />
    </div>
  </div>
);

export default function CrossPanel({ size, onSize, density, onDensity, radius, onRadius, fireMode, onFire, attackMode, onAttack, onClose }: CrossPanelProps) {
  return (
    <div
      className="absolute bottom-6 right-6 z-50 w-[260px] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
      style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        animation: "panelIn 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <style>{`
        @keyframes panelIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        input[type=range]::-webkit-slider-thumb {
          appearance:none; width:8px; height:8px;
          background:#d7c9a5; border:none; cursor:pointer;
        }
        input[type=range]::-moz-range-thumb {
          width:8px; height:8px; background:#d7c9a5;
          border:none; cursor:pointer;
        }
      `}</style>

      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800/80">
        <span className="text-[11px] tracking-wider text-slate-400 uppercase">✛ CROSS FIELD</span>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-200 transition-colors text-sm font-sans"
        >
          ✕
        </button>
      </div>

      <div className="px-3.5 py-3">
        <Slider label="Size" value={size} min={2} max={12} onChange={onSize} />
        <Slider label="Density" value={density} min={16} max={60} onChange={onDensity} />
        <Slider label="Influence Radius" value={radius} min={60} max={320} onChange={onRadius} />
      </div>

      <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-800/60 flex gap-2">
        <button
          onClick={onFire}
          className={`flex-1 py-1.5 px-2 text-[10px] tracking-wider transition-all duration-200 font-mono rounded border ${
            fireMode
              ? "bg-orange-500/10 border-orange-500/40 text-orange-500 shadow-sm"
              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          {fireMode ? "🔥 BURNING" : "IGNITE"}
        </button>

        <button
          onClick={onAttack}
          className={`flex-1 py-1.5 px-2 text-[10px] tracking-wider transition-all duration-200 font-mono rounded border ${
            attackMode
              ? "bg-red-500/10 border-red-500/40 text-red-500 shadow-sm"
              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          {attackMode ? "⚠ ATTACKING" : "ATTACK"}
        </button>
      </div>

      {attackMode && (
        <div className="px-3.5 pb-2.5 text-[9px] tracking-wider text-slate-500 leading-normal uppercase">
          CROSSES RELEASED — SYSTEM COMPROMISED
        </div>
      )}
    </div>
  );
}
