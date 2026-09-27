export interface PlayerUpgrades {
  weaponLevel: number;
  fireRateLevel: number;
  bombs: number;
}

export interface PowerupDrop {
  id: string;
  x: number;
  y: number;
  vy: number;
  type: "shield" | "spread" | "bomb";
  life: number;
}

export type CollectibleType = "green_gem" | "purple_gem" | "yellow_key";

export interface CollectibleItem {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: CollectibleType;
  size: number;
  pulse: number;
  life: number;
}

export interface BossEnemy {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  shootTimer: number;
  pulse: number;
  active: boolean;
}

export type ShopPadType = "weapon" | "fireRate" | "shield" | "bomb" | "warp";

export interface ShopPad {
  id: string;
  x: number;
  y: number;
  radius: number;
  type: ShopPadType;
  title: string;
  cost: number;
  color: string;
}

export interface BombProjectile {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  travelDist: number;
  maxDist: number;
  pulse: number;
}

export interface ShockwaveEffect {
  id: string;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

export interface FloatingNotification {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export interface PlayerShip {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  alive: boolean;
  shields: number;
  invulnerableTime: number;
  weaponLevel: number;
  fireRateLevel: number;
  bombs: number;
  health?: number;
  maxHealth?: number;
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
  type: 0 | 1 | 2;
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

export interface StarParticle {
  x: number;
  y: number;
  speed: number;
  sz: number;
  opacity: number;
}

export interface GameStats {
  kills: number;
  shotsFired: number;
  shotsHit: number;
  startTime: number;
  endTime: number;
  score: number;
  wave: number;
  highScore?: number;
  keysCollected?: number;
}
