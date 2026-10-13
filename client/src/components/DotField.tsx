"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  ox: number;
  oy: number;
};

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    let frame = 0;
    let running = true;
    const gap = 26;
    const reach = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(window.innerWidth / gap) + 2;
      const rows = Math.ceil(window.innerHeight / gap) + 2;
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ox = col * gap;
          const oy = row * gap;
          dots.push({ x: ox, y: oy, ox, oy });
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = () => {
      if (!running) return;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const dot of dots) {
        const dx = dot.ox - mouse.x;
        const dy = dot.oy - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        let targetX = dot.ox;
        let targetY = dot.oy;
        let near = 0;
        if (!reduce && dist < reach) {
          near = 1 - dist / reach;
          const push = near * near * 42;
          targetX += (dx / dist) * push;
          targetY += (dy / dist) * push;
        }
        dot.x += (targetX - dot.x) * 0.18;
        dot.y += (targetY - dot.y) * 0.18;
        context.beginPath();
        context.fillStyle = near > 0.2 ? `rgba(240, 201, 138, ${0.35 + near * 0.6})` : "rgba(215, 198, 255, 0.42)";
        context.arc(dot.x, dot.y, 1.25 + near * 1.8, 0, Math.PI * 2);
        context.fill();
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
