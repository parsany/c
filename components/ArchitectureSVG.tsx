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


function C() {
  return {
    box: "var(--svg-box-bg)",
    boxSub: "var(--svg-box-bg-sub)",
    wire: "var(--svg-wire-active)",
    wireSub: "var(--svg-wire-inactive)",
    textPri: "var(--svg-text-pri)",
    textSec: "var(--svg-text-mut)",
    textMut: "var(--svg-text-mut)",
    gridBg: "transparent",
    gridLine: "var(--svg-grid-line)",
  };
}


function GridDefs() {
  const c = C();
  return (
    <defs>
      <pattern id="svgGrid" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke={c.gridLine} strokeWidth="0.5" />
      </pattern>
    </defs>
  );
}

function GridBg() {
  const c = C();
  return (
    <>
      <rect width="100%" height="100%" fill={c.gridBg} />
      <rect width="100%" height="100%" fill="url(#svgGrid)" />
    </>
  );
}


export function AIVisualizer({ isHovered }: ArchitectureProps) {
  const c = C();

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <style>{`
          .ai-line {
            stroke: var(--svg-wire-inactive);
            stroke-width: 1;
            opacity: 0.25;
            transition: all 0.5s ease;
          }
          .ai-line-active {
            stroke: var(--accent-primary);
            stroke-width: 1.5;
            opacity: 0.8;
            stroke-dasharray: 5 5;
          }
          .ai-node {
            fill: var(--svg-box-bg);
            stroke: var(--svg-wire-inactive);
            stroke-width: 1.5;
            transition: all 0.5s ease;
          }
          .ai-node-active {
            stroke: var(--accent-primary);
            fill: var(--svg-box-bg-sub);
            filter: drop-shadow(0 0 4px var(--accent-primary));
          }
        `}</style>
        <GridDefs />
        <GridBg />

        {[
          { x1: 90, y1: 50 }, { x1: 90, y1: 110 }, { x1: 90, y1: 170 }
        ].map((inp, i) =>
          [
            { x2: 210, y2: 40 }, { x2: 210, y2: 85 }, { x2: 210, y2: 135 }, { x2: 210, y2: 180 }
          ].map((hid, j) => (
            <line
              key={`in-hid-${i}-${j}`}
              x1={inp.x1}
              y1={inp.y1}
              x2={hid.x2}
              y2={hid.y2}
              className={isHovered ? "ai-line-active" : "ai-line"}
            />
          ))
        )}

        {[
          { x1: 210, y1: 40 }, { x1: 210, y1: 85 }, { x1: 210, y1: 135 }, { x1: 210, y1: 180 }
        ].map((hid, i) =>
          [
            { x2: 330, y2: 75 }, { x2: 330, y2: 145 }
          ].map((out, j) => (
            <line
              key={`hid-out-${i}-${j}`}
              x1={hid.x1}
              y1={hid.y1}
              x2={out.x2}
              y2={out.y2}
              className={isHovered ? "ai-line-active" : "ai-line"}
              style={{ stroke: isHovered ? "var(--cross-accent)" : "" }}
            />
          ))
        )}

        <g>
          <circle cx="90" cy="50" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} />
          <circle cx="90" cy="110" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} />
          <circle cx="90" cy="170" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} />
          <text x="90" y="32" fill={c.textMut} fontSize="8" textAnchor="middle" fontFamily="monospace">Data In</text>
        </g>

        <g>
          <circle cx="210" cy="40" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
          <circle cx="210" cy="85" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
          <circle cx="210" cy="135" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
          <circle cx="210" cy="180" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
          <text x="210" y="24" fill={c.textMut} fontSize="8" textAnchor="middle" fontFamily="monospace">Latent</text>
        </g>

        <g>
          <circle cx="330" cy="75" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--accent-hover)" : "" }} />
          <circle cx="330" cy="145" r="6" className={`ai-node ${isHovered ? "ai-node-active" : ""}`} style={{ stroke: isHovered ? "var(--accent-hover)" : "" }} />
          <text x="330" y="58" fill={c.textMut} fontSize="8" textAnchor="middle" fontFamily="monospace">Target</text>
        </g>
      </svg>
    </div>
  );
}


export function AppVisualizer({ isHovered }: ArchitectureProps) {
  const c = C();

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <style>{`
          @keyframes app-flow {
            to { stroke-dashoffset: -20; }
          }
          .window-frame {
            fill: var(--svg-box-bg);
            stroke: var(--svg-frame-border);
            stroke-width: 1;
            transition: all 0.5s ease;
          }
          .window-frame-active {
            stroke: var(--accent-primary);
          }
          .nav-item {
            fill: var(--svg-frame-border);
            opacity: 0.4;
            transition: all 0.5s ease;
          }
          .nav-item-active {
            fill: var(--accent-primary);
            opacity: 0.8;
          }

        `}</style>
        <GridDefs />
        <GridBg />

        <g transform="translate(60, 25)">
          <rect x="0" y="0" width="300" height="160" rx="6" className={`window-frame ${isHovered ? "window-frame-active" : ""}`} />
          <path d="M 0 20 L 300 20" stroke="var(--svg-frame-border)" strokeWidth="0.8" />

          <circle cx="10" cy="10" r="2" fill="var(--svg-frame-border)" opacity="0.6" />
          <circle cx="18" cy="10" r="2" fill="var(--svg-frame-border)" opacity="0.6" />
          <circle cx="26" cy="10" r="2" fill="var(--svg-frame-border)" opacity="0.6" />

          <line x1="60" y1="20" x2="60" y2="160" stroke="var(--svg-frame-border)" strokeWidth="0.8" />

          <rect x="10" y="32" width="40" height="6" rx="1" className={`nav-item ${isHovered ? "nav-item-active" : ""}`} />
          <rect x="10" y="46" width="30" height="4" rx="1" className="nav-item" />
          <rect x="10" y="58" width="35" height="4" rx="1" className="nav-item" />

          <g transform="translate(75, 32)">
            <rect x="5" y="5" width="60" height="100" rx="4" className={`app-card ${isHovered ? "app-card-active" : ""}`} />

            <path
              d="M 65,55 H 145"
              className={isHovered ? "flow-arrow-active" : "flow-arrow"}
            />

            <rect x="145" y="25" width="65" height="60" rx="4" className={`app-card ${isHovered ? "app-card-active" : ""}`} />
          </g>
        </g>
      </svg>
    </div>
  );
}


export function CompilerVisualizer({ isHovered }: ArchitectureProps) {
  const c = C();

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <style>{`
          .compiler-cog {
            transform-origin: 210px 110px;
            transition: stroke 0.5s ease;
          }
          .comp-line {
            stroke: var(--svg-wire-inactive);
            stroke-width: 1;
            opacity: 0.25;
            transition: all 0.5s ease;
          }
          .comp-line-active {
            stroke: var(--accent-primary);
            stroke-width: 1.5;
            opacity: 0.8;
            stroke-dasharray: 4 4;
          }
          .code-block {
            fill: var(--svg-box-bg-sub);
            stroke: var(--svg-frame-border);
            stroke-width: 1;
            transition: all 0.5s ease;
          }
          .code-block-active {
            stroke: var(--accent-primary);
            filter: drop-shadow(0 0 3px var(--accent-primary));
          }
          .code-line {
            fill: var(--svg-frame-border);
            opacity: 0.35;
            transition: all 0.5s ease;
          }
          .code-line-active {
            fill: var(--accent-primary);
            opacity: 0.85;
          }
          .comp-node {
            fill: var(--svg-box-bg);
            stroke: var(--svg-wire-inactive);
            stroke-width: 1.5;
            transition: all 0.5s ease;
          }
          .comp-node-active {
            stroke: var(--accent-primary);
            fill: var(--svg-box-bg-sub);
            filter: drop-shadow(0 0 3px var(--accent-primary));
          }
        `}</style>
        <GridDefs />
        <GridBg />

        <g transform="translate(60, 60)">
          <rect x="0" y="0" width="70" height="100" rx="4" className={`code-block ${isHovered ? "code-block-active" : ""}`} />
          <rect x="10" y="18" width="45" height="3" rx="1" className={`code-line ${isHovered ? "code-line-active" : ""}`} />
          <rect x="20" y="34" width="35" height="3" rx="1" className={`code-line ${isHovered ? "code-line-active" : ""}`} />
          <rect x="20" y="50" width="40" height="3" rx="1" className={`code-line ${isHovered ? "code-line-active" : ""}`} style={{ fill: isHovered ? "var(--cross-accent)" : "" }} />
          <rect x="20" y="66" width="30" height="3" rx="1" className={`code-line ${isHovered ? "code-line-active" : ""}`} />
          <rect x="10" y="82" width="25" height="3" rx="1" className={`code-line ${isHovered ? "code-line-active" : ""}`} />
        </g>

        <line x1="130" y1="110" x2="185" y2="110" className={isHovered ? "comp-line-active" : "comp-line"} />

        <circle
          cx="210"
          cy="110"
          r="14"
          fill="none"
          stroke={isHovered ? "var(--accent-hover)" : "var(--svg-wire-inactive)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="compiler-cog"
        />
        <circle cx="210" cy="110" r="3" fill={isHovered ? "var(--accent-hover)" : "var(--svg-wire-inactive)"} className="transition-all duration-500" opacity="0.6" />

        <line x1="235" y1="110" x2="280" y2="110" className={isHovered ? "comp-line-active" : "comp-line"} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />

        <g transform="translate(280, 65)">
          <line x1="45" y1="20" x2="20" y2="65" className={isHovered ? "comp-line-active" : "comp-line"} />
          <line x1="45" y1="20" x2="70" y2="65" className={isHovered ? "comp-line-active" : "comp-line"} />

          <circle cx="45" cy="20" r="5" className={`comp-node ${isHovered ? "comp-node-active" : ""}`} />
          <circle cx="20" cy="65" r="4.5" className={`comp-node ${isHovered ? "comp-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
          <circle cx="70" cy="65" r="4.5" className={`comp-node ${isHovered ? "comp-node-active" : ""}`} style={{ stroke: isHovered ? "var(--cross-accent)" : "" }} />
        </g>
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

        { }
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
