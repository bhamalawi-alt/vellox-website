"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LUMINA_FRAGMENT_SHADER, LUMINA_VERTEX_SHADER } from "./emeraldHorizonShaders";

export type EmeraldHorizonBackgroundProps = { speed?: number; waveScale?: number; variation?: number; glow?: number; vignette?: number; hue?: number; className?: string };
export const EMERALD_HORIZON_DEFAULTS = { speed: 1, waveScale: 1, variation: 1, glow: 1, vignette: 1, hue: 0 } as const;
export function EmeraldHorizonBackground({ className = "", ...props }: EmeraldHorizonBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLCanvasElement>(null); const optionsRef = useRef({ ...EMERALD_HORIZON_DEFAULTS, ...props });
  useEffect(() => { optionsRef.current = { ...EMERALD_HORIZON_DEFAULTS, ...props }; });
  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current; if (!host || !canvas) return undefined;
    const scene = new THREE.Scene(); const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (error) {
      console.error("EmeraldHorizonBackground: WebGL context creation failed; keeping the static gradient fallback.", error);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const uniforms = { u_time: { value: 0 }, u_resolution: { value: new THREE.Vector2(1, 1) }, u_wave_scale: { value: 1 }, u_variation: { value: 1 }, u_glow: { value: 1 }, u_vignette: { value: 1 } };
    const material = new THREE.ShaderMaterial({ vertexShader: LUMINA_VERTEX_SHADER, fragmentShader: LUMINA_FRAGMENT_SHADER, uniforms, depthWrite: false, depthTest: false }); const geometry = new THREE.PlaneGeometry(2, 2); scene.add(new THREE.Mesh(geometry, material));
    let frame = 0, visible = true; const start = performance.now();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const resize = () => { const bounds = host.getBoundingClientRect(); renderer.setSize(bounds.width, bounds.height, false); uniforms.u_resolution.value.set(bounds.width, bounds.height); };
    const renderStaticFrame = () => { const options = optionsRef.current; uniforms.u_time.value = 0; uniforms.u_wave_scale.value = options.waveScale; uniforms.u_variation.value = options.variation; uniforms.u_glow.value = options.glow; uniforms.u_vignette.value = options.vignette; renderer.render(scene, camera); };
    const render = (now: number) => { const options = optionsRef.current; uniforms.u_time.value = (now - start) * 0.001 * options.speed; uniforms.u_wave_scale.value = options.waveScale; uniforms.u_variation.value = options.variation; uniforms.u_glow.value = options.glow; uniforms.u_vignette.value = options.vignette; renderer.render(scene, camera); frame = visible && !document.hidden && !reducedMotion ? requestAnimationFrame(render) : 0; };
    const onMotionChange = () => { reducedMotion = motionQuery.matches; if (reducedMotion) { if (frame) { cancelAnimationFrame(frame); frame = 0; } renderStaticFrame(); } };
    motionQuery.addEventListener("change", onMotionChange);
    const resizeObserver = new ResizeObserver(resize), intersection = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? true; if (visible && !frame && !reducedMotion) frame = requestAnimationFrame(render); if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; } }); resizeObserver.observe(host); intersection.observe(host); resize(); if (reducedMotion) renderStaticFrame(); else frame = requestAnimationFrame(render);
    return () => { if (frame) cancelAnimationFrame(frame); motionQuery.removeEventListener("change", onMotionChange); resizeObserver.disconnect(); intersection.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss(); };
  }, []);
  return (
    <div ref={hostRef} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", filter: `hue-rotate(${props.hue ?? EMERALD_HORIZON_DEFAULTS.hue}deg)` }} />
    </div>
  );
}
export default EmeraldHorizonBackground;
