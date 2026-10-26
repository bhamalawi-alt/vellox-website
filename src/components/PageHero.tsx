import type { ReactNode } from "react";
import { BrandMark } from "./BrandLogo";
import { ShaderBackground } from "./motion/ShaderBackground";
import { ProgressiveBlur } from "./ui/progressive-blur";
import { StaggerText } from "./ui/stagger-text";

type ShaderName = Parameters<typeof ShaderBackground>[0]["src"];

export function PageHero({
  eyebrow,
  title,
  lede,
  before,
  after,
  shader = "interface",
}: {
  eyebrow?: ReactNode;
  title: string;
  lede?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  shader?: ShaderName;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <ShaderBackground src={shader} className="opacity-40" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        {before}
        <BrandMark height={36} className="mb-8 h-9 w-auto opacity-90" />
        {eyebrow ? (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="display max-w-[20ch] text-[2.4rem] font-light md:text-[clamp(3.9rem,6.5vw,5.4rem)] leading-[1.03] tracking-[-0.02em]">
          <StaggerText words={title.split(" ").map((w) => ({ w }))} />
        </h1>
        {lede ? (
          <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-white/75 md:text-lg">
            {lede}
          </p>
        ) : null}
        {after}
      </div>
      <ProgressiveBlur position="bottom" color="#0a0a0a" height="96px" />
    </section>
  );
}
