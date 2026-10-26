"use client";
// ShaderBackground already lazy-loads this module, so EnergyOrb is imported
// directly instead of through a second lazy() round trip.
import { EnergyOrb, type EnergyOrbProps } from "./EnergyOrb";
export type GlobeCollectionProps = EnergyOrbProps;
export function GlobeCollection(props: GlobeCollectionProps) {
  return <EnergyOrb {...props} />;
}
export default GlobeCollection;
