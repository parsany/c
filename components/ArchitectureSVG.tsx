import React from "react";

interface ArchitectureProps {
  isHovered: boolean;
}


export function AtrafianArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <defs>
          <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 70 110 L 190 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 220 90 L 220 50 L 330 50"
          stroke={isHovered ? "#ef4444" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 110"
          stroke={isHovered ? "#a855f7" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 220 130 L 220 170 L 330 170"
          stroke={isHovered ? "#eab308" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(20, 85)">
          <rect x="0" y="0" width="50" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="25" y="24" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Client</text>
          <text x="25" y="36" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Mobile/Web</text>
        </g>

        <g transform="translate(180, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-sky-500" : ""} />
          <text x="35" y="24" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">NestJS</text>
          <text x="35" y="36" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="monospace">Socket.io API</text>
          <circle cx="35" cy="44" r="2" fill="#38bdf8" className={isHovered ? "animate-svg-ping" : "hidden"} />
        </g>

        <g transform="translate(330, 30)">
          <rect x="0" y="0" width="70" height="40" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" opacity={isHovered ? "1" : "0.7"} />
          <text x="35" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Redis</text>
          <text x="35" y="30" fill="#fca5a5" fontSize="7" textAnchor="middle" fontFamily="monospace">Cache/Session</text>
        </g>

        <g transform="translate(330, 90)">
          <rect x="0" y="0" width="70" height="40" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" opacity={isHovered ? "1" : "0.7"} />
          <text x="35" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Postgres</text>
          <text x="35" y="30" fill="#c084fc" fontSize="7" textAnchor="middle" fontFamily="monospace">Core DB</text>
        </g>

        <g transform="translate(330, 150)">
          <rect x="0" y="0" width="70" height="40" rx="6" fill="#0f172a" stroke="#eab308" strokeWidth="1.2" opacity={isHovered ? "1" : "0.7"} />
          <text x="35" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">MinIO S3</text>
          <text x="35" y="30" fill="#fde047" fontSize="7" textAnchor="middle" fontFamily="monospace">Media Bucket</text>
        </g>
      </svg>
    </div>
  );
}


export function CharbagArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 80 75 L 180 110"
          stroke={isHovered ? "#10b981" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "5 5" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 80 145 L 180 110"
          stroke={isHovered ? "#3b82f6" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "5 5" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 110"
          stroke={isHovered ? "#f59e0b" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "3 3" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(15, 45)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <text x="32" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Client Portal</text>
          <text x="32" y="34" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Browse & Order</text>
          <circle cx="15" cy="42" r="2" fill={isHovered ? "#10b981" : "#334155"} />
          <circle cx="32" cy="42" r="2" fill={isHovered ? "#10b981" : "#334155"} />
          <circle cx="49" cy="42" r="2" fill={isHovered ? "#10b981" : "#334155"} />
        </g>

        <g transform="translate(15, 125)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="32" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Admin Panel</text>
          <text x="32" y="34" fill="#bfdbfe" fontSize="7" textAnchor="middle" fontFamily="monospace">Kiln & Studio</text>
          <line x1="12" y1="43" x2="25" y2="40" stroke="#3b82f6" strokeWidth="1" />
          <line x1="25" y1="40" x2="38" y2="44" stroke="#3b82f6" strokeWidth="1" />
        </g>

        <g transform="translate(180, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-emerald-500" : ""} />
          <text x="35" y="22" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Next.js</text>
          <text x="35" y="34" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="monospace">Boutique API</text>
          <text x="35" y="42" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="monospace">Prisma Schema</text>
        </g>

        <g transform="translate(330, 90)">
          <rect x="0" y="0" width="75" height="40" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Postgres DB</text>
          <text x="37.5" y="30" fill="#fde047" fontSize="7" textAnchor="middle" fontFamily="monospace">Catalog Logs</text>
        </g>
      </svg>
    </div>
  );
}


export function GoldenbatArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 75 70 L 175 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "3 3" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 245 110 L 330 70"
          stroke={isHovered ? "#f43f5e" : "#334155"}
          strokeWidth="1.2"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 245 110 L 330 150"
          stroke={isHovered ? "#10b981" : "#334155"}
          strokeWidth="1.2"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(15, 45)">
          <rect x="0" y="0" width="60" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="30" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">GPS Device</text>
          <text x="30" y="34" fill="#a5f3fc" fontSize="7" textAnchor="middle" fontFamily="monospace">IoT Tracker</text>
          <line x1="20" y1="44" x2="20" y2="42" stroke={isHovered ? "#22d3ee" : "#334155"} strokeWidth="1.5" />
          <line x1="25" y1="44" x2="25" y2="39" stroke={isHovered ? "#22d3ee" : "#334155"} strokeWidth="1.5" />
          <line x1="30" y1="44" x2="30" y2="36" stroke={isHovered ? "#22d3ee" : "#334155"} strokeWidth="1.5" />
        </g>

        <g transform="translate(175, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-cyan-500" : ""} />
          <text x="35" y="20" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">NextJS/tRPC</text>
          <text x="35" y="32" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="monospace">Ingest Server</text>
          <text x="35" y="42" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="monospace">Active Tracker</text>
        </g>

        <g transform="translate(330, 45)">
          <rect x="0" y="0" width="75" height="40" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Redis Cache</text>
          <text x="37.5" y="30" fill="#fda4af" fontSize="7" textAnchor="middle" fontFamily="monospace">Live Coords</text>
        </g>

        <g transform="translate(330, 125)">
          <rect x="0" y="0" width="75" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <text x="37.5" y="16" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Map Panel</text>
          <text x="37.5" y="26" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Live Path</text>
          <circle cx={isHovered ? "55" : "20"} cy="39" r="3.5" fill="#10b981" className="transition-all duration-1000 ease-in-out" />
          <line x1="15" y1="39" x2="60" y2="39" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  );
}


export function MonorepoArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <rect x="10" y="10" width="220" height="200" rx="8" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="20" y="25" fill="#64748b" fontSize="8" fontFamily="monospace">Turborepo Workspace</text>


        <path d="M 60 70 L 60 120" stroke="#334155" strokeWidth="1" />
        <path d="M 60 170 L 60 120" stroke="#334155" strokeWidth="1" />
        <path d="M 120 70 L 175 110" stroke="#334155" strokeWidth="1" />
        <path d="M 120 170 L 175 110" stroke="#334155" strokeWidth="1" />


        <path
          d="M 245 110 L 330 110"
          stroke={isHovered ? "#a855f7" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(20, 45)">
          <rect x="0" y="0" width="80" height="35" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <text x="40" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Client ESP</text>
          <text x="40" y="28" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Next.js Web</text>
        </g>

        <g transform="translate(20, 145)">
          <rect x="0" y="0" width="80" height="35" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="40" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Client MSK</text>
          <text x="40" y="28" fill="#bfdbfe" fontSize="7" textAnchor="middle" fontFamily="monospace">Next.js Web</text>
        </g>


        <g transform="translate(25, 105)">
          <rect x="0" y="0" width="70" height="25" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="35" y="15" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="monospace">@template/ui</text>
        </g>


        <g transform="translate(160, 85)">
          <rect x="0" y="0" width="60" height="50" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" className={isHovered ? "stroke-purple-500" : ""} />
          <text x="30" y="22" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">NestJS</text>
          <text x="30" y="34" fill="#c084fc" fontSize="7" textAnchor="middle" fontFamily="monospace">RBAC API</text>
        </g>


        <g transform="translate(330, 90)">
          <rect x="0" y="0" width="75" height="40" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Postgres DB</text>
          <text x="37.5" y="30" fill="#c084fc" fontSize="7" textAnchor="middle" fontFamily="monospace">Warranty Serial</text>
        </g>
      </svg>
      <div className="absolute top-2 right-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
        Monorepo
      </div>
    </div>
  );
}


export function HimhehArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 80 110 L 180 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 90 L 330 60"
          stroke={isHovered ? "#eab308" : "#334155"}
          strokeWidth="1.2"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.2"
        />
        <path
          d="M 250 130 L 330 160"
          stroke={isHovered ? "#10b981" : "#334155"}
          strokeWidth="1.2"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(15, 85)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="32.5" y="24" fill="#f8fafc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Next.js/tRPC</text>
          <text x="32.5" y="36" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Buyer UI</text>
        </g>

        <g transform="translate(180, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-sky-500" : ""} />
          <text x="35" y="22" fill="#f8fafc" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">tRPC API</text>
          <text x="35" y="34" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="monospace">Router Worker</text>
          <circle cx="35" cy="43" r="1.5" fill="#38bdf8" className={isHovered ? "animate-svg-ping" : "hidden"} />
        </g>


        <g transform="translate(330, 35)">
          <rect x="0" y="0" width="75" height="35" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="1.2" />
          <text x="37.5" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">OTP Service</text>
          <text x="37.5" y="26" fill="#fef08a" fontSize="7" textAnchor="middle" fontFamily="monospace">SMS Verification</text>
        </g>

        <g transform="translate(330, 92)">
          <rect x="0" y="0" width="75" height="35" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="37.5" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Postgres DB</text>
          <text x="37.5" y="26" fill="#93c5fd" fontSize="7" textAnchor="middle" fontFamily="monospace">Prisma Schema</text>
        </g>

        <g transform="translate(330, 150)">
          <rect x="0" y="0" width="75" height="35" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <text x="37.5" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Payment Gate</text>
          <text x="37.5" y="26" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Transaction verification</text>
        </g>
      </svg>
    </div>
  );
}


export function TaxilandArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 80 75 L 180 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "5 5" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 80 145 L 180 110"
          stroke={isHovered ? "#a855f7" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "5 5" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 75"
          stroke={isHovered ? "#ef4444" : "#334155"}
          strokeWidth="1.2"
          strokeDasharray={isHovered ? "3 3" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 145"
          stroke={isHovered ? "#3b82f6" : "#334155"}
          strokeWidth="1.2"
        />


        <g transform="translate(15, 45)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="32.5" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Passenger Client</text>
          <text x="32.5" y="34" fill="#a5f3fc" fontSize="7" textAnchor="middle" fontFamily="monospace">Ride Booking</text>
        </g>

        <g transform="translate(15, 125)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" />
          <text x="32.5" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Driver Client</text>
          <text x="32.5" y="34" fill="#d8b4fe" fontSize="7" textAnchor="middle" fontFamily="monospace">Routing/OBD</text>
        </g>

        <g transform="translate(180, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-cyan-500" : ""} />
          <text x="35" y="20" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">tRPC Dispatch</text>
          <text x="35" y="32" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="monospace">NestJS App</text>
          <circle cx="35" cy="42" r="1.5" fill="#a855f7" className={isHovered ? "animate-svg-ping" : "hidden"} />
        </g>

        <g transform="translate(330, 45)">
          <rect x="0" y="0" width="75" height="40" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Redis Locations</text>
          <text x="37.5" y="30" fill="#fca5a5" fontSize="7" textAnchor="middle" fontFamily="monospace">Active Coordinates</text>
        </g>

        <g transform="translate(330, 125)">
          <rect x="0" y="0" width="75" height="40" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Postgres DB</text>
          <text x="37.5" y="30" fill="#93c5fd" fontSize="7" textAnchor="middle" fontFamily="monospace">Ride Ledgers</text>
        </g>
      </svg>
    </div>
  );
}


export function AlzahraArchitecture({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <path
          d="M 80 110 L 180 110"
          stroke={isHovered ? "#38bdf8" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />
        <path
          d="M 250 110 L 330 110"
          stroke={isHovered ? "#10b981" : "#334155"}
          strokeWidth="1.5"
          strokeDasharray={isHovered ? "4 4" : "0"}
          className={isHovered ? "animate-flow-right" : ""}
        />


        <g transform="translate(15, 85)">
          <rect x="0" y="0" width="65" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="32.5" y="22" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">B2B Portal</text>
          <text x="32.5" y="34" fill="#a5f3fc" fontSize="7" textAnchor="middle" fontFamily="monospace">Next.js Web</text>
          <line x1="12" y1="42" x2="25" y2="42" stroke="#38bdf8" strokeWidth="1" />
          <line x1="30" y1="42" x2="45" y2="42" stroke="#38bdf8" strokeWidth="1" />
        </g>

        <g transform="translate(180, 85)">
          <rect x="0" y="0" width="70" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" className={isHovered ? "stroke-green-500" : ""} />
          <text x="35" y="22" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Django API</text>
          <text x="35" y="34" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Python Backend</text>
          <circle cx="35" cy="43" r="1.5" fill="#10b981" className={isHovered ? "animate-svg-ping" : "hidden"} />
        </g>

        <g transform="translate(330, 90)">
          <rect x="0" y="0" width="75" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <text x="37.5" y="20" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">Postgres DB</text>
          <text x="37.5" y="30" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">Spot Ledgers</text>
        </g>
      </svg>
    </div>
  );
}

export function AIVisualizer({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />



        <line x1="80" y1="60" x2="200" y2="50" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="80" y1="60" x2="200" y2="110" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="60" x2="200" y2="170" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.2" />

        <line x1="80" y1="110" x2="200" y2="50" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="110" x2="200" y2="110" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="80" y1="110" x2="200" y2="170" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.4" />

        <line x1="80" y1="160" x2="200" y2="50" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.2" />
        <line x1="80" y1="160" x2="200" y2="110" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="160" x2="200" y2="170" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />


        <line x1="200" y1="50" x2="320" y2="80" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="200" y1="50" x2="320" y2="140" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth="1" opacity="0.3" />

        <line x1="200" y1="110" x2="320" y2="80" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />
        <line x1="200" y1="110" x2="320" y2="140" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />

        <line x1="200" y1="170" x2="320" y2="80" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth="1" opacity="0.3" />
        <line x1="200" y1="170" x2="320" y2="140" stroke={isHovered ? "#f43f5e" : "#1e293b"} strokeWidth={isHovered ? "1.5" : "1"} opacity="0.6" />


        {isHovered && (
          <>
            <circle cx="80" cy="110" r="3" fill="#38bdf8" className="animate-svg-ping" />
            <circle cx="200" cy="110" r="3.5" fill="#f43f5e" className="animate-svg-ping" />
          </>
        )}



        <circle cx="80" cy="60" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="80" cy="110" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="80" cy="160" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="80" y="45" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Input</text>


        <circle cx="200" cy="50" r="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="200" cy="110" r="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="200" cy="170" r="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
        <text x="200" y="35" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Latent/Hidden</text>


        <circle cx="320" cy="80" r="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
        <circle cx="320" cy="140" r="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="320" y="65" fill="#64748b" fontSize="7" textAnchor="middle" fontFamily="monospace">Output</text>
      </svg>
    </div>
  );
}


export function GameVisualizer({ isHovered }: ArchitectureProps) {
  const STARS = [
    { x: 30, y: 40, r: 0.8, o: 0.5 },
    { x: 75, y: 25, r: 1.2, o: 0.8 },
    { x: 120, y: 60, r: 0.7, o: 0.4 },
    { x: 160, y: 15, r: 1.5, o: 0.9 },
    { x: 280, y: 35, r: 1.0, o: 0.7 },
    { x: 310, y: 15, r: 0.9, o: 0.6 },
    { x: 370, y: 45, r: 1.1, o: 0.8 },
    { x: 45, y: 90, r: 1.3, o: 0.7 },
    { x: 90, y: 115, r: 0.8, o: 0.4 },
    { x: 140, y: 95, r: 1.0, o: 0.5 },
    { x: 180, y: 130, r: 0.7, o: 0.3 },
    { x: 250, y: 80, r: 1.4, o: 0.9 },
    { x: 290, y: 120, r: 0.8, o: 0.5 },
    { x: 340, y: 75, r: 1.2, o: 0.8 },
    { x: 390, y: 100, r: 1.0, o: 0.6 },
    { x: 25, y: 160, r: 1.5, o: 0.8 },
    { x: 70, y: 175, r: 0.9, o: 0.5 },
    { x: 110, y: 150, r: 1.1, o: 0.7 },
    { x: 150, y: 180, r: 0.7, o: 0.4 },
    { x: 270, y: 165, r: 1.3, o: 0.8 },
    { x: 320, y: 190, r: 0.8, o: 0.5 },
    { x: 360, y: 155, r: 1.2, o: 0.9 },
    { x: 405, y: 170, r: 1.0, o: 0.6 },
    { x: 220, y: 145, r: 1.4, o: 0.7 }
  ];

  const pinkInvader = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
  ];

  const greenSpriteLeft = [
    [0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
  ];

  const greenSpriteRight = [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0]
  ];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">

        <rect width="100%" height="100%" fill="#020617" />


        {STARS.map((star, idx) => (
          <circle
            key={idx}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#ffffff"
            opacity={isHovered ? star.o * 0.5 : star.o}
            className="transition-opacity duration-300"
          />
        ))}


        {isHovered && (
          <circle
            cx="210"
            cy="170"
            r="3"
            fill="#eab308"
            className="animate-bullet"
          />
        )}


        <g
          transform={isHovered ? "translate(188, 28) scale(1.1)" : "translate(188, 30)"}
          className="transition-transform duration-300 ease-in-out"
        >
          {pinkInvader.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect
                key={`p-${rIdx}-${cIdx}`}
                x={cIdx * 4}
                y={rIdx * 4}
                width="4"
                height="4"
                fill="#f472b6"
              />
            ))
          )}
        </g>


        {isHovered && (
          <g transform="translate(210, 40)">

            <path
              d="M 0,-5 C 5,-15 15,-15 15,-5 C 25,-5 25,5 15,5 C 15,15 5,15 0,5 C -5,15 -15,15 -15,5 C -25,5 -25,-5 -15,-5 C -15,-15 -5,-15 0,-5 Z"
              fill="#fde047"
              stroke="#ef4444"
              strokeWidth="1.5"
              className="animate-blast-cloud"
            />


            <g transform="rotate(0)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#f97316" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(90)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#f97316" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(135)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(180)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#f97316" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(225)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(270)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#f97316" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
            <g transform="rotate(315)">
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="animate-firework-spark" />
              <circle cx="0" cy="-20" r="2.2" fill="#fde047" className="animate-firework-ember" />
            </g>
          </g>
        )}


        <g
          transform={isHovered ? "translate(188, 28) scale(1.1)" : "translate(188, 30)"}
          className="transition-transform duration-300 ease-in-out"
        >
          {pinkInvader.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect
                key={`p-${rIdx}-${cIdx}`}
                x={cIdx * 4}
                y={rIdx * 4}
                width="4"
                height="4"
                fill="#f472b6"
              />
            ))
          )}
        </g>


        <g
          transform={isHovered ? "translate(40, 20) scale(1.05)" : "translate(40, 22)"}
          className="transition-transform duration-300 ease-in-out"
        >
          {greenSpriteLeft.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect
                key={`gl-${rIdx}-${cIdx}`}
                x={cIdx * 4}
                y={rIdx * 4}
                width="4"
                height="4"
                fill="#4ade80"
              />
            ))
          )}
        </g>


        <g
          transform={isHovered ? "translate(352, 20) scale(1.05)" : "translate(352, 22)"}
          className="transition-transform duration-300 ease-in-out"
        >
          {greenSpriteRight.map((row, rIdx) =>
            row.map((val, cIdx) => val === 1 && (
              <rect
                key={`gr-${rIdx}-${cIdx}`}
                x={cIdx * 4}
                y={rIdx * 4}
                width="4"
                height="4"
                fill="#4ade80"
              />
            ))
          )}
        </g>


        <g
          transform={isHovered ? "translate(0, -4)" : "translate(0, 0)"}
          className="transition-transform duration-300 ease-in-out"
        >
          <polygon
            points="210,172 198,190 222,190"
            fill="#eab308"
            className="stroke-amber-400 stroke-[0.5]"
          />
        </g>
      </svg>
    </div>
  );
}


export function RoboticsVisualizer({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <line x1="40" y1="110" x2="380" y2="110" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        <text x="50" y="102" fill="#64748b" fontSize="7" fontFamily="monospace">Setpoint Reference</text>


        <path
          d={
            isHovered
              ? "M 40 180 Q 80 40, 120 130 T 200 110 T 280 110 H 380"
              : "M 40 180 H 380"
          }
          stroke={isHovered ? "#f59e0b" : "#334155"}
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
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <g transform="translate(60, 20)">
          <rect x="0" y="0" width="300" height="170" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />


          <path d="M 0 25 L 300 25" stroke="#1e293b" strokeWidth="1.2" />
          <circle cx="15" cy="12" r="3.5" fill="#ef4444" opacity="0.8" />
          <circle cx="28" cy="12" r="3.5" fill="#eab308" opacity="0.8" />
          <circle cx="41" cy="12" r="3.5" fill="#22c55e" opacity="0.8" />
          <text x="150" y="16" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="monospace">Custom Library Manager</text>


          <line x1="80" y1="25" x2="80" y2="170" stroke="#1e293b" strokeWidth="1" />
          <rect x="10" y="38" width="60" height="12" rx="2" fill={isHovered ? "#1e293b" : "#0f172a"} stroke={isHovered ? "#3b82f6" : "none"} strokeWidth="1" />
          <rect x="10" y="58" width="60" height="12" rx="2" fill="#0f172a" />
          <rect x="10" y="78" width="60" height="12" rx="2" fill="#0f172a" />


          <g transform="translate(95, 38)">

            <rect x="0" y="0" width="55" height="45" rx="3" fill="#0f172a" stroke="#1e293b" className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="5" y1="32" x2="45" y2="32" stroke="#334155" strokeWidth="2" />
            <line x1="5" y1="38" x2="35" y2="38" stroke="#1e293b" strokeWidth="2" />


            <rect x="68" y="0" width="55" height="45" rx="3" fill="#0f172a" stroke="#1e293b" className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="73" y1="32" x2="113" y2="32" stroke="#334155" strokeWidth="2" />
            <line x1="73" y1="38" x2="103" y2="38" stroke="#1e293b" strokeWidth="2" />


            <rect x="136" y="0" width="55" height="45" rx="3" fill="#0f172a" stroke="#1e293b" className={isHovered ? "stroke-sky-500/50" : ""} />
            <line x1="141" y1="32" x2="181" y2="32" stroke="#334155" strokeWidth="2" />
            <line x1="141" y1="38" x2="171" y2="38" stroke="#1e293b" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}


export function CompilerVisualizer({ isHovered }: ArchitectureProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative select-none">
      <svg viewBox="0 0 420 220" fill="none" className="w-full h-full max-h-[180px]">
        <rect width="100%" height="100%" fill="url(#grid)" />


        <line x1="210" y1="50" x2="130" y2="100" stroke={isHovered ? "#10b981" : "#1e293b"} strokeWidth="1.5" />
        <line x1="210" y1="50" x2="290" y2="100" stroke={isHovered ? "#10b981" : "#1e293b"} strokeWidth="1.5" />
        <line x1="130" y1="100" x2="80" y2="150" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1.2" />
        <line x1="130" y1="100" x2="180" y2="150" stroke={isHovered ? "#38bdf8" : "#1e293b"} strokeWidth="1.2" />



        <g transform="translate(180, 30)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="30" y="18" fill="#f8fafc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">Program</text>
        </g>


        <g transform="translate(100, 85)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" />
          <text x="30" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Statement</text>
        </g>


        <g transform="translate(260, 85)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1.2" />
          <text x="30" y="18" fill="#f8fafc" fontSize="8" textAnchor="middle" fontFamily="monospace">Declaration</text>
        </g>


        <g transform="translate(50, 135)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <text x="30" y="18" fill="#a5f3fc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">ID (&quot;x&quot;)</text>
        </g>

        <g transform="translate(150, 135)">
          <rect x="0" y="0" width="60" height="30" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <text x="30" y="18" fill="#a5f3fc" fontSize="8.5" textAnchor="middle" fontFamily="monospace">NUM (42)</text>
        </g>
      </svg>

    </div>
  );
}
