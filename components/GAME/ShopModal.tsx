"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Bomb, Crosshair, Play, ShoppingCart } from "lucide-react";
import { PlayerUpgrades } from "./types";
import { playShopBuySound } from "./audio";

interface ShopModalProps {
  score: number;
  shields: number;
  upgrades: PlayerUpgrades;
  onBuyWeapon: (cost: number) => void;
  onBuyFireRate: (cost: number) => void;
  onBuyShield: (cost: number) => void;
  onBuyBomb: (cost: number) => void;
  onResume: () => void;
}

const WEAPON_NAMES = [
  "Single Laser",
  "Twin Front Cannons",
  "Triple Spread Shot",
  "Quad Heavy Blaster",
];

const WEAPON_COSTS = [0, 500, 1200, 2500];
const FIRE_RATE_COSTS = [0, 400, 900];
const SHIELD_COST = 350;
const BOMB_COST = 500;

export default function ShopModal({
  score,
  shields,
  upgrades,
  onBuyWeapon,
  onBuyFireRate,
  onBuyShield,
  onBuyBomb,
  onResume,
}: ShopModalProps) {
  const nextWeaponCost = upgrades.weaponLevel < 4 ? WEAPON_COSTS[upgrades.weaponLevel] : null;
  const nextFireRateCost = upgrades.fireRateLevel < 3 ? FIRE_RATE_COSTS[upgrades.fireRateLevel] : null;

  const handleBuyWeapon = () => {
    if (nextWeaponCost !== null && score >= nextWeaponCost) {
      playShopBuySound();
      onBuyWeapon(nextWeaponCost);
    }
  };

  const handleBuyFireRate = () => {
    if (nextFireRateCost !== null && score >= nextFireRateCost) {
      playShopBuySound();
      onBuyFireRate(nextFireRateCost);
    }
  };

  const handleBuyShield = () => {
    if (score >= SHIELD_COST) {
      playShopBuySound();
      onBuyShield(SHIELD_COST);
    }
  };

  const handleBuyBomb = () => {
    if (score >= BOMB_COST) {
      playShopBuySound();
      onBuyBomb(BOMB_COST);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-mono"
      style={{ pointerEvents: "auto", cursor: "default" }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-lg bg-[#0e0e12] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col gap-5 text-white"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                ARMORY UPGRADES
              </h2>
              <p className="text-[11px] text-white/50 tracking-wider uppercase">
                Spend Score to Power Up
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/50 tracking-wider uppercase">
              Available Score
            </span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400">
              {score}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs text-rose-400 uppercase tracking-wider">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Cannons</span>
                </div>
                <span className="text-[11px] text-white/50">
                  Lvl {upgrades.weaponLevel}/4
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {WEAPON_NAMES[upgrades.weaponLevel - 1]}
              </p>
              {upgrades.weaponLevel < 4 && (
                <p className="text-[10px] text-white/50 mt-0.5">
                  Next: {WEAPON_NAMES[upgrades.weaponLevel]}
                </p>
              )}
            </div>

            {upgrades.weaponLevel < 4 ? (
              <button
                onClick={handleBuyWeapon}
                disabled={score < (nextWeaponCost || 0)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                  score >= (nextWeaponCost || 0)
                    ? "bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95"
                    : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                }`}
              >
                <span>Upgrade</span>
                <span>{nextWeaponCost} pts</span>
              </button>
            ) : (
              <div className="w-full py-2 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg uppercase">
                Maxed Out
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fire Rate</span>
                </div>
                <span className="text-[11px] text-white/50">
                  Lvl {upgrades.fireRateLevel}/3
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {upgrades.fireRateLevel === 1
                  ? "Standard (150ms)"
                  : upgrades.fireRateLevel === 2
                  ? "Rapid (110ms)"
                  : "Hyper-Drive (75ms)"}
              </p>
              {upgrades.fireRateLevel < 3 && (
                <p className="text-[10px] text-white/50 mt-0.5">
                  Next: {upgrades.fireRateLevel === 1 ? "Rapid (110ms)" : "Hyper-Drive (75ms)"}
                </p>
              )}
            </div>

            {upgrades.fireRateLevel < 3 ? (
              <button
                onClick={handleBuyFireRate}
                disabled={score < (nextFireRateCost || 0)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                  score >= (nextFireRateCost || 0)
                    ? "bg-amber-500 hover:bg-amber-600 text-black shadow-md active:scale-95"
                    : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                }`}
              >
                <span>Upgrade</span>
                <span>{nextFireRateCost} pts</span>
              </button>
            ) : (
              <div className="w-full py-2 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg uppercase">
                Maxed Out
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs text-sky-400 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Shield +1</span>
                </div>
                <span className="text-[11px] text-sky-400 font-bold">
                  {shields} Active
                </span>
              </div>
              <p className="text-xs text-white/80">
                Reinforce hull integrity
              </p>
            </div>

            <button
              onClick={handleBuyShield}
              disabled={score < SHIELD_COST}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                score >= SHIELD_COST
                  ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95"
                  : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
              }`}
            >
              <span>Buy Shield</span>
              <span>{SHIELD_COST} pts</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 uppercase tracking-wider">
                  <Bomb className="w-3.5 h-3.5" />
                  <span>EMP Bomb</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">
                  {upgrades.bombs} Stock
                </span>
              </div>
              <p className="text-xs text-white/80">
                Press [B] to wipe enemy bullets
              </p>
            </div>

            <button
              onClick={handleBuyBomb}
              disabled={score < BOMB_COST}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                score >= BOMB_COST
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95"
                  : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
              }`}
            >
              <span>Buy Bomb</span>
              <span>{BOMB_COST} pts</span>
            </button>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={onResume}
            className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold uppercase tracking-wider text-sm transition-all hover:bg-white/90 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Resume Game (Space)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
