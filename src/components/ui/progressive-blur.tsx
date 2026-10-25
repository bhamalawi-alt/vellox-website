// Adapted from Skiper UI — Skiper 41 ProgressiveBlur (free tier, attribution required).
// https://skiper-ui.com · Author: @gurvinder-singh02

type ProgressiveBlurProps = {
  className?: string;
  color?: string;
  position?: "top" | "bottom";
  height?: string;
  blur?: string;
};

export function ProgressiveBlur({
  className = "",
  color = "#0a0a0a",
  position = "bottom",
  height = "160px",
  blur = "6px",
}: ProgressiveBlurProps) {
  const isTop = position === "top";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: `linear-gradient(to ${isTop ? "top" : "bottom"}, transparent, ${color})`,
        maskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black 50%, transparent)`,
        WebkitMaskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, black 50%, transparent)`,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
      }}
    />
  );
}
