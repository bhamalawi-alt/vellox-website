"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MAP = {
  emerald: dynamic(() => import("./threeui/EmeraldHorizonBackground"), { ssr: false }),
  globe: dynamic(() => import("./threeui/GlobeCollection"), { ssr: false }),
  connectivity: dynamic(() => import("./threeui/ConnectivityGraph"), { ssr: false }),
  interface: dynamic(() => import("./threeui/InterfaceLines"), { ssr: false }),
} as const;

export function ShaderBackground({ src, className, hue }: { src: keyof typeof MAP; className?: string; hue?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Verbatim from task-5-brief.md; mount-gate must not flip during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReady(true);
  }, []);
  const Cmp = MAP[src];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,#171717,#0a0a0a)]" />
      {ready ? <Cmp {...(hue === undefined ? {} : { hue })} /> : null}
    </div>
  );
}
