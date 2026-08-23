"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LandingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const getThemeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? 0xfabd2f : 0xd89b1d;
    };

    const getWireframeColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? 0x3c3836 : 0xe5e5de;
    };

    const group = new THREE.Group();
    scene.add(group);

    const geometries = [
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.TorusKnotGeometry(1.6, 0.4, 64, 16),
      new THREE.OctahedronGeometry(1.8, 1),
      new THREE.DodecahedronGeometry(1.4, 0),
    ];

    const meshes: { mesh: THREE.LineSegments; rotSpeed: { x: number; y: number; z: number } }[] = [];

    const positions = [
      { x: -7, y: 4, z: -2 },
      { x: 7, y: -3, z: -4 },
      { x: 6, y: 5, z: -5 },
      { x: -6, y: -5, z: -3 },
    ];

    geometries.forEach((geo, i) => {
      const wireframeGeo = new THREE.WireframeGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: i === 0 ? getThemeColor() : getWireframeColor(),
        transparent: true,
        opacity: i === 0 ? 0.25 : 0.15,
        linewidth: 1,
      });

      const line = new THREE.LineSegments(wireframeGeo, mat);
      const pos = positions[i % positions.length];
      line.position.set(pos.x, pos.y, pos.z);

      group.add(line);
      meshes.push({
        mesh: line,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.002,
          y: (Math.random() - 0.5) * 0.003,
          z: (Math.random() - 0.5) * 0.001,
        },
      });
    });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      meshes.forEach(({ mesh, rotSpeed }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleThemeChange = () => {
      const mainColor = getThemeColor();
      const subColor = getWireframeColor();
      meshes.forEach(({ mesh }, i) => {
        (mesh.material as THREE.LineBasicMaterial).color.setHex(i === 0 ? mainColor : subColor);
      });
    };

    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          handleThemeChange();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      meshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="landing-canvas fixed inset-0 z-0 pointer-events-none opacity-80"
      aria-hidden="true"
    />
  );
}
