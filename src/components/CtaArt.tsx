import { HeroArt } from "./HeroArt";
import { HeroLoop } from "./motion/HeroLoop";

/**
 * Background for the closing "start a project" band: decorative artwork at
 * both sides with a slow loop, dimmed where the text sits. The parent section
 * needs `relative overflow-hidden`, and its content `relative z-10`.
 */
export function CtaArt({ spread = false }: { /** Text spans the full width rather than the centre. */ spread?: boolean }) {
  return (
    <>
      <HeroArt name="cta" lazy />
      <HeroLoop name="cta-loop" />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          spread
            ? "bg-[#0a0a0a]/75"
            : "bg-[radial-gradient(60%_90%_at_50%_50%,rgba(10,10,10,0.92),rgba(10,10,10,0.3))]"
        }`}
      />
      {/* On phones the text reaches the artwork at the sides: dim it further. */}
      {spread ? null : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/40 md:hidden" />
      )}
    </>
  );
}
