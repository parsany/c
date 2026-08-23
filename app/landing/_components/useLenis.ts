"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Tempus from "tempus";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const origScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const unsubscribe = Tempus.add((state: { time: number }) => {
      lenis.raf(state.time);
    }, { priority: 0 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      unsubscribe?.();
      lenis.destroy();
      document.documentElement.style.scrollBehavior = origScrollBehavior;
    };
  }, []);

  return lenisRef;
}
