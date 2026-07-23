export type Phase = 'idle' | 'escaped' | 'going_rogue' | 'attacking' | 'minigame';

export type Rogue = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetEl: Element;
  size: number;
  fireInt: number;
  eating: boolean;
  eatTimer: number;
};

export function lerpColor(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

export function getFireColor(infl: number, fi: number): [number, number, number] {
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  if (isDark) {
    const SLATE = [148, 163, 184];
    const GOLD = [245, 215, 130];
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
  } else {

    const SLATE = [71, 85, 105];
    const DARK_SHADE = [15, 23, 42];
    const MID_ROSE = [225, 29, 72];
    const BRIGHT_HIGHLIGHT = [251, 113, 133];

    let base = lerpColor(SLATE, MID_ROSE, infl);
    if (fi <= 0) return base as [number, number, number];

    const time = Date.now();
    const pulse = Math.sin(time * 0.015) * 0.5 + 0.5;
    const flicker = Math.sin(time * 0.04) * 0.5 + 0.5;
    const mixFactor = pulse * 0.75 + flicker * 0.25;

    const darkPoint = lerpColor(DARK_SHADE, MID_ROSE, fi * 0.4);
    const brightPoint = lerpColor(MID_ROSE, BRIGHT_HIGHLIGHT, Math.min(1, fi * 1.2));

    base = lerpColor(darkPoint, brightPoint, mixFactor);
    return base as [number, number, number];
  }
}
