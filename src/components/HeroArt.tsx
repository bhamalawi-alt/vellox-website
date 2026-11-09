/**
 * Decorative hero artwork from /public/art (generated, abstract, never client
 * work). Purely presentational: empty alt, hidden from assistive tech.
 * Files are pre-sized as <name>-960 and <name>-1920 in AVIF and WebP, so the
 * browser picks the smallest one that fits.
 */
export function HeroArt({
  name,
  className = "",
  mirrorRtl = false,
  lazy = false,
}: {
  /** Base file name in /public/art, without size or extension. */
  name: string;
  className?: string;
  /** Flip the picture in right-to-left layouts so it stays clear of the text. */
  mirrorRtl?: boolean;
  /** For artwork below the first screen: load it only when it is near. */
  lazy?: boolean;
}) {
  const set = (ext: string) => `/art/${name}-960.${ext} 960w, /art/${name}-1920.${ext} 1920w`;
  return (
    <picture aria-hidden="true">
      <source type="image/avif" srcSet={set("avif")} sizes="100vw" />
      <img
        src={`/art/${name}-1920.webp`}
        srcSet={set("webp")}
        sizes="100vw"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        loading={lazy ? "lazy" : undefined}
        fetchPriority={lazy ? undefined : "high"}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
          mirrorRtl ? "rtl:-scale-x-100" : ""
        } ${className}`}
      />
    </picture>
  );
}
