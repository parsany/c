import React, { useEffect, useState } from "react";

interface ArchitectureProps {
  isHovered: boolean;
}


function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}


function C(isDark: boolean) {
  return {
    
    box: isDark ? "#0f172a" : "#ffffff",
    boxSub: isDark ? "#1e293b" : "#eef8f9",
    
    wire: isDark ? "#334155" : "#ACBCBF",
    wireSub: isDark ? "#1e293b" : "#c8d8db",
    
    textPri: isDark ? "#f8fafc" : "#243C4C",
    textSec: isDark ? "#e2e8f0" : "#3d5a6e",
    textMut: isDark ? "#64748b" : "#698696",
    
    gridBg: isDark ? "transparent" : "rgba(172,188,191,0.07)",
    
    gridLine: isDark ? "#1e293b" : "#ACBCBF",
  };
}


function GridDefs({ isDark }: { isDark: boolean }) {
  const c = C(isDark);
  return (
    <defs>
      <pattern id="svgGrid" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke={c.gridLine} strokeWidth="0.5" opacity="0.4" />
      </pattern>
    </defs>
  );
}

function GridBg({ isDark }: { isDark: boolean }) {
  const c = C(isDark);
  return (
    <>
      <rect width="100%" height="100%" fill={c.gridBg} />
      <rect width="100%" height="100%" fill="url(#svgGrid)" />
    </>
  );
}


export function AIVisualizer({ isHovered }: ArchitectureProps) {
  const isDark = useIsDark();
  const c = C(isDark);
  const wire = (h: boolean) => h ? "#38bdf8" : c.wireSub;
  const wire2 = (h: boolean) => h ? "#f43f5e" : c.wireSub;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <GridDefs isDark={isDark} />
        <GridBg isDark={isDark} />

        {}
        <line x1="80" y1="60" x2="200" y2="50" stroke={wire(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="80" y1="60" x2="200" y2="110" stroke={wire(isHovered)} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="60" x2="200" y2="170" stroke={wire(isHovered)} strokeWidth="1" opacity="0.2" />
        <line x1="80" y1="110" x2="200" y2="50" stroke={wire(isHovered)} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="110" x2="200" y2="110" stroke={wire(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="80" y1="110" x2="200" y2="170" stroke={wire(isHovered)} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="160" x2="200" y2="50" stroke={wire(isHovered)} strokeWidth="1" opacity="0.2" />
        <line x1="80" y1="160" x2="200" y2="110" stroke={wire(isHovered)} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="160" x2="200" y2="170" stroke={wire(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />

        {}
        <line x1="200" y1="50" x2="320" y2="80" stroke={wire2(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="200" y1="50" x2="320" y2="140" stroke={wire2(isHovered)} strokeWidth="1" opacity="0.3" />
        <line x1="200" y1="110" x2="320" y2="80" stroke={wire2(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="200" y1="110" x2="320" y2="140" stroke={wire2(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="200" y1="170" x2="320" y2="80" stroke={wire2(isHovered)} strokeWidth="1" opacity="0.3" />
        <line x1="200" y1="170" x2="320" y2="140" stroke={wire2(isHovered)} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />

        {isHovered && (
          <>
            <circle cx="80" cy="110" r="3" fill="#38bdf8" className="animate-svg-ping" />
            <circle cx="200" cy="110" r="3.5" fill="#f43f5e" className="animate-svg-ping" />
          </>
        )}

        {}
        <circle cx="80" cy="60" r="8" fill={c.box} stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="80" cy="110" r="8" fill={c.box} stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="80" cy="160" r="8" fill={c.box} stroke="#38bdf8" strokeWidth="1.5" />
        <text x="80" y="45" fill={c.textMut} fontSize="7" textAnchor="middle" fontFamily="monospace">Input</text>

        {}
        <circle cx="200" cy="50" r="8" fill={c.box} stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="200" cy="110" r="8" fill={c.box} stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="200" cy="170" r="8" fill={c.box} stroke="#a855f7" strokeWidth="1.5" />
        <text x="200" y="35" fill={c.textMut} fontSize="7" textAnchor="middle" fontFamily="monospace">Latent/Hidden</text>

        {}
        <circle cx="320" cy="80" r="8" fill={c.box} stroke="#f43f5e" strokeWidth="1.5" />
        <circle cx="320" cy="140" r="8" fill={c.box} stroke="#f43f5e" strokeWidth="1.5" />
        <text x="320" y="65" fill={c.textMut} fontSize="7" textAnchor="middle" fontFamily="monospace">Output</text>
      </svg>
    </div>
  );
}



export function GameVisualizer({ isHovered }: ArchitectureProps) {
  const STARS = [
    { x: 30, y: 40, r: 0.8, o: 0.5 }, { x: 75, y: 25, r: 1.2, o: 0.8 },
    { x: 120, y: 60, r: 0.7, o: 0.4 }, { x: 160, y: 15, r: 1.5, o: 0.9 },
    { x: 280, y: 35, r: 1.0, o: 0.7 }, { x: 310, y: 15, r: 0.9, o: 0.6 },
    { x: 370, y: 45, r: 1.1, o: 0.8 }, { x: 45, y: 90, r: 1.3, o: 0.7 },
    { x: 90, y: 115, r: 0.8, o: 0.4 }, { x: 140, y: 95, r: 1.0, o: 0.5 },
    { x: 180, y: 130, r: 0.7, o: 0.3 }, { x: 250, y: 80, r: 1.4, o: 0.9 },
    { x: 290, y: 120, r: 0.8, o: 0.5 }, { x: 340, y: 75, r: 1.2, o: 0.8 },
    { x: 390, y: 100, r: 1.0, o: 0.6 }, { x: 25, y: 160, r: 1.5, o: 0.8 },
    { x: 70, y: 175, r: 0.9, o: 0.5 }, { x: 110, y: 150, r: 1.1, o: 0.7 },
    { x: 150, y: 180, r: 0.7, o: 0.4 }, { x: 270, y: 165, r: 1.3, o: 0.8 },
    { x: 320, y: 190, r: 0.8, o: 0.5 }, { x: 360, y: 155, r: 1.2, o: 0.9 },
    { x: 405, y: 170, r: 1.0, o: 0.6 }, { x: 220, y: 145, r: 1.4, o: 0.7 },
  ];

  const pinkInvader = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
  ];
  const greenSpriteLeft = [[0, 1, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0]];
  const greenSpriteRight = [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="#020617" />

        {STARS.map((star, idx) => (
          <circle key={idx} cx={star.x} cy={star.y} r={star.r}
            fill="#ffffff" opacity={isHovered ? star.o * 0.5 : star.o}
            className="transition-opacity duration-300" />
        ))}

        {isHovered && (
          <circle cx="210" cy="170" r="3" fill="#eab308" className="animate-bullet" />
        )}

        {}
        <g transform={isHovered ? "translate(188, 28) scale(1.1)" : "translate(188, 30)"}
          className="transition-transform duration-300 ease-in-out">
          {pinkInvader.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect key={`p1-${rIdx}-${cIdx}`} x={cIdx * 4} y={rIdx * 4} width="4" height="4" fill="#f472b6" />
            ))
          )}
        </g>

        {isHovered && (
          <g transform="translate(210, 40)">
            <path d="M 0,-5 C 5,-15 15,-15 15,-5 C 25,-5 25,5 15,5 C 15,15 5,15 0,5 C -5,15 -15,15 -15,5 C -25,5 -25,-5 -15,-5 C -15,-15 -5,-15 0,-5 Z"
              fill="#fde047" stroke="#ef4444" strokeWidth="1.5" className="animate-blast-cloud" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <g key={i} transform={`rotate(${deg})`}>
                <line x1="0" y1="0" x2="0" y2="-15" stroke={i % 2 === 0 ? "#f97316" : "#ef4444"} strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
                <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
              </g>
            ))}
          </g>
        )}

        <g transform={isHovered ? "translate(188, 28) scale(1.1)" : "translate(188, 30)"}
          className="transition-transform duration-300 ease-in-out">
          {pinkInvader.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect key={`p2-${rIdx}-${cIdx}`} x={cIdx * 4} y={rIdx * 4} width="4" height="4" fill="#f472b6" />
            ))
          )}
        </g>

        <g transform={isHovered ? "translate(40, 20) scale(1.05)" : "translate(40, 22)"}
          className="transition-transform duration-300 ease-in-out">
          {greenSpriteLeft.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect key={`gl-${rIdx}-${cIdx}`} x={cIdx * 4} y={rIdx * 4} width="4" height="4" fill="#4ade80" />
            ))
          )}
        </g>

        <g transform={isHovered ? "translate(352, 20) scale(1.05)" : "translate(352, 22)"}
          className="transition-transform duration-300 ease-in-out">
          {greenSpriteRight.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect key={`gr-${rIdx}-${cIdx}`} x={cIdx * 4} y={rIdx * 4} width="4" height="4" fill="#4ade80" />
            ))
          )}
        </g>

        <g transform={isHovered ? "translate(0, -4)" : "translate(0, 0)"}
          className="transition-transform duration-300 ease-in-out">
          <polygon points="210,172 198,190 222,190" fill="#eab308" className="stroke-amber-400 stroke-[0.5]" />
        </g>
      </svg>
    </div>
  );
}


export function RoboticsVisualizer({ isHovered }: ArchitectureProps) {
  const isDark = useIsDark();
  const c = C(isDark);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <GridDefs isDark={isDark} />
        <GridBg isDark={isDark} />

        <line x1="40" y1="110" x2="380" y2="110"
          stroke={c.wire} strokeWidth="1" strokeDasharray="3 3" />
        <text x="50" y="102" fill={c.textMut} fontSize="7" fontFamily="monospace">
          Setpoint Reference
        </text>

        <path
          d={isHovered
            ? "M 40 180 Q 80 40, 120 130 T 200 110 T 280 110 H 380"
            : "M 40 180 H 380"}
          stroke={isHovered ? "#f59e0b" : c.wire}
          strokeWidth="1.8"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />

        {isHovered && (
          <circle cx="300" cy="110" r="3" fill="#eab308" className="animate-svg-ping" />
        )}
      </svg>
    </div>
  );
}


export function AppVisualizer({ isHovered }: ArchitectureProps) {
  const isDark = useIsDark();
  const c = C(isDark);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <GridDefs isDark={isDark} />
        <GridBg isDark={isDark} />

        <g transform="translate(60, 20)">
          {}
          <rect x="0" y="0" width="300" height="170" rx="8"
            fill={c.box} stroke={c.wireSub} strokeWidth="1.5" />
          <path d="M 0 25 L 300 25" stroke={c.wireSub} strokeWidth="1.2" />

          {}
          <circle cx="15" cy="12" r="3.5" fill="#ef4444" opacity="0.8" />
          <circle cx="28" cy="12" r="3.5" fill="#eab308" opacity="0.8" />
          <circle cx="41" cy="12" r="3.5" fill="#22c55e" opacity="0.8" />
          <text x="150" y="16" fill={c.textMut} fontSize="8" textAnchor="middle" fontFamily="monospace">
            Custom Library Manager
          </text>

          {}
          <line x1="80" y1="25" x2="80" y2="170" stroke={c.wireSub} strokeWidth="1" />
          <rect x="10" y="38" width="60" height="12" rx="2"
            fill={isHovered ? c.boxSub : c.box}
            stroke={isHovered ? "#3b82f6" : c.wireSub} strokeWidth="1" />
          <rect x="10" y="58" width="60" height="12" rx="2" fill={c.box} stroke={c.wireSub} strokeWidth="0.5" />
          <rect x="10" y="78" width="60" height="12" rx="2" fill={c.box} stroke={c.wireSub} strokeWidth="0.5" />

          {}
          <g transform="translate(95, 38)">
            <rect x="0" y="0" width="55" height="45" rx="3" fill={c.boxSub} stroke={c.wireSub} className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="5" y1="32" x2="45" y2="32" stroke={c.wire} strokeWidth="2" />
            <line x1="5" y1="38" x2="35" y2="38" stroke={c.wireSub} strokeWidth="2" />

            <rect x="68" y="0" width="55" height="45" rx="3" fill={c.boxSub} stroke={c.wireSub} className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="73" y1="32" x2="113" y2="32" stroke={c.wire} strokeWidth="2" />
            <line x1="73" y1="38" x2="103" y2="38" stroke={c.wireSub} strokeWidth="2" />

            <rect x="136" y="0" width="55" height="45" rx="3" fill={c.boxSub} stroke={c.wireSub} className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="141" y1="32" x2="181" y2="32" stroke={c.wire} strokeWidth="2" />
            <line x1="141" y1="38" x2="171" y2="38" stroke={c.wireSub} strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}


export function CompilerVisualizer({ isHovered }: ArchitectureProps) {
  const isDark = useIsDark();
  const c = C(isDark);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <GridDefs isDark={isDark} />
        <GridBg isDark={isDark} />

        {}
        <line x1="210" y1="50" x2="130" y2="100" stroke={isHovered ? "#10b981" : c.wireSub} strokeWidth="1.5" />
        <line x1="210" y1="50" x2="290" y2="100" stroke={isHovered ? "#10b981" : c.wireSub} strokeWidth="1.5" />
        <line x1="130" y1="100" x2="80" y2="150" stroke={isHovered ? "#38bdf8" : c.wireSub} strokeWidth="1.2" />
        <line x1="130" y1="100" x2="180" y2="150" stroke={isHovered ? "#38bdf8" : c.wireSub} strokeWidth="1.2" />

        {}
        <g transform="translate(180, 30)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill={c.box} stroke="#10b981" strokeWidth="1.5" />
          <text x="30" y="18" fill={c.textPri} fontSize="8.5" textAnchor="middle" fontFamily="monospace">Program</text>
        </g>

        {}
        <g transform="translate(100, 85)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill={c.box} stroke="#a855f7" strokeWidth="1.2" />
          <text x="30" y="18" fill={c.textPri} fontSize="8" textAnchor="middle" fontFamily="monospace">Statement</text>
        </g>

        {}
        <g transform="translate(260, 85)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill={c.box} stroke="#a855f7" strokeWidth="1.2" />
          <text x="30" y="18" fill={c.textPri} fontSize="8" textAnchor="middle" fontFamily="monospace">Declaration</text>
        </g>

        {}
        <g transform="translate(50, 135)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill={c.boxSub} stroke="#38bdf8" strokeWidth="1" />
          <text x="30" y="18" fill={isHovered ? "#a5f3fc" : c.textSec} fontSize="8.5" textAnchor="middle" fontFamily="monospace">ID (&quot;x&quot;)</text>
        </g>

        {}
        <g transform="translate(150, 135)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill={c.boxSub} stroke="#38bdf8" strokeWidth="1" />
          <text x="30" y="18" fill={isHovered ? "#a5f3fc" : c.textSec} fontSize="8.5" textAnchor="middle" fontFamily="monospace">NUM (42)</text>
        </g>
      </svg>
    </div>
  );
}
