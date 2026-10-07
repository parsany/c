import React from "react";
import type { Metadata } from "next";
import Game from "@/components/GAME";

export const metadata: Metadata = {
  title: "Space Invaders | Retro Arcade Game by Parsa",
  description:
    "Play Space Invaders, an interactive retro space invaders arcade shooter built with HTML5 Canvas and vector physics by Parsa.",
  openGraph: {
    title: "Space Invaders | Retro Arcade Game by Parsa",
    description:
      "Play Space Invaders, an interactive retro space invaders arcade shooter built with HTML5 Canvas and vector physics by Parsa.",
    url: "https://parsany.com/game/",
    siteName: "Parsa Portfolio",
    type: "website",
  },
  alternates: {
    canonical: "https://parsany.com/game/",
  },
};

export default function GamePage() {
  return <Game />;
}
