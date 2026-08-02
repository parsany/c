import React, { useEffect, useRef } from "react";
import { PlayerShip, Laser, Enemy, EnemyBullet, GameParticle, GameStats } from "./types";

interface SpaceInvadersEngineProps {
  onGameOver: (stats: GameStats) => void;
  onUpdateStats: (kills: number, score: number, wave: number) => void;
  onReset: () => void;
}

export default function SpaceInvadersEngine({
  onGameOver,
  onUpdateStats,
  onReset,
}: SpaceInvadersEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 });
  const isMouseDownRef = useRef(false);
  const lastShotRef = useRef(0);

  const statsRef = useRef<GameStats>({
    kills: 0,
    shotsFired: 0,
    shotsHit: 0,
    startTime: Date.now(),
    endTime: 0,
    score: 0,
    wave: 1,
  });

  const playerRef = useRef<PlayerShip>({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.8,
    vx: 0,
    vy: 0,
    angle: -Math.PI * 0.5,
    radius: 16,
    alive: true,
    health: 100,
    maxHealth: 100,
  });

  const lasersRef = useRef<Laser[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const enemyBulletsRef = useRef<EnemyBullet[]>([]);
  const particlesRef = useRef<GameParticle[]>([]);

  const spawnWave = (waveNum: number) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = Math.min(10, 5 + waveNum * 2);
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
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        type,
        size: 14 + type * 3,
        health: 1 + type,
        maxHealth: 1 + type,
        shootTimer: Math.random() * 120 + 60,
        color: [255, 255, 255],
        angle: Math.random() * Math.PI * 2,
      });
    }
    enemiesRef.current = newEnemies;
  };

  useEffect(() => {
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
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!playerRef.current.alive) return;
      if (e.button === 0) isMouseDownRef.current = true;
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) isMouseDownRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

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

    const shootLaser = () => {
      const p = playerRef.current;
      if (!p.alive) return;

      const cos = Math.cos(p.angle);
      const sin = Math.sin(p.angle);
      const speed = 20;
      const noseX = p.x + cos * p.radius;
      const noseY = p.y + sin * p.radius;

      lasersRef.current.push({
        id: `laser-${Date.now()}-${Math.random()}`,
        x: noseX,
        y: noseY,
        vx: cos * speed,
        vy: sin * speed,
        life: 1,
        maxLife: 300,
        color: "#ffffff",
      });

      statsRef.current.shotsFired++;
    };

    const loop = (timestamp: number) => {
      if (typeof document !== "undefined" && document.hidden) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const W = canvas.width;
      const H = canvas.height;
      const vectorColor = "#ffffff";

      ctx.clearRect(0, 0, W, H);

      const player = playerRef.current;

      // If player is dead, clear screen, disable canvas pointer events and stop enemy rendering so stats modal sits cleanly on top
      if (!player.alive) {
        if (canvas) {
          canvas.style.cursor = "default";
          canvas.style.pointerEvents = "none";
        }
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Check Wave Respawn
      if (enemiesRef.current.length === 0) {
        statsRef.current.wave++;
        spawnWave(statsRef.current.wave);
        onUpdateStats(statsRef.current.kills, statsRef.current.score, statsRef.current.wave);
      }

      // Update & Draw Player
      const mouse = mouseRef.current;
      const cx = W * 0.5;
      const cy = H * 0.5;

      player.x += (mouse.x - player.x) * 0.18;
      player.y += (mouse.y - player.y) * 0.18;

      // Player always faces the center of the screen
      const dx = cx - player.x;
      const dy = cy - player.y;
      player.angle = Math.atan2(dy, dx);

      if (isMouseDownRef.current && timestamp - lastShotRef.current > 150) {
        shootLaser();
        lastShotRef.current = timestamp;
      }

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

      ctx.restore();

      // Update Lasers (bullets travel through the full screen)
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

        for (const enemy of enemiesRef.current) {
          const edx = enemy.x - laser.x;
          const edy = enemy.y - laser.y;
          if (Math.hypot(edx, edy) < enemy.size + 6) {
            enemy.health--;
            statsRef.current.shotsHit++;

            if (enemy.health <= 0) {
              statsRef.current.kills++;
              statsRef.current.score += 100 * statsRef.current.wave;
              onUpdateStats(statsRef.current.kills, statsRef.current.score, statsRef.current.wave);
            }
            return false;
          }
        }
        return true;
      });

      enemiesRef.current = enemiesRef.current.filter((e) => e.health > 0);

      // Update Invaders
      for (const enemy of enemiesRef.current) {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        if (enemy.x < 30 || enemy.x > W - 30) enemy.vx *= -1;
        if (enemy.y < 30 || enemy.y > H * 0.65) enemy.vy *= -1;

        enemy.shootTimer--;
        if (enemy.shootTimer <= 0) {
          enemy.shootTimer = 110 + Math.random() * 100;
          const bdx = player.x - enemy.x;
          const bdy = player.y - enemy.y;
          const bdist = Math.hypot(bdx, bdy) || 1;
          const bspeed = 4.2 + statsRef.current.wave * 0.4;

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

      // Update Enemy Bullets
      enemyBulletsRef.current = enemyBulletsRef.current.filter((bullet) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        if (bullet.x < 0 || bullet.x > W || bullet.y < 0 || bullet.y > H) return false;

        ctx.strokeStyle = vectorColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        if (player.alive) {
          const pdx = player.x - bullet.x;
          const pdy = player.y - bullet.y;
          if (Math.hypot(pdx, pdy) < player.radius + 5) {
            player.alive = false;
            statsRef.current.endTime = Date.now();
            if (canvas) canvas.style.cursor = "auto";
            onGameOver(statsRef.current);
            return false;
          }
        }
        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onGameOver, onUpdateStats]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] select-none block"
      style={{ cursor: "none", touchAction: "none" }}
    />
  );
}
