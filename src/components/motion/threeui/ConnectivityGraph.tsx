"use client";
import { useEffect, useRef } from "react";

// Vendored from ThreeUI connectivity-graph (neuform-isolated/sources/connectivity-graph.html),
// ported from its iframe harness to a self-contained 2D-canvas client component.
// Dark-mode variant (the light variant's #c4d9ef paper clashes with ShaderBackground's
// dark fallback gradient): lightness = 58 + distRatio * 28, tail floor 40 / alpha * 0.08.

export type ConnectivityGraphProps = { speed?: number; density?: number; length?: number; size?: number; hue?: number; className?: string };
export const CONNECTIVITY_GRAPH_DEFAULTS = { speed: 1, density: 1, length: 1, size: 1, hue: 0 } as const;

type ParticleState = { angle: number; speed: number; distance: number; maxLength: number; length: number; alpha: number };

function resetParticle(p: ParticleState, height: number, initial: boolean, lengthKnob: number) {
  p.angle = Math.PI + Math.random() * Math.PI;
  if (Math.random() > 0.3) {
    p.angle = Math.PI * 1.25 + Math.random() * Math.PI * 0.5;
  }
  p.speed = 0.5 + Math.random() * 2.5;
  p.distance = initial ? Math.random() * (height * 1.2) : Math.random() * 50;
  p.maxLength = (20 + Math.random() * 180) * lengthKnob;
  p.length = 0;
  p.alpha = 0;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: ParticleState, width: number, height: number) {
  const originX = width / 2;
  const originY = height + 50;

  const startX = originX + Math.cos(p.angle) * p.distance;
  const startY = originY + Math.sin(p.angle) * p.distance;
  const endX = originX + Math.cos(p.angle) * (p.distance + p.length);
  const endY = originY + Math.sin(p.angle) * (p.distance + p.length);

  const distRatio = Math.min(1, p.distance / height);
  const hue = 220 + distRatio * 15;
  const lightness = 58 + distRatio * 28;

  const color = `hsla(${hue}, 90%, ${lightness}%, ${p.alpha})`;
  const tailColor = `hsla(${hue}, 90%, ${Math.max(40, lightness - 15)}%, ${p.alpha * 0.08})`;

  ctx.beginPath();
  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, tailColor);
  gradient.addColorStop(1, color);

  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = gradient;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(endX, endY, 0.5 + distRatio * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue}, 100%, ${lightness + 20}%, ${Math.min(1, p.alpha * 1.5)})`;
  ctx.fill();
}

export function ConnectivityGraph({ className = "", ...props }: ConnectivityGraphProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...CONNECTIVITY_GRAPH_DEFAULTS, ...props });
  useEffect(() => {
    optionsRef.current = { ...CONNECTIVITY_GRAPH_DEFAULTS, ...props };
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
      const { density, length } = optionsRef.current;
      particles = [];
      const count = Math.round((width < 768 ? 150 : 400) * density);
      for (let i = 0; i < count; i += 1) {
        const p = {} as ParticleState;
        resetParticle(p, height, true, length);
        particles.push(p);
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
      spawn();
    };

    const tick = () => {
      const { speed, length } = optionsRef.current;
      for (const p of particles) {
        p.distance += p.speed * speed;
        p.length = Math.min(p.maxLength, p.distance * 0.8);
        const normalizedDist = p.distance / (height * 1.2);
        p.alpha = Math.min(1, p.distance / 100) * Math.max(0, 1 - normalizedDist);
        if (p.distance > height * 1.5) resetParticle(p, height, false, length);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const sizeKnob = optionsRef.current.size;
      for (const p of particles) {
        const distRatio = Math.min(1, p.distance / height);
        ctx.lineWidth = (0.5 + distRatio * 2) * sizeKnob;
        drawParticle(ctx, p, width, height);
      }
    };

    const loop = () => {
      tick();
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

    // Reduced motion: pre-grow particles so a single static frame still shows the fan.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resize();
    if (reducedMotion) {
      for (let i = 0; i < 240; i += 1) tick();
      render();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!reducedMotion && visible && !frame) start();
      else if (reducedMotion) render();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    const onVisibilityChange = () => {
      if (document.hidden || reducedMotion) stop();
      else start();
    };
    resizeObserver.observe(host);
    intersection.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!reducedMotion) start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={hostRef} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden", filter: `hue-rotate(${props.hue ?? CONNECTIVITY_GRAPH_DEFAULTS.hue}deg)` }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
export default ConnectivityGraph;
