import React, { useRef, useEffect, useState, useCallback } from "react";
import CrossPanel from "./CrossPanel";

interface IntroSectionProps {
  onOpenCommandMenu: () => void;
}

type Rogue = {
  x: number; y: number;
  vx: number; vy: number;
  angle: number;
  targetEl: Element;
  size: number;
  fireInt: number;
  eating: boolean;
  eatTimer: number;
};

function lerpColor(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function getFireColor(infl: number, fi: number): [number, number, number] {
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const SLATE = isDark ? [51, 65, 85] : [51, 65, 85];
  const GOLD = isDark ? [215, 201, 165] : [160, 100, 20];
  const ORG = [255, 140, 20];
  const RED = [210, 35, 10];
  const BRIGHT = [255, 210, 40];

  let base = lerpColor(SLATE, GOLD, infl);
  if (fi <= 0) return base as [number, number, number];
  if (fi < 0.33) base = lerpColor(base, ORG, fi / 0.33);
  else if (fi < 0.66) base = lerpColor(ORG, RED, (fi - 0.33) / 0.33);
  else {
    const flicker = Math.sin(Date.now() * 0.025) * 0.5 + 0.5;
    base = lerpColor(RED, BRIGHT, ((fi - 0.66) / 0.34) * flicker);
  }
  return base as [number, number, number];
}

export default function IntroSection({ onOpenCommandMenu }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rogueCanvasRef = useRef<HTMLCanvasElement>(null);
  const fireCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const autoPosRef = useRef({ x: -9999, y: -9999, angle: 0 });
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Array<{ x: number; y: number; phase: number; angle: number }>>([]);
  const roguesRef = useRef<Rogue[]>([]);
  const burnMapRef = useRef<Map<Element, number>>(new Map());
  const fireParticlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; sz: number }>>([]);
  const frameRef = useRef(0);
  const needsRebuild = useRef(false);

  const sizeRef = useRef(4);
  const densityRef = useRef(32);
  const radiusRef = useRef(160);
  const fireRef = useRef(false);
  const fireIntRef = useRef(0);
  const attackRef = useRef(false);

  const phaseRef = useRef<'idle' | 'escaped' | 'going_rogue' | 'attacking'>('idle');
  const rogueFlickerRef = useRef(0);

  const [showTrigger, setShowTrigger] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [size, setSize] = useState(4);
  const [density, setDensity] = useState(32);
  const [radius, setRadius] = useState(160);
  const [fireMode, setFireMode] = useState(false);

  const [phase, setPhase] = useState<'idle' | 'escaped' | 'going_rogue' | 'attacking'>('idle');

  const attackMode = phase === 'attacking';

  useEffect(() => { const t = setTimeout(() => setShowTrigger(true), 1500); return () => clearTimeout(t); }, []);

  useEffect(() => { sizeRef.current = size; needsRebuild.current = true; }, [size]);
  useEffect(() => { densityRef.current = density; needsRebuild.current = true; }, [density]);
  useEffect(() => { radiusRef.current = radius; }, [radius]);
  useEffect(() => { fireRef.current = fireMode; }, [fireMode]);

  useEffect(() => {
    const handleToggle = () => {
      setFireMode((prev) => !prev);
    };
    window.addEventListener("toggle-burning", handleToggle);
    return () => window.removeEventListener("toggle-burning", handleToggle);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("toggle-burning-state", { detail: fireMode }));
  }, [fireMode]);

  const clearBurns = useCallback(() => {
    burnMapRef.current.forEach((_, el) => {
      const h = el as any;
      if (h.style) {
        h.style.removeProperty("filter");
        h.style.removeProperty("opacity");
        h.style.removeProperty("transform");
        h.style.removeProperty("transition");
        h.style.removeProperty("display");
      }
    });
    burnMapRef.current.clear();
    roguesRef.current = [];
  }, []);

  const spawnForTargets = useCallback((targets: Element[]) => {
    if (roguesRef.current.length >= 45) return;
    const existing = new Set(roguesRef.current.map(r => r.targetEl));
    const next = [...roguesRef.current];
    for (const target of targets) {
      if (next.length >= 45) break;
      if (existing.has(target)) continue;
      const rect = target.getBoundingClientRect();
      const count = Math.max(1, Math.min(3, Math.round((rect.width * rect.height) / 6000)));
      for (let j = 0; j < count; j++) {
        if (next.length >= 45) break;
        next.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: 0, vy: 0,
          angle: Math.random() * Math.PI * 2,
          targetEl: target,
          size: 5 + Math.random() * 3,
          fireInt: 0,
          eating: false,
          eatTimer: 0,
        });
      }
    }
    roguesRef.current = next;
  }, []);

  const getVisible = useCallback(() => {
    return Array.from(
      document.querySelectorAll(
        "h1, h2, h3, p, button, a, li, article, hr, svg, circle, line, rect, path, div[class*='border-t'], div[class*='border-b'], div[class*='border-y'], div[class*='border-theme-border']"
      )
    ).filter((el) => {
      if (el.closest('[data-no-destroy="true"]')) return false;
      const r = el.getBoundingClientRect();
      const classAttr = el.getAttribute("class") || "";
      const isTiny =
        ["circle", "line", "rect", "path", "svg", "hr"].includes(el.tagName.toLowerCase()) ||
        classAttr.includes("border-");
      if (isTiny) {
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
      }
      return r.width > 30 && r.height > 10 && r.bottom > 0 && r.top < window.innerHeight;
    });
  }, []);


  const handleAttackClick = useCallback(() => {
    setPhase(prev => {
      if (prev === 'idle') {
        phaseRef.current = 'escaped';
        needsRebuild.current = true;
        return 'escaped';
      }
      phaseRef.current = 'idle';
      attackRef.current = false;
      rogueFlickerRef.current = 0;
      needsRebuild.current = true;
      clearBurns();
      return 'idle';
    });
  }, [clearBurns]);


  const visibleCacheRef = useRef<Element[]>([]);
  const visibleFrameRef = useRef(-1);

  const getCachedVisible = useCallback(() => {
    if (visibleFrameRef.current !== frameRef.current) {
      visibleCacheRef.current = getVisible();
      visibleFrameRef.current = frameRef.current;
    }
    return visibleCacheRef.current;
  }, [getVisible]);

  useEffect(() => {
    if (phase === 'escaped') {
      needsRebuild.current = true;
      const rc = rogueCanvasRef.current;
      if (rc) { rc.width = window.innerWidth; rc.height = window.innerHeight; }

      const rogueSoon = setTimeout(() => {
        phaseRef.current = 'going_rogue';
        setPhase('going_rogue');
      }, 4000);
      return () => clearTimeout(rogueSoon);
    }
    if (phase === 'going_rogue') {
      const attackSoon = setTimeout(() => {
        phaseRef.current = 'attacking';
        attackRef.current = true;
        setPhase('attacking');
        spawnForTargets(getVisible());
      }, 2500);
      return () => clearTimeout(attackSoon);
    }
    if (phase === 'attacking') {
      const observer = new MutationObserver(() => {
        spawnForTargets(getVisible());
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
    if (phase === 'idle') {
      attackRef.current = false;
      rogueFlickerRef.current = 0;
      needsRebuild.current = true;
      clearBurns();
    }
  }, [phase, clearBurns, spawnForTargets, getVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const build = () => {
      const isFull = phaseRef.current !== 'idle';
      W = isFull ? window.innerWidth : section.offsetWidth;
      H = isFull ? window.innerHeight : section.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const effectiveDensity = isFull ? Math.min(28, densityRef.current) : densityRef.current;
      const sp = Math.max(10, 76 - effectiveDensity);
      const cols = Math.ceil(W / sp) + 1;
      const rows = Math.ceil(H / sp) + 1;
      nodesRef.current = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          nodesRef.current.push({ x: c * sp, y: r * sp, phase: Math.random() * Math.PI * 2, angle: Math.random() * Math.PI * 2 });
    };

    const ss = (x: number) => x * x * (3 - 2 * x);

    const drawCross = (
      c2d: CanvasRenderingContext2D,
      cx: number, cy: number, len: number, ang: number,
      r: number, g: number, b: number, op: number, lw: number
    ) => {
      const cos = Math.cos(ang), sin = Math.sin(ang);
      const topY = -len * 0.45;
      const botY = len;
      const tx = cx - sin * topY;
      const ty = cy + cos * topY;
      const bx = cx - sin * botY;
      const by = cy + cos * botY;

      const barY = -len * 0.15;
      const barHalf = len * 0.42;
      const lx = cx - cos * barHalf - sin * barY;
      const ly = cy - sin * barHalf + cos * barY;
      const rx = cx + cos * barHalf - sin * barY;
      const ry = cy + sin * barHalf + cos * barY;

      c2d.beginPath();
      c2d.moveTo(tx, ty);
      c2d.lineTo(bx, by);
      c2d.moveTo(lx, ly);
      c2d.lineTo(rx, ry);
      c2d.strokeStyle = `rgba(${r},${g},${b},${op})`;
      c2d.lineWidth = lw;
      c2d.stroke();
    };

    const draw = (ts: number) => {
      frameRef.current++;
      if (needsRebuild.current) { build(); needsRebuild.current = false; }

      ctx.clearRect(0, 0, W, H);

      const t = ts * 0.00055;
      const R = phaseRef.current !== 'idle' ? 140 : radiusRef.current;
      const SZ = phaseRef.current !== 'idle' ? 4 : sizeRef.current;

      const rm = mouseRef.current;
      const auto = autoPosRef.current;
      let targetX: number;
      let targetY: number;

      if (rm.x !== -9999 && rm.y !== -9999) {
        targetX = rm.x;
        targetY = rm.y;
        auto.x = rm.x;
        auto.y = rm.y;
      } else {
        if (auto.x === -9999 || auto.y === -9999) {
          auto.x = W * 0.5;
          auto.y = H * 0.5;
        }

        auto.angle += 0.004;
        const driftX = Math.sin(auto.angle * 1.2) * 0.65 + Math.cos(auto.angle * 0.6) * 0.35;
        const driftY = Math.cos(auto.angle * 1.0) * 0.55 + Math.sin(auto.angle * 0.7) * 0.3;

        auto.x += driftX;
        auto.y += driftY;

        const padX = W * 0.12;
        const padY = H * 0.15;
        if (auto.x < padX) auto.x += (padX - auto.x) * 0.05;
        if (auto.x > W - padX) auto.x -= (auto.x - (W - padX)) * 0.05;
        if (auto.y < padY) auto.y += (padY - auto.y) * 0.05;
        if (auto.y > H - padY) auto.y -= (auto.y - (H - padY)) * 0.05;

        targetX = auto.x;
        targetY = auto.y;
      }

      const sm = smoothRef.current;
      if (sm.x === -9999 || sm.y === -9999) {
        sm.x = targetX;
        sm.y = targetY;
      } else {
        sm.x += (targetX - sm.x) * 0.06;
        sm.y += (targetY - sm.y) * 0.06;
      }

      if (fireRef.current) fireIntRef.current = Math.min(1, fireIntRef.current + 0.004);
      else fireIntRef.current = Math.max(0, fireIntRef.current - 0.006);
      const fi = fireIntRef.current;

      const currentPhase = phaseRef.current;
      if (currentPhase === 'going_rogue') {
        rogueFlickerRef.current = Math.min(1, rogueFlickerRef.current + 0.008);
      } else if (currentPhase !== 'attacking') {
        rogueFlickerRef.current = Math.max(0, rogueFlickerRef.current - 0.02);
      }
      const rf = rogueFlickerRef.current;

      for (const node of nodesRef.current) {
        const dx = node.x - sm.x;
        const dy = node.y - sm.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const infl = ss(Math.max(0, 1 - dist / R));

        let target = node.phase + t;

        if (currentPhase === 'idle' && dist < R * 1.8) target = Math.atan2(dy, dx);
        let diff = target - node.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        node.angle += diff * 0.1;

        const breathe = Math.sin(t * 3 + node.phase) * 0.5 + 0.5;
        const fireFlicker = fi > 0.5 ? Math.sin(ts * 0.04 + node.phase * 5) * 0.25 + 0.75 : 1;


        let drawR: number, drawG: number, drawB: number;
        if (rf > 0) {
          const flick = Math.sin(ts * 0.08 + node.phase * 7.3) * 0.5 + 0.5;
          const chaos = Math.sin(ts * 0.13 + node.x * 0.05) * 0.5 + 0.5;
          const [baseR, baseG, baseB] = getFireColor(infl, fi);

          const flickR = Math.round(255 * flick + 200 * (1 - flick));
          const flickG = Math.round(80 * chaos);
          const flickB = Math.round(20 * (1 - flick));
          drawR = Math.round(baseR + (flickR - baseR) * rf);
          drawG = Math.round(baseG + (flickG - baseG) * rf);
          drawB = Math.round(baseB + (flickB - baseB) * rf);
        } else {
          [drawR, drawG, drawB] = getFireColor(infl, fi);
        }

        const op = (0.02 + breathe * 0.02) * fireFlicker + infl * 0.45 + rf * (Math.sin(ts * 0.07 + node.phase * 3) * 0.5 + 0.5) * 0.3;
        const len = SZ * (1 + infl * 1.2);
        drawCross(ctx, node.x, node.y, len, node.angle, drawR, drawG, drawB, Math.min(1, op), fi > 0 ? 1 + fi * 0.6 : 1);
      }

      const fc = fireCanvasRef.current;
      const fctx = fc?.getContext("2d");
      if (fc && fctx) {
        if (fi > 0 || fireRef.current) {
          if (fc.width !== window.innerWidth) { fc.width = window.innerWidth; fc.height = window.innerHeight; }
          fctx.globalCompositeOperation = "source-over";
          fctx.clearRect(0, 0, fc.width, fc.height);
          fctx.globalCompositeOperation = "lighter";

          const spawnN = Math.floor(fi * 18);
          for (let i = 0; i < spawnN; i++) {
            fireParticlesRef.current.push({
              x: Math.random() * fc.width,
              y: fc.height + 10,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -(1.2 + Math.random() * 3.2) * fi,
              life: 1,
              maxLife: 65 + Math.random() * 85,
              sz: 3.5 + Math.random() * 6 * fi,
            });
          }
          fireParticlesRef.current = fireParticlesRef.current.filter(p => {
            p.x += p.vx; p.y += p.vy; p.vx += (Math.random() - 0.5) * 0.16;
            p.life -= 1 / p.maxLife;
            if (p.life <= 0) return false;

            const [fr, fg, fb] = getFireColor(1, p.life * fi);

            fctx.beginPath();
            fctx.arc(p.x, p.y, p.sz * p.life, 0, Math.PI * 2);
            fctx.fillStyle = `rgba(${fr},${fg},${fb},${p.life * fi * 0.7})`;
            fctx.fill();
            return true;
          });
          if (fireParticlesRef.current.length > 1500) fireParticlesRef.current = fireParticlesRef.current.slice(-1500);
        } else {
          fctx.clearRect(0, 0, fc.width, fc.height);
          fireParticlesRef.current = [];
        }
      }

      const rc = rogueCanvasRef.current;
      const rctx = rc?.getContext("2d");
      if (rc && rctx && attackRef.current) {
        rctx.clearRect(0, 0, rc.width, rc.height);
        const visible = getCachedVisible();
        if (frameRef.current % 30 === 0) {
          spawnForTargets(visible);
        }

        const rectCache = new Map<Element, DOMRect>();
        const getRect = (el: Element) => {
          let r = rectCache.get(el);
          if (!r) { r = el.getBoundingClientRect(); rectCache.set(el, r); }
          return r;
        };

        const candidateCenters = visible
          .filter(el => (burnMapRef.current.get(el) ?? 0) < 1.0)
          .map(el => { const r = getRect(el); return { el, cx: r.left + r.width * 0.5, cy: r.top + r.height * 0.5 }; });

        roguesRef.current = roguesRef.current.filter(rogue => {
          let rect = getRect(rogue.targetEl);
          const offScreen = rect.bottom < 0 || rect.top > window.innerHeight;
          const fullyEaten = (burnMapRef.current.get(rogue.targetEl) ?? 0) >= 1.0;
          if (offScreen || fullyEaten) {
            let bestEl: Element | null = null;
            let minDist = Infinity;
            for (const { el, cx, cy } of candidateCenters) {
              if (el === rogue.targetEl) continue;
              const d = Math.hypot(cx - rogue.x, cy - rogue.y);
              if (d < minDist) { minDist = d; bestEl = el; }
            }
            if (bestEl) {
              rogue.targetEl = bestEl;
              rogue.eating = false;
              rogue.eatTimer = 0;
              rect = getRect(bestEl);
            } else {
              return false;
            }
          }
          const tx = rect.left + rect.width * 0.5;
          const ty = rect.top + rect.height * 0.5;
          const dx = tx - rogue.x;
          const dy = ty - rogue.y;
          const dist2 = Math.hypot(dx, dy);
          rogue.fireInt = Math.min(1, rogue.fireInt + 0.015);
          rogue.angle += 0.06;
          if (dist2 < 15) {
            rogue.eating = true;
            rogue.eatTimer++;
            if (!burnMapRef.current.has(rogue.targetEl))
              burnMapRef.current.set(rogue.targetEl, 0);
          } else {
            const sp2 = Math.min(dist2 * 0.12, 10);
            rogue.vx = rogue.vx * 0.82 + (dx / dist2) * sp2 * 0.35;
            rogue.vy = rogue.vy * 0.82 + (dy / dist2) * sp2 * 0.35;
            rogue.x += rogue.vx;
            rogue.y += rogue.vy;
          }
          const op2 = rogue.eating ? 0.6 + Math.sin(ts * 0.05) * 0.4 : 0.85;
          const sz2 = rogue.size + (rogue.eating ? Math.sin(ts * 0.04) * 2 : 0);
          const [r2, g2, b2] = getFireColor(1, rogue.fireInt);
          drawCross(rctx, rogue.x, rogue.y, sz2, rogue.angle, r2, g2, b2, op2, 1.5);
          if (rogue.eating && rogue.fireInt > 0.5) {
            const g2dim = Math.round(g2 * 0.6);
            for (let k = 0; k < 3; k++) {
              const px = rogue.x + (Math.random() - 0.5) * 30;
              const py = rogue.y + (Math.random() - 0.5) * 30;
              rctx.beginPath();
              rctx.arc(px, py, Math.random() * 2, 0, Math.PI * 2);
              rctx.fillStyle = `rgba(${r2},${g2dim},${b2},${Math.random() * 0.6})`;
              rctx.fill();
            }
          }
          return true;
        });

        const eatingElements = new Set<Element>();
        roguesRef.current.forEach(r => { if (r.eating) eatingElements.add(r.targetEl); });
        const applyBurnStyles = frameRef.current % 3 === 0;
        burnMapRef.current.forEach((prog, el) => {
          let next = prog;
          if (eatingElements.has(el)) {
            next = Math.min(1, prog + 0.005);
            burnMapRef.current.set(el, next);
          }
          const h = el as any;
          if (next >= 1) {
            if (h.style) h.style.display = "none";
            return;
          }
          if (!applyBurnStyles || !h.style) return;
          h.style.transition = "filter 0.1s, opacity 0.1s, transform 0.05s";
          if (next < 0.35) {
            const sh = (Math.random() - 0.5) * next * 5;
            h.style.transform = `translate(${sh}px,${sh * 0.4}px)`;
            h.style.filter = `brightness(${1 + next * 3}) saturate(${1 + next * 8}) sepia(${next * 0.8})`;
          } else if (next < 0.75) {
            const t2 = (next - 0.35) / 0.4;
            const sh = (Math.random() - 0.5) * 3;
            h.style.transform = `translate(${sh}px,${sh}px) scale(${1 - t2 * 0.08})`;
            h.style.filter = `brightness(${3 - t2 * 2}) saturate(5) sepia(1) hue-rotate(${t2 * 40}deg)`;
            h.style.opacity = `${1 - t2 * 0.5}`;
          } else {
            const t3 = (next - 0.75) / 0.25;
            h.style.transform = `translateY(${t3 * 10}px) scale(${1 - t3 * 0.1})`;
            h.style.filter = `brightness(0.2) saturate(0) blur(${t3 * 4}px)`;
            h.style.opacity = `${Math.max(0, 1 - t3)}`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseRef.current = { x, y };
        } else {
          mouseRef.current = { x: -9999, y: -9999 };
        }
      }
    };

    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    const handleScroll = () => {
      if (attackRef.current) {
        spawnForTargets(getVisible());
      }
    };

    const ro = new ResizeObserver(build);
    ro.observe(section);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onLeave);
    window.addEventListener("touchcancel", onLeave);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", handleScroll);
    build();
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("touchcancel", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [getVisible, spawnForTargets, getCachedVisible]);

  return (
    <>
      <canvas ref={fireCanvasRef} style={{ position: "fixed", inset: 0, zIndex: 9997, pointerEvents: "none", display: fireMode ? "block" : "none" }} />
      <canvas ref={rogueCanvasRef} style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none", display: attackMode ? "block" : "none" }} />

      <section
        ref={sectionRef}
        className="relative pt-12 md:pt-20 pb-8 md:pb-12 border-b border-theme-border overflow-hidden"
      >
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
          <div className="flex items-center space-x-2 mb-6 select-none">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-rose-400 tracking-widest uppercase">
              Open to remote work &amp; relocation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-theme-text leading-[1.1] mb-6">
            Hi, I&apos;m Parsa.
          </h1>

         <p className="text-xl md:text-2xl text-theme-secondary leading-relaxed font-normal tracking-wide mb-8">
  I build full-stack web apps end-to-end — from architecture to deployment
  — mainly with{" "}
  <span className="text-theme-text font-semibold">TypeScript</span>,{" "}
  <span className="text-theme-text font-semibold">Next.js</span>, and{" "}
  <span className="text-theme-text font-semibold">NestJS</span>. I&apos;ve
  shipped real products, sometimes solo, sometimes with teams of 7+ engineers
  and designers.
</p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
            <button
              onClick={onOpenCommandMenu}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-btnExploreBg border border-theme-btnExploreBorder hover:border-theme-accent text-theme-btnExploreText hover:text-theme-text transition-all select-none"
              aria-label="Open command menu"
            >
              <span>Explore Menu</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-theme-bg text-theme-muted text-[10px] border border-theme-border">
                ⌘K
              </kbd>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-theme-accent hover:bg-theme-accentHover text-white dark:text-theme-bg font-semibold transition-all shadow-sm hover:shadow select-none"
            >
              <span>Download Resume</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {showTrigger && !panelOpen && (
          <div
            className="absolute bottom-6 right-6 z-50 flex items-center gap-2 group select-none"
            data-no-destroy="true"
          >
            {/* Slide-out badge label */}
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono tracking-widest uppercase bg-theme-panelBg border border-theme-border text-theme-muted group-hover:text-theme-text shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
              Cross Options
            </span>

            <button
              onClick={() => setPanelOpen(true)}
              data-no-destroy="true"
              title="Cross field settings"
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
              {/* Curved flash / shimmer sweep */}
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

        {panelOpen && (
          <div data-no-destroy="true">
            <CrossPanel
              size={size} onSize={v => setSize(v)}
              density={density} onDensity={v => setDensity(v)}
              radius={radius} onRadius={v => setRadius(v)}
              fireMode={fireMode}
              attackMode={attackMode} phase={phase} onAttack={handleAttackClick}
              onClose={() => { setPanelOpen(false); }}
            />
          </div>
        )}
      </section>
    </>
  );
}
