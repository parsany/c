export interface PlayerShip {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  alive: boolean;
  health: number;
  maxHealth: number;
}

export interface Laser {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 0 | 1 | 2; // 3 distinct space invader sprite patterns
  size: number;
  health: number;
  maxHealth: number;
  shootTimer: number;
  color: [number, number, number];
  angle: number;
}

export interface EnemyBullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export interface GameParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  sz: number;
  color: string;
}

export interface GameStats {
  kills: number;
  shotsFired: number;
  shotsHit: number;
  startTime: number;
  endTime: number;
  score: number;
  wave: number;
}
