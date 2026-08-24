"use client";
import { lazy, Suspense } from "react";
import type { EnergyOrbProps } from "./EnergyOrb";
export type GlobeVariant = "energy-orb";
export type GlobeCollectionProps = EnergyOrbProps & { variant?: "energy-orb" };
const EnergyOrbVariant = lazy(() => import("./EnergyOrb").then((module) => ({ default: module.EnergyOrb })));
export function GlobeCollection({ variant: _variant, ...props }: GlobeCollectionProps) {
  return <Suspense fallback={<div style={{ position: "absolute", inset: 0, background: "#05030e" }} />}><EnergyOrbVariant {...props} /></Suspense>;
}
export default GlobeCollection;
