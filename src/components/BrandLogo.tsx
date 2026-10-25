// Brand assets from the original Vellox site, in public/logos:
// logo-06 lockup (white), logo-07 lockup (black), logo-08 lockup (brand blue),
// logo-12 mark (white), logo-13 mark (black), logo-14 mark (brand blue).

const LOCKUP_RATIO = 1390 / 253;
const MARK_RATIO = 587 / 507;

export function BrandLockup({ height = 24, className = "" }: { height?: number; className?: string }) {
  return (
    <img
      src="/logos/logo-06.png"
      alt="Vellox Studio — Business Development Studio"
      width={Math.round(height * LOCKUP_RATIO)}
      height={height}
      className={className}
    />
  );
}

export function BrandMark({
  height = 32,
  tone = "white",
  className = "",
}: {
  height?: number;
  tone?: "white" | "black" | "brand";
  className?: string;
}) {
  const file = { white: "logo-12", black: "logo-13", brand: "logo-14" }[tone];
  return (
    <img
      src={`/logos/${file}.png`}
      alt=""
      aria-hidden="true"
      width={Math.round(height * MARK_RATIO)}
      height={height}
      className={className}
    />
  );
}
