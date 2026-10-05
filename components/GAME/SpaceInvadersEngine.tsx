"use client";

import React, { useEffect, useRef } from "react";
import {
  PlayerShip,
  Laser,
  Enemy,
  EnemyBullet,
  GameParticle,
  StarParticle,
  GameStats,
  PlayerUpgrades,
  PowerupDrop,
  CollectibleItem,
  BossEnemy,
  ShopPad,
  BombProjectile,
  ShockwaveEffect,
  FloatingNotification,
} from "./types";
import {
  playLaserSound,
  playEnemyHitSound,
  playExplosionSound,
  playPlayerHitSound,
  playWaveClearSound,
  playGameOverSound,
  playEmpSound,
  playPowerupPickupSound,
  playShopBuySound,
  playKeyPickupSound,
  playBossAlertSound,
  playBossHitSound,
  playBossDefeatSound,
} from "./audio";

interface SpaceInvadersEngineProps {
  onGameOver: (stats: GameStats) => void;
  onUpdateStats: (
    kills: number,
    score: number,
    wave: number,
    shields: number,
    keys: number,
    isBossActive: boolean
  ) => void;
  onReset: () => void;
  isPaused: boolean;
  upgrades: PlayerUpgrades;
  onUpdateUpgrades: (upgrades: PlayerUpgrades) => void;
  onToggleShop?: () => void;
}

export default function SpaceInvadersEngine({
  onGameOver,
  onUpdateStats,
  onReset,
  isPaused,
  upgrades,
  onUpdateUpgrades,
}: SpaceInvadersEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseDownRef = useRef(false);
  const lastShotRef = useRef(0);
  const cameraShakeRef = useRef(0);
  const scoreSinceLastShieldRef = useRef(0);
  const lastShopBuyTimeRef = useRef(0);
  const keysCollectedRef = useRef(0);
  const keySpawnedInWaveRef = useRef(false);
  const justShotRef = useRef(false);

  const upgradesRef = useRef(upgrades);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    upgradesRef.current = upgrades;
  }, [upgrades]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const statsRef = useRef<GameStats>({
    kills: 0,
    shotsFired: 0,
    shotsHit: 0,
    startTime: 0,
    endTime: 0,
    score: 0,
    wave: 1,
    keysCollected: 0,
  });

  const playerRef = useRef<PlayerShip>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: -Math.PI * 0.5,
    radius: 16,
    alive: true,
    shields: 3,
    invulnerableTime: 0,
    weaponLevel: 1,
    fireRateLevel: 1,
    bombs: 0,
  });

  const lasersRef = useRef<Laser[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const enemyBulletsRef = useRef<EnemyBullet[]>([]);
  const particlesRef = useRef<GameParticle[]>([]);
  const starsRef = useRef<StarParticle[]>([]);
  const dropsRef = useRef<PowerupDrop[]>([]);
  const collectiblesRef = useRef<CollectibleItem[]>([]);
  const bossRef = useRef<BossEnemy | null>(null);
  const bombsRef = useRef<BombProjectile[]>([]);
  const shockwavesRef = useRef<ShockwaveEffect[]>([]);
  const floatingTextsRef = useRef<FloatingNotification[]>([]);
  const lastCollectibleSpawnRef = useRef(0);

  const addFloatingText = (x: number, y: number, text: string, color: string) => {
    floatingTextsRef.current.push({
      id: `ft-${Date.now()}-${Math.random()}`,
      x,
      y,
      text,
      color,
      life: 1,
      maxLife: 45,
    });
  };

  const spawnWave = (waveNum: number) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    keySpawnedInWaveRef.current = false;

    if (waveNum % 4 === 0) {
      enemiesRef.current = [];
      collectiblesRef.current = [];
      dropsRef.current = [];
      return;
    }

    const count = Math.min(14, 5 + waveNum * 2);
    const levelSpeedMult = 1 + (waveNum - 1) * 0.18;
    const newEnemies: Enemy[] = [];

    for (let i = 0; i < count; i++) {
      const type = (i % 3) as 0 | 1 | 2;
      const angle = (i / count) * Math.PI * 2;
      const dist = Math.min(W, H) * 0.28 + Math.random() * 80;
      const x = W * 0.5 + Math.cos(angle) * dist;
      const y = H * 0.35 + Math.sin(angle) * dist * 0.5;

      newEnemies.push({
        id: `enemy-${waveNum}-${i}-${Math.random()}`,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4 * levelSpeedMult,
        vy: (Math.random() - 0.5) * 1.4 * levelSpeedMult,
        type,
        size: 14 + type * 3,
        health: 1 + type,
        maxHealth: 1 + type,
        shootTimer: Math.max(30, (Math.random() * 110 + 55) / levelSpeedMult),
        color: [255, 255, 255],
        angle: Math.random() * Math.PI * 2,
      });
    }
    enemiesRef.current = newEnemies;
  };

  const createExplosion = (x: number, y: number, color: string, count = 18, speedMult = 1) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 3.8 + 1.2) * speedMult;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 20 + 16,
        sz: Math.random() * 2.8 + 1.2,
        color,
      });
    }
  };

  const spawnBoss = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    keysCollectedRef.current = 0;
    playBossAlertSound();
    cameraShakeRef.current = 3.5;

    createExplosion(W * 0.5, H * 0.2, "#ef4444", 40, 2);
    enemyBulletsRef.current = [];

    bossRef.current = {
      id: `boss-${Date.now()}`,
      x: W * 0.5,
      y: -80,
      vx: 2.2,
      vy: 1.0,
      width: 170,
      height: 85,
      health: 80 + statsRef.current.wave * 25,
      maxHealth: 80 + statsRef.current.wave * 25,
      shootTimer: 60,
      pulse: 0,
      active: true,
    };

    addFloatingText(W * 0.5, H * 0.28, "DREADNOUGHT DETECTED", "#ef4444");
  };

  const triggerBomb = () => {
    if (upgradesRef.current.bombs <= 0 || !playerRef.current.alive) return;
    const nextUpgrades = {
      ...upgradesRef.current,
      bombs: upgradesRef.current.bombs - 1,
    };
    onUpdateUpgrades(nextUpgrades);

    const isBoss = !!bossRef.current;
    const angle = isBoss ? -Math.PI * 0.5 : playerRef.current.angle;
    const speed = 9.5;

    bombsRef.current.push({
      id: `bomb-${Date.now()}-${Math.random()}`,
      x: playerRef.current.x,
      y: playerRef.current.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      travelDist: 0,
      maxDist: 155,
      pulse: 0,
    });
  };

  const spawnFloatingCollectible = () => {
    if (statsRef.current.wave % 4 === 0) return;

    const W = window.innerWidth;
    const currentWave = statsRef.current.wave;
    const canSpawnKey = currentWave > 3 && !keySpawnedInWaveRef.current && !bossRef.current;

    let type: "green_gem" | "purple_gem" | "yellow_key" = "green_gem";

    if (canSpawnKey && Math.random() < 0.28) {
      type = "yellow_key";
      keySpawnedInWaveRef.current = true;
    } else {
      type = Math.random() < 0.35 ? "purple_gem" : "green_gem";
    }

    const startX = Math.random() * (W - 160) + 80;
    const startY = -20;
    const vx = (Math.random() - 0.5) * 0.8;
    const vy = Math.random() * 0.7 + 0.6;

    collectiblesRef.current.push({
      id: `col-${Date.now()}-${Math.random()}`,
      x: startX,
      y: startY,
      vx,
      vy,
      type,
      size: type === "yellow_key" ? 14 : type === "purple_gem" ? 12 : 10,
      pulse: Math.random() * Math.PI * 2,
      life: 900,
    });
  };

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const stars: StarParticle[] = [];
    for (let i = 0; i < 75; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: Math.random() * 0.7 + 0.3,
        sz: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    starsRef.current = stars;
    spawnWave(1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (playerRef.current.x === 0 && playerRef.current.y === 0) {
        playerRef.current.x = window.innerWidth * 0.5;
        playerRef.current.y = window.innerHeight * 0.8;
        mouseRef.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 };
      }
    };
    resize();

    if (statsRef.current.startTime === 0) {
      statsRef.current.startTime = Date.now();
    }
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (!isPausedRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isPausedRef.current || !playerRef.current.alive) return;
      if (e.button === 0) {
        isMouseDownRef.current = true;
        if (upgradesRef.current.fireRateLevel === 1) {
          const now = performance.now();
          if (now - lastShotRef.current > 120) {
            shootLaser();
            lastShotRef.current = now;
          }
        }
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) isMouseDownRef.current = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onReset();
        return;
      }

      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        triggerBomb();
        return;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isPausedRef.current || !playerRef.current.alive) return;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        isMouseDownRef.current = true;
        if (upgradesRef.current.fireRateLevel === 1) {
          const now = performance.now();
          if (now - lastShotRef.current > 120) {
            shootLaser();
            lastShotRef.current = now;
          }
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isPausedRef.current) return;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onTouchEnd = () => {
      isMouseDownRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const drawSpacewarEnemy = (
      c2d: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      type: 0 | 1 | 2,
      colorStr: string
    ) => {
      c2d.save();
      c2d.translate(x, y);
      c2d.strokeStyle = colorStr;
      c2d.lineWidth = 1.5;

      c2d.beginPath();
      if (type === 0) {
        c2d.moveTo(0, -size);
        c2d.lineTo(size * 0.8, 0);
        c2d.lineTo(0, size * 0.7);
        c2d.lineTo(-size * 0.8, 0);
        c2d.closePath();
      } else if (type === 1) {
        c2d.moveTo(0, -size * 0.8);
        c2d.lineTo(size * 0.9, -size * 0.3);
        c2d.lineTo(size * 0.6, size * 0.8);
        c2d.lineTo(-size * 0.6, size * 0.8);
        c2d.lineTo(-size * 0.9, -size * 0.3);
        c2d.closePath();
        c2d.moveTo(-size * 0.9, -size * 0.3);
        c2d.lineTo(size * 0.9, -size * 0.3);
      } else {
        c2d.moveTo(0, -size * 1.1);
        c2d.lineTo(size * 0.6, size * 0.8);
        c2d.lineTo(0, size * 0.4);
        c2d.lineTo(-size * 0.6, size * 0.8);
        c2d.closePath();
      }
      c2d.stroke();
      c2d.restore();
    };

    const drawBossShip = (c2d: CanvasRenderingContext2D, boss: BossEnemy) => {
      c2d.save();
      c2d.translate(boss.x, boss.y);

      c2d.beginPath();
      c2d.moveTo(0, -32);
      c2d.lineTo(40, -18);
      c2d.lineTo(82, 0);
      c2d.lineTo(92, 22);
      c2d.lineTo(80, 32);
      c2d.lineTo(45, 26);
      c2d.lineTo(30, 42);
      c2d.lineTo(15, 36);
      c2d.lineTo(0, 48);
      c2d.lineTo(-15, 36);
      c2d.lineTo(-30, 42);
      c2d.lineTo(-45, 26);
      c2d.lineTo(-80, 32);
      c2d.lineTo(-92, 22);
      c2d.lineTo(-82, 0);
      c2d.lineTo(-40, -18);
      c2d.closePath();

      c2d.fillStyle = "#121216";
      c2d.fill();
      c2d.strokeStyle = "#f87171";
      c2d.lineWidth = 2.2;
      c2d.stroke();

      c2d.beginPath();
      c2d.moveTo(0, -22);
      c2d.lineTo(32, -8);
      c2d.lineTo(65, 8);
      c2d.lineTo(50, 24);
      c2d.lineTo(25, 26);
      c2d.lineTo(0, 38);
      c2d.lineTo(-25, 26);
      c2d.lineTo(-50, 24);
      c2d.lineTo(-65, 8);
      c2d.lineTo(-32, -8);
      c2d.closePath();
      c2d.strokeStyle = "#38bdf8";
      c2d.lineWidth = 1.4;
      c2d.stroke();

      c2d.beginPath();
      c2d.arc(0, 8, 12, 0, Math.PI * 2);
      c2d.fillStyle = "#ef4444";
      c2d.fill();
      c2d.strokeStyle = "#ffffff";
      c2d.lineWidth = 1.5;
      c2d.stroke();

      c2d.beginPath();
      c2d.arc(0, 8, 5, 0, Math.PI * 2);
      c2d.fillStyle = "#ffffff";
      c2d.fill();

      c2d.fillStyle = "#27272a";
      c2d.strokeStyle = "#f87171";
      c2d.lineWidth = 1.5;
      c2d.strokeRect(-78, 12, 12, 26);
      c2d.strokeRect(66, 12, 12, 26);

      const flameLen = 14 + Math.random() * 8;
      c2d.strokeStyle = "#f97316";
      c2d.lineWidth = 2.5;
      c2d.beginPath();
      c2d.moveTo(-20, 38);
      c2d.lineTo(-20, 38 + flameLen);
      c2d.moveTo(20, 38);
      c2d.lineTo(20, 38 + flameLen);
      c2d.stroke();

      c2d.restore();
    };

    const drawCollectible = (c2d: CanvasRenderingContext2D, item: CollectibleItem) => {
      c2d.save();
      c2d.translate(item.x, item.y);
      const bob = Math.sin(item.pulse) * 3;
      c2d.translate(0, bob);

      if (item.type === "green_gem") {
        c2d.strokeStyle = "#22c55e";
        c2d.fillStyle = "rgba(34, 197, 94, 0.25)";
        c2d.lineWidth = 1.8;
        c2d.beginPath();
        c2d.moveTo(0, -item.size * 1.3);
        c2d.lineTo(item.size * 0.9, 0);
        c2d.lineTo(0, item.size * 1.3);
        c2d.lineTo(-item.size * 0.9, 0);
        c2d.closePath();
        c2d.fill();
        c2d.stroke();

        c2d.beginPath();
        c2d.moveTo(-item.size * 0.9, 0);
        c2d.lineTo(item.size * 0.9, 0);
        c2d.stroke();
      } else if (item.type === "purple_gem") {
        c2d.strokeStyle = "#c084fc";
        c2d.fillStyle = "rgba(192, 132, 252, 0.3)";
        c2d.lineWidth = 1.8;
        c2d.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const px = Math.cos(a) * item.size;
          const py = Math.sin(a) * item.size;
          if (i === 0) c2d.moveTo(px, py);
          else c2d.lineTo(px, py);
        }
        c2d.closePath();
        c2d.fill();
        c2d.stroke();

        c2d.beginPath();
        c2d.arc(0, 0, item.size * 0.45, 0, Math.PI * 2);
        c2d.strokeStyle = "#ffffff";
        c2d.stroke();
      } else {
        c2d.strokeStyle = "#fbbf24";
        c2d.fillStyle = "rgba(251, 191, 36, 0.25)";
        c2d.lineWidth = 2;
        c2d.beginPath();
        c2d.arc(0, -6, 7, 0, Math.PI * 2);
        c2d.fill();
        c2d.stroke();

        c2d.beginPath();
        c2d.moveTo(0, 1);
        c2d.lineTo(0, 14);
        c2d.moveTo(0, 7);
        c2d.lineTo(5, 7);
        c2d.moveTo(0, 11);
        c2d.lineTo(4, 11);
        c2d.stroke();
      }

      c2d.restore();
    };

    const drawShopPad = (
      c2d: CanvasRenderingContext2D,
      pad: ShopPad,
      isHovered: boolean,
      subText: string,
      isAffordable: boolean
    ) => {
      c2d.save();
      c2d.translate(pad.x, pad.y);

      c2d.beginPath();
      c2d.arc(0, 0, pad.radius, 0, Math.PI * 2);
      c2d.strokeStyle = isHovered ? pad.color : "rgba(255, 255, 255, 0.25)";
      c2d.lineWidth = isHovered ? 2.5 : 1.2;
      c2d.fillStyle = isHovered ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.4)";
      c2d.fill();
      c2d.stroke();

      c2d.beginPath();
      c2d.arc(0, 0, pad.radius * 0.8, 0, Math.PI * 2);
      c2d.setLineDash([4, 4]);
      c2d.strokeStyle = isHovered ? pad.color : "rgba(255, 255, 255, 0.15)";
      c2d.stroke();
      c2d.setLineDash([]);

      c2d.font = "bold 11px monospace";
      c2d.fillStyle = pad.color;
      c2d.textAlign = "center";
      c2d.textBaseline = "middle";
      c2d.fillText(pad.title, 0, -14);

      c2d.font = "10px monospace";
      c2d.fillStyle = "#ffffff";
      c2d.fillText(subText, 0, 2);

      c2d.font = "bold 11px monospace";
      c2d.fillStyle = isAffordable ? "#34d399" : "#f87171";
      c2d.fillText(pad.cost > 0 ? `${pad.cost} PTS` : "SHOOT TO LAUNCH", 0, 18);

      if (isHovered) {
        c2d.font = "bold 10px monospace";
        c2d.fillStyle = "#38bdf8";
        c2d.fillText("SHOOT TO BUY", 0, pad.radius + 16);
      }

      c2d.restore();
    };

    function addLaser(x: number, y: number, angle: number) {
      const speed = 21;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      lasersRef.current.push({
        id: `laser-${Date.now()}-${Math.random()}`,
        x,
        y,
        vx: cos * speed,
        vy: sin * speed,
        life: 1,
        maxLife: 300,
        color: "#ffffff",
      });
    }

    function shootLaser() {
      const p = playerRef.current;
      if (!p.alive) return;

      const cos = Math.cos(p.angle);
      const sin = Math.sin(p.angle);
      const perpCos = Math.cos(p.angle + Math.PI * 0.5);
      const perpSin = Math.sin(p.angle + Math.PI * 0.5);

      const noseX = p.x + cos * (p.radius + 3);
      const noseY = p.y + sin * (p.radius + 3);

      const wLevel = upgradesRef.current.weaponLevel;

      if (wLevel === 1) {
        addLaser(noseX, noseY, p.angle);
      } else if (wLevel === 2) {
        addLaser(noseX - perpCos * 6, noseY - perpSin * 6, p.angle);
        addLaser(noseX + perpCos * 6, noseY + perpSin * 6, p.angle);
      } else if (wLevel === 3) {
        addLaser(noseX, noseY, p.angle);
        addLaser(noseX - perpCos * 5, noseY - perpSin * 5, p.angle - 0.28);
        addLaser(noseX + perpCos * 5, noseY + perpSin * 5, p.angle + 0.28);
      } else {
        addLaser(noseX - perpCos * 5, noseY - perpSin * 5, p.angle);
        addLaser(noseX + perpCos * 5, noseY + perpSin * 5, p.angle);
        addLaser(noseX - perpCos * 9, noseY - perpSin * 9, p.angle - 0.38);
        addLaser(noseX + perpCos * 9, noseY + perpSin * 9, p.angle + 0.38);
      }

      particlesRef.current.push({
        x: noseX,
        y: noseY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: 8,
        sz: 1.8,
        color: "#38bdf8",
      });

      justShotRef.current = true;
      playLaserSound();
      statsRef.current.shotsFired++;
    }

    const TARGET_FPS = 60;
    const FRAME_DURATION = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    const loop = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(loop);

      if (typeof document !== "undefined" && document.hidden) {
        return;
      }

      if (lastFrameTime === 0) {
        lastFrameTime = timestamp;
      }

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < FRAME_DURATION - 1.5) {
        return;
      }

      if (elapsed > 500) {
        lastFrameTime = timestamp;
      } else {
        lastFrameTime = timestamp - (elapsed % FRAME_DURATION);
      }

      if (isPausedRef.current) {
        return;
      }

      const W = canvas.width;
      const H = canvas.height;
      const vectorColor = "#ffffff";
      const isBossActive = !!bossRef.current;
      const isShopWave = statsRef.current.wave % 4 === 0 && !isBossActive;

      ctx.save();

      if (cameraShakeRef.current > 0) {
        const sx = (Math.random() - 0.5) * cameraShakeRef.current * 4;
        const sy = (Math.random() - 0.5) * cameraShakeRef.current * 4;
        ctx.translate(sx, sy);
        cameraShakeRef.current = Math.max(0, cameraShakeRef.current - 0.08);
      }

      ctx.clearRect(0, 0, W, H);

      const starSpeedMult = 1 + (statsRef.current.wave - 1) * 0.08;
      for (const star of starsRef.current) {
        star.y += star.speed * starSpeedMult;
        if (star.y > H) {
          star.y = 0;
          star.x = Math.random() * W;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.sz, star.sz);
      }

      if (isShopWave) {
        collectiblesRef.current = [];
        dropsRef.current = [];
      } else if (timestamp - lastCollectibleSpawnRef.current > 6500) {
        lastCollectibleSpawnRef.current = timestamp;
        if (collectiblesRef.current.length < 5) {
          spawnFloatingCollectible();
        }
      }

      const player = playerRef.current;

      if (!player.alive) {
        if (canvas) {
          canvas.style.cursor = "default";
          canvas.style.pointerEvents = "none";
        }
        ctx.restore();
        return;
      }

      const mouse = mouseRef.current;
      player.x += (mouse.x - player.x) * 0.18;
      player.y += (mouse.y - player.y) * 0.18;

      if (isBossActive) {
        player.angle = -Math.PI * 0.5;
      } else {
        const cx = W * 0.5;
        const cy = H * 0.5;
        const dx = cx - player.x;
        const dy = cy - player.y;
        player.angle = Math.atan2(dy, dx);
      }

      if (player.invulnerableTime > 0) {
        player.invulnerableTime--;
      }

      const canHoldToShoot = upgradesRef.current.fireRateLevel > 1;
      const fireDelay = upgradesRef.current.fireRateLevel === 2 ? 110 : 75;

      const isAutoFiring =
        canHoldToShoot &&
        isMouseDownRef.current &&
        timestamp - lastShotRef.current > fireDelay;

      if (isAutoFiring) {
        shootLaser();
        lastShotRef.current = timestamp;
      }

      const getWeaponCost = () => {
        const lv = upgradesRef.current.weaponLevel;
        if (lv === 1) return 2500;
        if (lv === 2) return 6000;
        if (lv === 3) return 14000;
        return 0;
      };

      const getFireRateCost = () => {
        const lv = upgradesRef.current.fireRateLevel;
        if (lv === 1) return 2000;
        if (lv === 2) return 5500;
        return 0;
      };

      if (isShopWave) {
        const padRadius = 52;
        const shopPads: ShopPad[] = [
          {
            id: "pad-weapon",
            x: W * 0.18,
            y: H * 0.6,
            radius: padRadius,
            type: "weapon",
            title: "CANNONS",
            cost: getWeaponCost(),
            color: "#38bdf8",
          },
          {
            id: "pad-firerate",
            x: W * 0.38,
            y: H * 0.6,
            radius: padRadius,
            type: "fireRate",
            title: upgradesRef.current.fireRateLevel === 1 ? "AUTO-FIRE" : "RAPID FIRE",
            cost: getFireRateCost(),
            color: "#fbbf24",
          },
          {
            id: "pad-shield",
            x: W * 0.58,
            y: H * 0.6,
            radius: padRadius,
            type: "shield",
            title: "SHIELD +1",
            cost: 2000,
            color: "#34d399",
          },
          {
            id: "pad-bomb",
            x: W * 0.78,
            y: H * 0.6,
            radius: padRadius,
            type: "bomb",
            title: "EMP BOMB",
            cost: 2500,
            color: "#e879f9",
          },
          {
            id: "pad-warp",
            x: W * 0.48,
            y: H * 0.28,
            radius: 64,
            type: "warp",
            title: "WARP GATE",
            cost: 0,
            color: "#60a5fa",
          },
        ];

        for (const pad of shopPads) {
          const pdist = Math.hypot(player.x - pad.x, player.y - pad.y);
          const isOverPad = pdist < pad.radius + player.radius + 6;
          let subText = "";

          if (pad.type === "weapon") {
            subText = upgradesRef.current.weaponLevel >= 4 ? "MAXED" : `Lv.${upgradesRef.current.weaponLevel} -> ${upgradesRef.current.weaponLevel + 1}`;
          } else if (pad.type === "fireRate") {
            subText =
              upgradesRef.current.fireRateLevel >= 3
                ? "MAXED"
                : upgradesRef.current.fireRateLevel === 1
                ? "Hold to Shoot"
                : `Lv.${upgradesRef.current.fireRateLevel} -> ${upgradesRef.current.fireRateLevel + 1}`;
          } else if (pad.type === "shield") {
            subText = `Current: ${player.shields}`;
          } else if (pad.type === "bomb") {
            subText = `Current: ${upgradesRef.current.bombs}`;
          } else {
            subText = `Wave ${statsRef.current.wave + 1}`;
          }

          const canAfford = pad.cost === 0 || statsRef.current.score >= pad.cost;
          drawShopPad(ctx, pad, isOverPad, subText, canAfford);

          if (isOverPad && (justShotRef.current || isAutoFiring) && timestamp - lastShopBuyTimeRef.current > 350) {
            lastShopBuyTimeRef.current = timestamp;

            if (pad.type === "warp") {
              statsRef.current.wave++;
              keySpawnedInWaveRef.current = false;
              playWaveClearSound();
              cameraShakeRef.current = 2.0;
              createExplosion(pad.x, pad.y, "#60a5fa", 30, 2);
              spawnWave(statsRef.current.wave);
              onUpdateStats(
                statsRef.current.kills,
                statsRef.current.score,
                statsRef.current.wave,
                player.shields,
                keysCollectedRef.current,
                false
              );
            } else if (pad.cost > 0 && statsRef.current.score >= pad.cost) {
              statsRef.current.score -= pad.cost;
              playShopBuySound();
              createExplosion(pad.x, pad.y, pad.color, 24, 1.5);
              addFloatingText(pad.x, pad.y - 30, "UPGRADED!", "#34d399");

              if (pad.type === "weapon") {
                const nextUp = {
                  ...upgradesRef.current,
                  weaponLevel: Math.min(4, upgradesRef.current.weaponLevel + 1),
                };
                onUpdateUpgrades(nextUp);
              } else if (pad.type === "fireRate") {
                const nextUp = {
                  ...upgradesRef.current,
                  fireRateLevel: Math.min(3, upgradesRef.current.fireRateLevel + 1),
                };
                onUpdateUpgrades(nextUp);
              } else if (pad.type === "shield") {
                player.shields += 1;
              } else if (pad.type === "bomb") {
                const nextUp = {
                  ...upgradesRef.current,
                  bombs: upgradesRef.current.bombs + 1,
                };
                onUpdateUpgrades(nextUp);
              }

              onUpdateStats(
                statsRef.current.kills,
                statsRef.current.score,
                statsRef.current.wave,
                player.shields,
                keysCollectedRef.current,
                false
              );
            } else if (pad.cost > 0 && statsRef.current.score < pad.cost) {
              addFloatingText(pad.x, pad.y - 30, `NEED ${pad.cost} PTS`, "#f87171");
            }
          }
        }
      }

      bombsRef.current = bombsRef.current.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.travelDist += Math.hypot(b.vx, b.vy);
        b.pulse += 0.35;

        ctx.save();
        ctx.translate(b.x, b.y);

        ctx.strokeStyle = "#38bdf8";
        ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        const sparkA = Math.random() * Math.PI * 2;
        const sparkD = Math.random() * 7 + 4;
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(sparkA) * sparkD, Math.sin(sparkA) * sparkD);
        ctx.stroke();

        ctx.restore();

        if (b.travelDist >= b.maxDist) {
          playEmpSound();
          cameraShakeRef.current = 1.6;

          shockwavesRef.current.push({
            id: `sw-${Date.now()}-${Math.random()}`,
            x: b.x,
            y: b.y,
            radius: 8,
            maxRadius: 72,
            life: 1,
          });

          for (let i = 0; i < 14; i++) {
            const a = (i / 14) * Math.PI * 2;
            const spd = Math.random() * 2.8 + 1.2;
            particlesRef.current.push({
              x: b.x,
              y: b.y,
              vx: Math.cos(a) * spd,
              vy: Math.sin(a) * spd,
              life: 1,
              maxLife: 15,
              sz: Math.random() * 2 + 1,
              color: i % 2 === 0 ? "#38bdf8" : "#ffffff",
            });
          }

          enemyBulletsRef.current = [];

          if (bossRef.current) {
            bossRef.current.health = Math.max(0, bossRef.current.health - 25);
            addFloatingText(bossRef.current.x, bossRef.current.y - 20, "-25 HP", "#f87171");
          }

          for (const enemy of enemiesRef.current) {
            enemy.health -= 2;
            createExplosion(enemy.x, enemy.y, "#ffffff", 6, 0.8);
          }
          enemiesRef.current = enemiesRef.current.filter((e) => e.health > 0);

          return false;
        }

        return true;
      });

      shockwavesRef.current = shockwavesRef.current.filter((sw) => {
        sw.radius += (sw.maxRadius - sw.radius) * 0.22;
        sw.life -= 0.075;
        if (sw.life <= 0) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, sw.life)})`;
        ctx.lineWidth = 1.8 * sw.life;
        ctx.stroke();
        ctx.restore();

        return true;
      });

      if (bossRef.current) {
        const boss = bossRef.current;
        boss.x += boss.vx;
        boss.y += boss.vy;

        if (boss.x < 110 || boss.x > W - 110) {
          boss.vx *= -1;
        }

        const maxBossY = Math.min(H * 0.35, 260);
        if (boss.y > maxBossY) {
          boss.y = maxBossY;
          boss.vy = -Math.abs(boss.vy);
        } else if (boss.y < 80) {
          boss.y = 80;
          boss.vy = Math.abs(boss.vy);
        }

        boss.shootTimer--;
        if (boss.shootTimer <= 0) {
          boss.shootTimer = 55;
          const bulletSpeed = 4.8;
          const spreadAngles = [-0.35, 0, 0.35];

          for (const sa of spreadAngles) {
            enemyBulletsRef.current.push({
              id: `bb-${Date.now()}-${Math.random()}`,
              x: boss.x + sa * 60,
              y: boss.y + 35,
              vx: Math.sin(sa) * bulletSpeed,
              vy: Math.cos(sa) * bulletSpeed,
              color: "#ef4444",
            });
          }
        }

        drawBossShip(ctx, boss);

        const barW = Math.min(W * 0.6, 520);
        const barH = 14;
        const barX = (W - barW) * 0.5;
        const barY = 56;
        const hpPercent = Math.max(0, boss.health / boss.maxHealth);

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.fillRect(barX, barY, barW, barH);
        ctx.strokeRect(barX, barY, barW, barH);

        ctx.fillStyle = "#ef4444";
        ctx.fillRect(barX + 2, barY + 2, (barW - 4) * hpPercent, barH - 4);

        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(
          `DREADNOUGHT MOTHERSHIP - HP: ${boss.health} / ${boss.maxHealth}`,
          W * 0.5,
          barY - 4
        );
      }

      if (!isShopWave && !bossRef.current && enemiesRef.current.length === 0) {
        statsRef.current.wave++;
        keySpawnedInWaveRef.current = false;
        playWaveClearSound();
        spawnWave(statsRef.current.wave);
        onUpdateStats(
          statsRef.current.kills,
          statsRef.current.score,
          statsRef.current.wave,
          player.shields,
          keysCollectedRef.current,
          false
        );
      }

      const isBlinking =
        player.invulnerableTime > 0 && Math.floor(player.invulnerableTime / 4) % 2 === 0;
      if (!isBlinking) {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle);

        ctx.strokeStyle = vectorColor;
        ctx.lineWidth = 1.8;

        ctx.beginPath();
        ctx.moveTo(player.radius * 1.3, 0);
        ctx.lineTo(-player.radius, -player.radius * 0.7);
        ctx.lineTo(-player.radius * 0.4, 0);
        ctx.lineTo(-player.radius, player.radius * 0.7);
        ctx.closePath();
        ctx.stroke();

        if (isMouseDownRef.current || Math.random() > 0.4) {
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-player.radius * 0.4, 0);
          ctx.lineTo(-player.radius * 1.1 - Math.random() * 3, 0);
          ctx.stroke();
        }

        if (player.shields > 0) {
          const isDanger = player.shields <= 1;
          ctx.strokeStyle = isDanger ? "rgba(239, 68, 68, 0.55)" : "rgba(56, 189, 248, 0.45)";
          ctx.lineWidth = player.shields > 3 ? 1.5 : 1;
          ctx.beginPath();
          ctx.arc(0, 0, player.radius * 1.35, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      lasersRef.current = lasersRef.current.filter((laser) => {
        laser.x += laser.vx;
        laser.y += laser.vy;

        if (laser.x < -40 || laser.x > W + 40 || laser.y < -40 || laser.y > H + 40) {
          return false;
        }

        ctx.strokeStyle = vectorColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(laser.x - laser.vx * 0.5, laser.y - laser.vy * 0.5);
        ctx.stroke();

        if (bossRef.current) {
          const b = bossRef.current;
          if (
            Math.abs(laser.x - b.x) < b.width * 0.48 &&
            Math.abs(laser.y - b.y) < b.height * 0.45
          ) {
            b.health -= 1;
            statsRef.current.shotsHit++;
            playBossHitSound();
            createExplosion(laser.x, laser.y, "#ef4444", 4, 0.8);

            if (b.health <= 0) {
              playBossDefeatSound();
              cameraShakeRef.current = 4.0;
              createExplosion(b.x, b.y, "#ef4444", 60, 2.5);

              const bigScore = 5000 + statsRef.current.wave * 1000;
              statsRef.current.score += bigScore;
              statsRef.current.kills += 10;
              addFloatingText(b.x, b.y, `+${bigScore} PTS`, "#fbbf24");

              for (let i = 0; i < 14; i++) {
                const angle = (i / 14) * Math.PI * 2;
                collectiblesRef.current.push({
                  id: `boss-col-${Date.now()}-${i}`,
                  x: b.x + Math.cos(angle) * 35,
                  y: b.y + Math.sin(angle) * 35,
                  vx: Math.cos(angle) * 2.2,
                  vy: Math.sin(angle) * 2.2,
                  type: i % 2 === 0 ? "purple_gem" : "green_gem",
                  size: 12,
                  pulse: 0,
                  life: 1200,
                });
              }

              bossRef.current = null;
              statsRef.current.wave++;
              keySpawnedInWaveRef.current = false;
              spawnWave(statsRef.current.wave);
              onUpdateStats(
                statsRef.current.kills,
                statsRef.current.score,
                statsRef.current.wave,
                player.shields,
                keysCollectedRef.current,
                false
              );
            }
            return false;
          }
        }

        for (const enemy of enemiesRef.current) {
          const edx = enemy.x - laser.x;
          const edy = enemy.y - laser.y;
          if (Math.hypot(edx, edy) < enemy.size + 6) {
            enemy.health--;
            statsRef.current.shotsHit++;

            if (enemy.health <= 0) {
              const killScore = 100 * statsRef.current.wave;
              statsRef.current.kills++;
              statsRef.current.score += killScore;
              playExplosionSound();
              createExplosion(enemy.x, enemy.y, "#ffffff", 18, 1.2);

              if (Math.random() < 0.12) {
                const dropTypes: ("shield" | "spread" | "bomb")[] = ["shield", "spread", "bomb"];
                const randType = dropTypes[Math.floor(Math.random() * dropTypes.length)];
                dropsRef.current.push({
                  id: `drop-${Date.now()}-${Math.random()}`,
                  x: enemy.x,
                  y: enemy.y,
                  vy: 1.2,
                  type: randType,
                  life: 400,
                });
              }

              scoreSinceLastShieldRef.current += killScore;
              const shieldCost = 1000 * statsRef.current.wave;
              if (scoreSinceLastShieldRef.current >= shieldCost) {
                scoreSinceLastShieldRef.current -= shieldCost;
                player.shields += 1;
                playWaveClearSound();
                createExplosion(player.x, player.y, "#38bdf8", 16, 1.2);
              }

              onUpdateStats(
                statsRef.current.kills,
                statsRef.current.score,
                statsRef.current.wave,
                player.shields,
                keysCollectedRef.current,
                isBossActive
              );
            } else {
              playEnemyHitSound();
              createExplosion(enemy.x, enemy.y, "#93c5fd", 5, 0.6);
            }
            return false;
          }
        }
        return true;
      });

      enemiesRef.current = enemiesRef.current.filter((e) => e.health > 0);

      collectiblesRef.current = collectiblesRef.current.filter((item) => {
        item.x += item.vx;
        item.y += item.vy;
        item.pulse += 0.06;
        item.life--;

        if (item.life <= 0 || item.y > H + 40 || item.x < -40 || item.x > W + 40) {
          return false;
        }

        drawCollectible(ctx, item);

        const cdx = player.x - item.x;
        const cdy = player.y - item.y;
        if (Math.hypot(cdx, cdy) < player.radius + item.size + 4) {
          if (item.type === "green_gem") {
            statsRef.current.score += 150;
            playPowerupPickupSound();
            createExplosion(item.x, item.y, "#22c55e", 12, 1);
            addFloatingText(item.x, item.y, "+150", "#22c55e");
          } else if (item.type === "purple_gem") {
            statsRef.current.score += 400;
            playPowerupPickupSound();
            createExplosion(item.x, item.y, "#c084fc", 16, 1.3);
            addFloatingText(item.x, item.y, "+400", "#c084fc");
          } else {
            keysCollectedRef.current += 1;
            playKeyPickupSound();
            createExplosion(item.x, item.y, "#fbbf24", 18, 1.4);
            addFloatingText(item.x, item.y, `KEY [${keysCollectedRef.current}/3]`, "#fbbf24");

            if (keysCollectedRef.current >= 3 && !bossRef.current) {
              spawnBoss();
            }
          }

          onUpdateStats(
            statsRef.current.kills,
            statsRef.current.score,
            statsRef.current.wave,
            player.shields,
            keysCollectedRef.current,
            !!bossRef.current
          );
          return false;
        }
        return true;
      });

      dropsRef.current = dropsRef.current.filter((drop) => {
        drop.y += drop.vy;
        drop.life--;
        if (drop.life <= 0 || drop.y > H + 20) return false;

        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.strokeStyle =
          drop.type === "shield"
            ? "#38bdf8"
            : drop.type === "bomb"
            ? "#34d399"
            : "#fbbf24";
        ctx.lineWidth = 1.4;

        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.lineTo(9, 0);
        ctx.lineTo(0, 9);
        ctx.lineTo(-9, 0);
        ctx.closePath();
        ctx.stroke();

        ctx.font = "bold 9px monospace";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          drop.type === "shield" ? "S" : drop.type === "bomb" ? "B" : "+",
          0,
          0
        );
        ctx.restore();

        const cdx = player.x - drop.x;
        const cdy = player.y - drop.y;
        if (Math.hypot(cdx, cdy) < player.radius + 12) {
          playPowerupPickupSound();
          createExplosion(drop.x, drop.y, ctx.strokeStyle as string, 12, 1);

          if (drop.type === "shield") {
            player.shields += 1;
            onUpdateStats(
              statsRef.current.kills,
              statsRef.current.score,
              statsRef.current.wave,
              player.shields,
              keysCollectedRef.current,
              isBossActive
            );
          } else if (drop.type === "bomb") {
            const nextUp = {
              ...upgradesRef.current,
              bombs: upgradesRef.current.bombs + 1,
            };
            onUpdateUpgrades(nextUp);
          } else {
            statsRef.current.score += 250;
            onUpdateStats(
              statsRef.current.kills,
              statsRef.current.score,
              statsRef.current.wave,
              player.shields,
              keysCollectedRef.current,
              isBossActive
            );
          }
          return false;
        }
        return true;
      });

      for (const enemy of enemiesRef.current) {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        if (enemy.x < 30 || enemy.x > W - 30) enemy.vx *= -1;
        if (enemy.y < 30 || enemy.y > H * 0.65) enemy.vy *= -1;

        enemy.shootTimer--;
        if (enemy.shootTimer <= 0) {
          enemy.shootTimer = Math.max(35, (110 + Math.random() * 90) / starSpeedMult);
          const bdx = player.x - enemy.x;
          const bdy = player.y - enemy.y;
          const bdist = Math.hypot(bdx, bdy) || 1;
          const bspeed = 4.2 * (1 + (statsRef.current.wave - 1) * 0.12);

          enemyBulletsRef.current.push({
            id: `ebullet-${Date.now()}-${Math.random()}`,
            x: enemy.x,
            y: enemy.y,
            vx: (bdx / bdist) * bspeed,
            vy: (bdy / bdist) * bspeed,
            color: vectorColor,
          });
        }

        drawSpacewarEnemy(ctx, enemy.x, enemy.y, enemy.size, enemy.type, vectorColor);
      }

      enemyBulletsRef.current = enemyBulletsRef.current.filter((bullet) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        if (bullet.x < 0 || bullet.x > W || bullet.y < 0 || bullet.y > H) return false;

        ctx.strokeStyle = bullet.color || "#f87171";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3.2, 0, Math.PI * 2);
        ctx.stroke();

        if (player.alive && player.invulnerableTime <= 0) {
          const pdx = player.x - bullet.x;
          const pdy = player.y - bullet.y;
          if (Math.hypot(pdx, pdy) < player.radius + 5) {
            player.shields -= 1;
            cameraShakeRef.current = 1.4;

            if (player.shields <= 0) {
              player.alive = false;
              statsRef.current.endTime = Date.now();
              playGameOverSound();
              createExplosion(player.x, player.y, "#ef4444", 35, 1.8);
              if (canvas) canvas.style.cursor = "auto";
              onGameOver(statsRef.current);
            } else {
              player.invulnerableTime = 65;
              playPlayerHitSound();
              createExplosion(player.x, player.y, "#38bdf8", 12, 0.8);
              onUpdateStats(
                statsRef.current.kills,
                statsRef.current.score,
                statsRef.current.wave,
                player.shields,
                keysCollectedRef.current,
                !!bossRef.current
              );
            }
            return false;
          }
        }
        return true;
      });

      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => {
        ft.y -= 1.0;
        ft.life -= 1 / ft.maxLife;
        if (ft.life <= 0) return false;

        ctx.save();
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.life);
        ctx.textAlign = "center";
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
        return true;
      });

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) return false;

        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz * p.life, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      justShotRef.current = false;
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onGameOver, onUpdateStats, onReset, onUpdateUpgrades]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 select-none block w-full h-full"
      style={{
        cursor: isPaused ? "default" : "none",
        touchAction: "none",
      }}
    />
  );
}
