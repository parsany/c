import React, { useRef, useEffect, useCallback } from "react";
import { Phase, Rogue, lerpColor, getFireColor } from "./types";

interface AttackEngineProps {
  sectionRef: React.RefObject<HTMLElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  rogueCanvasRef: React.RefObject<HTMLCanvasElement>;
  fireCanvasRef: React.RefObject<HTMLCanvasElement>;
  phase: Phase;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  size: number;
  density: number;
  radius: number;
  fireMode: boolean;
  setFireMode: React.Dispatch<React.SetStateAction<boolean>>;
  allEaten: boolean;
  setAllEaten: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttackEngine({
  sectionRef,
  canvasRef,
  rogueCanvasRef,
  fireCanvasRef,
  phase,
  setPhase,
  size,
  density,
  radius,
  fireMode,
  setFireMode,
  allEaten,
  setAllEaten,
}: AttackEngineProps) {
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

  const sizeRef = useRef(size);
  const densityRef = useRef(density);
  const radiusRef = useRef(radius);
  const fireRef = useRef(fireMode);
  const fireIntRef = useRef(0);
  const attackRef = useRef(phase === 'attacking');
  const phaseRef = useRef<Phase>(phase);
  const rogueFlickerRef = useRef(0);

  useEffect(() => { sizeRef.current = size; needsRebuild.current = true; }, [size]);
  useEffect(() => { densityRef.current = density; needsRebuild.current = true; }, [density]);
  useEffect(() => { radiusRef.current = radius; }, [radius]);
  useEffect(() => { fireRef.current = fireMode; }, [fireMode]);
  useEffect(() => {
    phaseRef.current = phase;
    attackRef.current = phase === 'attacking';
  }, [phase]);

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
    setAllEaten(false);
  }, [setAllEaten]);

  const isTargetable = useCallback((el: Element) => {
    if (!el || !document.body.contains(el)) return false;
    if (el.closest('[data-no-destroy="true"]')) return false;
    if ((burnMapRef.current.get(el) ?? 0) >= 1.0) return false;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return false;
    if (r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth) return false;
    return true;
  }, []);

  const spawnForTargets = useCallback((targets: Element[]) => {
    if (roguesRef.current.length >= 60) return;
    const existing = new Set(roguesRef.current.map(r => r.targetEl));
    const next = [...roguesRef.current];
    for (const target of targets) {
      if (next.length >= 60) break;
      if (existing.has(target)) continue;
      const rect = target.getBoundingClientRect();
      const count = Math.max(1, Math.min(3, Math.round((rect.width * rect.height) / 5000)));
      for (let j = 0; j < count; j++) {
        if (next.length >= 60) break;
        next.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
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
        "h1, h2, h3, p, button, a, li, article, hr, svg, div[class*='border-t'], div[class*='border-b'], div[class*='border-y'], div[class*='border-theme-border']"
      )
    ).filter(isTargetable);
  }, [isTargetable]);

  const visibleCacheRef = useRef<Element[]>([]);
  const visibleFrameRef = useRef(-1);
  const rectCacheRef = useRef<Map<Element, DOMRect>>(new Map());

  const getCachedVisible = useCallback(() => {
    if (frameRef.current - visibleFrameRef.current >= 30 || visibleFrameRef.current === -1) {
      visibleCacheRef.current = getVisible();
      visibleFrameRef.current = frameRef.current;
      rectCacheRef.current.clear();
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
  }, [phase, setPhase, clearBurns, spawnForTargets, getVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rogueCanvas = rogueCanvasRef.current;
    const fireCanvas = fireCanvasRef.current;
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
      if (rogueCanvas) {
        rogueCanvas.width = window.innerWidth;
        rogueCanvas.height = window.innerHeight;
      }
      if (fireCanvas) {
        fireCanvas.width = window.innerWidth;
        fireCanvas.height = window.innerHeight;
      }
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

    const addCrossPath = (
      c2d: CanvasRenderingContext2D,
      cx: number, cy: number, len: number, ang: number
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
      c2d.moveTo(tx, ty);
      c2d.lineTo(bx, by);
      c2d.moveTo(lx, ly);
      c2d.lineTo(rx, ry);
    };

    const drawCross = (
      c2d: CanvasRenderingContext2D,
      cx: number, cy: number, len: number, ang: number,
      r: number, g: number, b: number, op: number, lw: number
    ) => {
      c2d.beginPath();
      addCrossPath(c2d, cx, cy, len, ang);
      c2d.strokeStyle = `rgba(${r},${g},${b},${op})`;
      c2d.lineWidth = lw;
      c2d.stroke();
    };

    type BatchEntry = { cx: number; cy: number; len: number; ang: number };
    const batchMap = new Map<string, BatchEntry[]>();
    const addToBatch = (
      r: number, g: number, b: number, op: number, lw: number,
      cx: number, cy: number, len: number, ang: number
    ) => {
      const opBucket = (Math.round(op * 15) / 15).toFixed(2);
      const lwBucket = lw.toFixed(1);
      const key = `${r},${g},${b},${opBucket},${lwBucket}`;
      let arr = batchMap.get(key);
      if (!arr) { arr = []; batchMap.set(key, arr); }
      arr.push({ cx, cy, len, ang });
    };
    const flushBatches = (c2d: CanvasRenderingContext2D, lw: number) => {
      for (const [key, entries] of batchMap) {
        const parts = key.split(',');
        const r = parts[0], g = parts[1], b = parts[2], op = parts[3];
        const batchLw = parseFloat(parts[4]);
        c2d.beginPath();
        for (const e of entries) addCrossPath(c2d, e.cx, e.cy, e.len, e.ang);
        c2d.strokeStyle = `rgba(${r},${g},${b},${op})`;
        c2d.lineWidth = batchLw;
        c2d.stroke();
      }
      batchMap.clear();
    };

    const draw = (ts: number) => {
      frameRef.current++;
      if (needsRebuild.current) { build(); needsRebuild.current = false; }

      ctx.clearRect(0, 0, W, H);

      if (phaseRef.current === 'minigame') {
        const rc = rogueCanvasRef.current;
        if (rc) { const rctx = rc.getContext("2d"); rctx?.clearRect(0, 0, rc.width, rc.height); }
        const fc = fireCanvasRef.current;
        if (fc) { const fctx = fc.getContext("2d"); fctx?.clearRect(0, 0, fc.width, fc.height); }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

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
      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

      const hasMouseInteraction = rm.x !== -9999 && rm.y !== -9999;
      const isIdlePhase = currentPhase === 'idle';
      if (isIdlePhase && !hasMouseInteraction && fi === 0 && rf === 0 && frameRef.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

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

          if (isDark) {
            const flickR = Math.round(255 * flick + 200 * (1 - flick));
            const flickG = Math.round(80 * chaos);
            const flickB = Math.round(20 * (1 - flick));
            drawR = Math.round(baseR + (flickR - baseR) * rf);
            drawG = Math.round(baseG + (flickG - baseG) * rf);
            drawB = Math.round(baseB + (flickB - baseB) * rf);
          } else {
            const brightPulse = Math.sin(ts * 0.015 + node.phase * 5.0) * 0.5 + 0.5;
            const targetR = Math.round(15 + brightPulse * 230);
            const targetG = Math.round(23 + brightPulse * 60);
            const targetB = Math.round(42 + brightPulse * 90);
            drawR = Math.round(baseR + (targetR - baseR) * rf);
            drawG = Math.round(baseG + (targetG - baseG) * rf);
            drawB = Math.round(baseB + (targetB - baseB) * rf);
          }
        } else {
          [drawR, drawG, drawB] = getFireColor(infl, fi);
        }

        const op = (0.02 + breathe * 0.02) * fireFlicker + infl * 0.45 + rf * (Math.sin(ts * 0.07 + node.phase * 3) * 0.5 + 0.5) * 0.3;
        const len = SZ * (1 + infl * 1.2);
        const lw = fi > 0 ? 1 + fi * 0.6 : 1;
        addToBatch(drawR, drawG, drawB, Math.min(1, op), lw, node.x, node.y, len, node.angle);
      }
      flushBatches(ctx, 1);

      const fc = fireCanvasRef.current;
      const fctx = fc?.getContext("2d");
      if (fc && fctx) {
        if (fi > 0 || fireRef.current) {
          if (fc.width !== window.innerWidth) { fc.width = window.innerWidth; fc.height = window.innerHeight; }
          fctx.globalCompositeOperation = "source-over";
          fctx.clearRect(0, 0, fc.width, fc.height);
          fctx.globalCompositeOperation = "lighter";

          const spawnN = Math.min(6, Math.floor(fi * 6));
          for (let i = 0; i < spawnN; i++) {
            fireParticlesRef.current.push({
              x: Math.random() * fc.width,
              y: fc.height + 10,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -(1.2 + Math.random() * 3.2) * fi,
              life: 1,
              maxLife: 50 + Math.random() * 50,
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
          if (fireParticlesRef.current.length > 400) fireParticlesRef.current = fireParticlesRef.current.slice(-400);
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
        if (frameRef.current % 10 === 0) {
          spawnForTargets(visible);
        }

        const getRect = (el: Element) => {
          let r = rectCacheRef.current.get(el);
          if (!r) { r = el.getBoundingClientRect(); rectCacheRef.current.set(el, r); }
          return r;
        };

        const candidateCenters = visible
          .filter(isTargetable)
          .map(el => { const r = getRect(el); return { el, cx: r.left + r.width * 0.5, cy: r.top + r.height * 0.5 }; });

        if (attackRef.current) {
          if (candidateCenters.length === 0 && burnMapRef.current.size > 0) {
            setAllEaten(prev => prev ? prev : true);

            const badgeEl = document.querySelector('[data-no-destroy="true"]');
            let targetX = window.innerWidth * 0.5;
            let targetY = 100;
            if (badgeEl) {
              const bRect = badgeEl.getBoundingClientRect();
              targetX = Math.min(bRect.left + bRect.width + 80, window.innerWidth - 100);
              targetY = bRect.top + bRect.height * 0.5;
            }

            const rogues = roguesRef.current;
            const len = rogues.length;
            const globalAngle = frameRef.current * 0.018;

            for (let i = 0; i < len; i++) {
              const rogue = rogues[i];

              const t = globalAngle + (i / Math.max(1, len)) * Math.PI * 2;
              const infX = targetX + 140 * Math.cos(t);
              const infY = targetY + 60 * Math.sin(2 * t) * 0.5;
              const zDepth = Math.sin(t);

              let sepX = 0, sepY = 0;
              let alignVx = 0, alignVy = 0;
              let neighbors = 0;

              for (let j = 0; j < len; j++) {
                if (i === j) continue;
                const other = rogues[j];
                const nx = rogue.x - other.x;
                const ny = rogue.y - other.y;
                const ndist = Math.hypot(nx, ny);
                if (ndist < 40 && ndist > 0) {
                  if (ndist < 16) {
                    sepX += (nx / ndist) * (16 - ndist) * 0.1;
                    sepY += (ny / ndist) * (16 - ndist) * 0.1;
                  }
                  alignVx += other.vx;
                  alignVy += other.vy;
                  neighbors++;
                }
              }

              if (neighbors > 0) {
                rogue.vx += (alignVx / neighbors - rogue.vx) * 0.08 + sepX;
                rogue.vy += (alignVy / neighbors - rogue.vy) * 0.08 + sepY;
              }

              const fdx = infX - rogue.x;
              const fdy = infY - rogue.y;
              const fdist = Math.hypot(fdx, fdy);
              const fsp = Math.min(fdist * 0.04, 3.5);
              rogue.vx = rogue.vx * 0.82 + (fdx / (fdist || 1)) * fsp * 0.22;
              rogue.vy = rogue.vy * 0.82 + (fdy / (fdist || 1)) * fsp * 0.22;

              const mx = mouseRef.current.x;
              const my = mouseRef.current.y;
              if (mx > -100 && my > -100) {
                const mdx = rogue.x - mx;
                const mdy = rogue.y - my;
                const mdist = Math.hypot(mdx, mdy);
                const pushRadius = 140;
                if (mdist < pushRadius && mdist > 0) {
                  const pushForce = Math.pow(1 - mdist / pushRadius, 1.4) * 9;
                  rogue.vx += (mdx / mdist) * pushForce;
                  rogue.vy += (mdy / mdist) * pushForce;
                }
              }

              rogue.x += rogue.vx;
              rogue.y += rogue.vy;

              const [r2, g2, b2] = getFireColor(1, rogue.fireInt);
              const sz3d = Math.max(2, rogue.size * (1 + zDepth * 0.3));
              const op3d = Math.min(1, Math.max(0.4, 0.75 + zDepth * 0.25));
              const lw3d = Math.max(1, 1.5 * (1 + zDepth * 0.2));
              drawCross(rctx, rogue.x, rogue.y, sz3d, t + Math.PI * 0.5, r2, g2, b2, op3d, lw3d);
            }
          } else if (candidateCenters.length > 0) {
            setAllEaten(prev => !prev ? prev : false);
          }
        }

        const eatingCounts = new Map<Element, number>();

        roguesRef.current = roguesRef.current.filter(rogue => {
          if (!isTargetable(rogue.targetEl)) {
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
            } else {
              rogue.angle += 0.08 + (Math.random() - 0.5) * 0.1;
              const speed = 7;
              rogue.vx = rogue.vx * 0.85 + Math.cos(rogue.angle) * speed * 0.15;
              rogue.vy = rogue.vy * 0.85 + Math.sin(rogue.angle) * speed * 0.15;
              rogue.x += rogue.vx;
              rogue.y += rogue.vy;

              if (rogue.x < 10) { rogue.x = 10; rogue.vx *= -1; }
              if (rogue.x > window.innerWidth - 10) { rogue.x = window.innerWidth - 10; rogue.vx *= -1; }
              if (rogue.y < 10) { rogue.y = 10; rogue.vy *= -1; }
              if (rogue.y > window.innerHeight - 10) { rogue.y = window.innerHeight - 10; rogue.vy *= -1; }

              const [r2, g2, b2] = getFireColor(1, rogue.fireInt);
              drawCross(rctx, rogue.x, rogue.y, rogue.size, rogue.angle, r2, g2, b2, 0.85, 1.5);
              return true;
            }
          }

          const rect = getRect(rogue.targetEl);
          const tx = rect.left + rect.width * 0.5;
          const ty = rect.top + rect.height * 0.5;
          const dx = tx - rogue.x;
          const dy = ty - rogue.y;
          const dist2 = Math.hypot(dx, dy);

          rogue.fireInt = Math.min(1, rogue.fireInt + 0.03);
          rogue.angle += 0.1;

          const insideRect = rogue.x >= rect.left - 12 && rogue.x <= rect.right + 12 &&
            rogue.y >= rect.top - 12 && rogue.y <= rect.bottom + 12;

          if (dist2 < 20 || insideRect) {
            rogue.eating = true;
            rogue.eatTimer++;
            eatingCounts.set(rogue.targetEl, (eatingCounts.get(rogue.targetEl) || 0) + 1);
            if (!burnMapRef.current.has(rogue.targetEl)) {
              burnMapRef.current.set(rogue.targetEl, 0);
            }
          } else {
            rogue.eating = false;
            const sp2 = Math.min(dist2 * 0.16, 12);
            const dirX = dx / (dist2 || 1);
            const dirY = dy / (dist2 || 1);
            rogue.vx = rogue.vx * 0.78 + dirX * sp2 * 0.45;
            rogue.vy = rogue.vy * 0.78 + dirY * sp2 * 0.45;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            if (mx > -100 && my > -100) {
              const mdx = rogue.x - mx;
              const mdy = rogue.y - my;
              const mdist = Math.hypot(mdx, mdy);
              const pushRadius = 140;
              if (mdist < pushRadius && mdist > 0) {
                const pushForce = Math.pow(1 - mdist / pushRadius, 1.4) * 12;
                rogue.vx += (mdx / mdist) * pushForce;
                rogue.vy += (mdy / mdist) * pushForce;
              }
            }

            rogue.x += rogue.vx;
            rogue.y += rogue.vy;
          }

          const op2 = rogue.eating ? 0.7 + Math.sin(ts * 0.08) * 0.3 : 0.9;
          const sz2 = rogue.size + (rogue.eating ? Math.sin(ts * 0.06) * 3 : 0);
          const [r2, g2, b2] = getFireColor(1, rogue.fireInt);
          drawCross(rctx, rogue.x, rogue.y, sz2, rogue.angle, r2, g2, b2, op2, 1.5);
          if (rogue.eating && rogue.fireInt > 0.3) {
            const g2dim = Math.round(g2 * 0.6);
            for (let k = 0; k < 3; k++) {
              const px = rogue.x + (Math.random() - 0.5) * 30;
              const py = rogue.y + (Math.random() - 0.5) * 30;
              rctx.beginPath();
              rctx.arc(px, py, Math.random() * 2, 0, Math.PI * 2);
              rctx.fillStyle = `rgba(${r2},${g2dim},${b2},${Math.random() * 0.8})`;
              rctx.fill();
            }
          }
          return true;
        });

        burnMapRef.current.forEach((prog, el) => {
          let next = prog;
          const numRogues = eatingCounts.get(el) || 0;
          if (numRogues > 0) {
            const eatRate = 0.012 + (numRogues - 1) * 0.008;
            next = Math.min(1, prog + eatRate);
            burnMapRef.current.set(el, next);
          }
          const h = el as any;
          if (next >= 1) {
            if (h.style) h.style.display = "none";
            return;
          }
          if (!h.style) return;
          h.style.transition = "filter 0.05s, opacity 0.05s, transform 0.03s";
          if (next < 0.35) {
            const sh = (Math.random() - 0.5) * next * 8;
            h.style.transform = `translate(${sh}px,${sh * 0.4}px)`;
            h.style.filter = `brightness(${1 + next * 4}) saturate(${1 + next * 10}) sepia(${next * 0.8})`;
          } else if (next < 0.75) {
            const t2 = (next - 0.35) / 0.4;
            const sh = (Math.random() - 0.5) * 5;
            h.style.transform = `translate(${sh}px,${sh}px) scale(${1 - t2 * 0.12})`;
            h.style.filter = `brightness(${3 - t2 * 2}) saturate(6) sepia(1) hue-rotate(${t2 * 60}deg)`;
            h.style.opacity = `${1 - t2 * 0.5}`;
          } else {
            const t3 = (next - 0.75) / 0.25;
            h.style.transform = `translateY(${t3 * 12}px) scale(${1 - t3 * 0.15})`;
            h.style.filter = `brightness(0.2) saturate(0) blur(${t3 * 5}px)`;
            h.style.opacity = `${Math.max(0, 1 - t3)}`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onTouchMove = (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    const handleScroll = () => {
      rectCacheRef.current.clear();
      visibleFrameRef.current = -1;
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

    const startLoop = () => {
      build();
      rafRef.current = requestAnimationFrame(draw);
    };
    if (document.readyState === "complete") {
      startLoop();
    } else {
      window.addEventListener("load", startLoop, { once: true });
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("touchcancel", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearBurns();
    };
  }, [clearBurns, getCachedVisible, getVisible, setAllEaten, spawnForTargets]);

  return null;
}
