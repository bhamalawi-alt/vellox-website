"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MAP = {
  globe: dynamic(() => import("./threeui/GlobeCollection"), { ssr: false }),
  connectivity: dynamic(() => import("./threeui/ConnectivityGraph"), { ssr: false }),
  interface: dynamic(() => import("./threeui/InterfaceLines"), { ssr: false }),
} as const;

export function ShaderBackground({ src, className, hue }: { src: keyof typeof MAP; className?: string; hue?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Mount-gate must not flip during render; defer past first paint + idle so
    // hero text/LCP never waits on shader work. Anchored to the load event so
    // the lazy chunk fetch cannot compete with critical resources.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let raf = 0;
      let idleId: number | undefined;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const onDone = () => {
        if (typeof window.requestIdleCallback === "function") {
          idleId = window.requestIdleCallback(() => setReady(true));
        } else {
          timer = setTimeout(() => setReady(true), 200);
        }
      };
      let rafScheduled = false;
      let onLoad: (() => void) | undefined;
      if (document.readyState === "complete") {
        raf = requestAnimationFrame(onDone);
        rafScheduled = true;
      } else {
        onLoad = () => {
          raf = requestAnimationFrame(onDone);
          rafScheduled = true;
        };
        window.addEventListener("load", onLoad, { once: true });
      }
      return () => {
        if (!rafScheduled && onLoad) window.removeEventListener("load", onLoad);
        cancelAnimationFrame(raf);
        if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        }
        if (timer !== undefined) clearTimeout(timer);
      };
    }
  }, []);
  const Cmp = MAP[src];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,#171717,#0a0a0a)]" />
      {ready ? <Cmp {...(hue === undefined ? {} : { hue })} /> : null}
    </div>
  );
}
