"use client";
import { useEffect, useRef } from "react";

// Vendored from ThreeUI interface-lines (neuform-isolated/sources/interface-lines.html),
// ported from its iframe harness to a self-contained 2D-canvas client component.
// Dark variant (white strokes) matching ShaderBackground's dark fallback gradient.

export type InterfaceLinesProps = { speed?: number; density?: number; length?: number; size?: number; hue?: number; className?: string };
export const INTERFACE_LINES_DEFAULTS = { speed: 1, density: 1, length: 1, size: 1, hue: 0 } as const;

type ParticleState = { x: number; y: number; vx: number; vy: number };

export function InterfaceLines({ className = "", ...props }: InterfaceLinesProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...INTERFACE_LINES_DEFAULTS, ...props });
  useEffect(() => {
    optionsRef.current = { ...INTERFACE_LINES_DEFAULTS, ...props };
  });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let width = 1, height = 1;
    let particles: ParticleState[] = [];
    let frame = 0, visible = true;

    const spawn = () => {
      const { density } = optionsRef.current;
      particles = [];
      const count = Math.round((width < 640 ? 30 : 70) * density);
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      spawn();
    };

    const render = () => {
      const { speed, length, size } = optionsRef.current;
      const link = Math.round(120 * length);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1 * size;
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < link) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / link) * 0.42})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
      }
    };

    const loop = () => {
      render();
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    // Reduced motion: render one static frame of the network.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) render();

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    resizeObserver.observe(host);
    intersection.observe(host);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden", filter: `hue-rotate(${props.hue ?? INTERFACE_LINES_DEFAULTS.hue}deg)` }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
export default InterfaceLines;
